'use client'

import { usePathname } from 'next/navigation'
import BrandLogo from '@/components/BrandLogo'
import TransitionLink from '@/components/TransitionLink'

function PhoneIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

function MapPinIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function EnvelopeIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

const serviceLinks = [
  'Reparação de Fugas',
  'Instalação de Canalizações',
  'Remodelação de Casas de Banho',
  'Sistemas de Aquecimento',
  'Desentupimentos',
]

export default function SiteFooter() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const serviceLinkClassName = 'text-sm text-gray-400 transition-colors hover:text-brand-400'

  return (
    <footer className="min-h-[100svh] bg-gray-900 text-white">
      <div className="container mx-auto flex min-h-[100svh] flex-col px-6 lg:px-8">
        <div className="grid flex-1 content-center gap-x-10 gap-y-12 py-12 text-left sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
          <div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Serviços profissionais de canalização em Évora e arredores.
              Qualidade, confiança e preços justos há mais de 45 anos.
            </p>
          </div>

          <div className="lg:pl-10">
            <h4 className="mb-4 font-semibold text-white">Serviços</h4>
            <ul className="flex flex-col items-start gap-2.5">
              {serviceLinks.map((item) => (
                <li key={item}>
                  {isHomePage ? (
                    <a href="#servicos" className={serviceLinkClassName}>
                      {item}
                    </a>
                  ) : (
                    <TransitionLink href="/#servicos" className={serviceLinkClassName}>
                      {item}
                    </TransitionLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+351964030969" className="flex items-center justify-start gap-2 text-sm text-gray-400 transition-colors hover:text-brand-400">
                  <PhoneIcon className="h-4 w-4" /> +351 964 030 969
                </a>
              </li>
              <li>
                <a href="mailto:juliogcanalizacoes@gmail.com" className="flex items-center justify-start gap-2 text-sm text-gray-400 transition-colors hover:text-brand-400">
                  <EnvelopeIcon className="h-4 w-4" /> juliogcanalizacoes@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-start gap-2 text-sm text-gray-400">
                <MapPinIcon className="h-4 w-4" /> Évora
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Desenvolvido por</h4>
            <p className="mb-3 text-sm text-gray-400">André Gonçalves</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com/andrefsg05"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-400 transition-colors hover:text-brand-400"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/andre-fs-goncalves/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-400 transition-colors hover:text-brand-400"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-between gap-4 border-t border-gray-800 py-6 md:flex-row md:py-8">
          <div className="flex items-center gap-20">
            <BrandLogo variant="short" />
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Júlio Gonçalves Canalizações. Todos os direitos reservados.
            </p>
          </div>
          <p className="text-xs text-gray-600">
            Canalizador certificado &bull; NIF: 124 588 816
          </p>
        </div>
      </div>
    </footer>
  )
}
