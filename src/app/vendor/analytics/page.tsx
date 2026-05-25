import type { Metadata } from "next";
import { TrendingUp, ShoppingCart, Users, Eye } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/charts/stat-card";
import { BarMini } from "@/components/charts/bar-mini";
import { Sparkline } from "@/components/charts/sparkline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vendorRevenue30d, vendorBookings30d } from "@/lib/dashboard-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  const revenue = vendorRevenue30d.reduce((s, p) => s + p.value, 0);
  const bookings = vendorBookings30d.reduce((s, p) => s + p.value, 0);

  const conversion = [
    { label: "Visit",      value: 13_420 },
    { label: "View",       value:  6_910 },
    { label: "Add to cart",value:  2_240 },
    { label: "Purchase",   value:    789 },
  ];

  const sources = [
    { label: "Direct",         value: 4_120 },
    { label: "Search",         value: 3_810 },
    { label: "Marketplace",    value: 3_010 },
    { label: "Referral",       value:   980 },
    { label: "Social",         value: 1_500 },
  ];

  return (
    <DashboardShell role="vendor" title="Analytics">
      <DashboardPageHeader
        title="Analytics"
        description="Performance across listings, conversion, and traffic sources."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Revenue"      value={formatCurrency(revenue)}  delta={18.4} trend={vendorRevenue30d.slice(-7).map((p) => p.value)} icon={<TrendingUp className="size-4" />} />
            <StatCard label="Bookings"     value={String(bookings)}         delta={32.1} trend={vendorBookings30d.slice(-7).map((p) => p.value)} icon={<ShoppingCart className="size-4" />} />
            <StatCard label="New customers" value="142"                     delta={8.7}  trend={[15,18,12,14,21,19,22]} icon={<Users className="size-4" />} />
            <StatCard label="Page views"   value="13,420"                   delta={-4.8} trend={[1950,2050,2100,2000,1900,1850,2000]} icon={<Eye className="size-4" />} />
          </div>

          <Card>
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold">Revenue · last 30 days</h2>
            </div>
            <CardContent className="p-5">
              <BarMini data={vendorRevenue30d.map((p) => ({ label: p.date, value: p.value }))} height={220} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="p-5 border-b border-border">
                <h2 className="font-semibold">Traffic sources (30d)</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Unique sessions by source.</p>
              </div>
              <CardContent className="p-5">
                <BarMini data={sources.map((s) => ({ label: s.label, value: s.value }))} height={200} />
              </CardContent>
            </Card>

            <Card>
              <div className="p-5 border-b border-border">
                <h2 className="font-semibold">Visits trend</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Last 30 days, daily.</p>
              </div>
              <CardContent className="p-5 flex flex-col items-start gap-4">
                <div className="font-display text-3xl font-bold">13,420</div>
                <Sparkline data={vendorRevenue30d.map((p) => p.value)} width={560} height={120} color="secondary" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold">Conversion funnel</h2>
              <p className="text-xs text-muted-foreground mt-0.5">From first visit to paid order, last 30 days.</p>
            </div>
            <CardContent className="p-5 space-y-4">
              {conversion.map((step, i) => {
                const pct = (step.value / conversion[0].value) * 100;
                const fromPrev = i === 0 ? null : (step.value / conversion[i - 1].value) * 100;
                return (
                  <div key={step.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{step.label}</span>
                      <span className="text-muted-foreground">
                        {step.value.toLocaleString()}{" "}
                        {fromPrev != null && (
                          <span className="ml-1 text-xs">({fromPrev.toFixed(1)}% conversion)</span>
                        )}
                      </span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand via-secondary to-accent rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
