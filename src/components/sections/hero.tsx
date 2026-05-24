"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { BookingWidget } from "@/components/marketing/booking-widget";
import { stats } from "@/lib/sample-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background mesh */}
      <div aria-hidden className="absolute inset-0 gradient-mesh" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-brand/5 via-transparent to-transparent"
      />
      {/* Grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="brand" className="px-3 py-1.5 text-[0.7rem]">
                <Sparkles className="size-3" />
                AI-era marketplace · Now in public beta
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance"
            >
              The all-in-one marketplace for{" "}
              <span className="gradient-text">modern businesses.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              Sell products, book appointments, host webinars, hire experts, and grow a
              community — all from one premium platform. Built for e-commerce dealers,
              service pros, consultants, and creators.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild variant="gradient" size="xl">
                <Link href="/sign-up">
                  Start free <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/marketplace">
                  <PlayCircle className="size-4" /> Watch the tour
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex items-center gap-5 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[
                  "linear-gradient(135deg,#10B981,#8B5CF6)",
                  "linear-gradient(135deg,#F59E0B,#EF4444)",
                  "linear-gradient(135deg,#3B82F6,#10B981)",
                  "linear-gradient(135deg,#8B5CF6,#EC4899)",
                ].map((bg, i) => (
                  <span
                    key={i}
                    className="size-8 rounded-full ring-2 ring-background"
                    style={{ background: bg }}
                    aria-hidden
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                <span className="ml-2 font-medium text-foreground">4.9</span>
                <span>from 10,000+ vendors</span>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-border pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Booking widget + floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-brand/20 via-secondary/15 to-accent/20 blur-2xl" />
            <BookingWidget />

            {/* Floating tag — revenue card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 rounded-xl border border-border bg-surface-elevated p-3 shadow-xl"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground">
                <Sparkles className="size-4" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">This month</div>
                <div className="font-display font-bold text-sm">$12,480 earned</div>
              </div>
            </motion.div>

            {/* Floating tag — bookings */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 rounded-xl border border-border bg-surface-elevated p-3 shadow-xl"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-secondary/15 text-secondary">
                <Star className="size-4 fill-current" strokeWidth={0} />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">Today</div>
                <div className="font-display font-bold text-sm">28 new bookings</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
