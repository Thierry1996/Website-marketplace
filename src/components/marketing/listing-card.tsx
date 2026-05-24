"use client";

import { motion } from "framer-motion";
import { Heart, Star, MapPin, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";

export interface Listing {
  id: string;
  title: string;
  vendor: string;
  category: string;
  priceCents: number;
  rating: number;
  reviewCount: number;
  location?: string;
  badge?: "BESTSELLER" | "NEW" | "FEATURED";
  gradient: string;
}

export function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        <div className="relative aspect-[4/3] overflow-hidden" style={{ background: listing.gradient }}>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,.6) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,.6) 0 1px, transparent 1px 40px)",
            }}
          />
          <button
            aria-label="Save"
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur text-foreground hover:bg-white hover:scale-105 transition"
          >
            <Heart className="size-4" strokeWidth={1.8} />
          </button>

          {listing.badge && (
            <Badge
              variant={listing.badge === "BESTSELLER" ? "shimmer" : "accent"}
              className="absolute left-3 top-3 text-[0.65rem] tracking-wider"
            >
              {listing.badge}
            </Badge>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground truncate">{listing.vendor}</div>
              <h3 className="mt-0.5 font-semibold leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                {listing.title}
              </h3>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {listing.category}
            </Badge>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-accent-strong text-accent-strong" strokeWidth={0} />
              <span className="font-medium">{listing.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({listing.reviewCount})</span>
            </span>
            {listing.location && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <MapPin className="size-3.5" /> {listing.location}
              </span>
            )}
          </div>

          <div className="flex items-end justify-between gap-3 pt-2 mt-auto">
            <div>
              <div className="text-xs text-muted-foreground">From</div>
              <div className="font-display text-2xl font-bold leading-none">
                {formatCurrency(listing.priceCents / 100)}
              </div>
            </div>
            <Button variant="brand" size="sm">
              View
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
