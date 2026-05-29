import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Plus, Pause, Play, ArrowRight } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { CampaignStats } from "@/components/dashboard/campaign-stats";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Sparkline } from "@/components/charts/sparkline";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Campaigns" };

const CAMPAIGNS = [
  { id: "CAM-9018", name: "Spring lead-gen — Meta",     channel: "meta",      status: "Running" as const, spendCents: 124000, leads: 312, roasX: 4.7, trend: [40,55,60,72,80,90,105] },
  { id: "CAM-9017", name: "Stories retargeting — IG",   channel: "instagram", status: "Running" as const, spendCents:  41000, leads:  87, roasX: 3.2, trend: [10,12,15,16,18,20,22] },
  { id: "CAM-9016", name: "Trend launch — TikTok",      channel: "tiktok",    status: "Paused"  as const, spendCents:  18500, leads:  29, roasX: 2.1, trend: [5,7,9,8,7,6,5] },
  { id: "CAM-9009", name: "Pinterest shopping ideas",   channel: "pinterest", status: "Running" as const, spendCents:  21500, leads:  44, roasX: 3.8, trend: [3,5,6,7,8,10,12] },
];

const CHANNEL_COLOR: Record<string, string> = {
  meta: "#1877F2", instagram: "#E1306C", tiktok: "#000000", pinterest: "#E60023",
};

export default function CampaignsPage() {
  return (
    <DashboardShell role="user" title="Campaigns">
      <DashboardPageHeader
        title="Campaigns"
        description="Active marketing campaigns Reach is running on your behalf."
        actions={
          <Button asChild variant="brand" size="md">
            <Link href="#new"><Plus className="size-4" /> New campaign</Link>
          </Button>
        }
      />

      <CampaignStats
        leadsThisMonth={428}
        leadsTrend={[210, 245, 268, 295, 322, 360, 428]}
        spendingCents={205000}
        budgetCents={300000}
        creditsCents={425000}
        revenueThisMonthCents={2820000}
        className="mb-6"
      />

      <Card>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Megaphone className="size-4 text-brand" />
            <h2 className="font-semibold">Live & paused campaigns</h2>
            <Badge variant="brand">{CAMPAIGNS.length}</Badge>
          </div>
        </div>
        <CardContent className="p-0 divide-y divide-border">
          {CAMPAIGNS.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center gap-4 p-5">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl text-white"
                style={{ background: CHANNEL_COLOR[c.channel] }}
              >
                <BrandIcon name={c.channel} className="size-5" />
              </span>
              <div className="flex-1 min-w-[180px]">
                <div className="font-semibold leading-tight">{c.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{c.id}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Spend</div>
                <div className="font-display font-bold">{formatCurrency(c.spendCents/100)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Leads</div>
                <div className="font-display font-bold">{c.leads}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">ROAS</div>
                <div className="font-display font-bold">{c.roasX}x</div>
              </div>
              <Sparkline data={c.trend} width={88} height={32} color="brand" />
              <Badge variant={c.status === "Running" ? "brand" : "outline"}>{c.status}</Badge>
              <Button variant="ghost" size="sm">
                {c.status === "Running" ? <Pause className="size-4" /> : <Play className="size-4" />}
              </Button>
              <Button variant="ghost" size="sm">Manage <ArrowRight className="size-3.5" /></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
