import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Compass, ShieldCheck, Heart, ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About us",
  description: "Marketly is the all-in-one marketplace platform for modern operators. Our mission: make it 10x easier to launch and grow a real business online.",
};

const values = [
  { Icon: Compass,    title: "Customer-obsessed",     body: "Every roadmap decision starts with vendor pain. We sit in on calls, ship fast, and never hide behind metrics." },
  { Icon: ShieldCheck,title: "Trust before scale",    body: "Escrow on every project, verified vendor reviews, no platform commission games. We earn the right to grow." },
  { Icon: Sparkles,   title: "Craft over speed",      body: "Templates that win awards. Code that survives audits. Design that converts. No compromises." },
  { Icon: Heart,      title: "Operators, not gurus",  body: "Our team has run marketplaces, run salons, run ad agencies. We build the tools we wish we had." },
];

const team = [
  { name: "Lena Park",    role: "Co-founder & CEO",       initials: "LP", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { name: "Marcus Reyes", role: "Co-founder & COO",       initials: "MR", gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { name: "Devon Kim",    role: "VP Engineering",         initials: "DK", gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)" },
  { name: "Priya Shah",   role: "Head of Design",         initials: "PS", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)" },
  { name: "Sasha Malik",  role: "Head of Operations",     initials: "SM", gradient: "linear-gradient(135deg,#06B6D4,#3B82F6)" },
  { name: "Aaron Woods",  role: "VP Growth",              initials: "AW", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About Marketly"
        title={<>We're building the marketplace platform <span className="gradient-text">operators wish existed.</span></>}
        description="Marketly started from a question: why is it so hard to launch a real online business in 2026? Templates are bloated, payments are fragile, and discovery is broken. We're fixing all of it."
      />

      <Section size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="space-y-4 text-foreground/85">
              <p>
                Founded in 2023 by two operators who were tired of stitching together six SaaS tools just to start
                selling, Marketly is now the trusted platform behind 10,000+ vendor storefronts across 15+ industries.
              </p>
              <p>
                Our thesis is simple: templates, payments, bookings, community, and discovery should live in one product.
                Built right, that product compounds — every vendor becomes another reason to join.
              </p>
              <p>
                We're a remote-first team of 24 in 9 countries. We ship every week, talk to vendors every day, and
                obsess over the quality of the work.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="font-display text-3xl font-bold">2023</div>
                <div className="text-sm text-muted-foreground">Founded</div>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="font-display text-3xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Team members</div>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="font-display text-3xl font-bold">10,000+</div>
                <div className="text-sm text-muted-foreground">Vendor storefronts</div>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="font-display text-3xl font-bold">$42M</div>
                <div className="text-sm text-muted-foreground">Vendor GMV / yr</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" className="bg-surface/50">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="brand"><Sparkles className="size-3" /> Our values</Badge>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">What we care about</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, body }) => (
              <Card key={title}>
                <CardContent className="p-6 space-y-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary">The team</Badge>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">Leadership</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <Card key={m.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5 flex items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarFallback gradient={m.gradient}>{m.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold leading-tight">{m.name}</div>
                    <div className="text-sm text-muted-foreground">{m.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" className="bg-foreground text-background">
        <Container>
          <div className="mx-auto max-w-2xl text-center space-y-5">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Want to build the next chapter with us?</h2>
            <p className="text-background/70">We're hiring across engineering, design, and partnerships. Remote-friendly.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/careers">See open roles <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-background hover:bg-white/10">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
