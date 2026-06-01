import type { Metadata } from "next";
import Link from "next/link";
import { Wand2, FileDown, History } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnalyzerForm } from "@/components/marketing/analyzer-form";

export const metadata: Metadata = { title: "AI Site Analyzer" };

export default function DashboardAnalyzerPage() {
  return (
    <DashboardShell role="user" title="Site analyzer">
      <DashboardPageHeader
        title="AI Site Analyzer"
        description="Crawl any live business website or social presence, flag organic-marketing problems, and download a performance report."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
        <AnalyzerForm role="customer" />

        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-brand/10 via-accent/10 to-secondary/10 border-brand/20">
            <CardContent className="p-6 space-y-3">
              <Badge variant="brand"><Wand2 className="size-3" /> AI + big-data analysis</Badge>
              <h3 className="font-display text-lg font-bold">Run it on every site you manage</h3>
              <p className="text-sm text-muted-foreground">
                Analyze your own store, a prospect's site, or a competitor. Each report is saved
                and a copy is sent to your Reach strategist so we can act on it with you.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileDown className="size-4 text-brand" /> Free downloadable PDF every time
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 font-display font-bold">
                <History className="size-4 text-brand" /> What gets analyzed
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {["SEO & meta","Page speed","Mobile","HTTPS","Broken links","Content depth","Alt text","Schema","Social reach","Lead capture","Click-to-call","Open Graph"].map((t) => (
                  <span key={t} className="rounded-full border border-border bg-surface px-3 py-1">{t}</span>
                ))}
              </div>
              <Button asChild variant="outline" size="md" className="w-full">
                <Link href="/marketplace">Need a fix done for you? Buy a solution</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
