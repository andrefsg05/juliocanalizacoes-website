'use client'

import BrandLogo from './BrandLogo'

export const LOADING_DURATION_MS = 3700

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="A carregar website">
      <BrandLogo variant="loading" />
      <span className="sr-only">A carregar website</span>
    </div>
  )
}
