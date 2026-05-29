"use client";

import { useState, useTransition } from "react";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createLead } from "@/lib/actions/leads";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "E-commerce", "Beauty / Salon", "Restaurant / Food", "Fitness / Gym",
  "Wellness / Spa", "Consulting", "Agency", "Real Estate",
  "Education", "Health", "Local Service", "Other",
];

const BUDGETS = [
  { label: "Under $1k / mo",   value: 50000  },
  { label: "$1k – $5k / mo",   value: 250000 },
  { label: "$5k – $15k / mo",  value: 1000000 },
  { label: "$15k+ / mo",       value: 1500000 },
];

const CHANNELS = ["Facebook", "Instagram", "TikTok", "Google Ads", "Pinterest", "WhatsApp", "SEO", "Email"];

const GOALS = ["More leads", "More sales", "Brand awareness", "Launch a product", "Fix our funnel", "Manage social"];

export function LeadCaptureForm({ source = "home-hero" }: { source?: string }) {
  const [channels, setChannels] = useState<string[]>([]);
  const [goals, setGoals]       = useState<string[]>([]);
  const [budget, setBudget]     = useState<number>(BUDGETS[1].value);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  function toggle(arr: string[], setter: (a: string[]) => void, value: string) {
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createLead({
        name:      fd.get("name"),
        email:     fd.get("email"),
        phone:     fd.get("phone")    || undefined,
        company:   fd.get("company"),
        industry,
        monthlyBudgetCents: budget,
        channels,
        goals,
        challenge: fd.get("challenge") || undefined,
        source,
      });
      if (res.success) {
        setSubmitted(true);
        toast.success("Got it! We'll be in touch within 24 hours.");
      } else {
        toast.error(res.error.formError ?? "Couldn't submit — please try again.");
      }
    });
  }

  if (submitted) {
    return (
      <Card className="border-brand/30 bg-brand-soft/40">
        <CardContent className="p-10 text-center space-y-4">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg">
            <Check className="size-6" />
          </div>
          <h3 className="font-display text-xl font-bold">You're in. We'll be in touch.</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            One of our growth strategists will email or call you within <b>24 business hours</b>
            with a tailored plan for your business.
          </p>
          <p className="text-xs text-muted-foreground">
            In a hurry? Email <a className="text-brand hover:underline" href="mailto:hello@reach.com">hello@reach.com</a>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-brand/20">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Badge variant="brand"><Sparkles className="size-3" /> Free strategy call · 24-hour reply</Badge>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-success" /> Your data is encrypted & private
          </span>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lead-name">Your name *</Label>
              <Input id="lead-name" name="name" placeholder="Jane Founder" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="lead-email">Work email *</Label>
              <Input id="lead-email" name="email" type="email" placeholder="you@business.com" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="lead-phone">Phone (optional)</Label>
              <Input id="lead-phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="lead-company">Business name *</Label>
              <Input id="lead-company" name="company" placeholder="Your business" required className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="lead-industry">Industry</Label>
              <select
                id="lead-industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface-elevated px-3 text-sm"
              >
                {INDUSTRIES.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
          </div>

          <fieldset className="space-y-2">
            <Label>Monthly marketing budget</Label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBudget(b.value)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                    budget === b.value ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <Label>Channels you're focused on (pick any)</Label>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggle(channels, setChannels, c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    channels.includes(c) ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <Label>What are you trying to accomplish? (pick any)</Label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggle(goals, setGoals, g)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    goals.includes(g) ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <Label htmlFor="lead-challenge">Biggest challenge right now (optional)</Label>
            <Textarea
              id="lead-challenge"
              name="challenge"
              rows={3}
              placeholder="The one thing you wish would magically fix itself…"
              className="mt-1.5"
            />
          </div>

          <Button type="submit" variant="brand" size="xl" disabled={pending} className="w-full">
            {pending ? "Sending…" : "Get my free strategy call"}
            {!pending && <ArrowRight className="size-4" />}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No spam, ever. We only use your details to call or email with a tailored plan.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
