"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/layout/logo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STEPS = ["Welcome", "Pick your role", "Tell us about you", "Done"];

const ROLES = [
  { id: "buyer",  title: "I'm here to buy",  desc: "Browse templates, book services, hire experts." },
  { id: "vendor", title: "I want to sell",   desc: "Launch a storefront, services, or templates." },
  { id: "expert", title: "I'm an expert",    desc: "Take direct client engagements on my profile." },
];

const INTERESTS = ["E-commerce","Beauty","Wellness","Food","Fitness","Salon","Cleaning","Digital","Consulting","Education"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("buyer");
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(s: string) {
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  }

  function next() { setStep((s) => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  function finish() {
    toast.success("You're all set. Welcome to Reach!");
    setStep(STEPS.length - 1);
  }

  return (
    <div className="min-h-dvh bg-surface/40">
      {/* Top bar */}
      <header className="flex items-center justify-between p-5 border-b border-border bg-background">
        <Logo />
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Skip for now</Link>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-12">
        {/* Step indicator */}
        <ol className="flex items-center justify-between mb-10">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1 flex items-center">
              <div
                className={cn(
                  "grid size-8 place-items-center rounded-full text-xs font-bold transition-colors",
                  i < step    ? "bg-brand text-brand-foreground"
                  : i === step ? "bg-foreground text-background"
                              : "bg-surface border border-border text-muted-foreground"
                )}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-2", i < step ? "bg-brand" : "bg-border")} />
              )}
            </li>
          ))}
        </ol>

        <Card>
          <CardContent className="p-8 space-y-6">
            {step === 0 && (
              <>
                <Badge variant="brand"><Sparkles className="size-3" /> Welcome aboard</Badge>
                <h1 className="font-display text-2xl sm:text-3xl font-bold">Let's get Reach set up for you</h1>
                <p className="text-muted-foreground">Three quick questions — under 60 seconds — to tailor your dashboard.</p>
                <div className="flex justify-end">
                  <Button variant="gradient" size="lg" onClick={next}>
                    Get started <ArrowRight className="size-4" />
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="font-display text-2xl sm:text-3xl font-bold">What brings you to Reach?</h1>
                <p className="text-muted-foreground text-sm">You can change this later.</p>
                <div className="space-y-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "w-full text-left flex items-center justify-between gap-3 rounded-xl border p-4 transition",
                        role === r.id ? "border-brand bg-brand-soft/40" : "border-border hover:bg-surface"
                      )}
                    >
                      <div>
                        <div className="font-semibold">{r.title}</div>
                        <div className="text-sm text-muted-foreground">{r.desc}</div>
                      </div>
                      <div className={cn("size-5 rounded-full border-2 flex items-center justify-center", role === r.id ? "border-brand bg-brand" : "border-border")}>
                        {role === r.id && <Check className="size-3 text-brand-foreground" strokeWidth={3} />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" size="md" onClick={back}><ArrowLeft className="size-4" /> Back</Button>
                  <Button variant="gradient" size="md" onClick={next}>Continue <ArrowRight className="size-4" /></Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="font-display text-2xl sm:text-3xl font-bold">Personalize your feed</h1>
                <p className="text-muted-foreground text-sm">Pick the industries you care about.</p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => {
                    const on = picked.includes(i);
                    return (
                      <button
                        key={i}
                        onClick={() => toggle(i)}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                          on ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted-foreground hover:border-foreground/30"
                        )}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-3 pt-2">
                  <div>
                    <Label htmlFor="ob-name">Display name</Label>
                    <Input id="ob-name" placeholder="Jane Founder" className="mt-1.5" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" size="md" onClick={back}><ArrowLeft className="size-4" /> Back</Button>
                  <Button variant="gradient" size="md" onClick={finish}>Finish <ArrowRight className="size-4" /></Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="text-center space-y-4">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg">
                    <Check className="size-7" />
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold">You're in.</h1>
                  <p className="text-muted-foreground">Welcome to Reach. Your dashboard is ready.</p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/marketplace">Explore the marketplace</Link>
                  </Button>
                  <Button asChild variant="gradient" size="lg">
                    <Link href={role === "vendor" ? "/vendor" : role === "expert" ? "/experts/lena-park" : "/dashboard"}>
                      Open dashboard <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
