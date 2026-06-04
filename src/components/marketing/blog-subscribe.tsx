"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Gift } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Blog subscribe funnel — converts a reader into a trial subscriber. Captures
 * email, then routes to the $0 trial flow with it prefilled.
 */
export function BlogSubscribe({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Enter a valid email."); return; }
    setDone(true);
    toast.success("You're in — let's get you growing.");
    window.location.href = `/start-trial?email=${encodeURIComponent(email)}`;
  }

  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-brand/20 bg-brand-soft/30 p-5"
          : "relative overflow-hidden rounded-[2rem] bg-ink p-8 sm:p-12 text-white"
      }
    >
      {!compact && <div aria-hidden className="absolute inset-0 aurora opacity-40" />}
      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className={compact
            ? "inline-flex items-center gap-1.5 text-xs font-semibold text-brand"
            : "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur"}>
            <Gift className={compact ? "size-3.5 text-brand" : "size-3.5 text-[rgb(var(--lime))]"} />
            Free growth playbooks + 7-day trial
          </span>
          <h3 className={compact
            ? "mt-2 font-display text-lg font-bold"
            : "mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight"}>
            Get the strategies that grow real businesses — in your inbox.
          </h3>
          {!compact && (
            <p className="mt-2 text-white/75 max-w-lg">
              Join 10,000+ founders getting Reach&apos;s growth playbooks, AI automation tactics, and update releases. Start your free trial in one click.
            </p>
          )}
        </div>

        <form onSubmit={submit} className="space-y-2.5">
          <div className={compact ? "flex flex-col sm:flex-row gap-2" : "rounded-2xl bg-white/10 p-2 backdrop-blur-xl border border-white/15"}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@business.com"
              required
              aria-label="Email"
              className={compact ? "h-11 sm:flex-1" : "h-12 border-0 bg-white text-foreground"}
            />
            <Button type="submit" variant="brand" size="lg" disabled={done} className={compact ? "" : "mt-2 w-full"}>
              {done ? <><Check className="size-4" /> Done</> : <>Subscribe &amp; start free <ArrowRight className="size-4" /></>}
            </Button>
          </div>
          <p className={compact ? "text-xs text-muted-foreground" : "text-center text-xs text-white/60"}>
            No spam. Unsubscribe anytime.{" "}
            <Link href="/pricing" className="underline hover:opacity-80">See pricing</Link>
          </p>
        </form>
      </div>
      {!compact && <Sparkles aria-hidden className="absolute right-6 top-6 size-5 text-white/30" />}
    </div>
  );
}
