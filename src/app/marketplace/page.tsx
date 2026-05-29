import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { MarketplaceGrid } from "@/components/marketing/marketplace-grid";
import { SubmissionsStrip } from "@/components/marketing/submissions-strip";
import { getListings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Browse 500+ vendor storefronts, templates, services, and booking platforms across 12+ industries.",
};

export default async function MarketplacePage() {
  const listings = await getListings();
  return (
    <PageShell>
      <PageHeader
        eyebrow="The marketplace"
        title={<>Find a storefront that <span className="gradient-text">fits your business.</span></>}
        description="Templates, services, booking platforms, and digital products from 10,000+ verified vendors — all reviewed by real customers."
      />

      <Container className="py-12">
        <SubmissionsStrip />
        <MarketplaceGrid listings={listings} />
      </Container>
    </PageShell>
  );
}
