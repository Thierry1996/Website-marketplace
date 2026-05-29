"use client";

import { Search, MousePointerClick, Rocket, LineChart } from "lucide-react";

import { Container, SectionHeading } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  { n: "01", icon: Search,            title: "Connect your channels", desc: "Link Meta, Instagram, WhatsApp, Pinterest, and TikTok in minutes — one login, every platform.", grad: "linear-gradient(135deg,#1877F2,#00C6FF)" },
  { n: "02", icon: MousePointerClick, title: "Launch in one click",    desc: "Pick a stunning storefront, let our agentic AI write the copy, and go live the same afternoon.",  grad: "linear-gradient(135deg,#DD2A7B,#F58529)" },
  { n: "03", icon: Rocket,            title: "Reach your customers",   desc: "We run the ads, the SEO, and the autopilot shop — taking your business to your customers.",       grad: "linear-gradient(135deg,#7C3AED,#2563EB)" },
  { n: "04", icon: LineChart,         title: "Watch profits grow",     desc: "Track revenue, bookings, and ROAS in one dashboard. Get paid straight to your bank.",            grad: "linear-gradient(135deg,#FF4D6D,#FF8A3D)" },
];

export function HowItWorksStack() {
  return (
    <section className="relative py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="From zero to reaching customers"
          title={<>Four steps. <span className="gradient-text">One afternoon.</span></>}
          description="Scroll — each step stacks on the last, just like Reach stacks every growth channel into one platform."
        />
      </Container>

      {/* Sticky stacking cards */}
      <Container className="mt-12">
        <div className="relative">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="sticky"
                style={{ top: `calc(7rem + ${i * 1.5}rem)` }}
              >
                <div
                  className="mb-6 overflow-hidden rounded-3xl border border-border shadow-xl"
                  style={{ background: "rgb(var(--surface-elevated))" }}
                >
                  <div className="grid sm:grid-cols-[1.3fr_1fr]">
                    <div className="p-8 sm:p-10">
                      <Badge variant="outline" className="font-display text-sm tracking-widest">{s.n}</Badge>
                      <h3 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight">{s.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">{s.desc}</p>
                    </div>
                    <div className="relative min-h-[160px] grid place-items-center" style={{ background: s.grad }}>
                      <span className="grid size-20 place-items-center rounded-2xl bg-white/20 text-white backdrop-blur">
                        <Icon className="size-9" strokeWidth={1.6} />
                      </span>
                      <span aria-hidden className="absolute right-5 bottom-4 font-display text-7xl font-extrabold text-white/15">{s.n}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
