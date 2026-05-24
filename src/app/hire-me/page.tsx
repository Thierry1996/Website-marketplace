import type { Metadata } from "next";
import Link from "next/link";
import { Star, Clock, MapPin, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { ContactForm } from "@/components/marketing/contact-form";
import { testimonials } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Hire me",
  description: "Direct project engagements with Trey — marketplace launches, storefront builds, conversion audits.",
};

const services = [
  { title: "Marketplace launch sprint",     priceCents: 750000,  duration: "4 weeks",      description: "From blank repo to revenue-generating marketplace in 4 weeks. Includes vendor onboarding, payouts, listings, and booking." },
  { title: "Storefront-in-a-week",          priceCents: 290000,  duration: "5 business days", description: "Tailor-made vendor storefront on Marketly. Brand, copy, layout, and Stripe integration — fully launched." },
  { title: "Conversion audit + roadmap",    priceCents: 95000,   duration: "1 week",       description: "Teardown of your existing storefront + 30-day prioritized roadmap with expected impact per change." },
];

export default function HireMePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Direct engagements"
        title={<>Work directly with me on <span className="gradient-text">your next launch.</span></>}
        description="Limited slots each quarter — book a free 15-min intro call to scope your project."
        actions={
          <Button asChild variant="gradient" size="lg">
            <Link href="#contact">Book intro call <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />

      <Section size="md">
        <Container>
          {/* Profile card */}
          <Card className="mb-12 overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-brand via-secondary to-accent" />
            <CardContent className="-mt-12 sm:-mt-16 space-y-5">
              <div className="flex flex-wrap items-end gap-4">
                <Avatar className="size-24 border-4 border-surface-elevated">
                  <AvatarFallback gradient="linear-gradient(135deg,#10B981,#8B5CF6)">T</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <Badge variant="brand"><Sparkles className="size-3" /> Available · Q3 2026</Badge>
                  <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Trey</h1>
                  <div className="text-base text-muted-foreground">Founder · Marketly · Marketplace operator</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="inline-flex items-center gap-1"><Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} /><span className="font-semibold">4.9</span> <span className="text-muted-foreground">(86 projects)</span></span>
                <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="size-4" /> 4h avg reply</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="size-4" /> Remote · US-based</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground"><ShieldCheck className="size-4" /> Escrow on every project</span>
              </div>

              <Separator />

              <p className="text-base leading-relaxed text-foreground/85 max-w-3xl">
                I'm the operator and engineer behind Marketly. I've personally launched 40+ vendor storefronts, processed
                $4M+ in vendor GMV, and shipped the platform you're using right now. When my calendar allows, I take a
                small number of direct client engagements per quarter.
              </p>
            </CardContent>
          </Card>

          {/* Service packages */}
          <h2 className="font-display text-2xl font-bold mb-6">Packages</h2>
          <div className="grid gap-5 lg:grid-cols-3 mb-16">
            {services.map((s) => (
              <Card key={s.title}>
                <CardContent className="p-6 space-y-3">
                  <Badge variant="secondary">{s.duration}</Badge>
                  <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  <Separator />
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">From</div>
                      <div className="font-display text-2xl font-bold">${(s.priceCents / 100).toLocaleString()}</div>
                    </div>
                    <Button asChild variant="brand" size="sm">
                      <Link href="#contact">Start <ArrowRight className="size-3.5" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <h2 className="font-display text-2xl font-bold mb-6">Recent client wins</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>

          {/* Contact */}
          <div id="contact" className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Send a project brief</h2>
              <p className="text-muted-foreground">
                Drop a few lines about what you're building, your timeline, and your budget. I'll reply within 4 business hours.
              </p>
              <div className="rounded-xl border border-border bg-surface p-4 text-sm">
                <div className="font-semibold mb-2">What to include</div>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li>· Quick description of your business / vertical</li>
                  <li>· Goals & timeline</li>
                  <li>· Approximate budget</li>
                  <li>· Anything I should know upfront</li>
                </ul>
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
