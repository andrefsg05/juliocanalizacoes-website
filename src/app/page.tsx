'use client'

import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingScreen from '@/components/LoadingScreen'
import SmoothScroll from '@/components/SmoothScroll'
import MouseIcon from '@/components/MouseIcon'
import TapIcon from '@/components/TapIcon'
import GalleryCarousel from '@/components/GalleryCarousel'
import TransitionLink from '@/components/TransitionLink'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { useLandingIntro } from '@/components/LandingIntroProvider'
import { usePageTransition } from '@/components/PageTransitionProvider'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

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

function StarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

function ArrowUpRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7m0 0H8m9 0v9" />
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

const carouselPhotos = [
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

const allGalleryPhotos = [...highlightedPhotos, ...carouselPhotos]

/* ───────── Data ───────── */

const services = [
  {
    title: 'Reparação de Fugas',
    description: 'Deteção e reparação de fugas de água em canalizações, torneiras, autoclismos e válvulas. Utilizamos equipamento de deteção avançado para minimizar danos.',
    features: ['Deteção não destrutiva', 'Reparação imediata', 'Garantia de serviço'],
    icon: DropletIcon,
    theme: 'default' as const,
  },
  {
    title: 'Instalação de Canalizações',
    description: 'Instalação completa de redes de água quente e fria, esgotos domésticos e pluviais. Projetos para construção nova e remodelação.',
    features: ['Tubo multicamada', 'PPR e PEX certificado', 'Cumprimento de normas'],
    icon: WrenchIcon,
    theme: 'light' as const,
  },
  {
    title: 'Remodelação de Casas de Banho',
    description: 'Remodelação integral de casas de banho, desde a canalização à instalação de louças sanitárias, bases de duche e banheiras.',
    features: ['Projeto personalizado', 'Instalação de louças', 'Acabamentos premium'],
    icon: ShieldIcon,
    theme: 'dark' as const,
  },
  {
    title: 'Sistemas de Aquecimento',
    description: 'Instalação e manutenção de esquentadores, caldeiras, termoacumuladores e sistemas de aquecimento central.',
    features: ['Eficiência energética', 'Manutenção preventiva', 'Todas as marcas'],
    icon: ClockIcon,
    theme: 'default' as const,
  },
  {
    title: 'Manutenção Preventiva',
    description: 'Planos de manutenção regular para evitar avarias e prolongar a vida útil das suas instalações hidráulicas.',
    features: ['Inspeção completa', 'Relatório detalhado', 'Planos personalizados'],
    icon: ShieldIcon,
    theme: 'light' as const,
  },
  {
    title: 'Desentupimentos',
    description: 'Desentupimento profissional de canos, sifões, sanitas e redes de esgoto com equipamento especializado.',
    features: ['Atendimento rápido', 'Câmara de inspeção', 'Hidrojato de pressão'],
    icon: WrenchIcon,
    theme: 'dark' as const,
  },
]

const serviceCardThemes = {
  default: {
    card: 'border-gray-200 bg-white',
    icon: 'bg-brand-50 text-brand-600 ring-brand-100',
    number: 'text-gray-400',
    title: 'text-gray-950',
    description: 'text-gray-500',
    features: 'border-gray-100',
    feature: 'text-gray-700',
    check: 'bg-brand-50 text-brand-600',
  },
  light: {
    card: 'border-brand-300 bg-brand-200',
    icon: 'bg-white/70 text-brand-700 ring-brand-200',
    number: 'text-brand-700/60',
    title: 'text-gray-950',
    description: 'text-brand-950/70',
    features: 'border-brand-300/70',
    feature: 'text-brand-950/80',
    check: 'bg-white/70 text-brand-700',
  },
  dark: {
    card: 'border-[#344b70] bg-[#263a5a]',
    icon: 'bg-white/10 text-brand-100 ring-white/15',
    number: 'text-brand-200',
    title: 'text-white',
    description: 'text-brand-100/80',
    features: 'border-white/15',
    feature: 'text-white/90',
    check: 'bg-white/15 text-white',
  },
} as const

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

const processSteps = [
  {
    title: 'Contacte-nos',
    description: 'Ligue ou envie mensagem a descrever o problema. Respondemos rapidamente.',
  },
  {
    title: 'Diagnóstico',
    description: 'Visitamos o local para avaliar a situação e apresentamos um orçamento detalhado.',
  },
  {
    title: 'Execução',
    description: 'Realizamos o trabalho com profissionalismo, limpeza e no prazo combinado.',
  },
  {
    title: 'Garantia',
    description: 'Todos os trabalhos incluem garantia. A sua satisfação é a nossa prioridade.',
  },
]

/* ───────── Page Component ───────── */

export default function Home() {
  const { shouldPlayLandingIntro, completeLandingIntro } = useLandingIntro()
  const { markDestinationReady } = usePageTransition()
  const [playLandingIntro] = useState(shouldPlayLandingIntro)
  const headerIntroRef = useRef<HTMLElement | null>(null)
  const heroBackdropRef = useRef<HTMLDivElement | null>(null)
  const heroTitleShellRef = useRef<HTMLDivElement | null>(null)
  const heroTitleGlowRef = useRef<HTMLDivElement | null>(null)
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null)
  const heroCtaRef = useRef<HTMLDivElement | null>(null)
  const heroScrollPromptRef = useRef<HTMLDivElement | null>(null)
  const heroTransitionRef = useRef<HTMLDivElement | null>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const heroDarkOverlayRef = useRef<HTMLDivElement | null>(null)
  const ServicesSectionRef = useRef<HTMLElement | null>(null)
  const servicesCopyMotionRef = useRef<HTMLDivElement | null>(null)
  const servicesDeckRef = useRef<HTMLDivElement | null>(null)
  const serviceCardRefs = useRef<Array<HTMLElement | null>>([])
  const galleryTitleRef = useRef<HTMLHeadingElement | null>(null)
  const galleryDescriptionRef = useRef<HTMLParagraphElement | null>(null)
  const highlightedPhotoMotionRefs = useRef<Array<HTMLDivElement | null>>([])
  const aboutCopyRef = useRef<HTMLParagraphElement | null>(null)
  const processSectionRef = useRef<HTMLElement | null>(null)
  const processProgressRef = useRef<HTMLDivElement | null>(null)
  const processTitleRefs = useRef<Array<HTMLDivElement | null>>([])
  const processDescriptionRefs = useRef<Array<HTMLParagraphElement | null>>([])
  const testimonialsStageRef = useRef<HTMLDivElement | null>(null)
  const testimonialProgressRef = useRef<HTMLDivElement | null>(null)
  const activeTestimonialIndexRef = useRef(0)
  const [isInitialLoading, setIsInitialLoading] = useState(playLandingIntro)
  const [activeProcessStep, setActiveProcessStep] = useState(0)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const showPageContent = !isInitialLoading
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

  useEffect(() => {
    if (window.location.hash === '#contacto') {
      window.location.replace('/contactar')
    }
  }, [])

  // Hero slideshow timer
  const [heroSlide, setHeroSlide] = useState(0)

  useLayoutEffect(() => {
    if (!playLandingIntro || isInitialLoading) return

    const header = headerIntroRef.current
    const backdrop = heroBackdropRef.current
    const title = heroTitleRef.current
    const cta = heroCtaRef.current
    const scrollPrompt = heroScrollPromptRef.current

    if (!header || !backdrop || !title || !cta || !scrollPrompt) return

    const slideImages = backdrop.querySelectorAll<HTMLImageElement>('.hero-slide img')
    const secondStage = [header, cta, scrollPrompt]
    const introTargets = [backdrop, title, ...secondStage]
    let titleSplit: SplitText | null = null
    let titleLinesTween: gsap.core.Tween | null = null

    const context = gsap.context(() => {
      gsap.set([backdrop, ...secondStage], { opacity: 0 })
      gsap.set(title, { opacity: 1 })
      gsap.set(slideImages, { animationPlayState: 'paused' })

      const introTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power2.out',
        },
      })

      titleSplit = SplitText.create(title, {
        type: 'lines',
        linesClass: 'hero-title-line will-change-transform',
        mask: 'lines',
        aria: 'auto',
        autoSplit: true,
        onSplit: (self) => {
          titleLinesTween = gsap.fromTo(
            self.lines,
            {
              autoAlpha: 0,
              yPercent: 110,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
            }
          )

          return titleLinesTween
        },
      })

      introTimeline
        .set(slideImages, { animationPlayState: 'running' }, 0)
        .to(backdrop, {
          opacity: 1,
          duration: 1.2,
          ease: 'sine.inOut',
        }, 0)

      if (titleLinesTween) {
        introTimeline.add(titleLinesTween, 0)
      }

      introTimeline
        .to(secondStage, {
          opacity: 1,
          duration: 0.65,
        }, '+=0.25')
        .set(introTargets, { clearProps: 'opacity' })
        .set(titleSplit.lines, { clearProps: 'opacity,visibility,transform' })
        .play(0)
    })

    return () => {
      context.revert()
      titleSplit?.revert()
    }
  }, [isInitialLoading, playLandingIntro])

  useEffect(() => {
    if (!showPageContent) return

    const titleShell = heroTitleShellRef.current
    const glow = heroTitleGlowRef.current
    const supportsCursorInteraction = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches

    if (!titleShell || !glow || !supportsCursorInteraction) return

    const revealDistance = 160
    let glowIsNearby = false

    const titleBounds = titleShell.getBoundingClientRect()
    gsap.set(glow, {
      opacity: 0,
      '--hero-glow-x': `${titleBounds.width / 2}px`,
      '--hero-glow-y': `${titleBounds.height / 2}px`,
    })

    const moveGlowX = gsap.quickTo(glow, '--hero-glow-x', {
      duration: 0.42,
      ease: 'power3.out',
    })
    const moveGlowY = gsap.quickTo(glow, '--hero-glow-y', {
      duration: 0.42,
      ease: 'power3.out',
    })
    const revealGlow = gsap.quickTo(glow, 'opacity', {
      duration: 0.28,
      ease: 'power2.out',
    })

    const hideGlow = () => {
      glowIsNearby = false
      revealGlow(0)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = titleShell.getBoundingClientRect()
      const distanceX = Math.max(
        bounds.left - event.clientX,
        0,
        event.clientX - bounds.right
      )
      const distanceY = Math.max(
        bounds.top - event.clientY,
        0,
        event.clientY - bounds.bottom
      )
      const distance = Math.hypot(distanceX, distanceY)
      const proximity = gsap.utils.clamp(
        0,
        1,
        1 - distance / revealDistance
      )
      const localX = event.clientX - bounds.left
      const localY = event.clientY - bounds.top

      if (proximity === 0) {
        hideGlow()
        return
      }

      if (!glowIsNearby) {
        gsap.set(glow, {
          '--hero-glow-x': `${localX}px`,
          '--hero-glow-y': `${localY}px`,
        })
        glowIsNearby = true
      } else {
        moveGlowX(localX)
        moveGlowY(localY)
      }

      revealGlow(proximity)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', hideGlow)
    document.documentElement.addEventListener('pointerleave', hideGlow)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', hideGlow)
      document.documentElement.removeEventListener('pointerleave', hideGlow)
      gsap.killTweensOf(glow)
    }
  }, [showPageContent])

  useEffect(() => {
    if (playLandingIntro || isInitialLoading) return
    markDestinationReady()
  }, [isInitialLoading, markDestinationReady, playLandingIntro])

  useEffect(() => {
    if (!showPageContent) return

    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % highlightedPhotos.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const transition = heroTransitionRef.current
    const heroSection = heroSectionRef.current
    const overlay = heroDarkOverlayRef.current
    const servicesSection = ServicesSectionRef.current
    if (!transition || !heroSection || !overlay || !servicesSection) return

    gsap.set(overlay, { opacity: 0 })

    const pinTrigger = ScrollTrigger.create({
      trigger: transition,
      start: 'top top',
      end: () => `+=${heroSection.offsetHeight}`,
      pin: heroSection,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    })

    const overlayTween = gsap.to(overlay, {
      opacity: 0.55,
      ease: 'none',
      scrollTrigger: {
        trigger: servicesSection,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    })

    ScrollTrigger.refresh()

    return () => {
      pinTrigger.kill()
      overlayTween.scrollTrigger?.kill()
      overlayTween.kill()
    }
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const galleryTitle = galleryTitleRef.current
    const galleryDescription = galleryDescriptionRef.current
    if (!galleryTitle || !galleryDescription) return

    const galleryCopyTween = gsap.fromTo(
      [galleryTitle, galleryDescription],
      { autoAlpha: 0, y: 35 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: galleryTitle,
          start: 'top 82%',
          once: true,
        },
      }
    )

    ScrollTrigger.refresh()

    return () => {
      galleryCopyTween.scrollTrigger?.kill()
      galleryCopyTween.kill()
      gsap.set([galleryTitle, galleryDescription], {
        clearProps: 'opacity,visibility,transform',
      })
    }
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const phrase = aboutCopyRef.current
    if (!phrase) return

    let split: SplitText | null = null
    let cancelled = false

    const createSplit = () => {
      if (cancelled) return

      split = SplitText.create(phrase, {
        type: 'lines',
        mask: 'lines',
        aria: 'auto',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 100,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: phrase,
              start: 'top 80%',
              once: true,
            },
          }),
      })
    }

    if (document.fonts?.ready) {
      void document.fonts.ready.then(createSplit)
    } else {
      createSplit()
    }

    return () => {
      cancelled = true
      split?.revert()
    }
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const section = processSectionRef.current
    const progress = processProgressRef.current
    const titles = processTitleRefs.current.filter(
      (title): title is HTMLDivElement => title instanceof HTMLDivElement
    )
    const descriptions = processDescriptionRefs.current.filter(
      (description): description is HTMLParagraphElement =>
        description instanceof HTMLParagraphElement
    )
    if (
      !section ||
      !progress ||
      titles.length !== processSteps.length ||
      descriptions.length !== processSteps.length
    ) return

    let cancelled = false
    let media: ReturnType<typeof gsap.matchMedia> | null = null

    const createProcessAnimation = () => {
      if (cancelled) return

      media = gsap.matchMedia()
      media.add(
        {
          isMobile: '(max-width: 767px)',
          isDesktop: '(min-width: 768px)',
        },
        (context) => {
          const isMobile = context.conditions?.isMobile === true
          let lastActiveStep = -1

          const split = SplitText.create(descriptions, {
            type: 'lines',
            linesClass: 'process-description-line will-change-transform',
            mask: 'lines',
            autoSplit: true,
            onSplit: () => {
              const linesByDescription = descriptions.map((description) =>
                Array.from(
                  description.querySelectorAll<HTMLElement>('.process-description-line')
                )
              )
              const allLines = linesByDescription.flat()
              if (allLines.length === 0) return gsap.timeline()

              gsap.set(progress, {
                scaleX: 0,
                transformOrigin: 'left center',
              })
              gsap.set(descriptions, { visibility: 'visible' })
              gsap.set(allLines, { yPercent: 120 })
              gsap.set(linesByDescription[0], { yPercent: 0 })

              if (isMobile) {
                gsap.set(titles, {
                  color: '#030712',
                  scale: 1,
                  visibility: 'visible',
                  yPercent: 120,
                })
                gsap.set(titles[0], { yPercent: 0 })
              } else {
                gsap.set(titles, {
                  color: '#d1d5db',
                  scale: 0.96,
                  visibility: 'visible',
                  yPercent: 0,
                  transformOrigin: 'center center',
                })
                gsap.set(titles[0], {
                  color: '#030712',
                  scale: 1,
                })
              }

              const syncActiveStep = (scrollProgress: number) => {
                const nextStep = Math.min(
                  processSteps.length - 1,
                  Math.floor(scrollProgress * processSteps.length)
                )

                if (nextStep === lastActiveStep) return
                lastActiveStep = nextStep
                setActiveProcessStep(nextStep)
              }

              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: () => {
                    const isNarrowViewport = window.innerWidth < 768
                    const distancePerStep = Math.max(
                      window.innerHeight * (isNarrowViewport ? 0.55 : 0.7),
                      isNarrowViewport ? 320 : 460
                    )

                    return `+=${Math.round(processSteps.length * distancePerStep)}`
                  },
                  pin: section,
                  pinSpacing: true,
                  scrub: 0.65,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => syncActiveStep(self.progress),
                  onRefresh: (self) => syncActiveStep(self.progress),
                },
              })

              timeline.to(
                progress,
                {
                  scaleX: 1,
                  duration: processSteps.length,
                  ease: 'none',
                },
                0
              )

              processSteps.slice(1).forEach((_, stepOffset) => {
                const stepIndex = stepOffset + 1
                const transitionStart = stepIndex
                const previousTitle = titles[stepIndex - 1]
                const nextTitle = titles[stepIndex]
                const previousLines = linesByDescription[stepIndex - 1]
                const nextLines = linesByDescription[stepIndex]

                if (isMobile) {
                  timeline
                    .to(
                      previousTitle,
                      {
                        yPercent: -120,
                        duration: 0.24,
                        ease: 'power2.inOut',
                      },
                      transitionStart
                    )
                    .fromTo(
                      nextTitle,
                      { yPercent: 120 },
                      {
                        yPercent: 0,
                        duration: 0.24,
                        ease: 'power2.inOut',
                      },
                      transitionStart
                    )
                } else {
                  timeline
                    .to(
                      previousTitle,
                      {
                        color: '#d1d5db',
                        scale: 0.96,
                        duration: 0.2,
                        ease: 'power2.out',
                      },
                      transitionStart
                    )
                    .to(
                      nextTitle,
                      {
                        color: '#030712',
                        scale: 1,
                        duration: 0.22,
                        ease: 'power2.out',
                      },
                      transitionStart
                    )
                }

                timeline
                  .to(
                    previousLines,
                    {
                      yPercent: -120,
                      duration: 0.24,
                      stagger: 0.035,
                      ease: 'power2.inOut',
                    },
                    transitionStart
                  )
                  .fromTo(
                    nextLines,
                    { yPercent: 120 },
                    {
                      yPercent: 0,
                      duration: 0.28,
                      stagger: 0.035,
                      ease: 'power2.inOut',
                    },
                    transitionStart + 0.03
                  )
              })

              return timeline
            },
          })

          window.requestAnimationFrame(() => ScrollTrigger.refresh())

          return () => {
            split.revert()
            gsap.set(progress, { clearProps: 'transform,transformOrigin' })
            gsap.set(titles, {
              clearProps: 'color,transform,transformOrigin,visibility',
            })
            gsap.set(descriptions, { clearProps: 'visibility' })
          }
        }
      )
    }

    if (document.fonts?.ready) {
      void document.fonts.ready.then(createProcessAnimation)
    } else {
      createProcessAnimation()
    }

    return () => {
      cancelled = true
      media?.revert()
    }
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const motionLayers = highlightedPhotoMotionRefs.current.filter(
      (layer): layer is HTMLDivElement => layer !== null
    )
    if (motionLayers.length === 0) return

    const motionTweens = motionLayers.map((layer) => gsap.fromTo(
      layer,
      { y: -40 },
      {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: layer.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      }
    ))

    ScrollTrigger.refresh()

    return () => {
      motionTweens.forEach((tween) => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
      gsap.set(motionLayers, { clearProps: 'transform' })
    }
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const servicesCopyMotion = servicesCopyMotionRef.current
    const servicesDeck = servicesDeckRef.current
    if (!servicesCopyMotion || !servicesDeck) return

    const getEntranceOffset = () => window.innerWidth >= 1024
      ? Math.min(window.innerWidth * 0.14, 180)
      : Math.min(window.innerWidth * 0.1, 48)

    const entranceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: servicesCopyMotion,
        start: 'top 100%',
        end: 'top 52%',
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    })

    entranceTimeline
      .fromTo(
        servicesCopyMotion,
        { x: () => -getEntranceOffset() },
        { x: 0, duration: 1, ease: 'none' },
        0
      )
      .fromTo(
        servicesDeck,
        { x: () => getEntranceOffset() },
        { x: 0, duration: 1, ease: 'none' },
        0
      )

    ScrollTrigger.refresh()

    return () => {
      entranceTimeline.scrollTrigger?.kill()
      entranceTimeline.kill()
      gsap.set([servicesCopyMotion, servicesDeck], { clearProps: 'transform' })
    }
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const stage = testimonialsStageRef.current
    const progress = testimonialProgressRef.current
    if (!stage || !progress) return

    const items = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-testimonial-item]')
    )
    const quotes = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-testimonial-quote]')
    )
    const stars = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-testimonial-stars]')
    )
    const authors = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-testimonial-author]')
    )

    if (
      items.length !== testimonials.length ||
      quotes.length !== testimonials.length ||
      stars.length !== testimonials.length ||
      authors.length !== testimonials.length
    ) return

    let cancelled = false
    let split: SplitText | null = null
    let loopTimeline: gsap.core.Timeline | null = null
    let transitionTimeline: gsap.core.Timeline | null = null

    const syncActiveTestimonial = (index: number) => {
      activeTestimonialIndexRef.current = index
      setActiveTestimonialIndex(index)
    }

    const createTestimonialsAnimation = () => {
      if (cancelled) return

      split = SplitText.create(quotes, {
        type: 'lines',
        linesClass: 'testimonial-quote-line will-change-transform',
        mask: 'lines',
        autoSplit: true,
        onSplit: () => {
          loopTimeline?.kill()
          transitionTimeline?.kill()

          const linesByQuote = quotes.map((quote) =>
            Array.from(
              quote.querySelectorAll<HTMLElement>('.testimonial-quote-line')
            )
          )
          const allLines = linesByQuote.flat()
          if (
            allLines.length === 0 ||
            linesByQuote.some((lines) => lines.length === 0)
          ) return gsap.timeline()

          const firstIndex = activeTestimonialIndexRef.current
          gsap.set(items, { visibility: 'hidden' })
          gsap.set([...stars, ...authors], { opacity: 0 })
          gsap.set(allLines, { yPercent: 120 })
          gsap.set(progress, {
            scaleX: 0,
            transformOrigin: 'left center',
          })

          gsap.set(items[firstIndex], { visibility: 'visible' })
          gsap.set([stars[firstIndex], authors[firstIndex]], { opacity: 1 })
          gsap.set(linesByQuote[firstIndex], { yPercent: 0 })
          syncActiveTestimonial(firstIndex)

          const transitionToNextTestimonial = () => {
            const currentIndex = activeTestimonialIndexRef.current
            const nextIndex = (currentIndex + 1) % testimonials.length

            transitionTimeline?.kill()
            transitionTimeline = gsap.timeline()

            transitionTimeline
              .to(
                [stars[currentIndex], authors[currentIndex]],
                {
                  opacity: 0,
                  duration: 0.35,
                  ease: 'power2.inOut',
                }
              )
              .to(
                linesByQuote[currentIndex],
                {
                  yPercent: -120,
                  duration: 0.45,
                  stagger: 0.06,
                  ease: 'power2.in',
                },
                '<'
              )
              .set(items[currentIndex], { visibility: 'hidden' })
              .set(items[nextIndex], { visibility: 'visible' })
              .set(linesByQuote[nextIndex], { yPercent: 120 })
              .set([stars[nextIndex], authors[nextIndex]], { opacity: 0 })
              .call(() => syncActiveTestimonial(nextIndex))
              .to(
                linesByQuote[nextIndex],
                {
                  yPercent: 0,
                  duration: 0.55,
                  stagger: 0.07,
                  ease: 'power3.out',
                }
              )
              .to(
                [stars[nextIndex], authors[nextIndex]],
                {
                  opacity: 1,
                  duration: 0.45,
                  ease: 'power2.out',
                },
                '<0.08'
              )
          }

          const timeline = gsap.timeline({
            repeat: -1,
            onRepeat: transitionToNextTestimonial,
          })
          loopTimeline = timeline

          timeline.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 5.5,
              ease: 'none',
            }
          )

          return timeline
        },
      })
    }

    if (document.fonts?.ready) {
      void document.fonts.ready.then(createTestimonialsAnimation)
    } else {
      createTestimonialsAnimation()
    }

    return () => {
      cancelled = true
      loopTimeline?.kill()
      transitionTimeline?.kill()
      split?.revert()
      gsap.set(items, { clearProps: 'visibility' })
      gsap.set([...stars, ...authors], { clearProps: 'opacity' })
      gsap.set(progress, { clearProps: 'transform,transformOrigin' })
    }
  }, [showPageContent])

  useEffect(() => {
    if (!showPageContent) return

    const servicesSection = ServicesSectionRef.current
    const servicesDeck = servicesDeckRef.current
    const cards = serviceCardRefs.current.filter(
      (card): card is HTMLElement => card instanceof HTMLElement
    )
    if (!servicesSection || !servicesDeck || cards.length !== services.length) return

    const getStackGap = () => window.innerWidth >= 1024 ? 24 : 14
    const getCardEntryGap = () => window.innerWidth >= 1024 ? 26 : 18
    const getQueuedCardGap = () => window.innerWidth >= 1024 ? 56 : 36
    const getSectionInset = () => window.innerWidth >= 640 ? 48 : 32
    const getQueuedCardY = () => cards[0].offsetHeight + getCardEntryGap() + getQueuedCardGap()

    gsap.set(cards, {
      y: (index) => {
        if (index === 0) return 0
        if (index === 1) return cards[0].offsetHeight + getCardEntryGap()
        return getQueuedCardY()
      },
      opacity: (index) => index < 2 ? 1 : 0,
      zIndex: (index) => index + 1,
    })

    const cardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSection,
        start: () => `top top-=${getSectionInset()}`,
        end: () => `+=${Math.round(
          (services.length - 1) * Math.max(window.innerHeight * 0.65, 420)
        )}`,
        pin: servicesSection,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    const baseTravelDistance = Math.max(
      cards[0].offsetHeight + getCardEntryGap() - getStackGap(),
      1
    )

    cards.slice(1).forEach((card, cardIndex) => {
      const index = cardIndex + 1
      const stackY = () => index * getStackGap()
      const initialY = index === 1
        ? cards[0].offsetHeight + getCardEntryGap()
        : getQueuedCardY()
      const travelDistance = Math.max(initialY - stackY(), 1)
      const travelDuration = travelDistance / baseTravelDistance
      const moveStart = cardsTimeline.duration()

      cardsTimeline.to(card, {
        y: stackY,
        duration: travelDuration,
        ease: 'none',
      })

      if (index > 1) {
        cardsTimeline.to(card, {
          opacity: 1,
          duration: Math.min(travelDuration * 0.18, 0.2),
          ease: 'none',
        }, moveStart)
      }
    })

    ScrollTrigger.refresh()

    return () => {
      cardsTimeline.scrollTrigger?.kill()
      cardsTimeline.kill()
      gsap.set(cards, { clearProps: 'opacity,transform,zIndex' })
    }
  }, [showPageContent])

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

  if (isInitialLoading) {
    return (
      <LoadingScreen
        onExitComplete={() => {
          completeLandingIntro()
          setIsInitialLoading(false)
        }}
      />
    )
  }

  return (
    <>
      {/* ── Navbar ── */}
      {showPageContent && (
        <SiteHeader animateOnMount={false} introRef={headerIntroRef} />
      )}

      <SmoothScroll>
      <div ref={heroTransitionRef} className="relative">
      {/* ── Hero Section ── */}
      <section
        ref={heroSectionRef}
        className="relative z-0 flex min-h-[100svh] items-center overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40"
      >
        {showPageContent && (
          <div
            ref={heroBackdropRef}
            className="absolute inset-0 z-0"
            aria-hidden="true"
          >
            {/* Background photo slideshow */}
            <div className="hero-slideshow">
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

            {/* Background decorations (on top of overlay) */}
            <div className="absolute inset-0 z-[2] pointer-events-none">
              <div className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full bg-brand-100/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-brand-50/40 blur-3xl" />
            </div>
          </div>
        )}

        {showPageContent && (
          <div
            ref={heroScrollPromptRef}
            className="absolute bottom-6 left-6 z-20 hidden items-center gap-2 text-white/80 will-change-transform md:left-8 md:flex lg:left-10"
          >
            <MouseIcon className="h-5 w-5 shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
              Scroll to Explore
            </span>
          </div>
        )}

        <div className="container relative z-10 mx-auto w-full px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div
              ref={heroTitleShellRef}
              className="hero-title-shell mb-12 text-balance font-[family-name:var(--font-montserrat)] text-[2.25rem] font-bold leading-[1.1] tracking-[0.04em] text-white/80 sm:text-7xl md:text-8xl lg:text-9xl"
            >
              <div
                ref={heroTitleGlowRef}
                className="hero-title-glow"
                aria-hidden="true"
              >
                <div className="hero-title-glow-copy">
                  J. GONÇALVES CANALIZAÇÕES
                </div>
              </div>

              <h1
                ref={heroTitleRef}
                className="relative z-[1] will-change-transform"
              >
                J. GONÇALVES CANALIZAÇÕES
              </h1>
            </div>

            <div ref={heroCtaRef} className="will-change-transform">
              <TransitionLink href="/contactar" className="hero-cta">
                Pedir Orçamento Grátis
                <ArrowUpRightIcon className="h-5 w-5" />
              </TransitionLink>
            </div>

          </div>
        </div>
        {showPageContent && (
          <div
            ref={heroDarkOverlayRef}
            className="pointer-events-none absolute inset-0 z-[25] bg-black opacity-0"
            aria-hidden="true"
          />
        )}
      </section>

      {showPageContent && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[50svh] bg-gray-50"
          aria-hidden="true"
        />
      )}

      {showPageContent && (
        <section
          id="servicos"
          ref={ServicesSectionRef}
          className="relative z-30 min-h-[calc(100svh+4rem)] overflow-hidden rounded-[2rem] bg-gray-50 sm:min-h-[calc(100svh+6rem)] sm:rounded-[3rem]"
          aria-label="Serviços"
        >
          <div className="absolute inset-x-0 top-12 z-10 mx-auto w-full max-w-7xl translate-y-[7px] px-6 sm:top-14 sm:px-8 lg:top-16 lg:px-10 xl:px-8">
            <p className="text-center text-sm font-medium tracking-[0.18em] text-gray-400 will-change-transform">
              SERVIÇOS
            </p>
          </div>

          <div className="mx-auto grid min-h-[calc(100svh+4rem)] w-full max-w-7xl content-center items-start gap-7 px-6 py-8 sm:min-h-[calc(100svh+6rem)] sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.75fr)] lg:gap-20 lg:px-10 lg:py-16 xl:px-8">
            <div className="max-w-2xl font-[family-name:var(--font-kedebideri)] lg:-translate-x-4">
              <div ref={servicesCopyMotionRef} className="will-change-transform">
                <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.035em] text-gray-950 text-balance sm:text-5xl md:text-6xl lg:text-8xl">
                  O que podemos fazer por si
                </h2>
                <p className="mt-4 max-w-xl text-sm font-normal leading-relaxed text-gray-500 sm:mt-6 sm:text-base lg:mt-7 lg:text-xl">
                  Oferecemos serviços especializados de canalização, pensados para resolver cada necessidade com rigor, rapidez e confiança.
                </p>
              </div>
            </div>

            <div
              ref={servicesDeckRef}
              className="grid w-full max-w-[460px] justify-self-center pb-[70px] will-change-transform sm:pb-[82px] lg:justify-self-end lg:pb-[124px]"
            >
              {services.map((service, index) => {
                const ServiceIcon = service.icon
                const cardTheme = serviceCardThemes[service.theme]

                return (
                  <article
                    key={service.title}
                    ref={(card) => {
                      serviceCardRefs.current[index] = card
                    }}
                    className={`relative w-full rounded-[1.75rem] border-2 p-5 will-change-transform [grid-area:1/1] sm:rounded-[2rem] sm:p-7 lg:p-8 ${cardTheme.card}`}
                  >
                    <div className="mb-5 flex items-start justify-between gap-6 sm:mb-7">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 sm:h-14 sm:w-14 sm:rounded-2xl ${cardTheme.icon}`}>
                        <ServiceIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                      <span className={`text-xs font-semibold tracking-[0.18em] sm:text-sm ${cardTheme.number}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className={`text-xl font-bold leading-tight sm:text-2xl lg:text-3xl ${cardTheme.title}`}>
                      {service.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base ${cardTheme.description}`}>
                      {service.description}
                    </p>

                    <ul className={`mt-5 space-y-2 border-t pt-5 sm:mt-6 sm:space-y-2.5 sm:pt-6 ${cardTheme.features}`}>
                      {service.features.map((feature) => (
                        <li key={feature} className={`flex items-center gap-3 text-sm font-medium sm:text-base ${cardTheme.feature}`}>
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${cardTheme.check}`} aria-hidden="true">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4 4L19 7" />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
      </div>

      {showPageContent && <>

      {/* ── Gallery Section ── */}
      <section id="trabalhos" className="relative overflow-hidden bg-gray-50 pt-8 pb-20 md:pt-10 md:pb-28 lg:pt-12 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="mx-auto mb-16 max-w-8xl text-center">
            <h2 ref={galleryTitleRef} className="font-[family-name:var(--font-kedebideri)] text-4xl font-bold leading-[0.95] tracking-[-0.035em] text-gray-950 text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:whitespace-nowrap">
              Veja alguns dos nossos trabalhos
            </h2>
            <p ref={galleryDescriptionRef} className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-kedebideri)] text-sm font-normal leading-relaxed text-gray-500 sm:mt-6 sm:text-base lg:mt-7 lg:text-xl">
              Cada um reflete o nosso compromisso com a qualidade e atenção ao detalhe.
            </p>
          </div>

          {/* Highlighted photos - 3 WC projects */}
          <div className="mb-20 lg:mb-28">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-brand-500 to-brand-700" />
              <h3 className="text-lg text-gray-500">Remodelações de Casa de Banho</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {highlightedPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-[7/6] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-300 focus:ring-offset-2"
                >
                  <div
                    ref={(element) => {
                      highlightedPhotoMotionRefs.current[i] = element
                    }}
                    className="absolute inset-x-0 -inset-y-3"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.20]"
                    />
                  </div>
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
                </button>
              ))}
            </div>
          </div>

          {/* Carousel - remaining photos */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
              <h3 className="text-lg text-gray-500">Mais Trabalhos</h3>
            </div>
            <GalleryCarousel
              photos={carouselPhotos}
              onPhotoClick={(index) => openLightbox(highlightedPhotos.length + index)}
            />
          </div>
        </div>
      </section>

      {/* ── Statement Marquee ── */}
      <section
        className="statement-marquee bg-gray-50"
        aria-label="Do pequeno reparo à grande remodelação"
      >
        <div className="statement-marquee-track" aria-hidden="true">
          <div className="statement-marquee-group">
            <span>Do pequeno reparo à grande remodelação</span>
            <span className="statement-marquee-separator">/</span>
          </div>
          <div className="statement-marquee-group">
            <span>Do pequeno reparo à grande remodelação</span>
            <span className="statement-marquee-separator">/</span>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && createPortal(
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
        </div>,
        document.body
      )}

      {/* ── About Section ── */}
      <section id="sobre" className="relative overflow-hidden bg-gray-50 pb-28 pt-[8.5rem] sm:pt-32 md:pb-36 md:pt-48 lg:pb-40 lg:pt-56">
        <div className="absolute inset-x-0 top-20 mx-auto w-full px-6 sm:px-8 md:top-28 lg:top-32">
          <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-[0.18em] text-gray-400 will-change-transform">
            <span>EST.</span>
            <TapIcon className="h-8 w-8 shrink-0" />
            <span>1978</span>
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-20 xl:px-40">
          <div className="grid items-center gap-24 md:grid-cols-2 md:gap-50 lg:gap-60 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div className="flex justify-center md:justify-start">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
                <Image
                  src="/img/canalizador.webp"
                  alt="Júlio Gonçalves, canalizador profissional"
                  fill
                  sizes="(min-width: 768px) 384px, calc(100vw - 3rem)"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/75 to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute bottom-6 left-6 font-[family-name:var(--font-carattere)] text-3xl leading-none text-white md:text-4xl">
                  Júlio Gonçalves
                </p>
              </div>
            </div>

            <p
              ref={aboutCopyRef}
              className="max-w-2xl text-2xl font-semibold leading-[1.3] [word-spacing:-0.02em] text-gray-900 md:justify-self-end md:text-3xl lg:text-[2.125rem]"
            >
              Com mais de quatro décadas de experiência ao seu serviço, a Júlio Gonçalves
              Canalizações nasceu da paixão por resolver problemas e da dedicação em oferecer um
              serviço de excelência. Garantimos soluções duradouras e a confiança de quem nos procura.
            </p>
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section
        ref={processSectionRef}
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-gray-50 py-20 md:py-24"
        aria-labelledby="process-active-title"
      >
        <h2 id="process-active-title" className="sr-only">
          {processSteps[activeProcessStep].title}
        </h2>

        <div className="absolute inset-x-0 top-6 mx-auto w-full px-6 sm:top-8 sm:px-8 lg:px-12 2xl:px-20">
          <p className="text-center text-sm font-medium tracking-[0.18em] text-gray-400 will-change-transform">
            A NOSSA FORMA DE TRABALHAR
          </p>
        </div>

        <div className="mx-auto w-full px-6 font-[family-name:var(--font-kedebideri)] md:px-8 lg:px-12 2xl:px-20">
          <div className="grid grid-cols-1 overflow-hidden py-2 md:grid-cols-4 md:gap-5 md:overflow-visible">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                ref={(element) => {
                  processTitleRefs.current[index] = element
                }}
                className={`col-start-1 row-start-1 text-center will-change-transform md:col-auto md:row-auto ${
                  index === 0
                    ? 'text-gray-950'
                    : 'invisible text-gray-300 md:visible'
                }`}
                data-process-step={index}
                aria-hidden="true"
              >
                <span
                  className={`mb-3 block text-xl font-bold tracking-[0.18em] text-brand-600 md:mb-4 md:text-2xl ${
                    activeProcessStep === index ? 'visible' : 'invisible'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[clamp(3.5rem,14vw,5.25rem)] font-bold leading-[0.9] tracking-[-0.055em] md:text-[clamp(2.25rem,3.6vw,4.25rem)]">
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          <div
            className="relative mt-10 h-[3px] w-full bg-gray-400 md:mt-14"
            role="progressbar"
            aria-label="Progresso das etapas"
            aria-valuemin={1}
            aria-valuemax={processSteps.length}
            aria-valuenow={activeProcessStep + 1}
          >
            <div
              ref={processProgressRef}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-brand-600"
            />
          </div>

          <div
            className="mx-auto mt-12 grid max-w-3xl text-center md:mt-16"
            aria-hidden="true"
          >
            {processSteps.map((step, index) => (
              <p
                key={step.title}
                ref={(element) => {
                  processDescriptionRefs.current[index] = element
                }}
                className={`col-start-1 row-start-1 text-[1.375rem] font-medium leading-relaxed text-gray-700 md:text-[1.75rem] md:leading-relaxed ${
                  index === 0 ? '' : 'invisible'
                }`}
              >
                {step.description}
              </p>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {processSteps[activeProcessStep].description}
          </p>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section id="testemunhos" className="relative min-h-[100svh] bg-gray-50">
        <div className="absolute inset-x-0 top-6 mx-auto w-full max-w-7xl px-6 sm:top-8 sm:px-8 lg:px-10 xl:px-8">
          <p className="text-center text-sm font-medium tracking-[0.18em] text-gray-400">
            TESTEMUNHOS
          </p>
        </div>

        <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl content-center items-start gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.75fr)] lg:gap-20 lg:px-10 lg:py-24 xl:px-8">
          <div className="max-w-2xl font-[family-name:var(--font-kedebideri)] lg:-translate-x-4">
            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.035em] text-gray-950 text-balance sm:text-5xl md:text-6xl lg:text-8xl">
              O que dizem os nossos clientes
            </h2>
            <p className="mt-4 max-w-xl text-sm font-normal leading-relaxed text-gray-500 sm:mt-6 sm:text-base lg:mt-7 lg:text-xl">
              A confiança dos nossos clientes é o nosso maior orgulho.
            </p>
          </div>

          <div className="w-full max-w-[460px] justify-self-center lg:justify-self-end">
            <div ref={testimonialsStageRef} className="grid" aria-hidden="true">
              {testimonials.map((testimonial, testimonialIndex) => (
                <article
                  key={testimonial.name}
                  data-testimonial-item
                  className={`grid h-full grid-rows-[auto_1fr_auto] [grid-area:1/1] ${
                    testimonialIndex === 0 ? '' : 'invisible'
                  }`}
                >
                  <div
                    data-testimonial-stars
                    className="mb-7 flex items-center gap-1 sm:mb-9"
                  >
                    {Array.from({ length: testimonial.rating }, (_, starIndex) => (
                      <StarIcon
                        key={starIndex}
                        className="h-6 w-6 text-amber-400 sm:h-7 sm:w-7"
                      />
                    ))}
                  </div>

                  <blockquote
                    data-testimonial-quote
                    className="text-xl font-medium italic leading-relaxed text-gray-700 sm:text-2xl sm:leading-relaxed"
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>

                  <div
                    data-testimonial-author
                    className="mt-8 flex items-center gap-4 border-t border-gray-200 pt-7 sm:mt-10 sm:pt-8"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white sm:h-16 sm:w-16 sm:text-2xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-base font-bold text-gray-950 sm:text-lg">
                        {testimonial.name}
                      </div>
                      <div className="mt-0.5 text-sm text-gray-500 sm:text-base">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div
              className="relative mt-8 h-[2px] w-full overflow-hidden bg-gray-200 sm:mt-10"
              aria-hidden="true"
            >
              <div
                ref={testimonialProgressRef}
                className="absolute inset-0 origin-left scale-x-0 bg-gray-950 will-change-transform"
              />
            </div>

            <p className="sr-only" aria-live="polite">
              {testimonials[activeTestimonialIndex].text} —{' '}
              {testimonials[activeTestimonialIndex].name},{' '}
              {testimonials[activeTestimonialIndex].location}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gray-50 py-16 md:py-20">
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
                <TransitionLink
                  href="/contactar"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  Pedir Orçamento
                  <ArrowRightIcon className="w-4 h-4" />
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />
      </>}
      </SmoothScroll>
    </>
  )
}
