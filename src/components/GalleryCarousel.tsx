'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures'
import gsap from 'gsap'

type GalleryPhoto = {
  src: string
  alt: string
}

type GalleryCarouselProps = {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
}

function ExpandIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  )
}

export default function GalleryCarousel({ photos, onPhotoClick }: GalleryCarouselProps) {
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null)
  const draggedRef = useRef(false)
  const dragResetTimeoutRef = useRef<number | null>(null)
  const plugins = useMemo(
    () => [WheelGesturesPlugin({ forceWheelAxis: 'y' })],
    []
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      loop: true,
      slidesToScroll: 1,
    },
    plugins
  )

  useEffect(() => {
    if (!emblaApi) return

    let animationFrame = 0

    const updateCards = () => {
      const viewportRect = emblaApi.rootNode().getBoundingClientRect()
      const viewportCenter = viewportRect.left + viewportRect.width / 2

      emblaApi.slideNodes().forEach((slide) => {
        const photo = slide.querySelector<HTMLElement>('[data-gallery-photo]')
        if (!photo) return

        const slideRect = slide.getBoundingClientRect()
        const slideCenter = slideRect.left + slideRect.width / 2
        const distance = Math.abs(slideCenter - viewportCenter) / Math.max(slideRect.width, 1)
        const clampedDistance = Math.min(distance, 2.5)

        gsap.set(photo, {
          scale: Math.max(0.65, 1 - clampedDistance * 0.14),
          opacity: Math.max(0.15, 1 - clampedDistance * 0.34),
          zIndex: Math.max(1, 10 - Math.round(clampedDistance * 3)),
        })
      })
    }

    const queueCardUpdate = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateCards)
    }

    emblaApi.on('scroll', queueCardUpdate)
    emblaApi.on('select', queueCardUpdate)
    emblaApi.on('reInit', queueCardUpdate)
    queueCardUpdate()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      emblaApi.off('scroll', queueCardUpdate)
      emblaApi.off('select', queueCardUpdate)
      emblaApi.off('reInit', queueCardUpdate)

      emblaApi.slideNodes().forEach((slide) => {
        const photo = slide.querySelector<HTMLElement>('[data-gallery-photo]')
        if (photo) gsap.set(photo, { clearProps: 'transform,opacity,zIndex' })
      })
    }
  }, [emblaApi])

  useEffect(() => () => {
    if (dragResetTimeoutRef.current !== null) {
      window.clearTimeout(dragResetTimeoutRef.current)
    }
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragResetTimeoutRef.current !== null) {
      window.clearTimeout(dragResetTimeoutRef.current)
      dragResetTimeoutRef.current = null
    }

    pointerStartRef.current = { x: event.clientX, y: event.clientY }
    draggedRef.current = false
  }, [])

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const pointerStart = pointerStartRef.current
    if (!pointerStart) return

    const distance = Math.hypot(
      event.clientX - pointerStart.x,
      event.clientY - pointerStart.y
    )

    if (distance > 8) draggedRef.current = true
  }, [])

  const handlePointerEnd = useCallback(() => {
    pointerStartRef.current = null
    dragResetTimeoutRef.current = window.setTimeout(() => {
      draggedRef.current = false
      dragResetTimeoutRef.current = null
    }, 0)
  }, [])

  const handlePhotoClick = useCallback((index: number) => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }

    onPhotoClick(index)
  }, [onPhotoClick])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      emblaApi.scrollPrev()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  return (
    <div
      className="relative -mx-6 overflow-hidden px-6 lg:-mx-8 lg:px-8"
      role="region"
      aria-label="Carrossel de trabalhos realizados"
    >
      <div
        ref={emblaRef}
        className="cursor-grab overflow-hidden select-none active:cursor-grabbing [touch-action:pan-y_pinch-zoom]"
        onPointerDownCapture={handlePointerDown}
        onPointerMoveCapture={handlePointerMove}
        onPointerUpCapture={handlePointerEnd}
        onPointerCancelCapture={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        <div className="flex">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className="min-w-0 flex-[0_0_76%] px-1.5 sm:flex-[0_0_56%] sm:px-2 md:flex-[0_0_38%] lg:flex-[0_0_20%] lg:px-2.5"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${photos.length}`}
            >
              <button
                type="button"
                onClick={() => handlePhotoClick(index)}
                className="group relative z-[1] block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-xl bg-gray-200 will-change-[transform,opacity] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300 focus-visible:ring-offset-2"
                aria-label={`Abrir fotografia: ${photo.alt}`}
                data-gallery-photo
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 639px) 76vw, (max-width: 767px) 56vw, (max-width: 1023px) 38vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 justify-end p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm">
                    <ExpandIcon />
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
