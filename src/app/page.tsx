'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

/* ───────── Icon Components ───────── */

function DropletIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.5C16.5 21.5 20 17.75 20 13.5C20 8.5 12 2.5 12 2.5C12 2.5 4 8.5 4 13.5C4 17.75 7.5 21.5 12 21.5Z" />
    </svg>
  )
}

function WrenchIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  )
}

function ShieldIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

function ClockIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function PhoneIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

function MapPinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function EnvelopeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

function XIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function PipeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h4.5m0 0V3h9v4.5m-9 0h9m0 0H21m-3 0v9a3 3 0 01-3 3H9a3 3 0 01-3-3v-9" />
    </svg>
  )
}

function FireIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 003.75-3.75c0-2.697-3.75-5.25-3.75-5.25s-3.75 2.553-3.75 5.25A3.75 3.75 0 0012 18z" />
    </svg>
  )
}

function HomeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

function CameraIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.04l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  )
}

function ChevronLeftIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  )
}

function ChevronRightIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function ExpandIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  )
}

/* ───────── Gallery Data ───────── */

const highlightedPhotos = [
  { src: '/img/wc1.jpeg', alt: 'Remodelação de casa de banho - Projeto 1' },
  { src: '/img/wc2.jpeg', alt: 'Remodelação de casa de banho - Projeto 2' },
  { src: '/img/wc3.jpeg', alt: 'Remodelação de casa de banho - Projeto 3' },
]

const masonryPhotos = [
  { src: '/img/1.jpeg', alt: 'Trabalho de canalização 1' },
  { src: '/img/2.jpeg', alt: 'Trabalho de canalização 2' },
  { src: '/img/3.jpeg', alt: 'Trabalho de canalização 3' },
  { src: '/img/4.jpeg', alt: 'Trabalho de canalização 4' },
  { src: '/img/5.jpeg', alt: 'Trabalho de canalização 5' },
  { src: '/img/7.jpeg', alt: 'Trabalho de canalização 7' },
  { src: '/img/8.jpeg', alt: 'Trabalho de canalização 8' },
  { src: '/img/9.jpeg', alt: 'Trabalho de canalização 9' },
  { src: '/img/10.jpeg', alt: 'Trabalho de canalização 10' },
  { src: '/img/11.jpeg', alt: 'Trabalho de canalização 11' },
  { src: '/img/12.jpeg', alt: 'Trabalho de canalização 12' },
  { src: '/img/14.jpeg', alt: 'Trabalho de canalização 14' },
  { src: '/img/15.jpeg', alt: 'Trabalho de canalização 15' },
  { src: '/img/16.jpeg', alt: 'Trabalho de canalização 16' },
  { src: '/img/17.jpeg', alt: 'Trabalho de canalização 17' },
]

const allGalleryPhotos = [...highlightedPhotos, ...masonryPhotos]

/* ───────── Data ───────── */

const services = [
  {
    icon: DropletIcon,
    title: 'Reparação de Fugas',
    description: 'Deteção e reparação de fugas de água em canalizações, torneiras, autoclismos e válvulas. Utilizamos equipamento de deteção avançado para minimizar danos.',
    features: ['Deteção não destrutiva', 'Reparação imediata', 'Garantia de serviço'],
  },
  {
    icon: PipeIcon,
    title: 'Instalação de Canalizações',
    description: 'Instalação completa de redes de água quente e fria, esgotos domésticos e pluviais. Projetos para construção nova e remodelação.',
    features: ['Tubo multicamada', 'PPR e PEX certificado', 'Cumprimento de normas'],
  },
  {
    icon: HomeIcon,
    title: 'Remodelação de Casas de Banho',
    description: 'Remodelação integral de casas de banho, desde a canalização à instalação de louças sanitárias, bases de duche e banheiras.',
    features: ['Projeto personalizado', 'Instalação de louças', 'Acabamentos premium'],
  },
  {
    icon: FireIcon,
    title: 'Sistemas de Aquecimento',
    description: 'Instalação e manutenção de esquentadores, caldeiras, termoacumuladores e sistemas de aquecimento central.',
    features: ['Eficiência energética', 'Manutenção preventiva', 'Todas as marcas'],
  },
  {
    icon: WrenchIcon,
    title: 'Manutenção Preventiva',
    description: 'Planos de manutenção regular para evitar avarias e prolongar a vida útil das suas instalações hidráulicas.',
    features: ['Inspeção completa', 'Relatório detalhado', 'Planos personalizados'],
  },
  {
    icon: ShieldIcon,
    title: 'Desentupimentos',
    description: 'Desentupimento profissional de canos, sifões, sanitas e redes de esgoto com equipamento especializado.',
    features: ['Atendimento rápido', 'Câmara de inspeção', 'Hidrojato de pressão'],
  },
]

const testimonials = [
  {
    name: 'Ana Ferreira',
    location: 'Évora',
    text: 'O Sr. Júlio resolveu uma fuga que me chateava há muitos dias. Trabalho impecável e preço justo. Recomendo vivamente!',
    rating: 5,
  },
  {
    name: 'Carlos Santos',
    location: 'Lisboa',
    text: 'Remodelação completa de casas de banho feita com grande profissionalismo. Cumpriram o prazo e o orçamento. Ficaram fantásticas!',
    rating: 5,
  },
  {
    name: 'Maria Oliveira',
    location: 'Évora',
    text: 'Atendimento rápido e muito profissional. Muito competentes e simpáticos. São a minha primeira escolha.',
    rating: 5,
  },
]

const stats = [
  { value: '45+', label: 'Anos de Experiência' },
  { value: '3.500+', label: 'Clientes Satisfeitos' },
  { value: 'Évora', label: 'Zona de Atuação' },
  { value: '100%', label: 'Trabalhos Garantidos' },
]

/* ───────── Page Component ───────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    website: '',
  })
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message: string
    previewUrl?: string
  }>({ type: 'idle', message: '' })

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }, [])

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    setLightboxIndex((current) => {
      if (current === null) return null
      if (direction === 'prev') return current > 0 ? current - 1 : allGalleryPhotos.length - 1
      return current < allGalleryPhotos.length - 1 ? current + 1 : 0
    })
  }, [])

  // Hero slideshow timer
  const [heroSlide, setHeroSlide] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % highlightedPhotos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, closeLightbox, navigateLightbox])

  const handleQuoteChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setQuoteForm((prev) => ({ ...prev, [name]: value }))
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

      setQuoteForm({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
        website: '',
      })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro inesperado ao enviar pedido.',
      })
    }
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
        <nav className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
                <DropletIcon className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="block text-lg font-bold text-gray-900 leading-tight">Júlio Gonçalves</span>
                <span className="block text-[11px] font-medium text-brand-600 tracking-wider uppercase -mt-0.5">Canalizações</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Serviços', 'Trabalhos', 'Sobre', 'Testemunhos', 'Contacto'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              ))}
              <a href="tel:+351964030969" className="btn-primary text-sm !px-5 !py-2.5">
                <PhoneIcon className="w-4 h-4" />
                Ligar Agora
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-6 pt-2 border-t border-gray-100 animate-fade-in">
              <div className="flex flex-col gap-1">
                {['Serviços', 'Trabalhos', 'Sobre', 'Testemunhos', 'Contacto'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg font-medium transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a href="tel:+351964030969" className="btn-primary mt-3 text-center">
                  <PhoneIcon className="w-4 h-4" />
                  Ligar Agora
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
        {/* Background photo slideshow */}
        <div className="hero-slideshow" aria-hidden="true">
          {highlightedPhotos.map((photo, i) => (
            <div key={i} className={`hero-slide ${i === heroSlide ? 'active' : ''}`}>
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="100vw"
                quality={60}
                priority={i === 0}
                className="pointer-events-none select-none"
              />
            </div>
          ))}
        </div>

        {/* White overlay for text readability */}
        <div className="hero-overlay" />

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {highlightedPhotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === heroSlide
                  ? 'w-8 bg-brand-500'
                  : 'w-3 bg-brand-300/40 hover:bg-brand-300/60'
              }`}
            />
          ))}
        </div>

        {/* Background decorations (on top of overlay) */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <div className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full bg-brand-100/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-brand-50/40 blur-3xl" />
        </div>

        {/* Floating water drops decoration */}
        <div className="absolute top-32 right-[15%] w-3 h-3 rounded-full bg-brand-300/30 animate-float z-[3]" />
        <div className="absolute top-48 right-[25%] w-2 h-2 rounded-full bg-brand-400/20 animate-float animate-delay-200 z-[3]" />
        <div className="absolute bottom-32 left-[20%] w-4 h-4 rounded-full bg-brand-200/30 animate-float animate-delay-400 z-[3]" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50/90 backdrop-blur-sm border border-brand-100 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              <span className="text-sm font-medium text-brand-700">Orçamentos grátis e sem compromisso</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 animate-fade-in-up text-balance">
              Canalizações com{' '}
              <span className="gradient-text">qualidade</span>{' '}
              e{' '}
              <span className="gradient-text">confiança</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200 text-balance">
              Mais de 45 anos a resolver problemas de canalização com
              profissionalismo, transparência e preços justos. Do pequeno
              reparo à grande remodelação.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
              <a href="#contacto" className="btn-primary w-full sm:w-auto">
                Pedir Orçamento Grátis
                <ArrowRightIcon />
              </a>
              <a href="#servicos" className="btn-secondary w-full sm:w-auto">
                Ver Serviços
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-20 animate-fade-in-up animate-delay-500">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="servicos" className="section-padding bg-gradient-to-b from-gray-50/80 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">O Que Fazemos</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
              Serviços especializados de canalização
            </h2>
            <p className="text-gray-500 text-lg">
              Soluções completas para todas as necessidades de canalização da sua casa ou negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <div key={i} className="service-card group">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-6 group-hover:bg-brand-100 group-hover:border-brand-200 transition-colors duration-500">
                    <service.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-500 mb-5 leading-relaxed text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircleIcon className="w-4 h-4 text-brand-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section id="trabalhos" className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-50/40 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-100/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <CameraIcon className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium text-brand-700">Portfólio de Trabalhos</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
              Trabalhos <span className="gradient-text">reais</span>, resultados visíveis
            </h2>
            <p className="text-gray-500 text-lg">
              Veja alguns dos nossos trabalhos mais recentes. Cada um reflete o nosso compromisso com a qualidade e atenção ao detalhe.
            </p>
          </div>

          {/* Highlighted photos - 3 WC projects */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-brand-500 to-brand-700" />
              <h3 className="text-lg font-bold text-gray-900">Remodelações de Casa de Banho</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {highlightedPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-300 focus:ring-offset-2"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  {/* Bottom text */}
                  <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-end">
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <ExpandIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Corner badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-full bg-brand-600/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
                      ★ Destaque
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Masonry grid - remaining photos */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
              <h3 className="text-lg font-bold text-gray-900">Mais Trabalhos</h3>
              <span className="text-sm text-gray-400 ml-1">({masonryPhotos.length} fotos)</span>
            </div>
            <div className="gallery-masonry">
              {masonryPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(highlightedPhotos.length + i)}
                  className="group relative w-full rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-300 focus:ring-offset-2 block"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-end">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <ExpandIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA under gallery */}
          <div className="text-center mt-12 lg:mt-16">
            <p className="text-gray-500 mb-4">Gostou do que vê? Podemos fazer o mesmo por si.</p>
            <a href="#contacto" className="btn-primary">
              Pedir Orçamento Grátis
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay animate-fade-in" onClick={closeLightbox} role="dialog" aria-modal="true">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Fechar"
          >
            <XIcon className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-7 left-6 text-white/70 text-sm font-medium z-10">
            {lightboxIndex + 1} / {allGalleryPhotos.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev') }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Anterior"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next') }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Seguinte"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allGalleryPhotos[lightboxIndex].src}
              alt={allGalleryPhotos[lightboxIndex].alt}
              width={1200}
              height={800}
              className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      )}

      {/* ── About / Why Us Section ── */}
      <section id="sobre" className="section-padding relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-50/50 to-transparent -z-10" />

        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <span className="inline-block text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Sobre Nós</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                Mais de quatro décadas de experiência ao seu serviço
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                A Júlio Gonçalves Canalizações nasceu da paixão por resolver problemas e da
                dedicação em oferecer um serviço de excelência. Com mais de 45 anos de experiência,
                somos a referência em canalizações na região de Évora.
              </p>

              <div className="space-y-5">
                {[
                  { icon: ShieldIcon, title: 'Garantia em Todos os Trabalhos', desc: 'Todos os nossos serviços incluem garantia. Se algo não ficar perfeito, voltamos sem custos adicionais.' },
                  { icon: ClockIcon, title: 'Pontualidade e Rapidez', desc: 'Respeitamos o seu tempo. Chegamos à hora marcada e resolvemos o problema com eficiência.' },
                  { icon: WrenchIcon, title: 'Materiais Certificados', desc: 'Utilizamos apenas materiais de qualidade certificada, garantindo durabilidade e segurança.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-white p-10 lg:p-14 border border-brand-100">
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-brand-200/30 blur-xl" />
                <div className="absolute bottom-10 left-6 w-16 h-16 rounded-full bg-brand-300/20 blur-xl" />

                <div className="relative space-y-8">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-500/30">
                      <DropletIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Júlio Gonçalves</h3>
                    <p className="text-brand-600 font-medium">Canalizador Profissional</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                      <div className="text-3xl font-bold text-brand-600">45+</div>
                      <div className="text-xs text-gray-500 mt-1">Anos</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                      <div className="text-3xl font-bold text-brand-600">3500+</div>
                      <div className="text-xs text-gray-500 mt-1">Clientes</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-amber-400" />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-700">4.9/5</span>
                    </div>
                    <p className="text-sm text-gray-500">Avaliação média baseada em centenas de clientes satisfeitos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="section-padding bg-gradient-to-b from-brand-50/30 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Como Funciona</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simples, rápido e transparente
            </h2>
            <p className="text-gray-500 text-lg">
              Do primeiro contacto à resolução do problema em 4 passos simples.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Contacte-nos', desc: 'Ligue ou envie mensagem a descrever o problema. Respondemos rapidamente.' },
              { step: '02', title: 'Diagnóstico', desc: 'Visitamos o local para avaliar a situação e apresentamos um orçamento detalhado.' },
              { step: '03', title: 'Execução', desc: 'Realizamos o trabalho com profissionalismo, limpeza e no prazo combinado.' },
              { step: '04', title: 'Garantia', desc: 'Todos os trabalhos incluem garantia. A sua satisfação é a nossa prioridade.' },
            ].map((item, i) => (
              <div key={i} className="relative group text-center">
                {/* Connector line on desktop */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-brand-200 to-brand-100" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-brand-200 flex items-center justify-center mx-auto mb-5 group-hover:border-brand-400 group-hover:bg-brand-50 transition-all duration-300 shadow-sm">
                    <span className="text-xl font-bold gradient-text">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section id="testemunhos" className="section-padding">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Testemunhos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que dizem os nossos clientes
            </h2>
            <p className="text-gray-500 text-lg">
              A confiança dos nossos clientes é o nosso maior orgulho.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-500">
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <StarIcon key={j} className="w-5 h-5 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-10 md:p-16 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-white/20 animate-float" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
                Precisa de um serviço de canalização?
              </h2>
              <p className="text-brand-100 text-lg mb-8">
                Ligue-nos e tratamos do seu pedido com profissionalismo e o mais breve possível.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+351964030969"
                  className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-4 rounded-xl font-bold hover:bg-brand-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  <PhoneIcon className="w-5 h-5" />
                  964 030 969
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  Pedir Orçamento
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contacto" className="section-padding bg-gray-50/80">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <span className="inline-block text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">Contacto</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Fale connosco
              </h2>
              <p className="text-gray-500 text-lg mb-10">
                Peça o seu orçamento gratuito e sem compromisso. Estamos disponíveis para si.
              </p>

              <div className="space-y-6">
                {[
                  { icon: PhoneIcon, label: 'Telefone', value: '+351 964 030 969', href: 'tel:+351964030969', sublabel: 'Atendimento no horário de funcionamento' },
                  { icon: EnvelopeIcon, label: 'Email', value: 'juliogcanalizacoes@gmail.com', href: 'mailto:juliogcanalizacoes@gmail.com', sublabel: 'Resposta o mais breve possível' },
                  { icon: MapPinIcon, label: 'Zona de Atuação', value: 'Évora e arredores', href: '#', sublabel: 'Atendemos residências e negócios' },
                ].map((item, i) => (
                  <a key={i} href={item.href} className="flex items-start gap-4 group p-4 -ml-4 rounded-xl hover:bg-white transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
                      <item.icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">{item.label}</div>
                      <div className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{item.value}</div>
                      <div className="text-sm text-gray-500">{item.sublabel}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Working hours */}
              <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-brand-600" />
                  Horário de Funcionamento
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
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

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm h-fit">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pedir Orçamento</h3>
              <p className="text-gray-500 text-sm mb-8">Preencha o formulário e entraremos em contacto brevemente.</p>

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
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={quoteForm.name}
                      onChange={handleQuoteChange}
                      placeholder="O seu nome"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={quoteForm.phone}
                      onChange={handleQuoteChange}
                      placeholder="912 345 678"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={quoteForm.email}
                    onChange={handleQuoteChange}
                    placeholder="email@exemplo.pt"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo de Serviço</label>
                  <select
                    name="service"
                    value={quoteForm.service}
                    onChange={handleQuoteChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all outline-none text-sm bg-white"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensagem</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={quoteForm.message}
                    onChange={handleQuoteChange}
                    placeholder="Descreva o seu problema ou o serviço que precisa..."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all outline-none resize-none text-sm"
                  />
                </div>
                <button type="submit" disabled={submitStatus.type === 'loading'} className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed">
                  {submitStatus.type === 'loading' ? 'A enviar...' : 'Enviar Pedido de Orçamento'}
                  <ArrowRightIcon />
                </button>
                {submitStatus.type !== 'idle' && (
                  <div className={`rounded-xl px-4 py-3 text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : submitStatus.type === 'error'
                        ? 'bg-red-50 text-red-700 border border-red-100'
                        : 'bg-brand-50 text-brand-700 border border-brand-100'
                  }`}>
                    <p>{submitStatus.message}</p>
                    {submitStatus.previewUrl && (
                      <a
                        href={submitStatus.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block underline font-medium"
                      >
                        Ver pré-visualização do email (modo local)
                      </a>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-400 text-center">
                  Orçamento gratuito e sem compromisso. Resposta o mais breve possível.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <DropletIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-lg font-bold leading-tight">Júlio Gonçalves</span>
                  <span className="block text-[11px] font-medium text-brand-400 tracking-wider uppercase -mt-0.5">Canalizações</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Serviços profissionais de canalização em Évora e arredores.
                Qualidade, confiança e preços justos há mais de 45 anos.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Serviços</h4>
              <ul className="space-y-2.5">
                {['Reparação de Fugas', 'Instalação de Canalizações', 'Remodelação de Casas de Banho', 'Sistemas de Aquecimento', 'Desentupimentos'].map((item) => (
                  <li key={item}>
                    <a href="#servicos" className="text-gray-400 hover:text-brand-400 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+351964030969" className="flex items-center gap-2 text-gray-400 hover:text-brand-400 transition-colors text-sm">
                    <PhoneIcon className="w-4 h-4" /> +351 964 030 969
                  </a>
                </li>
                <li>
                  <a href="mailto:juliogcanalizacoes@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-brand-400 transition-colors text-sm">
                    <EnvelopeIcon className="w-4 h-4" /> juliogcanalizacoes@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPinIcon className="w-4 h-4" /> Évora
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Júlio Gonçalves Canalizações. Todos os direitos reservados.
            </p>
            <p className="text-gray-600 text-xs">
              Canalizador certificado &bull; NIF: 124 588 816
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
