import { PhoneCall, Mail, Clock, BadgeCheck } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { LeadCaptureForm } from "@/components/marketing/lead-capture-form";

export function LeadCaptureSection() {
  return (
    <Section id="get-in-touch" size="md" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 aurora opacity-30" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Pitch */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft/70 px-3 py-1.5 text-xs font-semibold text-brand-foreground/80">
              <span className="size-1.5 rounded-full bg-brand live-dot" /> Real human reply in 24 hours
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Tell us where you&apos;re stuck.{" "}
              <span className="gradient-text">We&apos;ll fix it for you.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Share a few details and one of our growth strategists will email or call you with a
              tailored plan — what to run, on which channel, and the expected return. No pitch deck. No fluff.
            </p>

            <ul className="space-y-3 text-sm">
              {[
                { Icon: Clock,      title: "24-hour reply",         body: "We respond every business day, always with a real human." },
                { Icon: PhoneCall,  title: "Free strategy call",    body: "30 minutes with someone who's grown a business like yours." },
                { Icon: Mail,       title: "Tailored plan, in writing", body: "Channels, budget, and a 30-day target — sent right after the call." },
                { Icon: BadgeCheck, title: "Trusted by millions of SMBs", body: "From single-location salons to multi-region brands." },
              ].map(({ Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-muted-foreground">{body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <LeadCaptureForm source="home-lead-section" />
        </div>
      </Container>
    </Section>
  );
}
