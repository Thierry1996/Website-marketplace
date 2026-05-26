import type { Metadata } from "next";
import { Banknote, ArrowDownToLine, ShieldCheck, ExternalLink } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/charts/stat-card";
import { Separator } from "@/components/ui/separator";
import { getVendorPayouts } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Payouts" };

export default async function PayoutsPage() {
  const vendorPayouts = await getVendorPayouts();
  const paid     = vendorPayouts.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amountCents, 0);
  const transit  = vendorPayouts.filter((p) => p.status === "In transit").reduce((s, p) => s + p.amountCents, 0);
  const pending  = vendorPayouts.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amountCents, 0);

  return (
    <DashboardShell role="vendor" title="Payouts">
      <DashboardPageHeader
        title="Payouts"
        description="Stripe Connect handles your payouts on a rolling 2-business-day schedule."
        actions={
          <Button variant="outline" size="md">
            <ExternalLink className="size-4" /> Open Stripe dashboard
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <StatCard label="Paid out (30d)" value={formatCurrency(paid    / 100)} delta={22.4} icon={<Banknote className="size-4" />} trend={[8,9,11,10,12,13,14]} />
        <StatCard label="In transit"     value={formatCurrency(transit / 100)} icon={<ArrowDownToLine className="size-4" />} />
        <StatCard label="Pending"        value={formatCurrency(pending / 100)} icon={<ShieldCheck className="size-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold">Payout history</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Most recent payouts from Stripe Connect.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 font-medium">Payout</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {vendorPayouts.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-surface/40">
                    <td className="p-4">
                      <div className="font-mono text-xs">{p.id}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{p.reference}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">{new Date(p.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="p-4 text-right font-semibold">{formatCurrency(p.amountCents / 100)}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          p.status === "Paid" ? "brand"
                          : p.status === "In transit" ? "secondary"
                          : "outline"
                        }
                      >
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold inline-flex items-center gap-2"><ShieldCheck className="size-4 text-brand" /> Stripe Connect</h3>
            <div className="rounded-xl border border-border p-4 text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account</span>
                <span className="font-mono text-xs">acct_••••a1b9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank</span>
                <span>Chase ····4242</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Schedule</span>
                <span>Rolling · 2 business days</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform fee</span>
                <span>5.0%</span>
              </div>
            </div>
            <Button variant="outline" size="md" className="w-full">
              Manage on Stripe <ExternalLink className="size-4" />
            </Button>
            <p className="text-xs text-muted-foreground">
              All payouts are handled by Stripe Connect. Marketly never holds your funds.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
