import type { Metadata } from "next";
import { Download } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/charts/stat-card";
import { adminPayments, platformRevenue30d } from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Payments — admin" };

export default function AdminPaymentsPage() {
  const gross = adminPayments.reduce((s, p) => s + p.grossCents, 0);
  const fees = adminPayments.reduce((s, p) => s + p.feeCents, 0);
  const disputed = adminPayments.filter((p) => p.status === "Disputed").length;
  const refunded = adminPayments.filter((p) => p.status === "Refunded").length;
  const trend = platformRevenue30d.slice(-7).map((p) => p.value);

  return (
    <DashboardShell role="admin" title="Payments">
      <DashboardPageHeader
        title="Payments ledger"
        description="Recent transactions across all vendors. Fully reconciled to Stripe."
        actions={<Button variant="outline" size="md"><Download className="size-4" /> Export CSV</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Gross (period)"   value={formatCurrency(gross / 100)} delta={18.2} trend={trend} />
        <StatCard label="Platform fees"    value={formatCurrency(fees / 100)}  delta={18.2} trend={trend} />
        <StatCard label="Disputed"         value={String(disputed)}            delta={-5.1} />
        <StatCard label="Refunded"         value={String(refunded)}            delta={3.3} />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Vendor</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium text-right">Gross</th>
                <th className="p-4 font-medium text-right">Fee</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {adminPayments.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4 font-mono text-xs">{p.id}</td>
                  <td className="p-4 text-muted-foreground">{new Date(p.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="p-4">{p.vendor}</td>
                  <td className="p-4 text-muted-foreground">{p.customer}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(p.grossCents / 100)}</td>
                  <td className="p-4 text-right text-muted-foreground">{formatCurrency(p.feeCents / 100)}</td>
                  <td className="p-4">
                    <Badge variant={p.status === "Refunded" ? "default" : p.status === "Disputed" ? "danger" : "brand"}>
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  );
}
