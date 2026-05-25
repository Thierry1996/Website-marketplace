import type { Metadata } from "next";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = { title: "Vendor settings" };

export default function VendorSettingsPage() {
  return (
    <DashboardShell role="vendor" title="Vendor settings">
      <DashboardPageHeader title="Vendor settings" description="Storefront, branding, and policies." />

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="font-display text-lg font-semibold">Storefront</h2>
              <p className="text-sm text-muted-foreground mt-1">Public branding shown across your listings.</p>
            </div>
            <Separator />

            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback gradient="linear-gradient(135deg,#F472B6,#FBBF24)">SL</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">Upload logo</Button>
                <div className="text-xs text-muted-foreground mt-2">PNG / SVG · square · max 1MB</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="brand">Brand name</Label>
                <Input id="brand" defaultValue="Studio Lumière" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="slug">Vendor URL</Label>
                <div className="mt-1.5 flex items-center rounded-lg border border-border bg-surface-elevated overflow-hidden">
                  <span className="px-3 py-2 text-sm text-muted-foreground border-r border-border">marketly.app/</span>
                  <Input id="slug" defaultValue="studio-lumiere" className="border-0 rounded-none focus-visible:ring-0 shadow-none" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" defaultValue="Premium beauty booking — by appointment, by design." className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="vbio">About</Label>
                <Textarea id="vbio" defaultValue="Studio Lumière is a flagship beauty salon serving NYC since 2018. Our online booking platform brings the same level of polish to your service experience." className="mt-1.5 min-h-[120px]" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="md">Cancel</Button>
              <Button variant="brand" size="md">Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="font-display text-lg font-semibold">Booking policies</h2>
              <p className="text-sm text-muted-foreground mt-1">Defaults applied to every new bookable service.</p>
            </div>
            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cancel">Cancellation window</Label>
                <select id="cancel" className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated px-3 text-sm">
                  <option>24 hours</option>
                  <option>48 hours</option>
                  <option>72 hours</option>
                  <option>1 week</option>
                </select>
              </div>
              <div>
                <Label htmlFor="deposit">Deposit</Label>
                <select id="deposit" className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated px-3 text-sm">
                  <option>None</option>
                  <option>25%</option>
                  <option>50%</option>
                  <option>Full amount</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="noshow">No-show fee</Label>
                <Input id="noshow" defaultValue="$25" className="mt-1.5 max-w-xs" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="brand" size="md">Save policies</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
