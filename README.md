# Júlio Gonçalves Canalizações — Business Website

A production-ready institutional website built for a Portuguese plumbing business — deployed on Vercel.

---

## Highlights

- **GSAP-driven animations** — cinematic hero intro with SplitText line reveals, scroll-triggered entrance animations across all sections, and a custom cursor glow effect that tracks the pointer near the hero title
- **Animated page transitions** — full-screen overlay transition between pages with a custom SVG tap icon reveal, coordinated with Next.js App Router navigation
- **Interactive photo gallery** — Embla Carousel with wheel gesture support, GSAP-powered scale/opacity depth effect on scroll, and a fullscreen lightbox with keyboard navigation
- **Quote request form** — async form with server-side validation, HTML-escaped email delivery via Nodemailer (SMTP), honeypot field, IP-based rate limiting, and content-type enforcement
- **Production hardening** — security headers (`X-Frame-Options`, `HSTS`, `Permissions-Policy`, etc.), `poweredByHeader: false`, `reactStrictMode`, and SEO metadata with OpenGraph and canonical URLs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP (SplitText, ScrollTrigger) |
| Carousel | Embla Carousel + Wheel Gestures |
| Email | Nodemailer (SMTP / Ethereal fallback in dev) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main landing page (hero, services, gallery, testimonials, process)
│   ├── contactar/            # Dedicated contact & quote request page
│   ├── api/orcamento/        # POST route — form handling, validation, email dispatch
│   ├── layout.tsx            # Root layout with metadata, fonts, providers
│   └── globals.css           # Global styles and design tokens
└── components/
    ├── PageTransitionProvider.tsx   # GSAP page transition system
    ├── LandingIntroProvider.tsx     # One-shot landing intro state
    ├── GalleryCarousel.tsx          # Embla + GSAP depth carousel
    ├── ContactSection.tsx           # Quote form component
    ├── SiteHeader.tsx               # Responsive navigation
    └── SiteFooter.tsx               # Footer
```

---

## Running Locally

```bash
npm install
cp .env.example .env.local   # configure SMTP or leave blank for Ethereal dev mode
npm run dev
```

In development, if SMTP credentials are not set, Nodemailer automatically falls back to [Ethereal](https://ethereal.email/) — a preview URL for the sent email is returned in the API response.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL (used for canonical/OG metadata) |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP port (`587` or `465`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `CONTACT_EMAIL_FROM` | Sender address |
| `CONTACT_EMAIL_TO` | Recipient for quote requests |

---

## License

© 2026 Júlio Gonçalves Canalizações. All rights reserved.
