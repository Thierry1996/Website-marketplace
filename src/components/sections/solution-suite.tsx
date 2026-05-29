"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Megaphone, FileText, Magnet, Workflow, Globe2, MessagesSquare,
  ArrowRight, ChevronRight,
} from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SOLUTIONS = [
  { n: "01", Icon: Megaphone,      title: "Social media advertising", outcome: "More qualified traffic.",        body: "Meta, Instagram, TikTok, Google Ads — campaigns built, tested, and optimized to a target CAC.",       color: "#FF4D6D", accent: "from-brand/15 to-accent/10" },
  { n: "02", Icon: FileText,       title: "Content generation",       outcome: "An always-on content engine.",   body: "Hooks, captions, videos, blogs, emails — written for your brand, ready to publish weekly.",            color: "#FF8A3D", accent: "from-accent/15 to-brand/10" },
  { n: "03", Icon: Magnet,         title: "Lead magnets",             outcome: "Strangers become subscribers.",  body: "Quizzes, guides, calculators, and gated drops designed to capture intent the moment it shows up.",     color: "#FBBF24", accent: "from-yellow-200/40 to-accent/10" },
  { n: "04", Icon: Workflow,       title: "Sales funnels",            outcome: "Subscribers become customers.",  body: "High-converting landing pages, upsell flows, and email sequences — engineered around the offer that wins.", color: "#84CC16", accent: "from-lime/20 to-electric/10" },
  { n: "05", Icon: Globe2,         title: "Website presence",         outcome: "A storefront that closes.",       body: "Stunning, fast, SEO-tuned websites that turn the traffic we drive into bookings and orders.",            color: "#7C3AED", accent: "from-secondary/15 to-electric/10" },
  { n: "06", Icon: MessagesSquare, title: "Social media management",  outcome: "Show up everywhere, hands-off.", body: "Posting, DM auto-replies, community responses, monthly reports — your team without the headcount.",     color: "#2563EB", accent: "from-electric/15 to-secondary/10" },
];

export function SolutionSuite() {
  return (
    <Section id="solutions" size="md" className="relative">
      <Container>
        <SectionHeading
          eyebrow="Our solution suite"
          title={<>Six services. <span className="gradient-text">One growth engine.</span></>}
          description="Every Reach engagement is built from the same six building blocks — so you can pick one, stack a few, or run the entire growth engine end-to-end."
        />

        {/* Step flow rail */}
        <ol className="relative mt-14 grid gap-5 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="relative"
            >
              <Card className={`group h-full overflow-hidden bg-gradient-to-br ${s.accent} border-border/60 hover:shadow-xl hover:-translate-y-1 transition-all`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <span
                      className="grid size-12 place-items-center rounded-2xl text-white shadow-lg transition-transform group-hover:rotate-6"
                      style={{ background: s.color }}
                    >
                      <s.Icon className="size-6" strokeWidth={1.7} />
                    </span>
                    <Badge variant="outline" className="font-display tracking-wider">{s.n}</Badge>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{s.title}</h3>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: s.color }}>
                      {s.outcome}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </CardContent>
              </Card>

              {/* connector chevron between cards on desktop */}
              {(i + 1) % 3 !== 0 && i < SOLUTIONS.length - 1 && (
                <ChevronRight
                  aria-hidden
                  className="hidden lg:block absolute right-[-1.5rem] top-1/2 -translate-y-1/2 size-7 text-brand/60"
                />
              )}
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="brand" size="lg">
            <Link href="#get-in-touch">Get my custom plan <ArrowRight className="size-4" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/start-trial">Start free trial</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
