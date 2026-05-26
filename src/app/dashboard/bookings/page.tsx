import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type BookingRecord } from "@/lib/dashboard-data";
import { getMyBookings } from "@/lib/queries";

export const metadata: Metadata = { title: "Bookings" };

function BookingRow({ b }: { b: BookingRecord }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0 flex items-stretch">
        <div className="w-2" style={{ background: b.gradient }} />
        <div className="flex-1 flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="min-w-0 flex-1">
            <div className="font-semibold leading-tight">{b.service}</div>
            <div className="text-xs text-muted-foreground mt-1">By {b.provider} · {b.durationMin} min</div>
            <div className="mt-2 text-sm">
              <Calendar className="size-3.5 inline mr-1 align-text-bottom text-muted-foreground" />
              {new Date(b.at).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              <span className="mx-2 text-muted-foreground">·</span>
              {new Date(b.at).toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={b.status === "cancelled" ? "danger" : b.status === "completed" ? "default" : "brand"}
              className="capitalize"
            >
              {b.status}
            </Badge>
            <Button asChild variant="ghost" size="sm">
              <Link href={`#${b.id}`}>Manage <ChevronRight className="size-3.5" /></Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function BookingsPage() {
  const all = await getMyBookings();
  const upcoming = all.filter((b) => b.status === "upcoming");
  const completed = all.filter((b) => b.status === "completed");

  return (
    <DashboardShell role="user" title="Bookings">
      <DashboardPageHeader
        title="Bookings"
        description="Appointments with services and experts on Marketly."
        actions={
          <Button asChild variant="gradient" size="md">
            <Link href="/services">Find a service <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.length === 0 ? (
            <Card>
              <CardContent className="p-10 text-center text-sm text-muted-foreground">
                No upcoming bookings. <Link href="/services" className="text-brand hover:underline">Browse services</Link>.
              </CardContent>
            </Card>
          ) : (
            upcoming.map((b) => <BookingRow key={b.id} b={b} />)
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completed.map((b) => <BookingRow key={b.id} b={b} />)}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
