'use client'

import { useState } from 'react'

function ClockIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function PhoneIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

function MapPinIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function EnvelopeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

type QuoteForm = {
  name: string
  phone: string
  email: string
  service: string
  message: string
  website: string
}

type SubmitStatus = {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
  previewUrl?: string
}

const emptyQuoteForm: QuoteForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  website: '',
}

const contactItems = [
  {
    icon: PhoneIcon,
    label: 'Telefone',
    value: '+351 964 030 969',
    href: 'tel:+351964030969',
    sublabel: 'Atendimento no horário de funcionamento',
  },
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'juliogcanalizacoes@gmail.com',
    href: 'mailto:juliogcanalizacoes@gmail.com',
    sublabel: 'Resposta o mais breve possível',
  },
  {
    icon: MapPinIcon,
    label: 'Zona de Atuação',
    value: 'Évora e arredores',
    sublabel: 'Atendemos residências e negócios',
  },
]

export default function ContactSection() {
  const [quoteForm, setQuoteForm] = useState<QuoteForm>(emptyQuoteForm)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: 'idle', message: '' })

  const handleQuoteChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setQuoteForm((previousForm) => ({ ...previousForm, [name]: value }))
  }

  const handleQuoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitStatus({ type: 'loading', message: 'A enviar pedido...' })

    try {
      const response = await fetch('/api/orcamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteForm),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || 'Não foi possível enviar o pedido neste momento.')
      }

      setSubmitStatus({
        type: 'success',
        message: result?.message || 'Pedido enviado com sucesso. Entraremos em contacto brevemente.',
        previewUrl: result?.previewUrl,
      })
      setQuoteForm(emptyQuoteForm)
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro inesperado ao enviar pedido.',
      })
    }
  }

  return (
    <section className="min-h-[calc(100svh-5rem)] bg-gray-50 pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-brand-600">
                Contacto
              </span>
              <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Fale connosco
              </h1>
              <p className="mb-10 text-lg text-gray-500">
                Peça o seu orçamento gratuito e sem compromisso. Estamos disponíveis para si.
              </p>
            </div>

            <div className="space-y-6">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 transition-colors group-hover:bg-brand-100">
                      <item.icon className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-400">{item.label}</div>
                      <div className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-brand-600">{item.value}</div>
                      <div className="text-sm text-gray-500">{item.sublabel}</div>
                    </div>
                  </>
                )

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group -ml-4 flex items-start gap-4 rounded-xl p-4 transition-colors duration-300 hover:bg-white"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="group -ml-4 flex items-start gap-4 rounded-xl p-4"
                  >
                    {content}
                  </div>
                )
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                <ClockIcon className="h-5 w-5 text-brand-600" />
                Horário de Funcionamento
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <span className="text-gray-500">Segunda a Sexta</span>
                  <span className="font-medium text-gray-900">09:00 – 13:00, 14:30 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sábado e Domingo</span>
                  <span className="font-medium text-gray-900">Encerrado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Pedir Orçamento</h2>
            <p className="mb-8 text-sm text-gray-500">
              Preencha o formulário e entraremos em contacto brevemente.
            </p>

            <form className="space-y-5" onSubmit={handleQuoteSubmit}>
              <input
                type="text"
                name="website"
                value={quoteForm.website}
                onChange={handleQuoteChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="quote-name" className="mb-1.5 block text-sm font-medium text-gray-700">Nome</label>
                  <input
                    id="quote-name"
                    type="text"
                    name="name"
                    value={quoteForm.name}
                    onChange={handleQuoteChange}
                    placeholder="O seu nome"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-medium text-gray-700">Telefone</label>
                  <input
                    id="quote-phone"
                    type="tel"
                    name="phone"
                    value={quoteForm.phone}
                    onChange={handleQuoteChange}
                    placeholder="912 345 678"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="quote-email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="quote-email"
                  type="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteChange}
                  placeholder="email@exemplo.pt"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label htmlFor="quote-service" className="mb-1.5 block text-sm font-medium text-gray-700">Tipo de Serviço</label>
                <select
                  id="quote-service"
                  name="service"
                  value={quoteForm.service}
                  onChange={handleQuoteChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                >
                  <option value="">Selecione um serviço</option>
                  <option>Reparação de Fugas</option>
                  <option>Instalação de Canalizações</option>
                  <option>Remodelação de Casa de Banho</option>
                  <option>Sistemas de Aquecimento</option>
                  <option>Manutenção Preventiva</option>
                  <option>Desentupimentos</option>
                  <option>Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="quote-message" className="mb-1.5 block text-sm font-medium text-gray-700">Mensagem</label>
                <textarea
                  id="quote-message"
                  rows={4}
                  name="message"
                  value={quoteForm.message}
                  onChange={handleQuoteChange}
                  placeholder="Descreva o seu problema ou o serviço que precisa..."
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <button
                type="submit"
                disabled={submitStatus.type === 'loading'}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitStatus.type === 'loading' ? 'A enviar...' : 'Enviar Pedido de Orçamento'}
                <ArrowRightIcon />
              </button>
              {submitStatus.type !== 'idle' && (
                <div
                  aria-live="polite"
                  className={`rounded-xl px-4 py-3 text-sm ${
                    submitStatus.type === 'success'
                      ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                      : submitStatus.type === 'error'
                        ? 'border border-red-100 bg-red-50 text-red-700'
                        : 'border border-brand-100 bg-brand-50 text-brand-700'
                  }`}
                >
                  <p>{submitStatus.message}</p>
                  {submitStatus.previewUrl && (
                    <a
                      href={submitStatus.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block font-medium underline"
                    >
                      Ver pré-visualização do email (modo local)
                    </a>
                  )}
                </div>
              )}
              <p className="text-center text-xs text-gray-400">
                Orçamento gratuito e sem compromisso. Resposta o mais breve possível.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
