import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock, ArrowRight, Sparkles, Search, Megaphone, Layers, BadgeCheck,
  MessagesSquare, Rocket, TrendingUp,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Container, Section } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogSubscribe } from "@/components/marketing/blog-subscribe";
import { SocialFollow } from "@/components/marketing/social-follow";
import { getBlogPosts } from "@/lib/queries";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Growth Blog — marketing playbooks & release updates",
  description:
    "Reach's growth superpower: proven playbooks to maximize growth, automate with AI, manage accounts like an expert, launch a new store, make your first $100K in profit, and reach more clients. Free strategies for small & medium businesses.",
  keywords: [
    "business growth blog", "marketing agency blog", "grow your business",
    "AI marketing automation", "first 100k profit", "reach more customers",
    "small business marketing", "lead generation", "sales funnel",
  ],
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blog`,
    title: "Reach Growth Blog — marketing playbooks & release updates",
    description: "Proven playbooks to grow your business: AI automation, expert account management, your first $100K, and more.",
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image", title: "Reach Growth Blog", description: "Proven playbooks to grow your business." },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const PILLARS = [
  { Icon: TrendingUp,     label: "Growth maximizing" },
  { Icon: Sparkles,       label: "AI automation" },
  { Icon: BadgeCheck,     label: "Expert management" },
  { Icon: Rocket,         label: "Launch a new store" },
  { Icon: Layers,         label: "First $100K profit" },
  { Icon: Megaphone,      label: "Reaching clients" },
];

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const feature = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== feature.slug);

  // ItemList structured data for SEO (helps Google/Yandex/Bing index posts).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Reach Growth Blog",
    url: `${siteConfig.url}/blog`,
    description: metadata.description,
    blogPost: blogPosts.slice(0, 12).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      author: { "@type": "Person", name: p.author },
      url: `${siteConfig.url}/blog/${p.slug}`,
    })),
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="absolute inset-0 aurora opacity-30" />
        <Container className="relative py-14 sm:py-20 text-center">
          <Badge variant="brand" className="px-3.5 py-1.5">
            <Sparkles className="size-3" /> Our marketing & release-update superpower
          </Badge>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
            The growth blog for businesses that refuse to <span className="gradient-text">stay small.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Proven playbooks, AI automation tactics, and release updates — written to help you reach more
            customers, grow profit, and outpace your competition. Free, forever.
          </p>

          {/* Pillar chips */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {PILLARS.map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium">
                <Icon className="size-3.5 text-brand" /> {label}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="brand" size="lg">
              <Link href="/start-trial">Start free trial <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/analyzer"><Search className="size-4" /> Free site analysis</Link>
            </Button>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="text-xs text-muted-foreground">Follow for daily tips:</span>
            <SocialFollow />
          </div>
        </Container>
      </section>

      <Container className="py-12 space-y-14">
        {/* Feature post */}
        <Link href={`/blog/${feature.slug}`} className="group block">
          <Card className="overflow-hidden hover:shadow-xl transition-all">
            <div className="grid lg:grid-cols-[1.2fr_1fr]">
              <div className="relative aspect-[16/9] lg:aspect-auto" style={{ background: feature.gradient }}>
                <Badge variant="default" className="absolute left-4 top-4 bg-white/90 text-foreground">Featured</Badge>
              </div>
              <CardContent className="p-8 sm:p-10 flex flex-col gap-4 justify-center">
                <div className="flex items-center gap-3 text-xs">
                  <Badge variant="brand">{feature.category}</Badge>
                  <span className="text-muted-foreground inline-flex items-center gap-1"><Clock className="size-3.5" /> {feature.readMin} min read</span>
                  <span className="text-muted-foreground">· {formatDate(feature.date)}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight group-hover:text-brand transition-colors">{feature.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{feature.excerpt}</p>
                <div className="text-sm font-semibold inline-flex items-center gap-1.5 mt-2 text-brand">Read the playbook <ArrowRight className="size-4" /></div>
              </CardContent>
            </div>
          </Card>
        </Link>

        {/* Post grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <Card className="h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative aspect-[16/9]" style={{ background: p.gradient }}>
                  {p.featured && <Badge variant="default" className="absolute left-3 top-3 bg-white/90 text-foreground text-[0.65rem]">Popular</Badge>}
                </div>
                <CardContent className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="secondary">{p.category}</Badge>
                    <span className="text-muted-foreground">· {p.readMin} min read</span>
                  </div>
                  <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-brand transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <span>{p.author}</span>
                    <span>{formatDate(p.date)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Subscribe sales funnel */}
        <BlogSubscribe />
      </Container>

      {/* Our solution approach — differentiation */}
      <Section size="md" className="bg-surface/50 border-y border-border">
        <Container>
          <div className="text-center mb-10">
            <Badge variant="brand"><Sparkles className="size-3" /> Why Reach is different</Badge>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Everyone sells a tactic. <span className="gradient-text">We run the whole engine.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Most agencies hand you ads, or SEO, or a website — and leave you to stitch them together.
              Reach connects every stage of growth into one system, optimized as a whole.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { title: "One connected engine", body: "Ads, content, capture, conversion, and retention share data — so we optimize the system, not a silo." },
              { title: "AI does the busywork", body: "Agentic automation handles content, replies, and optimization, so your strategist focuses on growth." },
              { title: "A real growth partner", body: "A named expert owns your outcome with a 30/60/90 plan — measured in revenue, not vanity metrics." },
            ].map((c, i) => (
              <Card key={c.title}>
                <CardContent className="p-6 space-y-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground font-display text-sm font-bold">{i + 1}</span>
                  <h3 className="font-display font-bold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="brand" size="lg"><Link href="/start-trial">Put it to work — free <ArrowRight className="size-4" /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link href="/#get-in-touch">Get a custom plan</Link></Button>
          </div>
        </Container>
      </Section>

      {/* Experts-wanted band */}
      <Section size="md">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 sm:p-12 text-white">
            <div aria-hidden className="absolute inset-0 aurora aurora-animated opacity-40" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <Badge variant="default" className="bg-white/10 text-white border-white/20">
                  <MessagesSquare className="size-3" /> Knowledge experts wanted
                </Badge>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold">
                  Know your craft? <span className="gradient-text">Share it with 28,000+ operators.</span>
                </h2>
                <p className="mt-3 text-white/75 max-w-lg">
                  Contribute to our community forum, get featured on the blog, and grow your own audience.
                  Join Reach or follow us — and start sharing your expertise today.
                </p>
              </div>
              <div className="space-y-3">
                <Button asChild variant="default" size="lg" className="w-full bg-white text-foreground hover:bg-white/90">
                  <Link href="/sign-up">Join the community <ArrowRight className="size-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-white/30 text-white hover:bg-white/10">
                  <Link href="/community">Visit the forum</Link>
                </Button>
                <div className="pt-1">
                  <div className="text-xs text-white/60 mb-2">Or follow & DM us:</div>
                  <SocialFollow variant="pills" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
