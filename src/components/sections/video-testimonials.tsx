"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Star, Quote } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { media, SAMPLE_VIDEO } from "@/lib/media";

const TESTIMONIALS = [
  { name: "Monique T.", role: "Beauty Studio Owner",   quote: "Reach put my salon in front of thousands of local customers. Bookings tripled in 6 weeks.", poster: media.testimonialPosters.one,   stars: 5 },
  { name: "James R.",   role: "Fitness Entrepreneur",  quote: "The Meta + TikTok automation alone paid for the whole subscription ten times over.",        poster: media.testimonialPosters.two,   stars: 5 },
  { name: "Priya S.",   role: "Boutique Founder",      quote: "WhatsApp catalog + autopilot shop means I sell while I sleep. It's unreal.",                 poster: media.testimonialPosters.three, stars: 5 },
];

function VideoCard({ t, index }: { t: typeof TESTIMONIALS[number]; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-2xl transition-shadow">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
          {/* poster image shown until play */}
          {!playing && (
            <Image src={t.poster} alt={t.name} fill sizes="380px" className="object-cover opacity-90" />
          )}
          <video
            ref={ref}
            src={SAMPLE_VIDEO}
            poster={t.poster}
            playsInline
            preload="none"
            onEnded={() => setPlaying(false)}
            className="absolute inset-0 size-full object-cover"
          />
          {/* play/pause */}
          <button
            onClick={toggle}
            aria-label={playing ? "Pause testimonial" : "Play testimonial"}
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-white/95 text-foreground shadow-2xl transition-transform group-hover:scale-110 live-dot">
              {playing ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
            </span>
          </button>
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[0.65rem] font-semibold text-white">
            ▶ Watch story
          </span>
        </div>

        <CardContent className="p-6 space-y-3 relative">
          <Quote aria-hidden className="absolute -top-1 right-4 size-12 text-brand/10" strokeWidth={1} />
          <div className="flex gap-0.5 text-accent-strong">
            {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="size-4 fill-current" strokeWidth={0} />)}
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">&ldquo;{t.quote}&rdquo;</p>
          <div>
            <div className="font-semibold text-sm">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function VideoTestimonials() {
  return (
    <Section size="md">
      <Container>
        <SectionHeading
          eyebrow="Real founders, real growth"
          title={<>Don&apos;t take our word. <span className="gradient-text-warm">Hear theirs.</span></>}
          description="Watch the businesses that took themselves to their customers — and never looked back."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => <VideoCard key={t.name} t={t} index={i} />)}
        </div>
      </Container>
    </Section>
  );
}
