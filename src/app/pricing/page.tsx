import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { PricingCard } from "@/components/marketing/pricing-card";
import { pricingPlans } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for buyers and vendors. Starter $29 · Pro $79 · Studio $149/yr.",
};

const comparison: Array<{ feature: string; starter: boolean | string; pro: boolean | string; studio: boolean | string }> = [
  { feature: "Template licenses",            starter: "1",         pro: "5",         studio: "Unlimited" },
  { feature: "Lifetime updates",             starter: true,        pro: true,        studio: true },
  { feature: "Commercial use",               starter: true,        pro: true,        studio: true },
  { feature: "Source files included",        starter: false,       pro: true,        studio: true },
  { feature: "White-label rights",           starter: false,       pro: false,       studio: true },
  { feature: "Priority support",             starter: false,       pro: true,        studio: true },
  { feature: "24/7 expert chat",             starter: false,       pro: false,       studio: true },
  { feature: "Vendor storefront",            starter: false,       pro: true,        studio: true },
  { feature: "Stripe Connect payouts",       starter: false,       pro: true,        studio: true },
  { feature: "Booking & scheduling",         starter: false,       pro: true,        studio: true },
  { feature: "Subscription products",        starter: false,       pro: false,       studio: true },
  { feature: "API & webhooks",               starter: false,       pro: false,       studio: true },
];

const faqs = [
  { q: "Do I pay a platform commission?", a: "No platform commission. Marketly charges flat plans — you keep 100% of what you sell. Stripe's standard processing fees still apply." },
  { q: "Can I upgrade or downgrade later?", a: "Anytime. Upgrades are pro-rated and downgrades take effect at the end of your current billing period." },
  { q: "What if I want a refund?", a: "30-day no-questions refund on all Marketly plans. Email support@marketly.app and we'll process it within 24 hours." },
  { q: "Is there a free trial?", a: "Starter doesn't require a card. Pro and Studio both come with a 14-day free trial. Cancel anytime during the trial with zero charge." },
];

export default function PricingPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Pricing"
        title={<>Simple, transparent <span className="gradient-text">pricing.</span></>}
        description="No hidden fees. No platform commissions. Pay once for templates, monthly for the marketplace — whichever fits."
        align="center"
      />

      <Container className="py-16 space-y-20">
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Comparison table */}
        <section>
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">Compare features</h2>
            <p className="mt-3 text-muted-foreground">Everything that's in each plan, side by side.</p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="p-5 w-1/3">Feature</th>
                    <th className="p-5">Starter</th>
                    <th className="p-5 bg-brand-soft/40">
                      <span className="inline-flex items-center gap-2">
                        Pro <Badge variant="brand">Popular</Badge>
                      </span>
                    </th>
                    <th className="p-5">Studio</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "" : "bg-surface/50"}>
                      <td className="p-5 font-medium">{row.feature}</td>
                      <td className="p-5">{renderCell(row.starter)}</td>
                      <td className="p-5 bg-brand-soft/15">{renderCell(row.pro)}</td>
                      <td className="p-5">{renderCell(row.studio)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Enterprise */}
        <section>
          <Card className="overflow-hidden bg-foreground text-background border-foreground">
            <CardContent className="p-8 sm:p-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <Badge variant="accent" className="mb-3"><Sparkles className="size-3" /> Enterprise</Badge>
                <h2 className="font-display text-3xl font-bold">Need something custom?</h2>
                <p className="mt-3 text-background/70 max-w-lg">
                  Multi-region, SSO, custom integrations, dedicated success manager.
                  Built for marketplaces processing $10M+ GMV.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild variant="accent" size="lg">
                  <Link href="/contact">Talk to sales <ArrowRight className="size-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-background hover:bg-white/10">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section>
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">Pricing FAQ</h2>
          </div>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </Container>
    </PageShell>
  );
}

function renderCell(v: boolean | string) {
  if (v === true)  return <Check className="size-4 text-brand" strokeWidth={2.5} />;
  if (v === false) return <X     className="size-4 text-muted-foreground/40" />;
  return <span>{v}</span>;
}
