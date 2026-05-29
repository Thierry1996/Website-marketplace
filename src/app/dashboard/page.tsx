import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ShoppingBag, Heart, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { CampaignStats } from "@/components/dashboard/campaign-stats";
import { StatCard } from "@/components/charts/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getMyOrders, getMyBookings, getMyMessages } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Your dashboard" };

export default async function UserDashboardPage() {
  const [orders, bookings, messages] = await Promise.all([
    getMyOrders(),
    getMyBookings(),
    getMyMessages(),
  ]);
  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const recentOrders = orders.slice(0, 4);
  const unreadCount = messages.reduce((s, m) => s + m.unread, 0);

  return (
    <DashboardShell role="user" title="Dashboard">
      <DashboardPageHeader
        title="Welcome back, Jane"
        description="Here's what's happening with your Reach account."
        actions={
          <Button asChild variant="gradient" size="md">
            <Link href="/marketplace">Browse marketplace <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          label="Active bookings"
          value={String(upcoming.length)}
          delta={50}
          trend={[2, 1, 3, 2, 4, 3, 4]}
          icon={<Calendar className="size-4" />}
        />
        <StatCard
          label="Orders this year"
          value={String(orders.length)}
          delta={12.5}
          trend={[1, 2, 1, 3, 2, 4, 5]}
          icon={<ShoppingBag className="size-4" />}
        />
        <StatCard
          label="Saved items"
          value="14"
          delta={3.2}
          trend={[8, 9, 10, 11, 12, 13, 14]}
          icon={<Heart className="size-4" />}
        />
        <StatCard
          label="Unread messages"
          value={String(unreadCount)}
          delta={-25}
          trend={[5, 6, 4, 5, 3, 4, 3]}
          icon={<MessageSquare className="size-4" />}
        />
      </div>

      {/* Campaign stats — full-width */}
      <CampaignStats
        leadsThisMonth={428}
        leadsTrend={[210, 245, 268, 295, 322, 360, 428]}
        spendingCents={185000}
        budgetCents={300000}
        creditsCents={425000}
        revenueThisMonthCents={2820000}
        className="mb-6"
      />

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Upcoming bookings */}
        <Card>
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-brand" />
              <h2 className="font-semibold">Upcoming bookings</h2>
              <Badge variant="brand">{upcoming.length}</Badge>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/bookings">View all <ArrowRight className="size-3.5" /></Link>
            </Button>
          </div>
          <CardContent className="p-0 divide-y divide-border">
            {upcoming.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No upcoming bookings.{" "}
                <Link href="/services" className="text-brand hover:underline">Browse services</Link>
              </div>
            ) : (
              upcoming.map((b) => (
                <div key={b.id} className="flex items-start gap-4 p-5">
                  <div className="size-12 rounded-xl shrink-0" style={{ background: b.gradient }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold leading-tight">{b.service}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">By {b.provider}</div>
                    <div className="mt-1.5 text-xs text-muted-foreground">
                      {new Date(b.at).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })} ·{" "}
                      {new Date(b.at).toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })}
                    </div>
                  </div>
                  <Badge variant="brand" className="capitalize">{b.status}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Messages preview */}
        <Card>
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-brand" />
              <h2 className="font-semibold">Recent messages</h2>
              {unreadCount > 0 && <Badge variant="brand">{unreadCount} new</Badge>}
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/messages">All <ArrowRight className="size-3.5" /></Link>
            </Button>
          </div>
          <CardContent className="p-0 divide-y divide-border">
            {messages.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-start gap-3 p-4">
                <Avatar className="size-9">
                  <AvatarFallback gradient={m.gradient}>{m.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold truncate">{m.partner}</div>
                    <div className="text-xs text-muted-foreground">{m.lastAt}</div>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{m.preview}</div>
                </div>
                {m.unread > 0 && <span className="mt-1 size-2 rounded-full bg-brand" aria-label={`${m.unread} unread`} />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card className="mt-6">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-brand" />
            <h2 className="font-semibold">Recent orders</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/orders">All orders <ArrowRight className="size-3.5" /></Link>
          </Button>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-surface/40 transition-colors">
                  <td className="p-4 font-mono text-xs">{o.id}</td>
                  <td className="p-4">{o.vendor}</td>
                  <td className="p-4 max-w-[280px] truncate">{o.item}</td>
                  <td className="p-4 text-muted-foreground">{new Date(o.placedAt).toLocaleDateString("en", { month: "short", day: "numeric" })}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(o.totalCents / 100)}</td>
                  <td className="p-4">
                    <Badge
                      variant={o.status === "refunded" ? "danger" : o.status === "fulfilled" ? "brand" : "default"}
                      className="capitalize"
                    >
                      {o.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add-on / Discover */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 mb-6">
        <Card className="overflow-hidden bg-gradient-to-r from-brand/10 via-secondary/10 to-accent/10 border-brand/20">
          <CardContent className="p-6 space-y-3">
            <Badge variant="brand">Add-on bundle</Badge>
            <div>
              <div className="font-display font-bold text-lg">Add the Marketplace</div>
              <div className="text-sm text-muted-foreground mt-1">Unlock 1,200+ websites, services & code projects from vetted vendors. $19/mo, billed with your plan.</div>
            </div>
            <Button asChild variant="brand" size="md">
              <Link href="/marketplace">Browse marketplace <ArrowRight className="size-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Vendor CTA (legacy) */}
      <Card className="mt-6 overflow-hidden bg-gradient-to-r from-secondary/10 via-electric/10 to-brand/10 border-secondary/20">
        <CardContent className="p-6 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-secondary text-white">
              <Sparkles className="size-5" />
            </span>
            <div>
              <div className="font-semibold">Become a vendor</div>
              <div className="text-sm text-muted-foreground">Earn from your own storefront or service in under an hour.</div>
            </div>
          </div>
          <Button asChild variant="gradient" size="md">
            <Link href="/sell">Get started <ArrowRight className="size-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
