"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mainNav, footerSections } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
              {mainNav.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.sections && setOpenMenu(item.label)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2",
                      "font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em]",
                      "text-foreground/70 hover:text-brand transition-colors",
                      openMenu === item.label && "text-brand"
                    )}
                  >
                    {item.label}
                  </Link>

                  <AnimatePresence>
                    {openMenu === item.label && item.sections && (
                      <MegaMenu sections={item.sections} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search marketplace"
                placeholder="Search vendors, services..."
                className="h-10 w-64 pl-9 bg-surface"
              />
            </div>

            <Button asChild variant="ghost" size="icon" className="md:hidden" aria-label="Search">
              <Link href="/marketplace"><Search className="size-5" /></Link>
            </Button>

            <Button asChild variant="ghost" size="md" className="hidden sm:inline-flex">
              <Link href="/sign-in">Sign in</Link>
            </Button>

            <Button asChild variant="brand" size="md" className="hidden sm:inline-flex">
              <Link href="/start-trial">
                Reach my customers
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 right-0 z-[61] w-[88%] max-w-sm bg-background border-l border-border shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="size-5" />
                </Button>
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search the marketplace..." className="pl-9" />
                </div>

                <nav className="space-y-1">
                  {mainNav.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-surface"
                    >
                      {item.label}
                      <ArrowRight className="size-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-border pt-6 space-y-3">
                  <Button asChild variant="brand" size="lg" className="w-full">
                    <Link href="/start-trial" onClick={() => setMobileOpen(false)}>
                      Start free trial <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1 pt-2 text-sm">
                  {footerSections[0].links.map((l) => (
                    <Link key={l.href} href={l.href} className="py-2 text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-5 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
                <ShoppingBag className="size-3.5" /> Reach © {new Date().getFullYear()}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
