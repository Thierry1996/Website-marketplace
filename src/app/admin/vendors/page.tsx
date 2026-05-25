import type { Metadata } from "next";
import { Search, Star } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { adminVendors } from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Vendors — admin" };

export default function AdminVendorsPage() {
  return (
    <DashboardShell role="admin" title="Vendors">
      <DashboardPageHeader
        title="Vendors"
        description={`${adminVendors.length} vendors · ${adminVendors.filter((v) => v.status === "Pending").length} awaiting approval`}
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search vendors..." className="pl-9 h-9" />
          </div>
          {["All", "Pending", "Approved", "Suspended"].map((s) => (
            <Button key={s} variant={s === "All" ? "outline" : "ghost"} size="sm">{s}</Button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">Vendor</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium text-right">Listings</th>
                <th className="p-4 font-medium text-right">GMV</th>
                <th className="p-4 font-medium text-right">Rating</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {adminVendors.map((v) => (
                <tr key={v.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback gradient={v.gradient}>{v.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{v.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{v.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{v.category}</td>
                  <td className="p-4 text-right">{v.listings}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(v.gmvCents / 100)}</td>
                  <td className="p-4 text-right">
                    {v.rating > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3.5 fill-accent-strong text-accent-strong" strokeWidth={0} />
                        {v.rating.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(v.joinedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="p-4">
                    <Badge variant={v.status === "Suspended" ? "danger" : v.status === "Pending" ? "outline" : "brand"}>
                      {v.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    {v.status === "Pending" ? (
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="sm" className="text-danger">Reject</Button>
                        <Button variant="brand" size="sm">Approve</Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm">Manage</Button>
                    )}
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
