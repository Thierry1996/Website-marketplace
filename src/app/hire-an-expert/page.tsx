import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { ProjectBriefForm } from "@/components/marketing/project-brief-form";

export const metadata: Metadata = {
  title: "Hire an Expert",
  description: "Submit a project brief and we'll match you with 2-3 Marketly experts within 24 hours.",
};

export default function HireAnExpertPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Concierge matching"
        title={<>Tell us what you need —{" "}<span className="gradient-text">we'll match the right expert.</span></>}
        description="Skip the search. Describe your project, your budget, and your timeline. We'll send 2-3 hand-picked matches within 24 hours, with no obligation."
      />

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ProjectBriefForm />

          <aside className="space-y-6 text-sm">
            <div>
              <h2 className="font-display text-lg font-semibold mb-3">What happens next</h2>
              <ol className="space-y-3">
                {[
                  ["1", "We review your brief", "Usually within 6 hours during business days."],
                  ["2", "We send 2–3 matches",  "Pre-vetted experts with relevant portfolios."],
                  ["3", "Free intro calls",     "15-min calls with each — no commitment."],
                  ["4", "Engage with escrow",   "Pay only when you approve milestones."],
                ].map(([n, t, d]) => (
                  <li key={n} className="flex gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground font-display text-xs font-bold">{n}</span>
                    <div>
                      <div className="font-medium">{t}</div>
                      <div className="text-xs text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="font-display font-semibold">Why submit a brief?</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>· No platform fee on intro calls</li>
                <li>· Escrow + dispute protection on every project</li>
                <li>· Replaced free if first match doesn't click</li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </PageShell>
  );
}
