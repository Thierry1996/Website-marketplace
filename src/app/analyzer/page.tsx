import type { Metadata } from "next";
import { Search, Gauge, FileDown, Wand2, ShieldCheck, TrendingUp } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { AnalyzerForm } from "@/components/marketing/analyzer-form";

export const metadata: Metadata = {
  title: "Free AI Site Analyzer",
  description: "Paste your live business website and our AI crawls it, flags every organic-marketing weakness, and generates a free downloadable performance report.",
};

const STEPS = [
  { Icon: Search, title: "You paste your site", body: "Enter your live website plus your business name, address & phone." },
  { Icon: Wand2,  title: "Our AI crawls it",    body: "We fetch your pages and run a big-data audit across 7 dimensions." },
  { Icon: Gauge,  title: "We score weaknesses", body: "SEO, performance, mobile, trust, content, conversion & social reach." },
  { Icon: FileDown, title: "You get a free PDF", body: "A clear report with prioritized fixes — download it instantly." },
];

export default function AnalyzerPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="AI Site Analyzer · free"
        title={<>Find out what&apos;s <span className="gradient-text">holding your site back.</span></>}
        description="Our AI big-data agent crawls your live website, flags every organic-marketing problem, and hands you a downloadable performance report with exact fixes — free."
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* How it works */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="grid sm:grid-cols-2 gap-4">
              {STEPS.map(({ Icon, title, body }, i) => (
                <Card key={title}>
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand"><Icon className="size-4" /></span>
                      <span className="text-xs font-bold text-muted-foreground">STEP {i + 1}</span>
                    </div>
                    <h3 className="font-display font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
              <div className="flex items-center gap-2 font-display font-bold"><TrendingUp className="size-4 text-brand" /> What we check</div>
              <div className="flex flex-wrap gap-2 text-xs">
                {["SEO & meta tags","Page speed","Mobile readiness","HTTPS & security","Broken links","Content depth","Image alt text","Structured data","Social presence","Lead capture","Click-to-call","Open Graph"].map((t) => (
                  <span key={t} className="rounded-full border border-border bg-surface-elevated px-3 py-1">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <ShieldCheck className="size-3.5 text-success" /> We only analyze live, public domains. Nothing is stored on your site.
              </div>
            </div>
          </div>

          {/* Form */}
          <AnalyzerForm role="guest" />
        </div>
      </Container>
    </PageShell>
  );
}
