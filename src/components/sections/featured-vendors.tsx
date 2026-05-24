"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, Verified } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const vendors = [
  { name: "Studio Lumière",      role: "Beauty & Spa",       rating: 4.9, reviews: 412, listings: 12, gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { name: "PowerHouse Athletics",role: "Fitness",            rating: 4.9, reviews: 287, listings: 8,  gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { name: "Fresh Bite Co.",      role: "Restaurant & Food",  rating: 4.8, reviews: 624, listings: 24, gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { name: "Northwind Studio",    role: "Marketing Agency",   rating: 4.9, reviews: 91,  listings: 6,  gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)" },
];

export function FeaturedVendors() {
  return (
    <Section size="md" className="bg-surface/40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            eyebrow="Featured vendors"
            title={<>Meet the businesses{" "}<span className="gradient-text">leading their industry.</span></>}
            description="Top-rated vendors handpicked by our team — verified, vetted, and trusted by 10,000+ customers."
          />
          <Button asChild variant="ghost" size="md">
            <Link href="/marketplace/featured">View all <ArrowRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vendors.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="relative h-24" style={{ background: v.gradient }} />
                <CardContent className="-mt-8 space-y-3">
                  <div className="flex items-end gap-3">
                    <div
                      className="grid size-14 place-items-center rounded-xl border-4 border-surface-elevated text-white font-display font-bold text-lg shadow-md"
                      style={{ background: v.gradient }}
                    >
                      {v.name[0]}
                    </div>
                    <Badge variant="brand" className="mb-1">
                      <Verified className="size-3" /> Verified
                    </Badge>
                  </div>
                  <div>
                    <div className="font-semibold leading-tight group-hover:text-brand transition-colors">
                      {v.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{v.role}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5 fill-accent-strong text-accent-strong" strokeWidth={0} />
                      <span className="font-medium">{v.rating}</span>
                      <span className="text-muted-foreground">({v.reviews})</span>
                    </span>
                    <span className="text-muted-foreground">{v.listings} listings</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
