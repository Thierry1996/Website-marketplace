import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/marketing/pricing-card";
import { pricingPlans } from "@/lib/sample-data";

export function PricingPreview() {
  return (
    <Section id="pricing" size="md">
      <Container>
        <SectionHeading
          eyebrow="Simple, transparent pricing"
          title={<>Pay once. <span className="gradient-text">Grow forever.</span></>}
          description="No hidden fees. No surprise commissions. Just powerful templates and a marketplace that converts."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="link">
            <Link href="/pricing">
              Compare all features <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
