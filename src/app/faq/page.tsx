import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about Reach — plans, payments, bookings, vendor payouts, refunds, and more.",
};

const groups: Array<{ heading: string; faqs: Array<{ q: string; a: string }> }> = [
  {
    heading: "Getting started",
    faqs: [
      { q: "What is Reach?", a: "Reach is an all-in-one multi-vendor marketplace platform: templates, bookings, payments, webinars, and community in one product." },
      { q: "Who is Reach for?", a: "Independent operators, agencies, and small businesses across e-commerce, services, wellness, education, and digital products. If you sell anything online — products, time, knowledge — Reach fits." },
      { q: "Do I need to be technical?", a: "No. Every template ships pixel-perfect and launches in under an hour. For deeper customization, our Pro and Studio plans give you full source-code access." },
    ],
  },
  {
    heading: "Plans & billing",
    faqs: [
      { q: "How does pricing work?", a: "Three flat plans — Starter ($29 one-time), Pro ($79 one-time), Studio ($149/yr). No platform commissions. Stripe's standard processing fees apply on transactions." },
      { q: "Can I upgrade or downgrade?", a: "Anytime. Upgrades are pro-rated. Downgrades take effect at the end of the current billing period." },
      { q: "What's your refund policy?", a: "30-day no-questions refund on every plan. Email support@reach.com." },
    ],
  },
  {
    heading: "Payments & payouts",
    faqs: [
      { q: "How are vendor payouts handled?", a: "We use Stripe Connect Express. Vendors complete a 5-minute onboarding once, then payouts land in your bank account on a 2-business-day rolling schedule." },
      { q: "What payment methods are supported?", a: "All major credit cards, Apple Pay, Google Pay, ACH, SEPA, and Klarna in supported regions." },
      { q: "Is there a minimum payout?", a: "No minimum on Stripe Express. Default cadence is daily once your balance is above $1." },
    ],
  },
  {
    heading: "Bookings & services",
    faqs: [
      { q: "Can I sync my calendar?", a: "Yes — Google Calendar, Outlook, iCloud, and Calendly all sync bi-directionally. Conflicts are surfaced in real time." },
      { q: "Can I require deposits?", a: "Yes. Set a deposit amount or percentage per service. Funds are held in escrow and released on appointment completion." },
      { q: "What about no-shows?", a: "Configure a no-show fee per service. Optional 24-hour cancellation policy with automatic deposit forfeit." },
    ],
  },
  {
    heading: "Trust & safety",
    faqs: [
      { q: "How are vendors vetted?", a: "Identity verification through Stripe Connect KYC plus a human review for storefronts. Bad-actor accounts are flagged via Reach's review-based trust score." },
      { q: "Is escrow available?", a: "Yes — every project booking goes into escrow. Funds release only when the buyer marks the work complete." },
      { q: "How do disputes work?", a: "Open a dispute from any order. Our team mediates within 48 hours. Escrowed funds are held until resolution." },
    ],
  },
];

export default function FAQPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Frequently asked questions"
        title={<>Answers to <span className="gradient-text">the things that matter most.</span></>}
        description="Can't find what you're looking for? Email support@reach.com and we'll reply within 6 hours."
        align="center"
      />

      <Container className="py-16 max-w-3xl">
        <div className="space-y-12">
          {groups.map((g) => (
            <section key={g.heading}>
              <h2 className="font-display text-xl font-semibold mb-3">{g.heading}</h2>
              <Accordion type="single" collapsible className="rounded-2xl border border-border bg-surface-elevated px-5">
                {g.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`${g.heading}-${i}`}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
