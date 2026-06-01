"use client";

import { motion } from "framer-motion";
import { Wand2, Gauge, FileDown, Search } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { AnalyzerForm } from "@/components/marketing/analyzer-form";

export function AnalyzerCTA() {
  return (
    <Section id="analyzer" size="md" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 aurora opacity-25" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Free AI site analyzer"
          title={<>Is your website <span className="gradient-text">winning customers — or losing them?</span></>}
          description="Paste your live site. Our AI big-data agent crawls it, flags every organic-marketing weakness, and gives you a free downloadable report in under a minute."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Pitch */}
          <div className="space-y-5">
            {[
              { Icon: Search,   title: "Real crawl, not a guess", body: "We actually fetch and read your pages — SEO, speed, mobile, trust, content & conversion." },
              { Icon: Wand2,    title: "AI-written action plan",   body: "Plain-English summary + prioritized fixes, tailored to what you ask us to focus on." },
              { Icon: Gauge,    title: "A score you can track",    body: "One overall score plus seven category scores, so you can measure progress over time." },
              { Icon: FileDown, title: "Free downloadable report", body: "Export the full report as a PDF — yours to keep, no strings attached." },
            ].map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Icon className="size-5" /></span>
                <div>
                  <div className="font-display font-bold">{title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{body}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <AnalyzerForm role="guest" />
        </div>
      </Container>
    </Section>
  );
}
