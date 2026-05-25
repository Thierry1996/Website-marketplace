import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sampleOrders } from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <DashboardShell role="user" title="Orders">
      <DashboardPageHeader
        title="Orders"
        description="Templates, bundles, and digital purchases."
        actions={
          <Button variant="outline" size="md">
            <Download className="size-4" /> Export CSV
          </Button>
        }
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">Order</th>
                <th className="p-4 font-medium">Vendor</th>
                <th className="p-4 font-medium">Item</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4 font-mono text-xs">{o.id}</td>
                  <td className="p-4">{o.vendor}</td>
                  <td className="p-4 max-w-[320px] truncate">{o.item}</td>
                  <td className="p-4 text-muted-foreground">{new Date(o.placedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(o.totalCents / 100)}</td>
                  <td className="p-4">
                    <Badge
                      variant={o.status === "refunded" ? "danger" : o.status === "fulfilled" ? "brand" : "default"}
                      className="capitalize"
                    >
                      {o.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`#${o.id}`}>View <ArrowRight className="size-3.5" /></Link>
                    </Button>
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
