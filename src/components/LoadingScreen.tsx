'use client'

import type { AnimationEvent } from 'react'

import BrandLogo from './BrandLogo'

type LoadingScreenProps = {
  onExitComplete?: () => void
}

export default function LoadingScreen({ onExitComplete }: LoadingScreenProps) {
  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.animationName !== 'loadingScreenExit') return
    onExitComplete?.()
  }

  return (
    <div
      className="loading-screen"
      role="status"
      aria-label="A carregar website"
      onAnimationEnd={handleAnimationEnd}
    >
      <BrandLogo variant="loading" />
      <span className="sr-only">A carregar website</span>
    </div>
  )
}
