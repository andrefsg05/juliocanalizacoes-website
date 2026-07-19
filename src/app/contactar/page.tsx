import type { Metadata } from 'next'
import ContactPageShell from '@/components/ContactPageShell'

export const metadata: Metadata = {
  title: 'Contactar — Júlio Gonçalves Canalizações',
  description: 'Peça o seu orçamento gratuito para serviços de canalização em Évora e arredores.',
  alternates: {
    canonical: '/contactar',
  },
  openGraph: {
    title: 'Contactar — Júlio Gonçalves Canalizações',
    description: 'Peça o seu orçamento gratuito para serviços de canalização em Évora e arredores.',
    url: '/contactar',
  },
}

export default function ContactPage() {
  return <ContactPageShell />
}
