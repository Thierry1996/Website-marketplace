"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Pause, Wand2, Palette, Share2, ArrowRight, ArrowDown } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/ui/brand-icon";
import { media, SAMPLE_VIDEO } from "@/lib/media";
import { cn } from "@/lib/utils";

/* ============================================================================
   Section 1 — Video Studio: how it works (video left, step flow right)
   ============================================================================ */

const STEPS = [
  { icon: Wand2,   title: "Generate the video",   desc: "Pick a product, and our AI studio scripts, voices, and edits a scroll-stopping promo in minutes.", color: "#FF4D6D" },
  { icon: Palette, title: "Brand it your way",    desc: "Drop in your logo, colors, and fonts. Trim, caption, and add your call-to-action — no editor needed.", color: "#7C3AED" },
  { icon: Share2,  title: "Publish everywhere",   desc: "One click pushes the finished video to your Reach website and every connected social account.", color: "#2563EB" },
];

export function VideoStudio() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  }

  return (
    <Section size="md" id="video-studio" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 aurora opacity-25" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Reach Video Studio"
          title={<>Marketing videos, <span className="gradient-text">made in one click.</span></>}
          description="Create product videos right inside Reach — then publish them to your website and socials automatically. Watch the 60-second guide."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT — watch guide video */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2rem] bg-[linear-gradient(135deg,rgb(var(--brand)/0.3),rgb(var(--secondary)/0.3))] blur-2xl" />
            <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-surface-elevated shadow-2xl bg-ink">
              {!playing && <Image src={media.hero.team} alt="Reach video studio guide" fill sizes="600px" className="object-cover opacity-90" />}
              <video
                ref={videoRef}
                src={SAMPLE_VIDEO}
                poster={media.hero.team}
                playsInline
                preload="none"
                onEnded={() => setPlaying(false)}
                className="absolute inset-0 size-full object-cover"
              />
              <button onClick={toggle} aria-label={playing ? "Pause" : "Play guide"} className="absolute inset-0 grid place-items-center">
                <span className="grid size-20 place-items-center rounded-full bg-white/95 text-foreground shadow-2xl transition-transform hover:scale-110 live-dot">
                  {playing ? <Pause className="size-8" /> : <Play className="size-8 translate-x-1" />}
                </span>
              </button>
              <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white">▶ 60-sec guide</span>
            </div>
          </motion.div>

          {/* RIGHT — step flow with connectors */}
          <div className="relative">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative flex gap-5 pb-8 last:pb-0"
                >
                  {/* connector line */}
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className="absolute left-[1.4rem] top-14 h-[calc(100%-2.5rem)] w-0.5 bg-gradient-to-b from-border to-transparent" />
                  )}
                  {/* numbered node */}
                  <div className="relative shrink-0">
                    <span
                      className="grid size-11 place-items-center rounded-2xl text-white shadow-lg"
                      style={{ background: s.color }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-surface-elevated text-[0.65rem] font-bold shadow border border-border">
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-display text-lg font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    {i < STEPS.length - 1 && (
                      <ArrowDown aria-hidden className="mt-3 size-4 text-muted-foreground/40 attention-bounce" />
                    )}
                  </div>
                </motion.div>
              );
            })}

            <Button asChild variant="brand" size="lg" className="mt-2 ml-16">
              <Link href="/start-trial">Make my first video <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================================
   Section 2 — Publish everywhere: video auto-shared to site + socials
   ============================================================================ */

const DESTINATIONS = [
  { name: "Your website", brand: null,        color: "#FF4D6D", note: "Embedded & SEO-ready" },
  { name: "Instagram",    brand: "instagram", color: "#E1306C", note: "Reels + feed" },
  { name: "TikTok",       brand: "tiktok",    color: "#000000", note: "For You page" },
  { name: "Facebook",     brand: "facebook",  color: "#1877F2", note: "Feed + Stories" },
  { name: "Pinterest",    brand: "pinterest", color: "#E60023", note: "Idea pins" },
  { name: "WhatsApp",     brand: "whatsapp",  color: "#25D366", note: "Status + catalog" },
];

export function PublishEverywhere() {
  return (
    <Section size="md" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute inset-0 aurora aurora-animated opacity-50" />
      <div aria-hidden className="absolute inset-0 bg-ink/40" />
      <Container className="relative">
        <SectionHeading
          eyebrow="One video, everywhere"
          title={<>Created once. <span className="gradient-text">Shared everywhere.</span></>}
          description="The moment your video is ready, Reach publishes it to your business website and every connected social account — automatically."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* central video card with radiating share chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative aspect-[9/12] overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-2xl">
              <Image src={media.hero.phone} alt="Reach product video" fill sizes="360px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                <span className="size-1.5 rounded-full bg-[rgb(var(--lime))] live-dot" /> Publishing…
              </span>
              <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/10 p-3 backdrop-blur-xl">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-3/4 rounded-full bg-[linear-gradient(90deg,rgb(var(--brand)),rgb(var(--accent)))]" />
                </div>
                <div className="mt-2 text-xs text-white/80">Pushing to 6 channels…</div>
              </div>
            </div>
          </motion.div>

          {/* destination grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {DESTINATIONS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl hover:bg-white/[0.09] transition-colors"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-lg" style={{ background: d.color }}>
                  {d.brand ? <BrandIcon name={d.brand} className="size-5" /> : <span className="font-script text-lg">R</span>}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white">{d.name}</div>
                  <div className="text-xs text-white/55">{d.note}</div>
                </div>
                <span className="text-[rgb(var(--lime))]">
                  <Check />
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="default" size="lg" className="bg-white text-foreground hover:bg-white/90">
            <Link href="/start-trial">Start publishing free <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-5" aria-hidden>
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
