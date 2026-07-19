'use client'

import { forwardRef, type ComponentProps, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePageTransition } from '@/components/PageTransitionProvider'

type TransitionLinkProps = ComponentProps<typeof Link>

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, target, ...props }, ref) => {
    const { navigate } = usePageTransition()

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)

      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (target && target !== '_self') return
      if (typeof href !== 'string') return

      event.preventDefault()
      navigate(href)
    }

    return (
      <Link
        ref={ref}
        href={href}
        target={target}
        onClick={handleClick}
        {...props}
      />
    )
  }
)

TransitionLink.displayName = 'TransitionLink'

export default TransitionLink
