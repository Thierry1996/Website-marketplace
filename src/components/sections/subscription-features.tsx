"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe, Wand2, Gauge, Bot, ShoppingBag, SearchCheck, CreditCard, ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { media } from "@/lib/media";

const FEATURES = [
  { icon: Globe,       title: "Brand exposure",          desc: "Stunning website pages that put your brand in front of the right audience, everywhere they scroll.", img: media.features.web,       tint: "from-brand/20 to-accent/10",       accent: "text-brand" },
  { icon: Wand2,       title: "Incredible UX design",    desc: "Conversion-tested layouts crafted by award-winning designers — your store looks expensive.",          img: media.features.ux,        tint: "from-secondary/20 to-electric/10", accent: "text-secondary" },
  { icon: Gauge,       title: "Lightning page loads",    desc: "Edge-rendered, image-optimized pages that load in milliseconds. Speed is conversion.",                 img: media.features.speed,     tint: "from-electric/20 to-secondary/10", accent: "text-electric" },
  { icon: Bot,         title: "Agentic commerce AI",     desc: "Connectors to agentic-commerce AI that answers, recommends, and closes sales while you sleep.",         img: media.features.ai,        tint: "from-secondary/20 to-brand/10",    accent: "text-secondary" },
  { icon: ShoppingBag, title: "Autopilot shop run",      desc: "Inventory, pricing, restock, and promos run themselves. Your storefront operates on autopilot.",       img: media.features.autopilot, tint: "from-accent/20 to-brand/10",       accent: "text-accent-strong" },
  { icon: SearchCheck, title: "Auto SEO + competitor analysis", desc: "Automatic site diagnosis, keyword wins, and competitor teardowns — SEO that manages itself.",        img: media.features.seo,       tint: "from-lime/25 to-success/10",       accent: "text-[rgb(var(--lime))]" },
  { icon: CreditCard,  title: "Payments, built in",      desc: "Stripe, PayPal, Apple & Google Pay ready out of the box — collect from your customers, straight to your bank.", img: media.features.payments, tint: "from-electric/20 to-accent/10",    accent: "text-electric" },
];

export function SubscriptionFeatures() {
  const [feature, ...rest] = FEATURES;

  return (
    <Section size="md" id="features">
      <Container>
        <SectionHeading
          eyebrow="Everything in your subscription"
          title={<>One plan. <span className="gradient-text-cool">An entire growth team.</span></>}
          description="Reach replaces a dozen tools and a marketing department — bundled into one subscription that runs your business growth end to end."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Hero feature — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className={`group h-full overflow-hidden bg-gradient-to-br ${feature.tint}`}>
              <div className="grid sm:grid-cols-2 h-full">
                <CardContent className="p-7 flex flex-col justify-center">
                  <span className={`grid size-12 place-items-center rounded-xl bg-surface-elevated shadow-sm ${feature.accent}`}>
                    <feature.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{feature.desc}</p>
                  <Button asChild variant="link" className="mt-4 w-fit px-0">
                    <Link href="/sign-up">Explore feature <ArrowRight className="size-4" /></Link>
                  </Button>
                </CardContent>
                <div className="relative min-h-[220px]">
                  <Image src={feature.img} alt={feature.title} fill sizes="400px" className="object-cover" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Remaining features */}
          {rest.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            >
              <Card className="group h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative h-36 overflow-hidden">
                  <Image src={f.img} alt={f.title} fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${f.tint} mix-blend-multiply`} />
                  <span className={`absolute left-4 top-4 grid size-10 place-items-center rounded-xl bg-surface-elevated/90 backdrop-blur shadow ${f.accent}`}>
                    <f.icon className="size-5" />
                  </span>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-base font-semibold leading-snug">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Badge variant="accent" className="px-4 py-2 text-sm">
            <Sparkle /> All features included on every paid plan — no add-ons, no surprises.
          </Badge>
        </div>
      </Container>
    </Section>
  );
}

function Sparkle() {
  return <span className="text-accent-strong">✦</span>;
}
