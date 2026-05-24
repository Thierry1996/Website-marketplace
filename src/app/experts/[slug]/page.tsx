import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Clock, MapPin, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { experts, getExpertBySlug } from "@/lib/experts-data";
import { formatCurrency } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams() {
  return experts.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) return { title: "Expert not found" };
  return { title: `${expert.name} — ${expert.title}`, description: expert.bio };
}

export default async function ExpertPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) notFound();

  return (
    <PageShell>
      <Container className="py-8">
        <Breadcrumb items={[{ label: "Experts", href: "/experts" }, { label: expert.name }]} />
      </Container>

      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Left */}
          <div className="space-y-8">
            <div className="flex flex-wrap items-start gap-6">
              <Avatar className="size-24">
                <AvatarFallback gradient={expert.gradient}>{expert.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Badge variant={expert.available ? "brand" : "default"}>
                  {expert.available ? "Available now" : "Currently booked"}
                </Badge>
                <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">{expert.name}</h1>
                <div className="mt-1 text-base text-muted-foreground">{expert.title}</div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="size-3.5" /> {expert.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                    <span className="font-semibold">{expert.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({expert.reviews})</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3.5" /> Avg {expert.responseHours}h reply
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <section>
              <h2 className="font-display text-xl font-semibold mb-3">About</h2>
              <p className="text-base leading-relaxed text-foreground/85">{expert.bio}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold mb-3">Areas of expertise</h2>
              <div className="flex flex-wrap gap-2">
                {expert.expertise.map((s) => (
                  <Badge key={s} variant="secondary" className="text-sm px-3 py-1.5">{s}</Badge>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold mb-4">What clients say</h2>
              <div className="space-y-3">
                {[
                  { name: "Founder, B2B SaaS",      body: `Working with ${expert.name.split(" ")[0]} was the unlock for our 2024 plan. Conversion up 47%, revenue up 110%.`, initials: "FS" },
                  { name: "VP Growth, marketplace", body: "Brought structure to chaos. Now every test has a clear hypothesis, owner, and follow-up.", initials: "VG" },
                ].map((r) => (
                  <Card key={r.initials}>
                    <CardContent className="p-5 flex gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback gradient={expert.gradient}>{r.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">{r.name}</div>
                        <p className="text-sm leading-relaxed">"{r.body}"</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right — sticky CTA */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <Card className="border-brand/20 shadow-xl shadow-brand/5">
              <CardContent className="p-6 space-y-5">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Hourly</div>
                  <div className="font-display text-4xl font-bold">
                    {formatCurrency(expert.hourlyCents / 100)}<span className="text-base font-medium text-muted-foreground">/hr</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">15-min discovery call always free.</div>
                </div>

                <Separator />

                <div className="space-y-2.5">
                  <Button asChild variant="gradient" size="lg" className="w-full">
                    <Link href="/hire-an-expert">Submit a project brief <ArrowRight className="size-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/contact"><MessageSquare className="size-4" /> Send a message</Link>
                  </Button>
                </div>

                <div className="rounded-lg bg-surface p-3 text-xs text-muted-foreground flex items-start gap-2">
                  <ShieldCheck className="size-4 mt-0.5 text-brand shrink-0" />
                  Every engagement is escrow-protected — funds only release when you approve the deliverable.
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </PageShell>
  );
}
