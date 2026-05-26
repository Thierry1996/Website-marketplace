import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Clock, ArrowUpRight, Star } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Services" };

export default async function VendorServicesPage() {
  // Treat the first 3 services as belonging to this vendor (Studio Lumière).
  const owned = (await getServices()).slice(0, 3);
  return (
    <DashboardShell role="vendor" title="Services">
      <DashboardPageHeader
        title="Bookable services"
        description={`${owned.length} active services · taking bookings`}
        actions={
          <Button variant="gradient" size="md">
            <Plus className="size-4" /> Add service
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {owned.map((s) => (
          <Card key={s.slug} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-[5/3]" style={{ background: s.gradient }}>
              <Badge variant="default" className="absolute left-3 top-3 bg-white/95 text-foreground">
                <Clock className="size-3" /> {s.durationMin} min
              </Badge>
              <Badge variant="brand" className="absolute right-3 top-3">Active</Badge>
            </div>
            <CardContent className="p-5 space-y-3">
              <div>
                <div className="font-semibold leading-snug">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.category}</div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="font-display text-base font-bold">{formatCurrency(s.priceCents / 100)}</div>
                  <div className="text-muted-foreground">Price</div>
                </div>
                <div>
                  <div className="font-display text-base font-bold">{s.reviews}</div>
                  <div className="text-muted-foreground">Reviews</div>
                </div>
                <div>
                  <div className="font-display text-base font-bold inline-flex items-center gap-1">
                    <Star className="size-3.5 fill-accent-strong text-accent-strong" strokeWidth={0} />
                    {s.rating.toFixed(1)}
                  </div>
                  <div className="text-muted-foreground">Rating</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/services/${s.slug}`}>Preview <ArrowUpRight className="size-3.5" /></Link>
                </Button>
                <Button variant="brand" size="sm" className="flex-1">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add card */}
        <button className="rounded-xl border-2 border-dashed border-border hover:border-foreground/30 hover:bg-surface transition p-8 flex flex-col items-center justify-center gap-2 text-center text-muted-foreground">
          <Plus className="size-6" />
          <span className="font-medium">Add another service</span>
          <span className="text-xs">Title, duration, price, availability.</span>
        </button>
      </div>
    </DashboardShell>
  );
}
