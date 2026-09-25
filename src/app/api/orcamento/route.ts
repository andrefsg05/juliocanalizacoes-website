import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

type QuotePayload = {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  website?: string
}

const MAX_LENGTH = {
  name: 120,
  phone: 40,
  email: 180,
  service: 120,
  message: 3000,
}

function normalize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const current = rateLimitStore.get(ip)

  if (!current || now > current.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  current.count += 1
  rateLimitStore.set(ip, current)
  return false
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildTextBody(data: Required<Omit<QuotePayload, 'website'>>) {
  return [
    'Novo pedido de orçamento recebido no website',
    '',
    `Nome: ${data.name}`,
    `Telefone: ${data.phone}`,
    `Email: ${data.email}`,
    `Tipo de Serviço: ${data.service}`,
    '',
    'Mensagem:',
    data.message,
  ].join('\n')
}

function buildHtmlBody(data: Required<Omit<QuotePayload, 'website'>>) {
  const safeName = escapeHtml(data.name)
  const safePhone = escapeHtml(data.phone)
  const safeEmail = escapeHtml(data.email)
  const safeService = escapeHtml(data.service)
  const safeMessage = escapeHtml(data.message)

  return `
    <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 16px; color: #1d4ed8;">Novo pedido de orçamento</h2>
      <p><strong>Nome:</strong> ${safeName}</p>
      <p><strong>Telefone:</strong> ${safePhone}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Tipo de Serviço:</strong> ${safeService}</p>
      <p style="margin-top: 16px;"><strong>Mensagem:</strong></p>
      <div style="white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">${safeMessage}</div>
    </div>
  `
}

function buildAutoReplyTextBody(data: Required<Omit<QuotePayload, 'website'>>) {
  return [
    `Olá, ${data.name}!`,
    '',
    'Confirmamos que o seu pedido de orçamento foi recebido com sucesso através do nosso website.',
    '',
    'AVISO DE DISPONIBILIDADE:',
    'De momento estamos com uma elevada procura e agenda preenchida em intervenções no terreno.',
    'Dedicamos a máxima atenção a cada pedido e responderemos com a nossa proposta logo que possível.',
    '',
    'PRECISA DE AJUDA URGENTE?',
    'Se se tratar de uma emergência, não hesite em contactar-nos diretamente:',
    'Telefone: +351 964 030 969',
    '',
    '--- RESUMO DO SEU PEDIDO ---',
    `Tipo de Serviço: ${data.service}`,
    `Telefone de Contacto: ${data.phone}`,
    'Mensagem:',
    data.message,
    '',
    '---',
    'Júlio Gonçalves - Canalizações',
    'Évora e arredores | Telefone: +351 964 030 969',
    'Pode responder diretamente a este email caso queira acrescentar mais detalhes ou fotografias.',
  ].join('\n')
}

function buildAutoReplyHtmlBody(data: Required<Omit<QuotePayload, 'website'>>) {
  const safeName = escapeHtml(data.name)
  const safeService = escapeHtml(data.service)
  const safePhone = escapeHtml(data.phone)
  const safeMessage = escapeHtml(data.message)

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
      
      <!-- Cabeçalho com identidade visual da marca -->
      <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 28px 24px; text-align: center;">
        <div style="display: inline-block;">
          <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Júlio Gonçalves</h1>
          <p style="margin: 4px 0 0 0; color: #bae6fd; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2.5px;">Canalizações</p>
        </div>
      </div>

      <div style="padding: 32px 24px;">
        <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 12px;">Olá, ${safeName}!</h2>
        
        <p style="line-height: 1.6; font-size: 15px; color: #334155; margin-top: 0; margin-bottom: 20px;">
          Confirmamos que o seu pedido de orçamento foi <strong>recebido com sucesso</strong> através do nosso website.
        </p>

        <!-- Caixa de Aviso de Agenda / Atenção -->
        <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #0369a1;">
            <strong>Aviso de disponibilidade:</strong> Estamos atualmente com uma elevada procura e agenda preenchida em intervenções no terreno. Dedicamos a máxima atenção a cada pedido e entraremos em contacto consigo com a nossa resposta logo que possível.
          </p>
        </div>

        <!-- Alerta de Urgência -->
        <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 28px;">
          <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: #991b1b;">
            O seu caso é uma emergência ou precisa de resposta imediata?
          </p>
          <p style="margin: 0 0 14px 0; font-size: 13px; color: #7f1d1d; line-height: 1.4;">
            Para ruturas, inundações ou fugas de água ativas, ligue diretamente:
          </p>
          <a href="tel:+351964030969" style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: 700; font-size: 15px; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">
            Ligar +351 964 030 969
          </a>
        </div>

        <!-- Resumo do Pedido -->
        <div style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.6px; color: #64748b; margin: 0 0 14px 0;">
            Resumo do Pedido Submetido
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 130px; border-bottom: 1px solid #f8fafc;">Serviço:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f8fafc;">${safeService}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #f8fafc;">Telefone:</td>
              <td style="padding: 8px 0; color: #334155; border-bottom: 1px solid #f8fafc;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;">Mensagem:</td>
              <td style="padding: 8px 0; color: #334155; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Rodapé -->
      <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 22px 24px; text-align: center; font-size: 12px; color: #64748b;">
        <p style="margin: 0 0 4px 0; font-weight: 600; color: #334155;">Júlio Gonçalves — Canalizações</p>
        <p style="margin: 0 0 8px 0;">Évora e arredores • Telefone: +351 964 030 969</p>
        <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.4;">
          Este é um email automático de confirmação de receção.<br/>
          Caso queira adicionar informações ou fotografias ao pedido, basta responder a esta mensagem.
        </p>
      </div>
    </div>
  `
}

async function createEmailTransport() {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    return {
      transporter,
      isTestMode: false,
      fromEmail: process.env.CONTACT_EMAIL_FROM || smtpUser,
      toEmail: process.env.CONTACT_EMAIL_TO || smtpUser,
    }
  }

  if (IS_PRODUCTION) {
    throw new Error('Configuração SMTP em falta para ambiente de produção.')
  }

  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  return {
    transporter,
    isTestMode: true,
    fromEmail: process.env.CONTACT_EMAIL_FROM || testAccount.user,
    toEmail: process.env.CONTACT_EMAIL_TO || testAccount.user,
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { ok: false, error: 'Formato de pedido inválido.' },
        { status: 415 }
      )
    }

    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Demasiados pedidos. Tente novamente em alguns minutos.' },
        { status: 429 }
      )
    }

    const body = (await request.json()) as QuotePayload

    if (normalize(body.website)) {
      return NextResponse.json({ ok: true, message: 'Pedido recebido.' })
    }

    const normalized = {
      name: sanitizeHeaderValue(normalize(body.name)),
      phone: sanitizeHeaderValue(normalize(body.phone)),
      email: sanitizeHeaderValue(normalize(body.email)),
      service: sanitizeHeaderValue(normalize(body.service)),
      message: normalize(body.message),
    }

    if (!normalized.name || !normalized.phone || !normalized.email || !normalized.service || !normalized.message) {
      return NextResponse.json(
        { ok: false, error: 'Preencha todos os campos obrigatórios.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(normalized.email)) {
      return NextResponse.json({ ok: false, error: 'Email inválido.' }, { status: 400 })
    }

    if (
      normalized.name.length > MAX_LENGTH.name ||
      normalized.phone.length > MAX_LENGTH.phone ||
      normalized.email.length > MAX_LENGTH.email ||
      normalized.service.length > MAX_LENGTH.service ||
      normalized.message.length > MAX_LENGTH.message
    ) {
      return NextResponse.json(
        { ok: false, error: 'Um ou mais campos excedem o limite permitido.' },
        { status: 400 }
      )
    }

    const { transporter, isTestMode, fromEmail, toEmail } = await createEmailTransport()

    const payloadForTemplate = {
      name: normalized.name,
      phone: normalized.phone,
      email: normalized.email,
      service: normalized.service,
      message: normalized.message,
    }

    const adminMailOptions = {
      from: fromEmail,
      to: toEmail,
      replyTo: normalized.email,
      subject: `Novo pedido de orçamento - ${normalized.service}`,
      text: buildTextBody(payloadForTemplate),
      html: buildHtmlBody(payloadForTemplate),
    }

    const clientMailOptions = {
      from: `"Júlio Canalizações" <${fromEmail}>`,
      to: normalized.email,
      replyTo: toEmail,
      subject: 'Recebemos o seu pedido de orçamento - Júlio Canalizações',
      text: buildAutoReplyTextBody(payloadForTemplate),
      html: buildAutoReplyHtmlBody(payloadForTemplate),
    }

    const [adminResult, clientResult] = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ])

    if (adminResult.status === 'rejected') {
      console.error('Erro ao enviar pedido para o canalizador:', adminResult.reason)
      return NextResponse.json(
        { ok: false, error: 'Não foi possível enviar o pedido neste momento. Tente novamente.' },
        { status: 500 }
      )
    }

    if (clientResult.status === 'rejected') {
      console.warn('Aviso: Falha ao enviar auto-resposta ao cliente:', clientResult.reason)
    }

    const previewUrl =
      adminResult.status === 'fulfilled'
        ? nodemailer.getTestMessageUrl(adminResult.value)
        : undefined

    return NextResponse.json({
      ok: true,
      message: 'Pedido enviado com sucesso. Entraremos em contacto brevemente.',
      previewUrl: isTestMode ? previewUrl || undefined : undefined,
    })
  } catch (error) {
    console.error('Erro ao enviar pedido de orçamento:', error)
    return NextResponse.json(
      { ok: false, error: 'Não foi possível enviar o pedido neste momento. Tente novamente.' },
      { status: 500 }
    )
  }
}
