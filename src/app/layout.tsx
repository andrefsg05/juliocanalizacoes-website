import type { Metadata } from 'next'
import {
  Carattere,
  Inter,
  Kedebideri,
  Montserrat,
  Stack_Sans_Notch,
} from 'next/font/google'
import LandingIntroProvider from '@/components/LandingIntroProvider'
import PageTransitionProvider from '@/components/PageTransitionProvider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const kedebideri = Kedebideri({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kedebideri',
})

const stackSansNotch = Stack_Sans_Notch({
  weight: 'variable',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-stack-sans-notch',
})

const carattere = Carattere({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-carattere',
})

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

function getMetadataBase(): URL {
  const fallbackUrl = 'https://www.juliocanalizacoes.pt'

  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl)
  } catch {
    return new URL(fallbackUrl)
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: 'Júlio Gonçalves Canalizações — Serviços de Canalização Profissional',
  description: 'Serviços profissionais de canalização, reparação de fugas, instalação sanitária e manutenção de redes de água e esgotos. Qualidade e confiança desde sempre.',
  keywords: ['canalização', 'canalizador', 'reparação fugas', 'instalação sanitária', 'Júlio Gonçalves'],
  authors: [{ name: 'Júlio Gonçalves Canalizações' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Júlio Gonçalves Canalizações',
    description: 'Serviços profissionais de canalização, remodelação e manutenção.',
    type: 'website',
    locale: 'pt_PT',
    url: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${kedebideri.variable} ${stackSansNotch.variable} ${carattere.variable} ${montserrat.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <LandingIntroProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </LandingIntroProvider>
      </body>
    </html>
  )
}
