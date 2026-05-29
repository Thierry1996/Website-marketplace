"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Gift } from "lucide-react";
import { toast } from "sonner";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ParallaxBlob } from "@/components/ui/parallax";

export function FreeSignupBanner() {
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Enter a valid email."); return; }
    // Hand off to the $0 trial flow with the email prefilled.
    window.location.href = `/start-trial?email=${encodeURIComponent(email)}`;
  }

  return (
    <section className="relative -mb-16 z-20 px-5">
      <Container className="px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-ink text-white shadow-2xl"
        >
          {/* parallax blobs */}
          <ParallaxBlob className="size-72 bg-brand/40 -left-10 -top-10" speed={60} />
          <ParallaxBlob className="size-80 bg-secondary/40 right-0 -bottom-20" speed={-70} />
          <ParallaxBlob className="size-56 bg-accent/30 left-1/2 top-1/3" speed={40} />
          <div aria-hidden className="absolute inset-0 aurora opacity-40" />

          <div className="relative grid gap-8 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
                <Gift className="size-3.5 text-[rgb(var(--lime))]" /> Free 7-day trial · $0 today
              </span>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Sign up free. <span className="gradient-text">Reach customers today.</span>
              </h2>
              <p className="mt-4 max-w-lg text-white/75 leading-relaxed">
                No credit card charged today. Unlock every Reach feature for 7 days and only pay
                when you're growing. Join 10,000+ businesses on the platform.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                {["All features unlocked", "Cancel anytime", "No charge for 7 days"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check className="size-4 text-[rgb(var(--lime))]" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <div className="rounded-2xl bg-white/10 p-2 backdrop-blur-xl border border-white/15">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  required
                  aria-label="Email"
                  className="h-12 border-0 bg-white text-foreground"
                />
                <Button type="submit" variant="brand" size="lg" className="mt-2 w-full">
                  Start my free trial <ArrowRight className="size-4" />
                </Button>
              </div>
              <p className="text-center text-xs text-white/60">
                Prefer to explore first?{" "}
                <Link href="/pricing" className="underline hover:text-white">See pricing</Link>
              </p>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
