"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, Calendar, Users, ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const webinars = [
  { title: "Scaling your service business with bookings & subscriptions", date: "May 28 · 11:00 AM PT", host: "Lena Park",     attendees: 412, gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { title: "How top vendors hit $10K MRR in 90 days",                       date: "Jun 04 · 09:00 AM PT", host: "Marcus Reyes",  attendees: 287, gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
];

export function WebinarSection() {
  return (
    <Section size="md">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Badge variant="secondary" className="px-3 py-1.5 mb-4">
              <PlayCircle className="size-3" /> Webinars & education
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Learn from the{" "}
              <span className="gradient-text">vendors winning right now.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Live workshops, on-demand replays, and a library of templates and tactics from
              the operators driving growth on Reach. Free for all members.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gradient" size="lg">
                <Link href="/webinars">Browse webinars <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/community">Join the community</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {webinars.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 group">
                  <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                    <div className="relative aspect-square sm:aspect-auto" style={{ background: w.gradient }}>
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="grid size-12 place-items-center rounded-full bg-white/95 text-foreground shadow-lg group-hover:scale-110 transition-transform">
                          <PlayCircle className="size-6" strokeWidth={1.5} />
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="size-3.5" /> {w.date}
                      </div>
                      <h3 className="font-semibold leading-snug line-clamp-2">{w.title}</h3>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Hosted by {w.host}</span>
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Users className="size-3.5" /> {w.attendees}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
