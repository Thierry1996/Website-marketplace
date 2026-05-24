import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/marketing/service-card";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services",
  description: "Book professionally-vetted services on Marketly — wellness, fitness, beauty, cleaning, consulting, and more.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Bookable services"
        title={<>Real-time booking with <span className="gradient-text">verified pros.</span></>}
        description="Browse vetted service providers, see live availability, and book in seconds. Cancellation up to 24 hours before — no questions asked."
      />

      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
