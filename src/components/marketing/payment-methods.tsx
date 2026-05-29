import { Apple } from "lucide-react";

import { fiatMethods, cryptoMethods, type PayMethod } from "@/lib/payments";
import { cn } from "@/lib/utils";

function MethodTile({ m }: { m: PayMethod }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-3.5 py-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-lg text-white font-bold text-sm"
        style={{ background: m.color }}
      >
        {m.key === "applepay" ? <Apple className="size-4 fill-white" /> : m.glyph}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold leading-tight">{m.label}</div>
        {m.note && <div className="text-[0.68rem] text-muted-foreground leading-tight">{m.note}</div>}
      </div>
    </div>
  );
}

export function PaymentMethods({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      <div>
        <div className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cards &amp; wallets
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {fiatMethods.map((m) => <MethodTile key={m.key} m={m} />)}
        </div>
      </div>

      <div>
        <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Stablecoins &amp; crypto
          <span className="rounded-full bg-lime/20 px-2 py-0.5 text-[0.62rem] text-[rgb(var(--accent-strong))] normal-case tracking-normal font-semibold">
            new
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {cryptoMethods.map((m) => <MethodTile key={m.key} m={m} />)}
        </div>
      </div>
    </div>
  );
}
