"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const SPECIALTIES = ["Funnel & conversion", "Brand & design", "Engineering", "Paid acquisition", "Ops & bookings", "Email & lifecycle", "SEO & content"];
const BUDGETS = ["<$1k", "$1k – $5k", "$5k – $15k", "$15k+"];
const TIMELINES = ["This week", "This month", "Next 90 days", "Just exploring"];

export function ProjectBriefForm() {
  const [specialty, setSpecialty] = useState<string>(SPECIALTIES[0]);
  const [budget, setBudget] = useState<string>(BUDGETS[1]);
  const [timeline, setTimeline] = useState<string>(TIMELINES[1]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    if (!fd.get("email") || !fd.get("project")) {
      toast.error("Email and project description are required.");
      return;
    }
    setSubmitted(true);
    toast.success("Brief received! Expect matches within 24 hours.");
  }

  if (submitted) {
    return (
      <Card className="border-brand/30">
        <CardContent className="p-10 text-center space-y-4">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand text-brand-foreground">
            <Check className="size-6" />
          </div>
          <h2 className="font-display text-xl font-bold">Brief received</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We'll review and send 2-3 matched experts within 24 business hours.
            Keep an eye on your inbox.
          </p>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Submit another brief
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 sm:p-8 space-y-6">
        <Badge variant="brand"><Sparkles className="size-3" /> Free matching · No platform fee</Badge>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" placeholder="Jane Founder" className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@business.com" className="mt-2" required />
            </div>
          </div>

          <div>
            <Label htmlFor="company">Company / project name</Label>
            <Input id="company" name="company" placeholder="e.g. Studio Lumière" className="mt-2" />
          </div>

          <fieldset className="space-y-2">
            <Label>Specialty needed</Label>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpecialty(s)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    specialty === s ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <Label>Budget</Label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    budget === b ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <Label>Timeline</Label>
            <div className="flex flex-wrap gap-2">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeline(t)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    timeline === t ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <Label htmlFor="project">Project description</Label>
            <Textarea
              id="project"
              name="project"
              required
              placeholder="What are you trying to accomplish? Any context that would help us match — current stack, traffic, goals."
              className="mt-2 min-h-[140px]"
            />
          </div>

          <Button type="submit" variant="gradient" size="lg" className="w-full">
            Send my brief <ArrowRight className="size-4" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to Marketly's terms. We never share your details without your permission.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
