import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ShieldCheck, Clock, MessageSquare, Heart, Share2, ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ListingCard } from "@/components/marketing/listing-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { marketplaceListings } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams() {
  return marketplaceListings.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = marketplaceListings.find((l) => l.id === slug);
  if (!listing) return { title: "Listing not found" };
  return {
    title: listing.title,
    description: `${listing.title} by ${listing.vendor} on Marketly. Rated ${listing.rating}/5 by ${listing.reviewCount} customers.`,
  };
}

export default async function ListingDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const listing = marketplaceListings.find((l) => l.id === slug);
  if (!listing) notFound();

  const related = marketplaceListings.filter((l) => l.id !== listing.id && l.category === listing.category).slice(0, 3);

  return (
    <PageShell>
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Marketplace", href: "/marketplace" },
            { label: listing.category, href: `/categories/${listing.category.toLowerCase().replace(/ &.*/, "")}` },
            { label: listing.title },
          ]}
        />
      </Container>

      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Left — gallery + tabs */}
          <div className="space-y-6">
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border"
              style={{ background: listing.gradient }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,.6) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,.6) 0 1px, transparent 1px 40px)",
                }}
              />
              {listing.badge && (
                <Badge variant={listing.badge === "BESTSELLER" ? "shimmer" : "accent"} className="absolute left-4 top-4">
                  {listing.badge}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border border-border opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
                  style={{ background: listing.gradient, filter: `hue-rotate(${i * 30}deg)` }}
                />
              ))}
            </div>

            {/* Title block */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="secondary">{listing.category}</Badge>
                {listing.location && (
                  <span className="text-muted-foreground">· {listing.location}</span>
                )}
              </div>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">{listing.title}</h1>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-4 fill-accent-strong text-accent-strong" strokeWidth={0} />
                  <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                  <Link href="#reviews" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
                    ({listing.reviewCount} reviews)
                  </Link>
                </span>
                <span className="text-muted-foreground">By {listing.vendor}</span>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 prose-sm max-w-none">
                <p className="text-base leading-relaxed text-foreground/85">
                  Premium {listing.category.toLowerCase()} solution built by {listing.vendor} for modern businesses
                  that need to launch fast without sacrificing quality. Battle-tested by {listing.reviewCount} customers
                  with a {listing.rating.toFixed(1)}/5 satisfaction rating.
                </p>
                <p className="text-base leading-relaxed text-foreground/85">
                  Ships pixel-perfect and ready to customize in any major site builder. Includes responsive layouts,
                  conversion-optimized CTAs, and integrations with Stripe, Calendly, and 30+ other tools.
                </p>
                <ul className="space-y-2 mt-4">
                  {["Mobile-first responsive design", "Stripe & payment integration", "Custom branding & theming", "Lifetime updates included", "Commercial license"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <ShieldCheck className="size-4 mt-0.5 text-brand shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="features" className="grid gap-3 sm:grid-cols-2">
                {[
                  "Premium templates", "Booking & calendar", "Stripe checkout",
                  "Newsletter integration", "Custom branding", "SEO optimized",
                  "Mobile responsive", "Speed optimized",
                ].map((f) => (
                  <div key={f} className="rounded-lg border border-border p-4">
                    <div className="text-sm font-semibold">{f}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Included in this listing.</div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="reviews" id="reviews" className="space-y-4">
                {[
                  { name: "Aaron W.", initials: "AW", rating: 5, body: "Phenomenal — launched in a weekend. The conversion-tested layouts paid for themselves in week one.", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
                  { name: "Sasha M.", initials: "SM", rating: 5, body: "Stripe integration was the cleanest I've seen out of the box. Vendor responded to a question in under 30 minutes.", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
                  { name: "Devon K.", initials: "DK", rating: 4, body: "Excellent template. Knocked off a star only because I wanted more dark-mode variants — that's coming in v2 per the vendor.", gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
                ].map((r) => (
                  <Card key={r.name}>
                    <CardContent className="p-5 flex gap-4">
                      <Avatar className="size-10">
                        <AvatarFallback gradient={r.gradient}>{r.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">{r.name}</span>
                          <span className="flex items-center gap-0.5 text-accent-strong">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={i < r.rating ? "size-3.5 fill-current" : "size-3.5 text-muted-foreground/30"} strokeWidth={0} />
                            ))}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{r.body}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right — sticky purchase panel */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <Card className="border-brand/20 shadow-xl shadow-brand/5">
              <CardContent className="p-6 space-y-5">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">From</div>
                  <div className="font-display text-4xl font-bold">{formatCurrency(listing.priceCents / 100)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">One-time purchase · commercial license</div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="size-3.5" /> Instant delivery</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><ShieldCheck className="size-3.5" /> 30-day refund</div>
                </div>

                <div className="space-y-2.5">
                  <Button variant="gradient" size="lg" className="w-full">
                    Buy now <ArrowRight className="size-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageSquare className="size-4" /> Message vendor
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
                  <button className="inline-flex items-center gap-1 hover:text-foreground"><Heart className="size-3.5" /> Save</button>
                  <button className="inline-flex items-center gap-1 hover:text-foreground"><Share2 className="size-3.5" /> Share</button>
                </div>
              </CardContent>
            </Card>

            {/* Vendor card */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback gradient={listing.gradient}>{listing.vendor[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{listing.vendor}</div>
                    <div className="text-xs text-muted-foreground">Member since 2023</div>
                  </div>
                  <Badge variant="brand">
                    <ShieldCheck className="size-3" /> Verified
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div>
                    <div className="font-display text-base font-bold">{listing.rating.toFixed(1)}</div>
                    <div className="text-muted-foreground">Rating</div>
                  </div>
                  <div>
                    <div className="font-display text-base font-bold">{listing.reviewCount}</div>
                    <div className="text-muted-foreground">Reviews</div>
                  </div>
                  <div>
                    <div className="font-display text-base font-bold">12</div>
                    <div className="text-muted-foreground">Listings</div>
                  </div>
                </div>

                <Button asChild variant="outline" size="md" className="w-full">
                  <Link href="/marketplace">Visit storefront <ArrowRight className="size-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Related listings</h2>
              <Link href="/marketplace" className="text-sm font-medium hover:underline">View all</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
            </div>
          </section>
        )}
      </Container>
    </PageShell>
  );
}
