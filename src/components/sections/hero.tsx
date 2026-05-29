"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, ChevronDown, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { media } from "@/lib/media";

const STATS = [
  { value: "2.4M+", label: "customers reached" },
  { value: "4.7x",  label: "avg return on ad spend" },
  { value: "5",     label: "channels, one login" },
  { value: "98%",   label: "client retention" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Aurora background */}
      <div aria-hidden className="absolute inset-0 aurora aurora-animated opacity-70" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgb(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Badge variant="brand" className="px-3.5 py-1.5 text-[0.72rem] gap-2">
                <span className="size-1.5 rounded-full bg-brand live-dot" />
                Lead-gen + marketing agency · trusted by millions of small businesses
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-display text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.7rem] font-bold tracking-[-0.02em] text-balance"
            >
              Create brand awareness, attract{" "}
              <span className="gradient-text">new customers,</span>{" "}
              and grow your profits.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              <span className="font-script text-2xl text-foreground">Take your business to your customers</span> — in one click.
              Social ads, content, lead magnets, sales funnels, websites, and social management — one agency, one platform, predictable growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button asChild variant="brand" size="xl" className="group">
                <Link href="/start-trial">
                  Reach my customers
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="#showcase"><Sparkles className="size-4" /> See our work</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex items-center gap-4 text-sm"
            >
              <div className="flex -space-x-3">
                {[media.avatars.monique, media.avatars.james, media.avatars.priya, media.avatars.jordan].map((src, i) => (
                  <span key={i} className="relative size-9 overflow-hidden rounded-full ring-2 ring-background">
                    <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-accent-strong">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />)}
                </div>
                <div className="text-muted-foreground text-xs mt-0.5">
                  <span className="font-semibold text-foreground">10,000+</span> businesses growing with Reach
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-border pt-7"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight gradient-text-warm">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — live photo collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[520px] sm:h-[560px]"
          >
            <div className="absolute right-0 top-4 w-[64%] animate-float">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-4 border-surface-elevated shadow-2xl">
                <Image src={media.hero.team} alt="Creative marketing team" fill sizes="400px" className="object-cover" priority />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4">
                  <Badge variant="default" className="bg-white/90 text-foreground">Live campaign</Badge>
                </div>
              </div>
            </div>

            <div className="absolute left-0 top-0 w-[44%] animate-float" style={{ animationDelay: "1.2s" }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-surface-elevated shadow-xl">
                <Image src={media.hero.analytics} alt="Growth analytics" fill sizes="260px" className="object-cover" />
              </div>
            </div>

            <div className="absolute left-2 bottom-0 w-[42%] animate-float" style={{ animationDelay: "0.6s" }}>
              <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-surface-elevated shadow-xl">
                <Image src={media.hero.phone} alt="Social channels" fill sizes="240px" className="object-cover" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              className="absolute right-2 bottom-10 glass rounded-2xl p-3 shadow-xl flex items-center gap-3"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-lime/20 text-[rgb(var(--lime))]">
                <TrendingUp className="size-4" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">Revenue this week</div>
                <div className="font-display font-bold text-sm">+$28,400</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 glass rounded-2xl p-3 shadow-xl flex items-center gap-3"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-secondary/15 text-secondary">
                <Users className="size-4" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">New customers</div>
                <div className="font-display font-bold text-sm">1,204 today</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="#showcase" className="attention-bounce text-brand" aria-label="Scroll to see our work">
            <ChevronDown className="size-7" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
