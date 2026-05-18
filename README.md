# SovraID — Decentralized Reusable KYC (India-First)

A production-grade, multi-page marketing + product demo site for **SovraID**, a decentralized reusable KYC and digital identity platform built for India.

Built with:

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**-style primitives
- **lucide-react** icons
- **framer-motion** for tasteful animations
- **next-themes** with dark theme by default
- Classic, no-gradient fintech design language

## Pages

| Route       | Description                                                |
| ----------- | ---------------------------------------------------------- |
| `/`         | Landing page — hero, features, how it works, trust, CTA    |
| `/issuer`   | Issuer portal — KYC form, liveness check, credential mint |
| `/wallet`   | User wallet — DID, credentials, selective disclosure, QR  |
| `/verifier` | NeoPay verifier demo — scan → proof request → success     |
| `/about`    | About the company, mission, team and timeline             |
| `/docs`     | Protocol documentation — DID, VC, SDK, security, DPDP     |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder structure

```
app/
  layout.tsx           # Root layout, fonts, theme, navbar, footer
  page.tsx             # Landing page
  globals.css          # Tailwind layers + design tokens (no gradients)
  issuer/page.tsx      # Issuer portal route
  issuer/issuer-dashboard.tsx
  wallet/page.tsx      # User wallet route
  wallet/wallet-client.tsx
  verifier/page.tsx    # Verifier (NeoPay) demo route
  verifier/verifier-client.tsx
  about/page.tsx       # About page
  docs/page.tsx        # Documentation page

components/
  ui/                  # shadcn-style primitives (Button, Card, Dialog, Input, …)
  navbar.tsx           # Top navigation
  footer.tsx           # Site footer with tricolor accent
  logo.tsx             # SovraID logo with subtle tricolor dot
  connect-wallet-button.tsx
  credential-card.tsx
  selective-disclosure-dialog.tsx
  activity-list.tsx
  qr-frame.tsx
  section-heading.tsx
  theme-provider.tsx

lib/
  utils.ts             # cn() and formatting helpers
  mock-data.ts         # Credentials, DID, activity, issuer rows
```

## Design notes

- **No gradients anywhere.** Solid surfaces, dotted backgrounds, and crisp borders only.
- Deep navy background, blue primary, emerald accent for trust, subtle saffron for the Indian touch (used only in tiny accent stripes).
- Cards rely on backdrop blur + solid `card` color for a quiet glass effect, never multi-stop gradients.

## Disclaimers

All data is mocked — no real Aadhaar, PAN or wallet calls happen. This project is a portfolio / demo build.
