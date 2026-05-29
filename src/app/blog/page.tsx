import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Operator playbooks, growth tactics, and engineering deep-dives from the Reach team and top vendors.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const [feature, ...rest] = blogPosts;
  return (
    <PageShell>
      <PageHeader
        eyebrow="Reach journal"
        title={<>Operator playbooks. <span className="gradient-text">Real numbers.</span></>}
        description="What's working right now across the marketplace, in our team's words and from the vendors leading their industries."
      />

      <Container className="py-12 space-y-12">
        {/* Feature post */}
        <Link href={`/blog/${feature.slug}`} className="group block">
          <Card className="overflow-hidden hover:shadow-xl transition-all">
            <div className="grid lg:grid-cols-[1.2fr_1fr]">
              <div className="relative aspect-[16/9] lg:aspect-auto" style={{ background: feature.gradient }} />
              <CardContent className="p-8 sm:p-10 flex flex-col gap-4 justify-center">
                <div className="flex items-center gap-3 text-xs">
                  <Badge variant="brand">{feature.category}</Badge>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> {feature.readMin} min read
                  </span>
                  <span className="text-muted-foreground">· {formatDate(feature.date)}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight group-hover:text-brand transition-colors">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{feature.excerpt}</p>
                <div className="text-sm font-medium inline-flex items-center gap-1.5 mt-2 text-brand">
                  Read story <ArrowRight className="size-4" />
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <Card className="h-full overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <div className="relative aspect-[16/9]" style={{ background: p.gradient }} />
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
      </Container>
    </PageShell>
  );
}
