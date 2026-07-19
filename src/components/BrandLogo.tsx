import TapIcon from './TapIcon'

type BrandLogoProps = {
  variant?: 'header' | 'desktop' | 'loading' | 'short'
  className?: string
  textClassName?: string
}

export default function BrandLogo({
  variant = 'header',
  className = '',
  textClassName = '',
}: BrandLogoProps) {
  if (variant === 'loading') {
    return (
      <div className={`loading-brand ${className}`.trim()} aria-hidden="true">
        <div className="loading-tap">
          <TapIcon className="loading-tap-icon loading-tap-icon-base" />
          <div className="loading-tap-fill">
            <TapIcon className="loading-tap-icon loading-tap-icon-water" />
          </div>
        </div>
        <div className={`loading-brand-text ${textClassName}`.trim()}>
          <span className="loading-brand-name">Júlio Gonçalves</span>
          <span className="loading-brand-service">Canalizações</span>
        </div>
      </div>
    )
  }

  if (variant === 'short') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`.trim()}>
        <div className="relative h-7 w-7 shrink-0 text-brand-300">
          <TapIcon className="h-full w-full" />
        </div>
        <div className={`flex min-w-0 flex-col justify-center ${textClassName}`.trim()}>
          <span className="block text-[13px] font-bold leading-none text-white">
            Júlio Gonçalves
          </span>
          <span className="mt-0.5 block text-[7px] font-semibold uppercase leading-none tracking-[0.16em] text-brand-300">
            Canalizações
          </span>
        </div>
      </div>
    )
  }

  if (variant === 'desktop') {
    return (
      <div className={`brand-logo-desktop ${className}`.trim()}>
        <div className="brand-logo-desktop-tap">
          <TapIcon className="h-full w-full" />
        </div>

        <div className={`brand-logo-desktop-copy ${textClassName}`.trim()}>
          <div className="brand-logo-desktop-full-text" aria-hidden="true">
            <span className="block text-lg font-bold leading-none text-gray-950">
              Júlio Gonçalves
            </span>
            <span className="mt-1 block text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-brand-600">
              Canalizações
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <div className="relative h-11 w-11 shrink-0 text-brand-600 lg:h-12 lg:w-12">
        <TapIcon className="h-full w-full" />
      </div>
      <div className={`flex min-w-0 flex-col justify-center ${textClassName}`.trim()}>
        <span className="block text-base font-bold leading-none text-gray-950 sm:text-lg">
          Júlio Gonçalves
        </span>
        <span className="mt-1 block text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-brand-600 sm:text-[11px]">
          Canalizações
        </span>
      </div>
    </div>
  )
}
