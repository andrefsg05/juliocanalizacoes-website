'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import TapIcon from '@/components/TapIcon'

type PageTransitionContextValue = {
  navigate: (href: string) => void
  markDestinationReady: () => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function usePageTransition() {
  const context = useContext(PageTransitionContext)

  if (!context) {
    throw new Error('usePageTransition must be used inside PageTransitionProvider')
  }

  return context
}

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const tapRevealRef = useRef<HTMLDivElement | null>(null)
  const targetPathRef = useRef<string | null>(null)
  const previousBodyOverflowRef = useRef('')
  const transitionActiveRef = useRef(false)
  const routeReadyRef = useRef(false)
  const destinationReadyRef = useRef(false)
  const tapPaintedRef = useRef(false)
  const exitStartedRef = useRef(false)
  const exitFrameRef = useRef<number | null>(null)
  const tapHoldTimeoutRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    if (!overlayRef.current || !tapRevealRef.current) return
    gsap.set(overlayRef.current, { yPercent: 100, autoAlpha: 0 })
    gsap.set(tapRevealRef.current, { clipPath: 'inset(100% 0% 0% 0%)' })
  }, [])

  const restoreBodyScroll = useCallback(() => {
    document.body.style.overflow = previousBodyOverflowRef.current
  }, [])

  const revealDestination = useCallback(() => {
    if (
      !routeReadyRef.current ||
      !destinationReadyRef.current ||
      !tapPaintedRef.current ||
      exitStartedRef.current
    ) return

    const overlay = overlayRef.current
    const tapReveal = tapRevealRef.current
    if (!overlay || !tapReveal) return

    exitStartedRef.current = true
    exitFrameRef.current = window.requestAnimationFrame(() => {
      exitFrameRef.current = window.requestAnimationFrame(() => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.72,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.set(overlay, { yPercent: 100, autoAlpha: 0 })
            gsap.set(tapReveal, { clipPath: 'inset(100% 0% 0% 0%)' })

            restoreBodyScroll()
            targetPathRef.current = null
            transitionActiveRef.current = false
            routeReadyRef.current = false
            destinationReadyRef.current = false
            tapPaintedRef.current = false
            exitStartedRef.current = false
            exitFrameRef.current = null
          },
        })
      })
    })
  }, [restoreBodyScroll])

  const markDestinationReady = useCallback(() => {
    if (!transitionActiveRef.current) return

    destinationReadyRef.current = true
    revealDestination()
  }, [revealDestination])

  const navigate = useCallback(
    (href: string) => {
      if (transitionActiveRef.current) return

      const destination = new URL(href, window.location.href)

      if (destination.origin !== window.location.origin) {
        window.location.assign(destination.href)
        return
      }

      if (destination.pathname === pathname) {
        router.push(href)
        return
      }

      const overlay = overlayRef.current
      const tapReveal = tapRevealRef.current
      if (!overlay || !tapReveal) {
        router.push(href)
        return
      }

      transitionActiveRef.current = true
      targetPathRef.current = destination.pathname
      routeReadyRef.current = false
      destinationReadyRef.current = false
      tapPaintedRef.current = false
      exitStartedRef.current = false
      previousBodyOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      router.prefetch(href)

      gsap.killTweensOf([overlay, tapReveal])
      gsap.set(overlay, { yPercent: 100, autoAlpha: 1 })
      gsap.set(tapReveal, { clipPath: 'inset(100% 0% 0% 0%)' })

      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.72,
        ease: 'power4.inOut',
        onComplete: () => {
          router.push(href, { scroll: true })

          gsap.to(tapReveal, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.62,
            ease: 'power2.inOut',
            onComplete: () => {
              tapHoldTimeoutRef.current = window.setTimeout(() => {
                tapHoldTimeoutRef.current = null
                tapPaintedRef.current = true
                revealDestination()
              }, 120)
            },
          })
        },
      })
    },
    [pathname, revealDestination, router]
  )

  useEffect(() => {
    if (!targetPathRef.current || pathname !== targetPathRef.current) return

    routeReadyRef.current = true
    revealDestination()
  }, [pathname, revealDestination])

  useEffect(() => {
    const overlay = overlayRef.current
    const tapReveal = tapRevealRef.current

    return () => {
      if (overlay) gsap.killTweensOf(overlay)
      if (tapReveal) gsap.killTweensOf(tapReveal)
      if (exitFrameRef.current !== null) {
        window.cancelAnimationFrame(exitFrameRef.current)
      }
      if (tapHoldTimeoutRef.current !== null) {
        window.clearTimeout(tapHoldTimeoutRef.current)
      }
      restoreBodyScroll()
    }
  }, [restoreBodyScroll])

  return (
    <PageTransitionContext.Provider value={{ navigate, markDestinationReady }}>
      {children}
      <div
        ref={overlayRef}
        className="page-transition-layer pointer-events-none fixed inset-0 z-[1000] grid place-items-center bg-brand-600"
        aria-hidden="true"
      >
        <div
          ref={tapRevealRef}
          className="h-24 w-24 text-white sm:h-28 sm:w-28"
        >
          <TapIcon className="h-full w-full" />
        </div>
      </div>
    </PageTransitionContext.Provider>
  )
}
