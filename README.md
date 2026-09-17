# Júlio Gonçalves Canalizações — Business Website

A production-ready institutional website built for a Portuguese plumbing business — deployed on Vercel.

---

## 🎬 Showcase

<div align="center">
  <img src="https://raw.githubusercontent.com/andrefsg05/showcasing-assets/main/intro-jgcwebsite.gif" width="30%" />
  <img src="https://raw.githubusercontent.com/andrefsg05/showcasing-assets/main/exploring-jgcwebsite.gif" width="30%" />
  <img src="https://raw.githubusercontent.com/andrefsg05/showcasing-assets/main/transition-jgcwebsite.gif" width="30%" />
</div>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP (SplitText, ScrollTrigger) |
| Carousel | Embla Carousel + Wheel Gestures |
| Email | Nodemailer (SMTP) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── contactar/            # Dedicated contact & quote request page
│   ├── api/orcamento/        # POST route — form handling, validation, email dispatch
│   ├── layout.tsx            # Root layout with metadata, fonts, providers
│   └── globals.css           # Global styles
└── components/
    ├── PageTransitionProvider.tsx   # GSAP page transition system
    ├── LandingIntroProvider.tsx     # One-shot landing intro state
    ├── GalleryCarousel.tsx          # Embla + GSAP depth carousel
    ├── ContactSection.tsx           # Quote form component
    ├── SiteHeader.tsx               # Responsive navigation
    └── SiteFooter.tsx               # Footer
```

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
