import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ExternalLink, Code2, Wand2 } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listSubmissions } from "@/lib/submissions-store";

export const metadata: Metadata = { title: "Code submissions" };

const STATUS_VARIANT: Record<string, "brand" | "outline" | "danger" | "secondary"> = {
  approved:    "brand",
  needs_build: "secondary",
  queued:      "outline",
  analyzing:   "outline",
  rejected:    "danger",
};

export default async function VendorSubmissionsPage() {
  const subs = await listSubmissions();

  return (
    <DashboardShell role="vendor" title="Code submissions">
      <DashboardPageHeader
        title="Code submissions"
        description="Submit a codebase (HTML/CSS/JS, React, Next.js, WordPress). Our AI agent reviews it and assigns a live preview URL on approval."
        actions={
          <Button asChild variant="brand" size="md">
            <Link href="/vendor/submissions/new"><Plus className="size-4" /> New submission</Link>
          </Button>
        }
      />

      {subs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center space-y-4">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft text-brand">
              <Code2 className="size-6" />
            </span>
            <h3 className="font-display text-lg font-bold">No submissions yet</h3>
            <p className="text-sm text-muted-foreground">Submit your first codebase to get featured in the marketplace.</p>
            <Button asChild variant="brand" size="md"><Link href="/vendor/submissions/new">Submit code</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {subs.map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <CardContent className="p-0 flex">
                <div
                  className="w-32 shrink-0"
                  style={{ background: s.thumbnail ?? "linear-gradient(135deg,#FF4D6D,#7C3AED)" }}
                />
                <div className="flex-1 p-5 flex flex-wrap items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold">{s.title}</h3>
                      <Badge variant={STATUS_VARIANT[s.status]}>{s.status.replace("_", " ")}</Badge>
                      <Badge variant="outline" className="text-[0.65rem]">{s.framework}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{s.description}</p>
                    {s.analysis && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Wand2 className="size-3.5 text-brand" />
                        AI score: <span className="font-bold text-foreground">{s.analysis.score}/100</span>
                        <span>· {s.analysis.summary.slice(0, 80)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {(s.status === "approved" || s.status === "needs_build") && (
                      <Button asChild variant="outline" size="sm">
                        <a href={`/preview/${s.previewSlug}`} target="_blank" rel="noreferrer noopener">
                          Preview <ExternalLink className="size-3.5" />
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
