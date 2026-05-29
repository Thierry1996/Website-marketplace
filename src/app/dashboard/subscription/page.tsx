import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Calendar, Check, Sparkles, ArrowRight } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Subscription" };

const invoices = [
  { id: "INV-204", date: "2026-05-01", amount: 79, status: "Paid" },
  { id: "INV-185", date: "2026-04-01", amount: 79, status: "Paid" },
  { id: "INV-166", date: "2026-03-01", amount: 79, status: "Paid" },
  { id: "INV-147", date: "2026-02-01", amount: 79, status: "Paid" },
];

export default function SubscriptionPage() {
  return (
    <DashboardShell role="user" title="Subscription">
      <DashboardPageHeader
        title="Subscription"
        description="Manage your Reach plan, payment method, and invoices."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Current plan */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge variant="brand"><Sparkles className="size-3" /> Pro plan</Badge>
                <h2 className="mt-3 font-display text-2xl font-bold">$79<span className="text-base font-medium text-muted-foreground"> / one-time</span></h2>
                <p className="text-sm text-muted-foreground mt-1">5 template licenses · priority support</p>
              </div>
              <Button asChild variant="outline" size="md">
                <Link href="/pricing">Change plan <ArrowRight className="size-4" /></Link>
              </Button>
            </div>

            <Separator />

            <ul className="space-y-2 text-sm">
              {[
                "5 template licenses with lifetime updates",
                "Vendor storefront with Stripe Connect",
                "Priority email support (replies in <4h)",
                "Commercial use across unlimited projects",
                "Source files included",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 text-brand shrink-0" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>

            <Separator />

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Calendar className="size-4" /> Renews on <span className="text-foreground font-medium">June 1, 2026</span>
              </div>
              <Button variant="ghost" size="sm" className="text-danger hover:text-danger">Cancel subscription</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment method */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold inline-flex items-center gap-2"><CreditCard className="size-4 text-brand" /> Payment method</h3>
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-sm">•••• •••• •••• 4242</div>
                  <div className="text-xs text-muted-foreground mt-1">Visa · expires 09/2028</div>
                </div>
                <Badge variant="default">Default</Badge>
              </div>
            </div>
            <Button variant="outline" size="md" className="w-full">Update payment method</Button>
            <p className="text-xs text-muted-foreground">
              Card processing via Stripe. Reach never stores card details on our servers.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card className="mt-6">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold">Invoices</h2>
          <Button variant="ghost" size="sm">Download all</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">Invoice</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4 font-mono text-xs">{i.id}</td>
                  <td className="p-4">{new Date(i.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="p-4 text-right font-semibold">${i.amount}.00</td>
                  <td className="p-4"><Badge variant="brand">{i.status}</Badge></td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">Download</Button>
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
