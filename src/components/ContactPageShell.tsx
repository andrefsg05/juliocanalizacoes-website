'use client'

import { useEffect } from 'react'
import ContactSection from '@/components/ContactSection'
import { usePageTransition } from '@/components/PageTransitionProvider'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import SmoothScroll from '@/components/SmoothScroll'

export default function ContactPageShell() {
  const { markDestinationReady } = usePageTransition()

  useEffect(() => {
    markDestinationReady()
  }, [markDestinationReady])

  return (
    <div className="relative min-h-screen bg-gray-50">
      <SiteHeader />

      <SmoothScroll>
        <ContactSection />
        <SiteFooter />
      </SmoothScroll>
    </div>
  )
}
