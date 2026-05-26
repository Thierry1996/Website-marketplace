import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, Calendar, Star, Eye, ArrowRight, Plus, Sparkles } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/charts/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarMini } from "@/components/charts/bar-mini";
import { Donut } from "@/components/charts/donut";
import {
  getVendorRevenue30d, getVendorBookings30d, getVendorBookings, getVendorListings,
} from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Vendor dashboard" };

export default async function VendorOverviewPage() {
  const [vendorRevenue30d, vendorBookings30d, vendorBookings, vendorListings] = await Promise.all([
    getVendorRevenue30d(),
    getVendorBookings30d(),
    getVendorBookings(),
    getVendorListings(),
  ]);

  const totalRevenue = vendorRevenue30d.reduce((s, p) => s + p.value, 0);
  const totalBookings = vendorBookings30d.reduce((s, p) => s + p.value, 0);

  const revenueByCat = [
    { label: "Beauty",   value: 62, color: "#10B981" },
    { label: "Bundle",   value: 21, color: "#8B5CF6" },
    { label: "Services", value: 17, color: "#F59E0B" },
  ];

  const trend7d = vendorRevenue30d.slice(-7).map((p) => p.value);
  const bookings7d = vendorBookings30d.slice(-7).map((p) => p.value);

  return (
    <DashboardShell role="vendor" title="Vendor overview">
      <DashboardPageHeader
        title="Studio Lumière"
        description="Last 30 days · all currencies converted to USD."
        actions={
          <>
            <Button asChild variant="outline" size="md">
              <Link href="/vendor/payouts">View payouts</Link>
            </Button>
            <Button asChild variant="gradient" size="md">
              <Link href="/vendor/listings">
                <Plus className="size-4" /> New listing
              </Link>
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Revenue (30d)"   value={formatCurrency(totalRevenue)} delta={18.4} trend={trend7d}   icon={<Banknote className="size-4" />} />
        <StatCard label="Bookings (30d)"  value={String(totalBookings)}        delta={32.1} trend={bookings7d} icon={<Calendar className="size-4" />} />
        <StatCard label="Avg rating"      value="4.9"                          delta={1.2}  trend={[4.6,4.7,4.8,4.8,4.9,4.9,4.9]} icon={<Star className="size-4" />} />
        <StatCard label="Listing views"   value="13,420"                       delta={-4.8} trend={[1900,2100,2000,2200,1950,1800,2050]} icon={<Eye className="size-4" />} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mb-8">
        <Card>
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h2 className="font-semibold">Revenue, last 30 days</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Daily gross, before fees.</p>
            </div>
            <Badge variant="brand">+18.4%</Badge>
          </div>
          <CardContent className="p-5">
            <BarMini
              data={vendorRevenue30d.map((p) => ({ label: p.date, value: p.value }))}
              height={180}
            />
          </CardContent>
        </Card>

        <Card>
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold">Revenue by product type</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Share of last-30-day GMV.</p>
          </div>
          <CardContent className="p-5 flex flex-col items-center gap-5">
            <Donut
              segments={revenueByCat}
              size={170}
              thickness={22}
              centerLabel={
                <>
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="font-display text-lg font-bold">{formatCurrency(totalRevenue)}</div>
                </>
              }
            />
            <ul className="w-full space-y-2 text-sm">
              {revenueByCat.map((r) => (
                <li key={r.label} className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-3 rounded-full" style={{ background: r.color }} />
                    {r.label}
                  </span>
                  <span className="font-semibold">{r.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming bookings + Top listings */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold">Today &amp; tomorrow</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/vendor/bookings">All <ArrowRight className="size-3.5" /></Link>
            </Button>
          </div>
          <CardContent className="p-0 divide-y divide-border">
            {vendorBookings.filter((b) => b.status !== "Completed").slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-start gap-4 p-4">
                <Avatar className="size-10">
                  <AvatarFallback gradient={b.gradient}>{b.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{b.service}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {b.customer} · {new Date(b.at).toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })}
                  </div>
                </div>
                <Badge variant={b.status === "Confirmed" ? "brand" : "default"}>{b.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold">Top listings</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/vendor/listings">Manage <ArrowRight className="size-3.5" /></Link>
            </Button>
          </div>
          <CardContent className="p-0 divide-y divide-border">
            {vendorListings.filter((l) => l.status === "Published").slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center gap-3 p-4">
                <div className="size-10 rounded-lg bg-gradient-to-br from-brand to-secondary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{l.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {l.sales} sales · {l.views30d.toLocaleString()} views (30d)
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold">{formatCurrency(l.priceCents / 100)}</div>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-0.5">
                    <Star className="size-3 fill-accent-strong text-accent-strong" strokeWidth={0} />
                    {l.rating.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Promo */}
      <Card className="mt-6 overflow-hidden bg-gradient-to-r from-brand/10 via-secondary/10 to-accent/10 border-brand/20">
        <CardContent className="p-6 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-brand text-brand-foreground">
              <Sparkles className="size-5" />
            </span>
            <div>
              <div className="font-semibold">Boost a listing</div>
              <div className="text-sm text-muted-foreground">Featured placement for 7 days · $29 flat.</div>
            </div>
          </div>
          <Button asChild variant="gradient" size="md">
            <Link href="/vendor/listings">Boost a listing <ArrowRight className="size-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
