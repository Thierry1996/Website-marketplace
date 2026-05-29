"use client";

import { useState, useTransition } from "react";
import { Apple, Check, ArrowRight, ShieldCheck, Sparkles, CalendarClock } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { fiatMethods, cryptoMethods } from "@/lib/payments";
import { startFreeTrial } from "@/lib/actions/trial";
import { cn, formatCurrency } from "@/lib/utils";

const PLANS = [
  { id: "starter", name: "Starter", priceCents: 2900,  blurb: "Launch your first storefront" },
  { id: "pro",     name: "Pro",     priceCents: 7900,  blurb: "Most popular — full growth suite", popular: true },
  { id: "studio",  name: "Studio",  priceCents: 14900, blurb: "Unlimited, for agencies" },
] as const;

const ALL_METHODS = [...fiatMethods, ...cryptoMethods];

export function TrialCheckout() {
  const [plan, setPlan] = useState<(typeof PLANS)[number]["id"]>("pro");
  const [method, setMethod] = useState("stripe");
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();

  const selectedPlan = PLANS.find((p) => p.id === plan)!;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Enter a valid email to start your trial."); return; }
    startTransition(async () => {
      const res = await startFreeTrial({ email, plan, method });
      if (res.success) {
        toast.success("Trial starting — $0 today!");
        window.location.href = res.data.url;
      } else {
        toast.error(res.error.formError ?? "Could not start trial.");
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] items-start">
      {/* Left — choices */}
      <form onSubmit={submit}>
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-7">
            <Badge variant="brand" className="px-3 py-1.5">
              <Sparkles className="size-3" /> 7 days free · $0 due today
            </Badge>

            {/* Plan */}
            <fieldset className="space-y-3">
              <Label className="text-sm font-semibold">1. Choose your plan</Label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={cn(
                      "relative text-left rounded-xl border p-3.5 transition",
                      plan === p.id ? "border-brand bg-brand-soft/40 ring-1 ring-brand" : "border-border hover:border-foreground/30"
                    )}
                  >
                    {p.popular && (
                      <span className="absolute -top-2 right-2 rounded-full bg-brand px-2 py-0.5 text-[0.6rem] font-bold text-white">POPULAR</span>
                    )}
                    <div className="font-display font-bold">{p.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.blurb}</div>
                    <div className="mt-2 text-sm font-semibold">
                      {formatCurrency(p.priceCents / 100)}<span className="text-xs font-normal text-muted-foreground">/mo after trial</span>
                    </div>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Payment method */}
            <fieldset className="space-y-3">
              <Label className="text-sm font-semibold">2. Pick your auto-deduction method</Label>
              <p className="text-xs text-muted-foreground -mt-1">We'll save this and only charge it when your free trial ends — cancel anytime before.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {ALL_METHODS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMethod(m.key)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2.5 transition",
                      method === m.key ? "border-brand bg-brand-soft/40 ring-1 ring-brand" : "border-border hover:border-foreground/30"
                    )}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-md text-white text-xs font-bold" style={{ background: m.color }}>
                      {m.key === "applepay" ? <Apple className="size-3.5 fill-white" /> : m.glyph}
                    </span>
                    <span className="text-xs font-semibold truncate">{m.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Email */}
            <fieldset className="space-y-2">
              <Label htmlFor="trial-email" className="text-sm font-semibold">3. Your email</Label>
              <Input id="trial-email" type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </fieldset>

            <Button type="submit" variant="brand" size="xl" className="w-full" disabled={pending}>
              {pending ? "Starting…" : "Start my 7-day free trial"}
              {!pending && <ArrowRight className="size-4" />}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              $0 today. We'll email you 2 days before your trial ends. Cancel anytime in one click.
            </p>
          </CardContent>
        </Card>
      </form>

      {/* Right — summary + trust */}
      <div className="space-y-5 lg:sticky lg:top-24">
        <Card className="overflow-hidden">
          <div className="bg-[linear-gradient(135deg,rgb(var(--brand)),rgb(var(--accent)))] p-5 text-white">
            <div className="flex items-center gap-2 text-sm font-medium opacity-90">
              <CalendarClock className="size-4" /> Trial summary
            </div>
            <div className="mt-2 font-display text-3xl font-extrabold">$0.00<span className="text-base font-medium opacity-80"> due today</span></div>
          </div>
          <CardContent className="p-5 space-y-3 text-sm">
            <Row label={`${selectedPlan.name} plan`} value="Free for 7 days" />
            <Row label="Then" value={`${formatCurrency(selectedPlan.priceCents / 100)}/mo`} />
            <Row label="Auto-deduction" value={ALL_METHODS.find((m) => m.key === method)?.label ?? "—"} />
            <Separator />
            <ul className="space-y-2 pt-1">
              {["All features unlocked during trial","Cancel anytime — one click","No charge if you cancel before day 7"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="size-4 mt-0.5 text-brand shrink-0" strokeWidth={3} /> {t}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 rounded-lg bg-surface p-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-success shrink-0" />
              Secured with 256-bit encryption. Your payment details are tokenized.
            </div>
          </CardContent>
        </Card>

        <TrustBadges variant="grid" />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
