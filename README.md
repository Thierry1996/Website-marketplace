# Marketly

A production-ready multi-vendor marketplace platform.
Templates, services, bookings, webinars, community, and payments — all in one app.

Built on Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Prisma 7
· Clerk · Stripe · Resend · Framer Motion.

---

## 🚀 Quick start (no credentials, ~2 minutes)

```bash
git clone git@github.com:Thierry1996/Website-marketplace.git
cd "Website-marketplace"
npm install
npx prisma generate
npm run dev
```

Open http://localhost:3000.

Every page renders against sample data baked into `src/lib/*-data.ts`. You can
explore the full marketplace, all dashboards, the booking flow, and the
admin panel without provisioning any external service. The `AuthForm`,
checkout, and email modules **gracefully no-op** when their credentials
aren't set — drop the keys in and they activate.

---

## 🔑 Plugging in real services

Everything below is opt-in. Add the variables you want; leave the others blank.

Copy `.env.example` to `.env.local` and fill in.

### 1. Database (Postgres) — required for any DB-backed feature

Pick any Postgres host. We recommend [Neon](https://neon.tech) or
[Supabase](https://supabase.com) for the free tier, or
[Vercel Postgres](https://vercel.com/storage/postgres) if you're deploying
to Vercel.

```bash
# .env.local
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
```

Then run:

```bash
npx prisma db push     # create tables
npm run db:seed        # populate with sample data
```

Every page automatically switches to live DB reads via `src/lib/queries/`.
No code changes needed.

### 2. Clerk authentication

1. Create a Clerk app at https://dashboard.clerk.com.
2. Copy your Publishable Key and Secret Key.
3. Drop them in `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

The `<AuthForm>` fallback on `/sign-in` and `/sign-up` automatically swaps
for real Clerk `<SignIn>` and `<SignUp>` components.

#### User sync webhook (optional but recommended)

Configure a webhook in Clerk pointing at `POST /api/webhooks/clerk` with
events: `user.created`, `user.updated`, `user.deleted`. Then:

```bash
CLERK_WEBHOOK_SIGNING_SECRET="whsec_..."
```

Each event upserts the corresponding row in our Prisma `User` table.

### 3. Stripe (payments + Connect)

1. Create a Stripe account → Developers → API keys.
2. Copy keys into `.env.local`:

```bash
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Subscription plan price IDs (Products → Pricing in Stripe dashboard)
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PRO="price_..."
STRIPE_PRICE_STUDIO="price_..."

# Optional — vendor payouts via Connect
STRIPE_CONNECT_CLIENT_ID="ca_..."
```

3. Configure a webhook endpoint at `POST /api/webhooks/stripe` listening for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `account.updated` (Connect)

The checkout server actions in `src/lib/actions/checkout.ts` flip from
the demo `/checkout/preview` page to real Stripe Checkout the moment
`STRIPE_SECRET_KEY` is present.

### 4. Resend (transactional email)

```bash
RESEND_API_KEY="re_..."
EMAIL_FROM="Marketly <hello@yourdomain.com>"
```

Without a key, `sendEmail()` logs the message to the console.
Templates live in `src/lib/email.ts`.

### 5. Media (Cloudinary or UploadThing)

Optional in Phase 4 — listing uploads come in Phase 5.

```bash
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# or
UPLOADTHING_TOKEN="..."
```

---

## 🧱 Architecture

```
src/
├── app/                  # Next.js App Router
│   ├── (public)          # Home, marketplace, services, etc.
│   ├── dashboard/        # User dashboard
│   ├── vendor/           # Vendor dashboard
│   ├── admin/            # Admin panel
│   ├── api/webhooks/     # Stripe + Clerk webhook handlers
│   ├── sign-in/, sign-up/, forgot-password/
│   ├── error.tsx         # App-level error boundary
│   ├── global-error.tsx  # Layout crash fallback
│   └── not-found.tsx
├── components/
│   ├── ui/               # Button, Card, Badge, Input, Accordion, Tabs, Avatar, ...
│   ├── layout/           # Navbar, Footer, PageShell, AuthLayout
│   ├── dashboard/        # Shell, Sidebar, Topbar
│   ├── marketing/        # ListingCard, BookingWidget, PricingCard, ...
│   ├── sections/         # Home page sections
│   └── charts/           # Sparkline, BarMini, Donut, StatCard
├── lib/
│   ├── queries/          # All DB reads (with sample-data fallback)
│   ├── actions/          # Server actions (Zod-validated, typed)
│   ├── db.ts             # Prisma singleton (null when DB unset)
│   ├── stripe.ts         # Stripe singleton
│   ├── email.ts          # Resend wrapper + templates
│   ├── *-data.ts         # Sample data shaped exactly like Prisma rows
│   └── ...
└── middleware.ts         # Clerk middleware (no-op without keys)

prisma/
├── schema.prisma         # 15 models: User, Vendor, Listing, Service, Order, ...
└── seed.ts               # `npm run db:seed`

prisma.config.ts          # Prisma 7 config (DATABASE_URL lives here)
```

### Why this shape

- **Pages depend on `src/lib/queries`, never `prisma` directly.** This makes
  every page work against either a real DB or sample data with zero code
  changes.
- **Server actions are Zod-validated and return `ActionResult<T>`** so
  forms get field errors without manual plumbing.
- **Every external service has a "configured? → real / unconfigured? → no-op
  with sensible dev behavior" pattern.** You can run the entire app with
  no env vars set.

---

## 📦 Useful scripts

```bash
npm run dev          # Next dev (webpack, 8GB heap)
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npm run db:generate  # regenerate Prisma client
npm run db:push      # push schema → database
npm run db:seed      # populate DB with sample data
```

---

## ☁️ Deploy

### Vercel (recommended)

1. `vercel link` from the repo root.
2. Add env vars in the Vercel dashboard (or `vercel env add`).
3. `vercel deploy --prod`.

Vercel auto-detects Next.js. The `prisma.config.ts` + `db:generate` script
makes Prisma play nicely in the build phase.

### Anywhere else

Anywhere that runs Node 20+. `npm run build && npm run start`.
You'll need to expose `DATABASE_URL`, the Clerk pair, and the Stripe pair.

---

## 🗺️ Roadmap

- **Phase 1 (done):** Scaffold, design system, home page
- **Phase 2 (done):** 23 public pages + auth shells
- **Phase 3 (done):** 3 dashboards, server-action stubs, onboarding, blog detail
- **Phase 4 (current):** Query layer, Stripe + Clerk wiring, email module,
  error boundaries, setup guide
- **Phase 5 (next):** Filesystem-backed MDX blog, Cloudinary uploads,
  Sentry integration, CSV exports, real search/filter URL state
- **Phase 6:** Multi-region payouts, SSO, role-based admin permissions

---

## 📄 License

Private — © 2026 Marketly.
