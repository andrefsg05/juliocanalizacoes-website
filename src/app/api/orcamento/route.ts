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

    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: normalized.email,
      subject: `Novo pedido de orçamento - ${normalized.service}`,
      text: buildTextBody(payloadForTemplate),
      html: buildHtmlBody(payloadForTemplate),
    })

    const previewUrl = nodemailer.getTestMessageUrl(info)

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
