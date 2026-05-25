import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search, ArrowUpRight, Star } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { vendorListings } from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Listings" };

export default function VendorListingsPage() {
  return (
    <DashboardShell role="vendor" title="Listings">
      <DashboardPageHeader
        title="Listings"
        description={`${vendorListings.filter((l) => l.status === "Published").length} published · ${vendorListings.filter((l) => l.status === "Draft").length} drafts`}
        actions={
          <Button asChild variant="gradient" size="md">
            <Link href="#new"><Plus className="size-4" /> New listing</Link>
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search listings..." className="pl-9 h-9" />
          </div>
          {["All", "Published", "Draft", "Archived"].map((s) => (
            <Button key={s} variant={s === "All" ? "outline" : "ghost"} size="sm">{s}</Button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium text-right">Price</th>
                <th className="p-4 font-medium text-right">Sales</th>
                <th className="p-4 font-medium text-right">Rating</th>
                <th className="p-4 font-medium text-right">Views (30d)</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {vendorListings.map((l) => (
                <tr key={l.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-gradient-to-br from-brand to-secondary shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium truncate max-w-[260px]">{l.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">{l.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{l.type}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(l.priceCents / 100)}</td>
                  <td className="p-4 text-right">{l.sales}</td>
                  <td className="p-4 text-right">
                    {l.rating > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3.5 fill-accent-strong text-accent-strong" strokeWidth={0} />
                        {l.rating.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="p-4 text-right text-muted-foreground">{l.views30d.toLocaleString()}</td>
                  <td className="p-4">
                    <Badge variant={l.status === "Published" ? "brand" : l.status === "Draft" ? "default" : "outline"}>
                      {l.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`#${l.id}`}>Edit <ArrowUpRight className="size-3.5" /></Link>
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
