import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, Users, PlayCircle, ArrowRight, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getWebinars, getWebinarBySlug } from "@/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const webinars = await getWebinars();
  return webinars.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const w = await getWebinarBySlug(slug);
  if (!w) return { title: "Webinar not found" };
  return { title: w.title, description: w.description };
}

export default async function WebinarDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const w = await getWebinarBySlug(slug);
  if (!w) notFound();

  const isReplay = w.status === "replay";

  return (
    <PageShell>
      <Container className="py-8">
        <Breadcrumb items={[{ label: "Webinars", href: "/webinars" }, { label: w.title }]} />
      </Container>

      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          {/* Left */}
          <div className="space-y-8">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border" style={{ background: w.gradient }}>
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-20 place-items-center rounded-full bg-white/95 text-foreground shadow-2xl hover:scale-105 transition-transform cursor-pointer">
                  <PlayCircle className="size-10" strokeWidth={1.3} />
                </span>
              </div>
              <Badge variant={isReplay ? "default" : "shimmer"} className="absolute left-4 top-4">
                {isReplay ? "Replay available" : "Upcoming live"}
              </Badge>
            </div>

            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{w.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" /> {new Date(w.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {w.durationMin} min</span>
                <span className="inline-flex items-center gap-1"><Users className="size-3.5" /> {w.attendees.toLocaleString()} attending</span>
              </div>
            </div>

            <Separator />

            <section>
              <h2 className="font-display text-xl font-semibold mb-3">About this session</h2>
              <p className="text-base leading-relaxed text-foreground/85">{w.description}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold mb-3">Agenda</h2>
              <ol className="space-y-2.5">
                {w.agenda.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground font-display text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Right — RSVP / replay */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <Card className="border-brand/20 shadow-xl shadow-brand/5">
              <CardContent className="p-6 space-y-5">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{isReplay ? "Replay" : "Live session"}</div>
                  <div className="font-display text-2xl font-bold mt-1">Free</div>
                  <div className="mt-1 text-xs text-muted-foreground">For all Marketly members</div>
                </div>

                <Separator />

                <Button variant="gradient" size="lg" className="w-full">
                  {isReplay ? "Watch replay" : "Reserve my seat"}
                  <ArrowRight className="size-4" />
                </Button>

                <div className="rounded-lg bg-surface p-3 text-xs text-muted-foreground flex items-start gap-2">
                  <ShieldCheck className="size-4 mt-0.5 text-brand shrink-0" />
                  Calendar invite + email reminder. Unsubscribe anytime.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarFallback gradient={w.gradient}>{w.host.split(" ").map((p) => p[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-semibold leading-tight">{w.host}</div>
                  <div className="text-xs text-muted-foreground">{w.hostTitle}</div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </PageShell>
  );
}
