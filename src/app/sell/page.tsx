import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles, Banknote, Calendar, ShieldCheck, Zap, BarChart3, ArrowRight,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sell on Marketly",
  description: "Open a vendor storefront on Marketly. Templates, bookings, payments, and a built-in audience — in one product.",
};

const benefits = [
  { Icon: Banknote,     title: "Keep 95% of every sale",   body: "Flat 5% platform fee. Stripe processing on top. No commissions on subscriptions over 12 months." },
  { Icon: Calendar,     title: "Bookings out of the box",  body: "Calendar sync, deposits, no-show policy, automatic reminders. Zero plugins." },
  { Icon: Zap,          title: "Launch in an afternoon",   body: "Pre-built storefront templates plus our team's launch playbook. No designer required." },
  { Icon: BarChart3,    title: "Analytics that matter",    body: "Conversion funnel, traffic sources, cohort LTV, top customers. Not just vanity metrics." },
  { Icon: ShieldCheck,  title: "Vendor trust score",       body: "Verified reviews, dispute resolution, and escrow on every booking." },
  { Icon: Sparkles,     title: "Marketplace audience",     body: "120,000+ monthly buyers searching for exactly what you sell." },
];

const steps = [
  { n: 1, title: "Sign up free",      desc: "Create your Marketly account in 60 seconds." },
  { n: 2, title: "Set up storefront", desc: "Pick a template, drop in your brand, write a few lines of copy." },
  { n: 3, title: "Connect Stripe",    desc: "5-minute KYC. Bank account linked. Payouts every 2 business days." },
  { n: 4, title: "Go live & sell",    desc: "First buyers usually arrive within 48 hours via the marketplace search." },
];

export default function SellPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="For vendors"
        title={<>Sell on Marketly. <span className="gradient-text">Keep what you earn.</span></>}
        description="A complete platform for the modern operator — storefront, bookings, payments, community, and the audience to grow them. Built by operators."
        actions={
          <>
            <Button asChild variant="gradient" size="lg">
              <Link href="/sign-up?role=vendor">Start selling free <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing#vendors">See vendor pricing</Link>
            </Button>
          </>
        }
      />

      {/* Benefits grid */}
      <Section size="md">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ Icon, title, body }) => (
              <Card key={title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pricing teaser */}
      <Section size="md" className="bg-surface/50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Badge variant="brand">Simple economics</Badge>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">5% platform fee. That's it.</h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                No listing fees. No monthly minimums. No surprise rake increases. The same flat fee whether you do $1K or $1M.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Stripe processing (industry standard 2.9% + 30¢)",
                  "Zero platform fee on subscriptions after month 12",
                  "0% on rebookings from returning customers (built-in loyalty)",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <ShieldCheck className="size-4 mt-0.5 text-brand shrink-0" /> {l}
                  </li>
                ))}
              </ul>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Example payout</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Service price</span><span className="font-semibold">$100.00</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Platform fee (5%)</span><span>-$5.00</span></div>
                  <div className="flex justify-between text-muted-foreground"><span>Stripe processing (~2.9%+30¢)</span><span>-$3.20</span></div>
                </div>
                <div className="border-t border-border pt-3 flex items-baseline justify-between">
                  <span className="text-sm">You receive</span>
                  <span className="font-display text-2xl font-bold">$91.80</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section size="md">
        <Container>
          <div className="text-center mb-10">
            <Badge variant="secondary">Get live this week</Badge>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">How it works</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <Card key={s.n}>
                <CardContent className="p-6 space-y-3">
                  <span className="grid size-9 place-items-center rounded-full bg-foreground text-background font-display text-sm font-bold">
                    {s.n}
                  </span>
                  <h3 className="font-display font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section size="md" className="bg-foreground text-background">
        <Container>
          <div className="mx-auto max-w-2xl text-center space-y-5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Your next chapter starts on Marketly.</h2>
            <p className="text-background/70">14-day free trial. Cancel anytime, keep what you've built.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/sign-up?role=vendor">Start selling free <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-background hover:bg-white/10">
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
