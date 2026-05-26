import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, ShieldCheck, ArrowRight, Clock } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ServiceBookingForm } from "@/components/marketing/service-booking-form";
import { ServiceCard } from "@/components/marketing/service-card";
import { getServices, getServiceBySlug } from "@/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  if (!svc) return { title: "Service not found" };
  return { title: svc.title, description: svc.description };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  if (!svc) notFound();

  const all = await getServices();
  const related = all.filter((s) => s.slug !== svc.slug && s.category === svc.category).slice(0, 3);

  return (
    <PageShell>
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: svc.category },
            { label: svc.title },
          ]}
        />
      </Container>

      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Left */}
          <div className="space-y-8">
            <div
              className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border"
              style={{ background: svc.gradient }}
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-5 text-white">
                <Badge variant="default" className="bg-white/95 text-foreground mb-2">
                  <Clock className="size-3" /> {svc.durationMin} min
                </Badge>
              </div>
            </div>

            <div>
              <Badge variant="secondary">{svc.category}</Badge>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">{svc.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                  <span className="font-semibold">{svc.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({svc.reviews} reviews)</span>
                </span>
                {svc.location && (
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="size-4" /> {svc.location}
                  </span>
                )}
                <span className="text-muted-foreground">By {svc.provider}</span>
              </div>
            </div>

            <Separator />

            <section>
              <h2 className="font-display text-xl font-semibold mb-3">What you'll get</h2>
              <p className="text-base leading-relaxed text-foreground/85">{svc.description}</p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Vetted, background-checked provider",
                  "Free reschedule up to 24 hours before",
                  "Encrypted payment via Stripe",
                  "5-star satisfaction guarantee or your money back",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <ShieldCheck className="size-4 mt-0.5 text-brand shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Provider */}
            <Card>
              <CardContent className="p-5 flex flex-wrap items-center gap-4">
                <Avatar className="size-14">
                  <AvatarFallback gradient={svc.gradient}>{svc.provider[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{svc.provider}</div>
                  <div className="text-xs text-muted-foreground">Top-rated · 5+ years on Marketly</div>
                </div>
                <Button asChild variant="outline" size="md">
                  <Link href="/marketplace">View profile <ArrowRight className="size-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right — sticky booking form */}
          <aside className="lg:sticky lg:top-24 self-start">
            <ServiceBookingForm service={svc} />
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-6">Similar services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
            </div>
          </section>
        )}
      </Container>
    </PageShell>
  );
}
