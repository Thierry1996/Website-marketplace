"use client";

import { motion } from "framer-motion";
import { Plug, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandIcon } from "@/components/ui/brand-icon";
import { integrations } from "@/lib/integrations";

export function Integrations() {
  return (
    <Section size="md" className="relative overflow-hidden bg-ink text-white">
      {/* aurora glow */}
      <div aria-hidden className="absolute inset-0 aurora aurora-animated opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-ink/40" />

      <Container className="relative">
        <SectionHeading
          eyebrow="One portal · every channel"
          title={<>Your customers are everywhere. <span className="gradient-text">So are we.</span></>}
          description="Reach connects to the platforms your audience already lives on — and runs them from one backend, for every logged-in subscriber."
          className="[&_h2]:text-white [&_p]:text-white/70"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((it, i) => (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="group h-full border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.07] transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <span
                      className="grid size-12 place-items-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-6"
                      style={{ background: it.gradient }}
                    >
                      <BrandIcon name={it.key} className="size-6" />
                    </span>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/80 gap-1.5"
                    >
                      <span
                        className="size-1.5 rounded-full live-dot"
                        style={{ background: it.status === "Beta" ? "#FF8A3D" : "#84CC16" }}
                      />
                      {it.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{it.name}</h3>
                    <p className="mt-1 text-sm text-white/65 leading-relaxed">{it.blurb}</p>
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed">{it.detail}</p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <div className="font-display text-xl font-bold" style={{ color: it.color === "#000000" ? "#FE2C55" : it.color }}>
                        {it.stat.value}
                      </div>
                      <div className="text-[0.7rem] uppercase tracking-wider text-white/50">{it.stat.label}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-white/70 group-hover:text-white transition">
                      Connect <ArrowRight className="size-3.5 -translate-x-1 group-hover:translate-x-0 transition" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* CTA tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full border-white/10 bg-[linear-gradient(135deg,rgb(var(--brand)),rgb(var(--accent)))]">
              <CardContent className="p-6 h-full flex flex-col justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-white/20 text-white">
                  <Plug className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">All channels. One login.</h3>
                  <p className="mt-1 text-sm text-white/85">Connect every platform from your Reach portal in minutes.</p>
                </div>
                <Button asChild variant="default" size="md" className="bg-white text-foreground hover:bg-white/90 w-fit">
                  <Link href="/sign-up">Connect now <ArrowRight className="size-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
