import {
  ShieldCheck, Lock, CreditCard, BadgeCheck, ScanFace, Globe,
} from "lucide-react";

import { trustBadges, type TrustBadge } from "@/lib/payments";
import { cn } from "@/lib/utils";

const ICONS = {
  shield: ShieldCheck,
  lock:   Lock,
  card:   CreditCard,
  check:  BadgeCheck,
  scan:   ScanFace,
  globe:  Globe,
} as const;

export function TrustBadges({ className, variant = "row" }: { className?: string; variant?: "row" | "grid" }) {
  return (
    <div
      className={cn(
        variant === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 gap-3"
          : "flex flex-wrap items-center justify-center gap-3",
        className
      )}
    >
      {trustBadges.map((b: TrustBadge) => {
        const Icon = ICONS[b.icon];
        return (
          <div
            key={b.key}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-sm"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[linear-gradient(135deg,rgb(var(--success)/0.15),rgb(var(--electric)/0.15))] text-success">
              <Icon className="size-4.5" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight">{b.label}</div>
              <div className="text-[0.7rem] text-muted-foreground leading-tight">{b.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
