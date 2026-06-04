import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Building2, MapPin, Phone, Globe, Wand2, AlertTriangle, CheckCircle2, Clock,
} from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Badge } from "@/components/ui/badge";
import { ReportActions } from "@/components/marketing/report-actions";
import { Donut } from "@/components/charts/donut";
import { getReport } from "@/lib/analyzer-store";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getReport(slug);
  return {
    title: r ? `${r.businessName} · Site Performance Report` : "Report not found",
    robots: { index: false },
  };
}

function scoreColor(n: number) {
  return n >= 80 ? "#16A34A" : n >= 60 ? "#F59E0B" : "#EF4444";
}
function band(n: number) {
  return n >= 80 ? "Strong" : n >= 60 ? "Needs work" : "Critical";
}

const SEV: Record<string, { label: string; cls: string }> = {
  high:   { label: "High",   cls: "bg-danger/10 text-danger border-danger/20" },
  medium: { label: "Medium", cls: "bg-warning/10 text-[rgb(var(--accent-strong))] border-warning/20" },
  low:    { label: "Low",    cls: "bg-muted-foreground/10 text-muted-foreground border-border" },
};

export default async function ReportPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const r = await getReport(slug);
  if (!r) notFound();

  const created = new Date(r.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  const s = r.signals;

  return (
    <div className="min-h-dvh bg-surface/40">
      {/* Sticky toolbar (hidden in print) */}
      <header className="no-print sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-5 py-3 backdrop-blur">
        <Logo />
        <ReportActions />
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 print:py-0">
        {/* Report header */}
        <div className="print-break rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-brand">
                <Wand2 className="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Reach · AI Site Performance Report</span>
              </div>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">{r.businessName}</h1>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Globe className="size-4" /> <a href={r.url} target="_blank" rel="noreferrer" className="hover:underline">{r.url}</a></div>
                <div className="flex items-center gap-2"><MapPin className="size-4" /> {r.address}</div>
                <div className="flex items-center gap-2"><Phone className="size-4" /> {r.phone}</div>
              </div>
            </div>

            {/* Overall gauge */}
            <div className="text-center">
              <Donut
                size={150}
                thickness={16}
                segments={[
                  { label: "score", value: r.overall, color: scoreColor(r.overall) },
                  { label: "rest",  value: 100 - r.overall, color: "rgb(var(--border))" },
                ]}
                centerLabel={
                  <>
                    <div className="font-display text-3xl font-extrabold" style={{ color: scoreColor(r.overall) }}>{r.overall}</div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">/ 100</div>
                  </>
                }
              />
              <Badge className="mt-2" variant={r.overall >= 80 ? "brand" : r.overall >= 60 ? "secondary" : "danger"}>
                {band(r.overall)}
              </Badge>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {created}</span>
            <span>·</span>
            <span>{s.crawledPages} page(s) crawled</span>
            <span>·</span>
            <span>{s.responseMs}ms response</span>
            <Badge variant={r.aiPowered ? "brand" : "outline"} className="ml-auto">
              {r.aiPowered ? "AI-written summary" : "Automated summary"}
            </Badge>
          </div>
        </div>

        {/* Executive summary */}
        <section className="print-break mt-6 rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold mb-3">Executive summary</h2>
          {r.focusPrompt && (
            <p className="mb-3 rounded-lg bg-brand-soft/40 px-3 py-2 text-sm">
              <b>Your focus:</b> {r.focusPrompt}
            </p>
          )}
          <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-foreground/85">{r.summary}</p>
        </section>

        {/* Category scores */}
        <section className="print-break mt-6 rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold mb-4">Category scores</h2>
          <div className="space-y-3">
            {r.scores.map((c) => (
              <div key={c.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c.label}</span>
                  <span className="font-semibold" style={{ color: scoreColor(c.score) }}>{c.score}/100</span>
                </div>
                <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: scoreColor(c.score) }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Problems + solutions */}
        <section className="print-break mt-6 rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold mb-1">Organic-marketing problems &amp; recommended fixes</h2>
          <p className="text-sm text-muted-foreground mb-5">{r.findings.length} item(s) found, ordered by impact.</p>

          {r.findings.length === 0 ? (
            <div className="flex items-center gap-3 rounded-xl bg-success/10 p-4 text-sm">
              <CheckCircle2 className="size-5 text-success" /> No blocking issues found — your fundamentals are solid.
            </div>
          ) : (
            <ol className="space-y-4">
              {r.findings.map((f, i) => (
                <li key={i} className="print-break rounded-xl border border-border p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface font-display text-xs font-bold">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className={cn("border", SEV[f.severity].cls)}>
                          <AlertTriangle className="size-3" /> {SEV[f.severity].label}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">{f.category}</Badge>
                      </div>
                      <div className="mt-2 font-semibold">{f.problem}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground/80">Fix:</span> {f.solution}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Crawl details */}
        <section className="print-break mt-6 rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold mb-4">Crawl details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {[
              ["HTTPS", s.https ? "Yes" : "No"],
              ["Title", s.title ? `${s.titleLen} chars` : "Missing"],
              ["Meta description", s.metaDescription ? `${s.metaDescriptionLen} chars` : "Missing"],
              ["H1 tags", String(s.h1Count)],
              ["Images", `${s.imgCount} (${s.imgMissingAlt} no alt)`],
              ["Word count", String(s.wordCount)],
              ["Internal links", String(s.internalLinks)],
              ["Broken links", String(s.brokenLinks)],
              ["Scripts", String(s.scriptCount)],
              ["Structured data", s.hasJsonLd ? "Yes" : "No"],
              ["Viewport (mobile)", s.hasViewport ? "Yes" : "No"],
              ["Social profiles", String(Object.values(s.social).filter(Boolean).length)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border p-3">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="font-semibold">{v}</div>
              </div>
            ))}
          </div>
          {(s.detectedBusiness.name || s.detectedBusiness.phone || s.detectedBusiness.address) && (
            <div className="mt-4 rounded-lg bg-surface p-3 text-xs text-muted-foreground">
              <b>Detected on-site business data:</b>{" "}
              {[s.detectedBusiness.name, s.detectedBusiness.phone, s.detectedBusiness.address].filter(Boolean).join(" · ")}
            </div>
          )}
        </section>

        {/* CTA — hidden in print */}
        <section className="no-print mt-6 rounded-2xl bg-foreground p-6 sm:p-8 text-background text-center">
          <Building2 className="mx-auto size-6 text-[rgb(var(--lime))]" />
          <h2 className="mt-3 font-display text-2xl font-bold">Want Reach to fix all of this for you?</h2>
          <p className="mt-2 text-background/70 text-sm max-w-lg mx-auto">
            Our team turns this report into a done-for-you growth plan — ads, content, SEO, and a site that converts.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a href="/#get-in-touch" className="rounded-full bg-[rgb(var(--brand))] px-5 py-2.5 text-sm font-semibold text-white">Get my free strategy call</a>
            <a href="/start-trial" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold">Start free trial</a>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Report {r.id} · generated by Reach AI Site Analyzer · © {new Date().getFullYear()} Reach
        </p>
      </main>
    </div>
  );
}
