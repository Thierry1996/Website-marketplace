import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Store, ArrowRight, Check } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Join Reach",
  description: "Choose your account type — buy market solutions as a customer, or sell them as a vendor.",
};

const OPTIONS = [
  {
    role: "Customer",
    icon: ShoppingBag,
    href: "/sign-up",
    signin: "/sign-in",
    gradient: "linear-gradient(135deg,#FF4D6D,#FF8A3D)",
    tagline: "I want to grow my business",
    points: [
      "Run ad campaigns across every channel",
      "Track leads, spend, credits & revenue",
      "Buy organic market solutions",
    ],
    cta: "Create customer account",
  },
  {
    role: "Vendor",
    icon: Store,
    href: "/vendor/sign-up",
    signin: "/vendor/sign-in",
    gradient: "linear-gradient(135deg,#7C3AED,#2563EB)",
    tagline: "I want to sell my solutions",
    points: [
      "List storefronts, services & code",
      "Get featured to millions of buyers",
      "Stripe Connect payouts",
    ],
    cta: "Create vendor account",
  },
];

export default function JoinPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-surface/40">
      <header className="flex items-center justify-between p-5 border-b border-border bg-background">
        <Logo />
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>
      </header>

      <main className="flex-1 grid place-items-center px-5 py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              How do you want to use <span className="gradient-text">Reach?</span>
            </h1>
            <p className="mt-3 text-muted-foreground">Pick your account type. You can always add the other later.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {OPTIONS.map((o) => {
              const Icon = o.icon;
              return (
                <Card key={o.role} className="group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="h-2" style={{ background: o.gradient }} />
                  <CardContent className="p-6 space-y-4">
                    <span className="grid size-12 place-items-center rounded-xl text-white shadow-lg" style={{ background: o.gradient }}>
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{o.role}</div>
                      <h2 className="font-display text-xl font-bold mt-0.5">{o.tagline}</h2>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {o.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <Check className="size-4 mt-0.5 text-brand shrink-0" strokeWidth={3} /> {p}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="brand" size="lg" className="w-full">
                      <Link href={o.href}>{o.cta} <ArrowRight className="size-4" /></Link>
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Already have one?{" "}
                      <Link href={o.signin} className="font-semibold text-foreground hover:underline">Sign in</Link>
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
