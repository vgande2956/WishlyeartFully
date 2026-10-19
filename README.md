# Wishly — Premium Birthday Experience

A production-oriented Next.js/React/TypeScript starter for a personalized interactive birthday experience. It intentionally uses original branding, copy, UI language, and visual direction rather than copying the reference site.

## Included

- Premium landing page
- 7-step creator wizard with autosaved session draft
- Live preview panel
- Recipient experience at `/b/[shareId]`
- Balloon popping, candle/wish, cake-cutting, letter reveal, memories and finale scenes
- Dashboard with seeded demo data and privacy-conscious analytics placeholders
- Share success page with QR code
- Demo checkout flow for Razorpay/Stripe integration
- Auth UI routes
- Settings and admin UI routes
- Responsive mobile-first CSS
- Reduced-motion support
- LocalStorage demo persistence

## Routes

`/`
`/create`
`/create/person`
`/create/style`
`/create/message`
`/create/memories`
`/create/music`
`/create/preview`
`/checkout`
`/success`
`/dashboard`
`/dashboard/experiences/[id]`
`/login`
`/signup`
`/forgot-password`
`/settings`
`/b/[shareId]`
`/admin`

## Run locally

```bash
npm install
npm run dev
```

The demo is intentionally credential-free. For production, connect:

- Auth.js / Clerk / Supabase Auth
- PostgreSQL + Prisma
- S3-compatible object storage
- Razorpay + Stripe with server-side webhook verification
- Resend or equivalent transactional email
- First-party analytics with consent controls

## Production hardening checklist

- Replace demo localStorage persistence with PostgreSQL/Prisma.
- Generate share IDs server-side with cryptographic randomness.
- Add row-level authorization for every private resource.
- Add signed object-storage URLs, MIME validation, image dimensions/size limits, malware scanning and EXIF stripping.
- Add CSRF/XSS/rate-limit protections appropriate to the chosen auth/session model.
- Implement real payment webhooks and idempotency before publishing paid experiences.
- Add real account verification, magic links and password reset tokens.
- Add link expiration, revocation, regeneration and optional passcode protection server-side.
- Serve uploaded media through a CDN with AVIF/WebP derivatives.
- Add automated tests and Lighthouse/Playwright CI before launch.
