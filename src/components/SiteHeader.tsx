'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Ref } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import BrandLogo from '@/components/BrandLogo'
import TransitionLink from '@/components/TransitionLink'

const HEADER_COMPACT_TRANSITION_DURATION = 0.5

function ContactArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 2H5.50003L4.00003 3.5L6.83581 6.33579L0.585815 12.5858L3.41424 15.4142L9.66424 9.16421L12.5 12L14 10.5L14 2Z" fill="currentColor" />
    </svg>
  )
}

type SiteHeaderProps = {
  animateOnMount?: boolean
  introRef?: Ref<HTMLElement>
}

export default function SiteHeader({
  animateOnMount = true,
  introRef,
}: SiteHeaderProps) {
  const pathname = usePathname()
  const desktopLogoLinkRef = useRef<HTMLAnchorElement | null>(null)
  const desktopLogoTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const desktopContactButtonRef = useRef<HTMLAnchorElement | null>(null)
  const desktopContactTextRef = useRef<HTMLSpanElement | null>(null)
  const desktopContactBadgeRef = useRef<HTMLSpanElement | null>(null)
  const desktopContactBadgeOverlayRef = useRef<HTMLSpanElement | null>(null)
  const desktopContactTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [desktopLogoHovered, setDesktopLogoHovered] = useState(false)
  const [desktopContactHovered, setDesktopContactHovered] = useState(false)
  const isHomePage = pathname === '/'

  useEffect(() => {
    const updateHeaderState = () => {
      setHasScrolled(window.scrollY > 50)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  useLayoutEffect(() => {
    const logoLink = desktopLogoLinkRef.current
    const copy = logoLink?.querySelector<HTMLElement>('.brand-logo-desktop-copy')
    const text = logoLink?.querySelector<HTMLElement>('.brand-logo-desktop-full-text')

    if (!copy || !text) return

    const fullCopyWidth = copy.getBoundingClientRect().width

    gsap.set(copy, {
      width: fullCopyWidth,
    })
    gsap.set(text, {
      clipPath: 'inset(0 0 0 0)',
    })

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: HEADER_COMPACT_TRANSITION_DURATION,
        ease: 'power3.inOut',
      },
    })

    timeline
      .to(copy, {
        width: 0,
      }, 0)
      .to(text, {
        clipPath: 'inset(0 100% 0 0)',
      }, 0)

    desktopLogoTimelineRef.current = timeline
    timeline.progress(1)

    return () => {
      timeline.kill()
      desktopLogoTimelineRef.current = null
      gsap.set(copy, { clearProps: 'width' })
      gsap.set(text, { clearProps: 'clipPath' })
    }
  }, [])

  useEffect(() => {
    const timeline = desktopLogoTimelineRef.current
    if (!timeline) return

    if (desktopLogoHovered) {
      timeline.reverse()
    } else {
      timeline.play()
    }
  }, [desktopLogoHovered])

  useLayoutEffect(() => {
    const button = desktopContactButtonRef.current
    const text = desktopContactTextRef.current
    const badge = desktopContactBadgeRef.current
    const badgeOverlay = desktopContactBadgeOverlayRef.current

    if (!button || !text || !badge || !badgeOverlay) return

    const buttonStyles = window.getComputedStyle(button)
    const fullWidth = button.getBoundingClientRect().width
    const fullHeight = button.getBoundingClientRect().height
    const badgeWidth = badge.getBoundingClientRect().width
    const fullRightPadding = Number.parseFloat(buttonStyles.paddingRight)
    const gap = Number.parseFloat(buttonStyles.columnGap)
    const compactInset = (fullHeight - badgeWidth) / 2

    gsap.set(button, {
      width: fullWidth,
      height: fullHeight,
    })
    gsap.set(text, {
      position: 'absolute',
      right: fullRightPadding + badgeWidth + gap,
      top: '50%',
      yPercent: -50,
      clipPath: 'inset(0 0 0 0)',
    })
    gsap.set(badge, {
      position: 'absolute',
      right: fullRightPadding,
      top: '50%',
      yPercent: -50,
    })
    gsap.set(badgeOverlay, {
      clipPath: 'inset(0 100% 0 0)',
    })

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: HEADER_COMPACT_TRANSITION_DURATION,
        ease: 'power3.inOut',
      },
    })

    timeline
      .to(button, {
        width: fullHeight,
        paddingLeft: compactInset,
        paddingRight: compactInset,
      }, 0)
      .to(text, {
        clipPath: 'inset(0 0 0 100%)',
      }, 0)
      .to(badge, {
        right: compactInset,
      }, 0)
      .to(badgeOverlay, {
        clipPath: 'inset(0 0% 0 0)',
      }, 0)

    desktopContactTimelineRef.current = timeline
    timeline.progress(window.scrollY > 50 ? 1 : 0)

    return () => {
      timeline.kill()
      desktopContactTimelineRef.current = null
      gsap.set(button, { clearProps: 'width,height,paddingLeft,paddingRight' })
      gsap.set(text, { clearProps: 'position,right,top,yPercent,clipPath' })
      gsap.set(badge, { clearProps: 'position,right,top,yPercent' })
      gsap.set(badgeOverlay, { clearProps: 'clipPath' })
    }
  }, [])

  useEffect(() => {
    const timeline = desktopContactTimelineRef.current
    if (!timeline) return

    if (hasScrolled && !desktopContactHovered) {
      timeline.play()
    } else {
      timeline.reverse()
    }
  }, [hasScrolled, desktopContactHovered])

  const mobileLogo = (
    <BrandLogo className="gap-2.5" />
  )
  const desktopLogo = (
    <BrandLogo variant="desktop" />
  )

  return (
    <header
      ref={introRef}
      className={`${animateOnMount ? 'header-enter ' : ''}absolute inset-x-0 top-0 z-50 border-b border-transparent bg-transparent shadow-none md:fixed`}
    >
      <nav className="mx-auto w-full px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:hidden lg:h-20">
          {isHomePage ? (
            <a href="#" className="flex min-w-0 items-center">
              {mobileLogo}
            </a>
          ) : (
            <TransitionLink
              href="/"
              aria-label="Júlio Gonçalves Canalizações - início"
              className="flex min-w-0 items-center"
            >
              {mobileLogo}
            </TransitionLink>
          )}

          <TransitionLink
            href="/contactar"
            className="inline-flex items-center justify-center gap-3 rounded-md bg-brand-600 py-[5px] pl-3 pr-1.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-500"
          >
            Contactar
            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-md bg-white">
              <ContactArrowIcon className="h-[18px] w-[18px] text-brand-600" />
            </span>
          </TransitionLink>
        </div>

        <div className="hidden h-20 items-center justify-between md:flex">
          {isHomePage ? (
            <a
              ref={desktopLogoLinkRef}
              href="#"
              aria-label="Júlio Gonçalves Canalizações - início"
              onPointerEnter={() => setDesktopLogoHovered(true)}
              onPointerLeave={() => setDesktopLogoHovered(false)}
              className="flex min-w-0 items-center"
            >
              {desktopLogo}
            </a>
          ) : (
            <TransitionLink
              ref={desktopLogoLinkRef}
              href="/"
              aria-label="Júlio Gonçalves Canalizações - início"
              onPointerEnter={() => setDesktopLogoHovered(true)}
              onPointerLeave={() => setDesktopLogoHovered(false)}
              className="flex min-w-0 items-center"
            >
              {desktopLogo}
            </TransitionLink>
          )}

          <TransitionLink
            ref={desktopContactButtonRef}
            href="/contactar"
            onPointerEnter={() => setDesktopContactHovered(true)}
            onPointerLeave={() => setDesktopContactHovered(false)}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-md bg-brand-600 py-[5px] pl-3 pr-1.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-brand-500"
          >
            <span ref={desktopContactTextRef} className="shrink-0 whitespace-nowrap">
              Contactar
            </span>
            <span
              ref={desktopContactBadgeRef}
              className="relative grid h-[38px] w-[38px] shrink-0 place-items-center overflow-hidden rounded-md bg-white"
            >
              <ContactArrowIcon className="h-[18px] w-[18px] text-brand-600 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500" />
              <span
                ref={desktopContactBadgeOverlayRef}
                className="absolute inset-0.5 grid place-items-center rounded-[4px] bg-brand-600 transition-colors duration-300 [clip-path:inset(0_100%_0_0)] group-hover:bg-brand-500"
              >
                <ContactArrowIcon className="h-[18px] w-[18px] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>
          </TransitionLink>
        </div>
      </nav>
    </header>
  )
}
