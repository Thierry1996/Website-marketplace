"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import type { NavSection } from "@/lib/nav";

export function MegaMenu({ sections }: { sections: NavSection[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
    >
      <div className="w-[640px] max-w-[92vw] rounded-2xl border border-border bg-surface-elevated p-6 shadow-2xl shadow-black/5">
        <div className="grid grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.heading}
              </div>
              <div className="space-y-1">
                {section.items.map(({ icon: Icon, ...item }) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-3 rounded-lg p-3 hover:bg-surface transition-colors"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-md bg-brand-soft text-brand">
                      {Icon ? <Icon className="size-4" /> : <Sparkles className="size-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2 text-sm font-medium">
                        {item.label}
                        <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                      </span>
                      {item.description && (
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-brand-soft via-secondary-soft to-accent-soft p-4">
          <div>
            <div className="text-sm font-semibold">New here?</div>
            <div className="text-xs text-muted-foreground">Get 3 free listings on Reach</div>
          </div>
          <Link
            href="/sign-up"
            className="text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1"
          >
            Start free <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
