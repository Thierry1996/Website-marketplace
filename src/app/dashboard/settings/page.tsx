import type { Metadata } from "next";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <DashboardShell role="user" title="Settings">
      <DashboardPageHeader
        title="Account settings"
        description="Update your profile, security, and notification preferences."
      />

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="font-display text-lg font-semibold">Profile</h2>
              <p className="text-sm text-muted-foreground mt-1">Public information shown across Reach.</p>
            </div>

            <Separator />

            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback gradient="linear-gradient(135deg,#10B981,#8B5CF6)">JF</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">Upload new picture</Button>
                <div className="text-xs text-muted-foreground mt-2">PNG / JPG · max 2MB</div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" defaultValue="Jane" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" defaultValue="Founder" className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="you@business.com" className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself..." className="mt-1.5" defaultValue="Founder, ambitious operator." />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="md">Cancel</Button>
              <Button variant="brand" size="md">Save profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="font-display text-lg font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground mt-1">Password, two-factor, and active sessions.</p>
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" placeholder="••••••••" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" placeholder="At least 8 characters" className="mt-1.5" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="brand" size="md">Update password</Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">Two-factor authentication</div>
                <div className="text-sm text-muted-foreground">Require a code from your authenticator app on each sign-in.</div>
              </div>
              <Button variant="outline" size="md">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="font-display text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground mt-1">Choose which emails Reach sends.</p>
            </div>
            <Separator />
            <div className="space-y-3 text-sm">
              {[
                ["Booking confirmations & reminders", true],
                ["Order and refund receipts",        true],
                ["New messages from vendors",        true],
                ["Weekly digest of new listings",    false],
                ["Reach product updates",         false],
              ].map(([label, on]) => (
                <label key={label as string} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <span>{label}</span>
                  <input type="checkbox" defaultChecked={on as boolean} className="size-4 rounded accent-[rgb(var(--brand))]" />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Danger */}
        <Card className="border-danger/30">
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-danger">Delete account</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Permanently delete your account, orders, and bookings. This action can't be undone.
              </p>
            </div>
            <Button variant="destructive" size="md">Delete my account</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
