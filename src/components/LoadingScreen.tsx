'use client'

import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'

const LOADING_DURATION_MS = 3700

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(false)
    }, LOADING_DURATION_MS)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="loading-screen" role="status" aria-label="A carregar website">
      <BrandLogo variant="loading" />
      <span className="sr-only">A carregar website</span>
    </div>
  )
}
