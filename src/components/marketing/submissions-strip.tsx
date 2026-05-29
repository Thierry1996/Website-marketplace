import Link from "next/link";
import { ExternalLink, Wand2, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listApproved } from "@/lib/submissions-store";

export function SubmissionsStrip() {
  const subs = listApproved().slice(0, 6);
  if (subs.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <Badge variant="brand"><Wand2 className="size-3" /> Live previews · AI-reviewed</Badge>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight">From the code submission program</h2>
          <p className="mt-1 text-sm text-muted-foreground max-w-xl">
            Real codebases submitted by Reach vendors — open any one to see it running live in a sandboxed preview tab.
          </p>
        </div>
        <Button asChild variant="outline" size="md">
          <Link href="/vendor/submissions/new">Submit your code <ArrowRight className="size-4" /></Link>
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subs.map((s) => (
          <Card key={s.id} className="group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="relative aspect-[4/3]" style={{ background: s.thumbnail ?? "linear-gradient(135deg,#FF4D6D,#7C3AED)" }}>
              <Badge variant="default" className="absolute left-3 top-3 bg-white/90 text-foreground">{s.framework}</Badge>
              {s.analysis && (
                <Badge variant="default" className="absolute right-3 top-3 bg-white/90 text-foreground">
                  <Wand2 className="size-3" /> {s.analysis.score}/100
                </Badge>
              )}
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-ink/85 to-transparent">
                <a
                  href={`/preview/${s.previewSlug}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-foreground shadow-lg hover:scale-105 transition"
                >
                  <ExternalLink className="size-3.5" /> Preview site
                </a>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-display font-bold leading-tight">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                {s.category && <Badge variant="secondary">{s.category}</Badge>}
                <a
                  href={`/preview/${s.previewSlug}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-brand inline-flex items-center gap-1 hover:underline"
                >
                  Open ↗
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
