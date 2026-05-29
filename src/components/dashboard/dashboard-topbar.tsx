"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardSidebar } from "./dashboard-sidebar";
import type { DashRole } from "@/lib/dashboard-nav";

interface TopbarProps {
  role: DashRole;
  title?: string;
  /** Avatar initials + gradient. */
  user?: { name: string; initials: string; email: string };
}

const DEFAULT_USER = {
  user:   { name: "Jane Founder",   initials: "JF", email: "you@business.com" },
  vendor: { name: "Studio Lumière", initials: "SL", email: "vendor@studio.app" },
  admin:  { name: "Reach Admin", initials: "MA", email: "admin@reach.com" },
};

export function DashboardTopbar({ role, title, user }: TopbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  const u = user ?? DEFAULT_USER[role];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-5">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>

          {title && (
            <h1 className="font-display text-lg font-semibold tracking-tight hidden sm:block">{title}</h1>
          )}

          <div className="flex-1" />

          <div className="hidden md:flex relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." aria-label="Search" className="pl-9 h-9 w-72 bg-surface" />
          </div>

          <button
            aria-label="Notifications"
            className="relative grid size-9 place-items-center rounded-lg hover:bg-surface transition-colors"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-2 size-2 rounded-full bg-brand" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg pl-1 pr-2 py-1 hover:bg-surface transition-colors"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <Avatar className="size-8">
                <AvatarFallback gradient="linear-gradient(135deg,#10B981,#8B5CF6)">{u.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:flex items-center gap-1 text-sm font-medium">
                <span className="truncate max-w-[140px]">{u.name}</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </span>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} aria-hidden />
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-60 z-40 rounded-xl border border-border bg-surface-elevated shadow-xl p-2"
                  >
                    <div className="px-3 py-2.5 border-b border-border">
                      <div className="text-sm font-semibold">{u.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                      <Badge variant={role === "admin" ? "danger" : role === "vendor" ? "secondary" : "brand"} className="mt-2">
                        {role === "user" ? "Customer" : role === "vendor" ? "Vendor" : "Admin"}
                      </Badge>
                    </div>
                    <div className="py-1 text-sm">
                      <Link href="/dashboard"          className="block px-3 py-2 rounded-lg hover:bg-surface" onClick={() => setMenuOpen(false)}>Customer dashboard</Link>
                      <Link href="/vendor"             className="block px-3 py-2 rounded-lg hover:bg-surface" onClick={() => setMenuOpen(false)}>Vendor dashboard</Link>
                      <Link href="/admin"              className="block px-3 py-2 rounded-lg hover:bg-surface" onClick={() => setMenuOpen(false)}>Admin panel</Link>
                      <div className="my-1 h-px bg-border" />
                      <Link href="/dashboard/settings" className="block px-3 py-2 rounded-lg hover:bg-surface" onClick={() => setMenuOpen(false)}>Settings</Link>
                      <Link href="/contact"            className="block px-3 py-2 rounded-lg hover:bg-surface" onClick={() => setMenuOpen(false)}>Help & support</Link>
                      <div className="my-1 h-px bg-border" />
                      <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface text-danger" onClick={() => setMenuOpen(false)}>
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 left-0 z-[61] w-72 lg:hidden"
            >
              <DashboardSidebar role={role} variant="drawer" onNavigate={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
