import type { Metadata } from "next";
import Link from "next/link";
import { Wand2, ExternalLink, Building2 } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/charts/stat-card";
import { listReports } from "@/lib/analyzer-store";

export const metadata: Metadata = { title: "Site reports — admin" };

function scoreVariant(n: number): "brand" | "secondary" | "danger" {
  return n >= 80 ? "brand" : n >= 60 ? "secondary" : "danger";
}

export default async function AdminSiteReportsPage() {
  const reports = await listReports();
  const avg = reports.length ? Math.round(reports.reduce((s, r) => s + r.overall, 0) / reports.length) : 0;
  const aiCount = reports.filter((r) => r.aiPowered).length;

  return (
    <DashboardShell role="admin" title="Site reports">
      <DashboardPageHeader
        title="AI Site Analyzer reports"
        description="Every analysis run by a visitor, subscriber, or vendor lands here — your master copy of each crawl."
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <StatCard label="Reports generated" value={String(reports.length)} icon={<Wand2 className="size-4" />} />
        <StatCard label="Avg site score" value={`${avg}/100`} />
        <StatCard label="AI-written" value={`${aiCount}/${reports.length || 0}`} />
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center space-y-3">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand-soft text-brand"><Wand2 className="size-6" /></span>
            <h3 className="font-display text-lg font-bold">No reports yet</h3>
            <p className="text-sm text-muted-foreground">When someone runs the analyzer, their report shows up here automatically.</p>
            <Button asChild variant="outline" size="md"><Link href="/analyzer">Open the analyzer</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-medium">Business</th>
                  <th className="p-4 font-medium">Site</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium text-right">Score</th>
                  <th className="p-4 font-medium">By</th>
                  <th className="p-4 font-medium" />
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-surface/40">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="size-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{r.businessName}</div>
                          <div className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 max-w-[220px] truncate text-muted-foreground">{r.url}</td>
                    <td className="p-4 text-xs text-muted-foreground">
                      <div>{r.phone}</div>
                      <div className="truncate max-w-[160px]">{r.address}</div>
                    </td>
                    <td className="p-4 text-right">
                      <Badge variant={scoreVariant(r.overall)}>{r.overall}/100</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize">{r.requestedByRole}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button asChild variant="ghost" size="sm">
                        <a href={`/analyzer/${r.id}`} target="_blank" rel="noreferrer noopener">
                          View <ExternalLink className="size-3.5" />
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </DashboardShell>
  );
}
