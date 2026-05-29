"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessagesSquare, Users, TrendingUp, ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { Icon: MessagesSquare, title: "Discussion forums",  description: "Topic-based threads moderated by category experts." },
  { Icon: Users,          title: "Member profiles",    description: "Verified vendors, customers, and contributors." },
  { Icon: TrendingUp,     title: "Live Q&A",           description: "Weekly office hours with platform power users." },
];

export function CommunitySection() {
  return (
    <Section size="md" className="bg-surface/40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="accent" className="px-3 py-1.5 mb-4">
              <Users className="size-3" /> Community
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Build alongside{" "}
              <span className="gradient-text">28,000+ marketplace pros.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Forums, member meetups, and curated channels. Share what's working, get answers
              in hours, and ship faster with people who've been there.
            </p>

            <ul className="mt-7 space-y-3">
              {features.map(({ Icon, title, description }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-sm text-muted-foreground">{description}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href="/community">Join community <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — mocked community posts */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="space-y-3">
              {[
                { name: "Aaron W.", time: "2h", title: "What's converting best on your booking pages?", reply: "Honestly, social proof above the fold made the biggest jump for me — 38% lift...", tags: ["bookings","conversion"], grad: "linear-gradient(135deg,#10B981,#8B5CF6)" },
                { name: "Sasha M.", time: "5h", title: "Stripe Connect onboarding flow for first-time vendors?", reply: "Reach's default onboarding handles 90% of it — only thing I added was a quick KYC reminder email...", tags: ["stripe","onboarding"], grad: "linear-gradient(135deg,#F59E0B,#EF4444)" },
                { name: "Devon K.", time: "1d", title: "Bundling subscriptions + one-off services = real talk", reply: "We doubled LTV by offering a discount for monthly plans that include 2 in-person services...", tags: ["pricing","subscriptions"], grad: "linear-gradient(135deg,#3B82F6,#10B981)" },
              ].map((p, i) => (
                <Card key={i} className="hover:shadow-md transition">
                  <CardContent className="p-4 flex gap-3">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-full text-white text-sm font-semibold shadow"
                      style={{ background: p.grad }}
                    >
                      {p.name[0]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.time}</span>
                      </div>
                      <div className="mt-0.5 text-sm font-medium">{p.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.reply}</div>
                      <div className="mt-2 flex gap-1.5">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="default" className="text-[0.65rem]">#{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div
              aria-hidden
              className="absolute -inset-x-4 -inset-y-2 -z-10 rounded-3xl bg-gradient-to-tr from-brand/10 via-secondary/5 to-accent/10 blur-2xl"
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
