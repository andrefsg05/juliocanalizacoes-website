'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    ScrollSmoother.get()?.kill()

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.0,
      smoothTouch: false,
      effects: false,
      normalizeScroll: false,
    })

    const getHeaderOffset = () => {
      const header = document.querySelector('header')
      return header instanceof HTMLElement ? header.getBoundingClientRect().height + 12 : 0
    }

    const scrollToHash = (hash: string, smooth = true) => {
      if (hash === '#') {
        smoother.scrollTo(0, smooth)
        return
      }

      const target = document.querySelector(hash)
      if (!(target instanceof HTMLElement)) return

      const top = Math.max(0, smoother.offset(target, 'top top') - getHeaderOffset())
      smoother.scrollTo(top, smooth)
    }

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const hash = anchor.getAttribute('href')
      if (!hash) return

      event.preventDefault()
      scrollToHash(hash, true)

      if (hash === '#') {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
        return
      }

      window.history.pushState(null, '', hash)
    }

    const handleHashNavigation = () => {
      if (!window.location.hash) return
      scrollToHash(window.location.hash, false)
    }

    document.addEventListener('click', handleAnchorClick)
    window.addEventListener('hashchange', handleHashNavigation)
    window.requestAnimationFrame(handleHashNavigation)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('hashchange', handleHashNavigation)
      smoother.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <main id="smooth-content" className="min-h-screen bg-white overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
