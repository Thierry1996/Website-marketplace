import type { Metadata } from "next";
import { Calendar } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VendorBookingRow } from "@/lib/dashboard-data";
import { getVendorBookings } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Vendor bookings" };

function BookingsTable({ rows }: { rows: VendorBookingRow[] }) {
  if (rows.length === 0) {
    return (
      <Card className="p-10 text-center text-sm text-muted-foreground">
        No bookings in this view.
      </Card>
    );
  }
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Total</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t border-border hover:bg-surface/40">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback gradient={b.gradient}>{b.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{b.customer}</div>
                      <div className="text-xs text-muted-foreground font-mono">{b.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{b.service}</td>
                <td className="p-4 text-muted-foreground">
                  <div className="inline-flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {new Date(b.at).toLocaleDateString("en", { month: "short", day: "numeric" })} ·{" "}
                    {new Date(b.at).toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })}
                  </div>
                </td>
                <td className="p-4 text-right font-semibold">{formatCurrency(b.totalCents / 100)}</td>
                <td className="p-4">
                  <Badge
                    variant={
                      b.status === "Cancelled" ? "danger"
                      : b.status === "Completed" ? "default"
                      : b.status === "Requested" ? "outline"
                      : "brand"
                    }
                  >
                    {b.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  {b.status === "Requested" ? (
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-danger">Decline</Button>
                      <Button variant="brand" size="sm">Confirm</Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm">View</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default async function VendorBookingsPage() {
  const vendorBookings = await getVendorBookings();
  const requested = vendorBookings.filter((b) => b.status === "Requested");
  const confirmed = vendorBookings.filter((b) => b.status === "Confirmed");
  const completed = vendorBookings.filter((b) => b.status === "Completed");

  return (
    <DashboardShell role="vendor" title="Bookings">
      <DashboardPageHeader
        title="Bookings"
        description="Manage incoming requests, confirm appointments, and review history."
      />

      <Tabs defaultValue="requested">
        <TabsList>
          <TabsTrigger value="requested">Requested ({requested.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({confirmed.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="requested"><BookingsTable rows={requested} /></TabsContent>
        <TabsContent value="confirmed"><BookingsTable rows={confirmed} /></TabsContent>
        <TabsContent value="completed"><BookingsTable rows={completed} /></TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
