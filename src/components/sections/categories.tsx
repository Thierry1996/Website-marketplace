"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { featuredCategories } from "@/lib/nav";

export function Categories() {
  return (
    <Section id="categories" size="md">
      <Container>
        <SectionHeading
          eyebrow="Built for every business"
          title={<>One marketplace. <span className="gradient-text">Every industry.</span></>}
          description="From beauty salons to fitness studios — Marketly powers vendors across 12+ industries with templates, booking, payments, and community out of the box."
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {featuredCategories.map((cat, i) => {
            const Icon = cat.icon!;
            return (
              <motion.div
                key={cat.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
              >
                <Link
                  href={cat.href}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-surface-elevated p-4 hover:border-brand/40 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-soft to-secondary-soft text-brand">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-tight">{cat.label}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
