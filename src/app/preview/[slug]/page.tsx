import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Wand2, ShieldCheck } from "lucide-react";

import { getSubmissionBySlug } from "@/lib/submissions-store";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/layout/logo";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSubmissionBySlug(slug);
  return {
    title: s ? `${s.title} · Live preview` : "Preview not found",
    description: s?.description,
  };
}

export default async function PreviewPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getSubmissionBySlug(slug);
  if (!s) notFound();

  const html = s.files.find((f) => f.path.endsWith("index.html") || f.path.endsWith(".html"))?.content;

  return (
    <div className="min-h-dvh flex flex-col bg-ink text-white">
      {/* Top bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-ink/90 backdrop-blur">
        <div className="flex items-center gap-3">
          <Logo dark />
          <Badge variant="default" className="bg-white/10 text-white border-white/15">/preview/{s.previewSlug}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-white/70">
            <ShieldCheck className="size-4 text-[rgb(var(--lime))]" /> Sandboxed
          </span>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
          >
            <ArrowLeft className="size-3.5" /> Back to marketplace
          </Link>
        </div>
      </header>

      {/* Meta strip */}
      <div className="px-4 py-3 border-b border-white/10 flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="size-10 shrink-0 rounded-lg" style={{ background: s.thumbnail ?? "linear-gradient(135deg,#FF4D6D,#7C3AED)" }} />
          <div className="min-w-0">
            <div className="font-display font-bold truncate">{s.title}</div>
            <div className="text-xs text-white/55 truncate">{s.description}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <Badge variant="default" className="bg-white/10 text-white border-white/15">{s.framework}</Badge>
          {s.category && <Badge variant="default" className="bg-white/10 text-white border-white/15">{s.category}</Badge>}
          {s.analysis && (
            <Badge variant="default" className="bg-[rgb(var(--lime))/0.2] text-white border-white/15">
              <Wand2 className="size-3" /> AI score {s.analysis.score}/100
            </Badge>
          )}
          {s.status === "approved" && <Badge variant="brand">Approved</Badge>}
          {s.status === "needs_build" && <Badge variant="secondary">Build pending</Badge>}
        </div>
      </div>

      {/* Live frame */}
      <main className="flex-1 grid bg-white">
        {html ? (
          <iframe
            title={`${s.title} live preview`}
            srcDoc={html}
            sandbox="allow-scripts"
            className="w-full h-full min-h-[calc(100dvh-160px)] bg-white"
          />
        ) : (
          <div className="grid place-items-center min-h-[calc(100dvh-160px)] bg-ink text-center p-8">
            <div className="max-w-md space-y-3">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-white/10">
                <Wand2 className="size-5 text-[rgb(var(--lime))]" />
              </div>
              <h2 className="font-display text-xl font-bold">Build pending</h2>
              <p className="text-sm text-white/70">
                {s.framework.toUpperCase()} submissions go through our build pipeline. You'll get a live preview URL on completion — typically under 5 minutes.
              </p>
              {s.repoUrl && (
                <a
                  href={s.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Open source repo <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
