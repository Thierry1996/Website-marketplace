"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Testimonial {
  name: string;
  role: string;
  body: string;
  rating?: number;
  avatarGradient?: string; // CSS gradient
  initials?: string;
}

export function TestimonialCard({ testimonial, index = 0 }: { testimonial: Testimonial; index?: number }) {
  const rating = testimonial.rating ?? 5;
  const initials =
    testimonial.initials ??
    testimonial.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
    >
      <Card className="h-full relative overflow-hidden hover:shadow-lg transition-shadow">
        <Quote
          aria-hidden
          className="absolute -top-2 -right-2 size-24 text-brand/5"
          strokeWidth={1}
        />
        <CardContent className="p-7 space-y-5 relative">
          <div className="flex gap-0.5 text-accent-strong">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4",
                  i < rating ? "fill-current" : "text-muted-foreground/20"
                )}
                strokeWidth={1.4}
              />
            ))}
          </div>

          <p className="text-sm sm:text-[0.95rem] leading-relaxed text-foreground/85">
            "{testimonial.body}"
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span
              className="grid size-10 place-items-center rounded-full text-white text-xs font-semibold shadow-md"
              style={{
                background:
                  testimonial.avatarGradient ??
                  "linear-gradient(135deg, rgb(var(--brand)), rgb(var(--secondary)))",
              }}
            >
              {initials}
            </span>
            <div>
              <div className="font-semibold text-sm">{testimonial.name}</div>
              <div className="text-xs text-muted-foreground">{testimonial.role}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
