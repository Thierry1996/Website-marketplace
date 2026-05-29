"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Eye } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { media } from "@/lib/media";

interface ShowcaseItem {
  slug: string;
  name: string;
  excerpt: string;
  thumb: string;
  tag: string;
  preview: string; // external preview URL (opens new tab)
}

const ITEMS: ShowcaseItem[] = [
  { slug: "fashion",    name: "Fashion & Apparel",   tag: "E-commerce", excerpt: "Editorial lookbooks + Shopify-grade checkout that turns browsers into buyers.",          thumb: media.categoryThumbs.fashion,    preview: "https://www.apple.com" },
  { slug: "beauty",     name: "Beauty & Cosmetics",  tag: "Booking",    excerpt: "Glossy storefronts with built-in appointment booking and deposit collection.",            thumb: media.categoryThumbs.beauty,     preview: "https://www.glossier.com" },
  { slug: "food",       name: "Restaurant & Food",   tag: "Ordering",   excerpt: "Online ordering, reservations, and WhatsApp catalog — all wired together.",               thumb: media.categoryThumbs.food,       preview: "https://www.sweetgreen.com" },
  { slug: "fitness",    name: "Fitness & Gym",       tag: "Membership", excerpt: "Class schedules, coaching subscriptions, and member portals on autopilot.",               thumb: media.categoryThumbs.fitness,    preview: "https://www.gymshark.com" },
  { slug: "wellness",   name: "Spa & Wellness",      tag: "Services",   excerpt: "Serene booking experiences with package builders and gift cards.",                        thumb: media.categoryThumbs.wellness,   preview: "https://www.calm.com" },
  { slug: "consulting", name: "Consulting & Agency", tag: "Lead-gen",   excerpt: "High-converting lead funnels, proposal flows, and retainer subscriptions.",               thumb: media.categoryThumbs.consulting, preview: "https://www.notion.so" },
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
            description="Hover any category to preview the live experience — then open it in a new tab."
          />
          <Button asChild variant="outline" size="md">
            <Link href="/marketplace">Browse all <ArrowRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.thumb}
                  alt={item.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <Badge variant="default" className="absolute left-3 top-3 bg-white/90 text-foreground z-10">{item.tag}</Badge>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 p-5 text-center">
                  <p className="text-sm text-white/90 leading-relaxed">{item.excerpt}</p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <a
                      href={item.preview}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-white/90 transition"
                    >
                      <ExternalLink className="size-3.5" /> Preview site
                    </a>
                    <Link
                      href={`/categories/${item.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
                    >
                      <Eye className="size-3.5" /> Explore
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-display font-semibold leading-tight group-hover:text-brand transition-colors">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.excerpt}</p>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                  <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
