'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'

type LandingIntroContextValue = {
  shouldPlayLandingIntro: boolean
  completeLandingIntro: () => void
}

const LandingIntroContext = createContext<LandingIntroContextValue | null>(null)

export function useLandingIntro() {
  const context = useContext(LandingIntroContext)

  if (!context) {
    throw new Error('useLandingIntro must be used inside LandingIntroProvider')
  }

  return context
}

export default function LandingIntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [initialPath] = useState(pathname)
  const [landingIntroCompleted, setLandingIntroCompleted] = useState(
    pathname !== '/'
  )

  const completeLandingIntro = useCallback(() => {
    setLandingIntroCompleted(true)
  }, [])

  const shouldPlayLandingIntro =
    initialPath === '/' && !landingIntroCompleted

  return (
    <LandingIntroContext.Provider
      value={{ shouldPlayLandingIntro, completeLandingIntro }}
    >
      {children}
    </LandingIntroContext.Provider>
  )
}
