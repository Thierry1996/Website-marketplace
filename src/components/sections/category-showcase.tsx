"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Eye } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";
import { media } from "@/lib/media";

interface ShowcaseItem {
  slug: string;
  name: string;
  excerpt: string;
  thumb: string;
  tag: string;
  preview: string;
  accent: string;
}

const ITEMS: ShowcaseItem[] = [
  { slug: "fashion",    name: "Fashion & Apparel",   tag: "E-commerce", excerpt: "Editorial lookbooks + Shopify-grade checkout that turns browsers into buyers.",   thumb: media.categoryThumbs.fashion,    preview: "https://www.apple.com",     accent: "#FF4D6D" },
  { slug: "beauty",     name: "Beauty & Cosmetics",  tag: "Booking",    excerpt: "Glossy storefronts with built-in appointment booking and deposit collection.",     thumb: media.categoryThumbs.beauty,     preview: "https://www.glossier.com",  accent: "#DD2A7B" },
  { slug: "food",       name: "Restaurant & Food",   tag: "Ordering",   excerpt: "Online ordering, reservations, and WhatsApp catalog — all wired together.",        thumb: media.categoryThumbs.food,       preview: "https://www.sweetgreen.com",accent: "#FF8A3D" },
  { slug: "fitness",    name: "Fitness & Gym",       tag: "Membership", excerpt: "Class schedules, coaching subscriptions, and member portals on autopilot.",        thumb: media.categoryThumbs.fitness,    preview: "https://www.gymshark.com",  accent: "#2563EB" },
  { slug: "wellness",   name: "Spa & Wellness",      tag: "Services",   excerpt: "Serene booking experiences with package builders and gift cards.",                 thumb: media.categoryThumbs.wellness,   preview: "https://www.calm.com",      accent: "#7C3AED" },
  { slug: "consulting", name: "Consulting & Agency", tag: "Lead-gen",   excerpt: "High-converting lead funnels, proposal flows, and retainer subscriptions.",         thumb: media.categoryThumbs.consulting, preview: "https://www.notion.so",     accent: "#06B6D4" },
];

export function CategoryShowcase() {
  return (
    <Section size="md" id="showcase" className="bg-surface/60">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            eyebrow="Live project gallery"
            title={<>Stunning sites we&apos;ve <span className="gradient-text-warm">shipped &amp; scaled.</span></>}
            description="Hover any card — tilt it, preview the live experience, then open it in a new tab."
          />
          <Button asChild variant="outline" size="md">
            <Link href="/marketplace">Browse all <ArrowUpRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <TiltCard className="h-full rounded-3xl">
                <article
                  className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-sm transition-shadow duration-300 group-hover/tilt:shadow-2xl"
                  style={{ boxShadow: undefined }}
                >
                  {/* Thumbnail with parallax pop */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.thumb}
                      alt={item.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover/tilt:scale-[1.12]"
                    />
                    <Badge
                      variant="default"
                      className="absolute left-3 top-3 z-10 bg-white/90 text-foreground translate-z-0"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      {item.tag}
                    </Badge>

                    {/* Animated overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center opacity-0 transition-all duration-300 group-hover/tilt:opacity-100"
                         style={{ background: `linear-gradient(to top, ${item.accent}F0, ${item.accent}80 40%, transparent)` }}>
                      <p className="translate-y-3 text-sm font-medium text-white transition-transform duration-300 group-hover/tilt:translate-y-0" style={{ transform: "translateZ(60px)" }}>
                        {item.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2 translate-y-3 transition-transform duration-300 group-hover/tilt:translate-y-0" style={{ transform: "translateZ(70px)" }}>
                        <a
                          href={item.preview}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-foreground shadow-lg transition-transform hover:scale-105"
                        >
                          <ExternalLink className="size-3.5" /> Preview site
                        </a>
                        <Link
                          href={`/categories/${item.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/60 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/15"
                        >
                          <Eye className="size-3.5" /> Explore
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between p-4" style={{ transform: "translateZ(30px)" }}>
                    <div>
                      <h3 className="font-display font-bold leading-tight transition-colors group-hover/tilt:text-brand">{item.name}</h3>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{item.excerpt}</p>
                    </div>
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-full text-white transition-transform duration-300 group-hover/tilt:rotate-0 group-hover/tilt:scale-110"
                      style={{ background: item.accent, transform: "rotate(-45deg)" }}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
