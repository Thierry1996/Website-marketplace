"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ArrowLeft } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Badge } from "@/components/ui/badge";
import { navFor, type DashRole } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: DashRole;
  /** Hide chrome on mobile — drawer parent handles its own chrome. */
  variant?: "fixed" | "drawer";
  onNavigate?: () => void;
}

export function DashboardSidebar({ role, variant = "fixed", onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const groups = navFor(role);

  const isActive = (href: string) =>
    href === `/${role === "user" ? "dashboard" : role}`
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-surface-elevated",
        variant === "fixed" && "border-r border-border w-64"
      )}
    >
      {/* Brand + role badge */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-border">
        <Logo />
        <Badge variant={role === "admin" ? "danger" : role === "vendor" ? "secondary" : "default"}>
          {role === "user" ? "Account" : role === "vendor" ? "Vendor" : "Admin"}
        </Badge>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {groups.map((g, i) => (
          <div key={i}>
            {g.heading && (
              <div className="px-3 mb-2 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {g.heading}
              </div>
            )}
            <ul className="space-y-1">
              {g.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-foreground text-background shadow-sm"
                          : "text-foreground/75 hover:bg-surface hover:text-foreground"
                      )}
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={active ? 2 : 1.8} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
                            active ? "bg-background/15 text-background" : "bg-brand-soft text-brand"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to site
        </Link>
      </div>
    </aside>
  );
}
