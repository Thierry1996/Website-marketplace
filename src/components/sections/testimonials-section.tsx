import { Container, Section, SectionHeading } from "@/components/ui/container";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { testimonials } from "@/lib/sample-data";

export function TestimonialsSection() {
  return (
    <Section size="md" className="bg-surface/40">
      <Container>
        <SectionHeading
          eyebrow="Loved by 10,000+ businesses"
          title={<>Real vendors.{" "}<span className="gradient-text">Real growth.</span></>}
          description="From solo creators to multi-location service businesses — Marketly powers the next chapter of ambitious teams."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
