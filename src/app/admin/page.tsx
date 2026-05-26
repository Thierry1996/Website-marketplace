import type { Metadata } from "next";
import Link from "next/link";
import { Users, Building2, ShoppingBag, Banknote, ShieldAlert, ArrowRight } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/charts/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarMini } from "@/components/charts/bar-mini";
import { getPlatformRevenue30d, getAdminFlags, getAdminVendors } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin overview" };

export default async function AdminOverviewPage() {
  const [platformRevenue30d, adminListingFlags, adminVendors] = await Promise.all([
    getPlatformRevenue30d(),
    getAdminFlags(),
    getAdminVendors(),
  ]);

  const totalGmv = platformRevenue30d.reduce((s, p) => s + p.value, 0);
  const trend7 = platformRevenue30d.slice(-7).map((p) => p.value);
  const pendingVendors = adminVendors.filter((v) => v.status === "Pending");

  return (
    <DashboardShell role="admin" title="Admin overview">
      <DashboardPageHeader
        title="Platform overview"
        description="Last 30 days · all currencies converted to USD."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="GMV (30d)"           value={formatCurrency(totalGmv)}    delta={24.8} trend={trend7} icon={<Banknote className="size-4" />} />
        <StatCard label="Active vendors"      value="1,284"                        delta={6.2}  trend={[1180,1210,1230,1250,1255,1270,1284]} icon={<Building2 className="size-4" />} />
        <StatCard label="Active users"        value="42,910"                       delta={3.4}  trend={[39800,40500,41100,41600,42000,42500,42910]} icon={<Users className="size-4" />} />
        <StatCard label="Orders (30d)"        value="8,217"                        delta={11.4} trend={[1050,1100,1150,1200,1180,1240,1297]} icon={<ShoppingBag className="size-4" />} />
      </div>

      <Card className="mb-8">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Platform GMV · last 30 days</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Daily gross merchandise value, all vendors combined.</p>
          </div>
          <Badge variant="brand">+24.8%</Badge>
        </div>
        <CardContent className="p-5">
          <BarMini data={platformRevenue30d.map((p) => ({ label: p.date, value: p.value }))} height={220} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending vendors */}
        <Card>
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-brand" />
              <h2 className="font-semibold">Pending vendor approvals</h2>
              <Badge variant="outline">{pendingVendors.length}</Badge>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/vendors">All <ArrowRight className="size-3.5" /></Link>
            </Button>
          </div>
          <CardContent className="p-0 divide-y divide-border">
            {pendingVendors.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground text-center">No pending vendors.</div>
            ) : (
              pendingVendors.map((v) => (
                <div key={v.id} className="flex items-center gap-4 p-4">
                  <Avatar className="size-10">
                    <AvatarFallback gradient={v.gradient}>{v.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{v.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {v.category} · joined {new Date(v.joinedAt).toLocaleDateString("en", { month: "short", day: "numeric" })}
                    </div>
                  </div>
                  <Button variant="brand" size="sm">Review</Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Flagged listings */}
        <Card>
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-4 text-danger" />
              <h2 className="font-semibold">Flagged listings</h2>
              <Badge variant="danger">{adminListingFlags.length}</Badge>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/moderation">All <ArrowRight className="size-3.5" /></Link>
            </Button>
          </div>
          <CardContent className="p-0 divide-y divide-border">
            {adminListingFlags.map((f) => (
              <div key={f.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{f.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">by {f.vendor}</div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{new Date(f.reportedAt).toLocaleDateString("en", { month: "short", day: "numeric" })}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">Reason:</span> {f.reason} ·{" "}
                  <span className="text-muted-foreground/70">{f.reporter}</span>
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="ghost" size="sm">Dismiss</Button>
                  <Button variant="destructive" size="sm">Hide listing</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
