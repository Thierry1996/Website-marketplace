import type { Metadata } from "next";
import Link from "next/link";
import { Star, Clock, ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExperts } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experts",
  description: "Hire vetted Marketly experts for funnel strategy, brand, payments, ops, and paid acquisition. Average response time under 6 hours.",
};

export default async function ExpertsPage() {
  const experts = await getExperts();
  return (
    <PageShell>
      <PageHeader
        eyebrow="Hand-picked specialists"
        title={<>Hire the <span className="gradient-text">experts behind</span> top vendors.</>}
        description="Senior operators, designers, and engineers from category-leading companies — vetted by us, available by the hour or by project."
        actions={
          <>
            <Button asChild variant="gradient" size="lg">
              <Link href="/hire-an-expert">Submit a project brief <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/community">Ask the community</Link>
            </Button>
          </>
        }
      />

      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experts.map((e) => (
            <Card key={e.slug} className="hover:shadow-xl hover:-translate-y-1 transition-all group">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="size-14">
                    <AvatarFallback gradient={e.gradient}>{e.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/experts/${e.slug}`}
                      className="font-semibold leading-tight group-hover:text-brand transition-colors block"
                    >
                      {e.name}
                    </Link>
                    <div className="mt-0.5 text-sm text-muted-foreground">{e.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{e.location}</div>
                  </div>
                  <Badge variant={e.available ? "brand" : "default"}>
                    {e.available ? "Available" : "Booked"}
                  </Badge>
                </div>

                <p className="text-sm text-foreground/80 line-clamp-3">{e.bio}</p>

                <div className="flex flex-wrap gap-1.5">
                  {e.expertise.slice(0, 3).map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                  {e.expertise.length > 3 && (
                    <Badge variant="outline">+{e.expertise.length - 3} more</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3.5 fill-accent-strong text-accent-strong" strokeWidth={0} />
                    <span className="font-medium text-foreground">{e.rating.toFixed(1)}</span>
                    <span>({e.reviews})</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> Avg {e.responseHours}h reply
                  </span>
                </div>

                <div className="flex items-end justify-between gap-3 pt-1">
                  <div>
                    <div className="text-xs text-muted-foreground">From</div>
                    <div className="font-display text-xl font-bold leading-none">
                      {formatCurrency(e.hourlyCents / 100)}<span className="text-sm font-medium text-muted-foreground">/hr</span>
                    </div>
                  </div>
                  <Button asChild variant="brand" size="sm">
                    <Link href={`/experts/${e.slug}`}>
                      View profile <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
