import Link from "next/link";
import { Star, Sparkles, ShieldCheck, Store, Banknote, BarChart3, ShoppingBag } from "lucide-react";

import { Logo } from "@/components/layout/logo";

type Role = "customer" | "vendor";

const PANEL: Record<Role, {
  gradient: string;
  blobs: [string, string, string];
  heading: React.ReactNode;
  blurb: string;
  benefits: [typeof Star, string][];
  badge: string;
}> = {
  customer: {
    gradient: "bg-foreground",
    blobs: ["bg-brand/30", "bg-accent/25", "bg-secondary/25"],
    heading: <>Grow your business with <span className="gradient-text">Reach.</span></>,
    blurb: "Your customer portal — run campaigns, track leads & revenue, and buy ready-made market solutions.",
    badge: "Customer account",
    benefits: [
      [BarChart3,   "Track leads, spend, credits & revenue in one place"],
      [ShoppingBag, "Buy organic market solutions from our marketplace"],
      [Sparkles,    "Launch ad campaigns across every channel"],
    ],
  },
  vendor: {
    gradient: "bg-ink",
    blobs: ["bg-secondary/35", "bg-electric/30", "bg-brand/20"],
    heading: <>Sell your solutions on <span className="gradient-text-cool">Reach.</span></>,
    blurb: "Your vendor portal — list storefronts, submit code, manage orders, and get paid via Stripe Connect.",
    badge: "Vendor account",
    benefits: [
      [Store,       "List storefronts, services & code submissions"],
      [Banknote,    "Stripe Connect payouts every 2 business days"],
      [Star,        "Get featured to millions of buyers"],
    ],
  },
};

export function AuthLayout({
  children,
  title,
  subtitle,
  role = "customer",
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  role?: Role;
}) {
  const p = PANEL[role];

  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className={`relative hidden lg:flex flex-col justify-between p-10 text-white overflow-hidden ${p.gradient}`}>
        <div aria-hidden className="absolute inset-0 opacity-60">
          <div className={`absolute -top-40 -left-40 size-[420px] rounded-full blur-3xl ${p.blobs[0]}`} />
          <div className={`absolute bottom-[-150px] right-[-100px] size-[460px] rounded-full blur-3xl ${p.blobs[1]}`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[360px] rounded-full blur-3xl ${p.blobs[2]}`} />
        </div>

        <div className="relative flex items-center gap-3">
          <Logo dark />
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider">
            {p.badge}
          </span>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h2 className="font-display text-3xl xl:text-4xl font-bold leading-tight">{p.heading}</h2>
          <p className="text-white/80 text-base leading-relaxed">{p.blurb}</p>

          <ul className="space-y-3 text-sm">
            {p.benefits.map(([Icon, label], i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white">
                  <Icon className="size-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <ShieldCheck className="size-4 text-[rgb(var(--lime))]" /> Bank-grade security · encrypted & private
          </div>
        </div>

        <div className="relative text-xs text-white/50">
          © {new Date().getFullYear()} Reach. All rights reserved.
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col">
        <header className="flex items-center justify-between p-6 lg:hidden border-b border-border">
          <Logo />
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>
        </header>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md space-y-7">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft/60 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-brand">
                {role === "vendor" ? "Vendor portal" : "Customer portal"}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
