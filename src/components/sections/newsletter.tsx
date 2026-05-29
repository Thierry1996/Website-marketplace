"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Container, Section } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    setSubmitted(true);
    toast.success("You're on the list — check your inbox for 3 free templates.");
  }

  return (
    <Section size="md">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand/10 via-secondary/10 to-accent/10 p-8 sm:p-14"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(at 25% 10%, rgb(var(--brand)/0.35), transparent 50%), radial-gradient(at 75% 90%, rgb(var(--accent)/0.35), transparent 50%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/60 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="size-3 text-accent-strong" />
                Free templates inside
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                Get 3 premium templates when you join the Reach newsletter
              </h2>
              <p className="mt-3 text-base text-muted-foreground max-w-lg">
                Weekly drops: best-selling templates, growth tactics from top vendors, and behind-the-scenes builds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  placeholder="you@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="h-12 sm:flex-1"
                  disabled={submitted}
                />
                <Button type="submit" variant="gradient" size="lg" disabled={submitted}>
                  {submitted ? <><Check className="size-4" /> Subscribed</> : <>Claim free templates <ArrowRight className="size-4" /></>}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
