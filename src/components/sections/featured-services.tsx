import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/marketing/listing-card";
import { featuredListings } from "@/lib/sample-data";

export function FeaturedServices() {
  return (
    <Section size="md">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            eyebrow="Editor's picks"
            title={<>Featured{" "}<span className="gradient-text">services & storefronts.</span></>}
            description="Handpicked listings that consistently convert visitors into customers."
          />
          <Button asChild variant="ghost" size="md">
            <Link href="/marketplace">Browse all <ArrowRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
