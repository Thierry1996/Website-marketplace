import Link from "next/link";
import { Star, Sparkles, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/layout/logo";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between p-10 bg-foreground text-background overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-50">
          <div className="absolute -top-40 -left-40 size-[420px] rounded-full bg-brand/30 blur-3xl" />
          <div className="absolute bottom-[-150px] right-[-100px] size-[460px] rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[360px] rounded-full bg-secondary/25 blur-3xl" />
        </div>

        <Logo className="relative" />

        <div className="relative space-y-6 max-w-md">
          <h2 className="font-display text-3xl xl:text-4xl font-bold leading-tight">
            Built for the next chapter of <span className="gradient-text">ambitious operators.</span>
          </h2>
          <p className="text-background/80 text-base leading-relaxed">
            One platform for storefronts, bookings, webinars, payments, and community. Loved by 10,000+ vendors.
          </p>

          <ul className="space-y-3 text-sm">
            {[
              [Star,         "4.9 average rating from 10,000+ vendors"],
              [ShieldCheck,  "Escrow + Stripe Connect payouts on every order"],
              [Sparkles,     "Launch a vendor storefront in one afternoon"],
            ].map(([Icon, label], i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-white">
                  <Icon className="size-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-xs text-background/50">
          © {new Date().getFullYear()} Marketly. All rights reserved.
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
