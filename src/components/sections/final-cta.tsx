"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <Section size="lg" className="bg-foreground text-background relative overflow-hidden">
      {/* mesh decorations */}
      <div aria-hidden className="absolute inset-0 opacity-50">
        <div className="absolute -top-32 -left-32 size-[420px] rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-[460px] rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[360px] rounded-full bg-secondary/25 blur-3xl" />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <Sparkles className="size-3 text-accent" />
            Built for the AI era
          </span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Your marketplace.<br />
            <span className="gradient-text">Built today.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-background/70 leading-relaxed">
            Join 10,000+ vendors selling products, booking services, hosting webinars, and growing communities on Reach.
            No credit card required to start.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="accent" size="xl">
              <Link href="/sign-up">Start free <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-white/30 text-background hover:bg-white/10">
              <Link href="/contact">Talk to sales</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
