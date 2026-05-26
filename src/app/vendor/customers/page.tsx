import type { Metadata } from "next";
import { Mail, MessageSquare, Download } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getVendorCustomers } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Customers" };

export default async function CustomersPage() {
  const vendorCustomers = await getVendorCustomers();
  return (
    <DashboardShell role="vendor" title="Customers">
      <DashboardPageHeader
        title="Customers"
        description={`${vendorCustomers.length} unique customers · ${vendorCustomers.reduce((s, c) => s + c.bookings, 0)} bookings total`}
        actions={
          <Button variant="outline" size="md">
            <Download className="size-4" /> Export
          </Button>
        }
      />

      <Card>
        <div className="p-4 border-b border-border">
          <Input placeholder="Search by name or email..." className="h-9 max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium text-right">Total spent</th>
                <th className="p-4 font-medium text-right">Bookings</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {vendorCustomers.map((c) => (
                <tr key={c.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback gradient={c.gradient}>{c.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{c.email}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(c.totalSpentCents / 100)}</td>
                  <td className="p-4 text-right">{c.bookings}</td>
                  <td className="p-4 text-muted-foreground">{new Date(c.joinedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" aria-label="Email customer"><Mail className="size-4" /></Button>
                      <Button variant="ghost" size="icon" aria-label="Message customer"><MessageSquare className="size-4" /></Button>
                    </div>
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
