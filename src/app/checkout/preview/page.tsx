import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Checkout preview" };

type SP = { plan?: string; item?: string };

export default async function CheckoutPreviewPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const label = sp.plan ? `${sp.plan.toUpperCase()} plan` : sp.item ? sp.item : "Your purchase";

  return (
    <PageShell>
      <Container className="py-16 max-w-xl">
        <Card>
          <CardContent className="p-8 space-y-5 text-center">
            <Badge variant="brand"><ShieldCheck className="size-3" /> Demo mode</Badge>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{label}</h1>
            <p className="text-muted-foreground leading-relaxed">
              You'd be on a real Stripe Checkout page right now. This preview shows because
              <code className="mx-1 rounded bg-surface px-1 py-0.5">STRIPE_SECRET_KEY</code>
              isn't set. Add Stripe keys to <code className="mx-1 rounded bg-surface px-1 py-0.5">.env.local</code> and
              checkout flips to the real flow with zero code changes.
            </p>

            <div className="text-left rounded-xl border border-border bg-surface p-4 text-sm">
              <div className="font-semibold mb-2">When wired:</div>
              <ol className="space-y-1.5 text-muted-foreground list-decimal pl-5">
                <li>Form action calls <code>startSubscription / startOneOffCheckout</code></li>
                <li>Server action creates a Stripe Checkout session</li>
                <li>Customer is redirected to Stripe's hosted page</li>
                <li>Stripe posts back to <code>/api/webhooks/stripe</code></li>
                <li>Subscription row upserted in Prisma; user lands on dashboard</li>
              </ol>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild variant="gradient" size="lg">
                <Link href="/dashboard/subscription">Back to dashboard <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </PageShell>
  );
}
