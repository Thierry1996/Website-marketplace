import type { Metadata } from "next";
import { Search, Download, MoreHorizontal } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { adminUsers } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Users — admin" };

export default function AdminUsersPage() {
  return (
    <DashboardShell role="admin" title="Users">
      <DashboardPageHeader
        title="Users"
        description={`${adminUsers.length} accounts · platform-wide`}
        actions={<Button variant="outline" size="md"><Download className="size-4" /> Export</Button>}
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9 h-9" />
          </div>
          {["All", "Customer", "Vendor", "Admin"].map((s) => (
            <Button key={s} variant={s === "All" ? "outline" : "ghost"} size="sm">{s}</Button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium" />
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((u) => (
                <tr key={u.id} className="border-t border-border hover:bg-surface/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback gradient={u.gradient}>{u.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{u.email}</td>
                  <td className="p-4">
                    <Badge variant={u.role === "Admin" ? "danger" : u.role === "Vendor" ? "secondary" : "default"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(u.joinedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="p-4">
                    <Badge variant={u.status === "Suspended" ? "danger" : u.status === "Pending" ? "outline" : "brand"}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal className="size-4" /></Button>
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
