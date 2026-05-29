import Link from "next/link";
import {
  Megaphone, TrendingUp, Coins, Banknote, ArrowRight, Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkline } from "@/components/charts/sparkline";
import { formatCurrency, formatCompact, cn } from "@/lib/utils";

interface CampaignStatsProps {
  leadsThisMonth: number;
  leadsTrend: number[];
  spendingCents: number;
  budgetCents: number;
  creditsCents: number;
  revenueThisMonthCents: number;
  className?: string;
}

export function CampaignStats({
  leadsThisMonth, leadsTrend, spendingCents, budgetCents, creditsCents,
  revenueThisMonthCents, className,
}: CampaignStatsProps) {
  const spendPct = Math.min(100, Math.round((spendingCents / Math.max(1, budgetCents)) * 100));

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-2 bg-[linear-gradient(135deg,rgb(var(--brand)),rgb(var(--accent)))] p-4 text-white">
        <div className="flex items-center gap-2">
          <Megaphone className="size-4" />
          <span className="font-display text-sm font-semibold">Campaign stats</span>
        </div>
        <Badge variant="default" className="bg-white/20 text-white border-white/20">This month</Badge>
      </div>

      <CardContent className="p-5 space-y-5">
        {/* Leads */}
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-muted-foreground">Leads generated</span>
            <span className="inline-flex items-center gap-1 text-success">
              <TrendingUp className="size-3" />
              +{Math.round(((leadsTrend[leadsTrend.length - 1] - leadsTrend[0]) / Math.max(1, leadsTrend[0])) * 100)}%
            </span>
          </div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div className="font-display text-3xl font-bold">{formatCompact(leadsThisMonth)}</div>
            <Sparkline data={leadsTrend} width={100} height={30} color="brand" />
          </div>
        </div>

        {/* Spending bar */}
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-muted-foreground">Spending</span>
            <span className="text-muted-foreground">{formatCurrency(spendingCents/100)} / {formatCurrency(budgetCents/100)}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,rgb(var(--brand)),rgb(var(--accent)))]"
              style={{ width: `${spendPct}%` }}
            />
          </div>
          <div className="mt-1 text-[0.7rem] text-muted-foreground">{spendPct}% of monthly budget used</div>
        </div>

        {/* Credits */}
        <div className="rounded-xl border border-border bg-surface p-3 flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
            <Coins className="size-4" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground">Credits remaining</div>
            <div className="font-display text-lg font-bold leading-none">{formatCurrency(creditsCents/100)}</div>
          </div>
          <Button asChild variant="brand" size="sm">
            <Link href="/dashboard/subscription">
              Top up <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>

        {/* Revenue */}
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-success/15 text-success">
            <Banknote className="size-4" />
          </span>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Revenue this month</div>
            <div className="font-display text-lg font-bold leading-none">{formatCurrency(revenueThisMonthCents/100)}</div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-brand-soft/60 via-accent-soft/40 to-secondary-soft/40 p-3 flex items-center gap-3">
          <Sparkles className="size-4 text-brand shrink-0" />
          <div className="flex-1 text-xs">
            Credits auto-deduct from your <span className="font-semibold">saved payment method</span>.
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/subscription">Manage</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
