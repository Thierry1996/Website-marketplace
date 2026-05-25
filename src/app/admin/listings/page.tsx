import type { Metadata } from "next";
import { ShieldAlert, ArrowUpRight } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { adminListingFlags } from "@/lib/dashboard-data";
import { marketplaceListings } from "@/lib/sample-data";

export const metadata: Metadata = { title: "Listings — admin" };

export default function AdminListingsPage() {
  return (
    <DashboardShell role="admin" title="Listings">
      <DashboardPageHeader
        title="Listings"
        description={`${marketplaceListings.length} active listings · ${adminListingFlags.length} flagged`}
      />

      {/* Flagged section */}
      <Card className="mb-6 border-danger/20">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <ShieldAlert className="size-4 text-danger" />
          <h2 className="font-semibold">Flagged for review</h2>
          <Badge variant="danger">{adminListingFlags.length}</Badge>
        </div>
        <CardContent className="p-0 divide-y divide-border">
          {adminListingFlags.map((f) => (
            <div key={f.id} className="p-5 flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="font-medium">{f.title}</div>
                <div className="text-xs text-muted-foreground mt-1">by {f.vendor} · reported {new Date(f.reportedAt).toLocaleDateString("en", { month: "short", day: "numeric" })}</div>
                <p className="mt-2 text-sm">
                  <span className="font-medium">Reason:</span> {f.reason}
                </p>
                <div className="mt-1 text-xs text-muted-foreground">Reported by {f.reporter}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="sm">View listing <ArrowUpRight className="size-3.5" /></Button>
                <Button variant="outline" size="sm">Dismiss</Button>
                <Button variant="destructive" size="sm">Take down</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* All listings */}
      <Card>
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">All marketplace listings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Vendor</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium text-right">Reviews</th>
                <th className="p-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {marketplaceListings.slice(0, 12).map((l) => (
                <tr key={l.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4">
                    <div className="font-medium max-w-[320px] truncate">{l.title}</div>
                    <div className="text-xs text-muted-foreground font-mono">L-{l.id}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">{l.vendor}</td>
                  <td className="p-4">
                    <Badge variant="secondary">{l.category}</Badge>
                  </td>
                  <td className="p-4 text-right">{l.reviewCount}</td>
                  <td className="p-4 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/marketplace/${l.id}`}>View <ArrowUpRight className="size-3.5" /></Link>
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
