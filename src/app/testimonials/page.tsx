import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { testimonials } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What 10,000+ vendors say about running their business on Reach.",
};

// Stitch extra entries onto the homepage roster.
const extended = [
  ...testimonials,
  { name: "Jordan B.", role: "Salon owner, Chicago",     body: "Switched from Square + Wix and ended up with one platform and a much cleaner brand. Total time saved each week: 6+ hours.",                                        avatarGradient: "linear-gradient(135deg,#F472B6,#FBBF24)", rating: 5 },
  { name: "Halima R.", role: "Yoga instructor, Lagos",   body: "First 50 bookings came from the marketplace itself — that paid for the year of Reach in week three.",                                                          avatarGradient: "linear-gradient(135deg,#06B6D4,#8B5CF6)", rating: 5 },
  { name: "Ben T.",    role: "Marketing consultant",     body: "The expert directory drives 30% of my pipeline now. Best-in-class profile pages, sane payout flow.",                                                              avatarGradient: "linear-gradient(135deg,#3B82F6,#10B981)", rating: 5 },
  { name: "Maya O.",   role: "Cleaning service owner",   body: "Setup the quote builder in an afternoon. Now I just send a link instead of doing 30-minute walkthrough calls. ROI was immediate.",                                avatarGradient: "linear-gradient(135deg,#10B981,#06B6D4)", rating: 5 },
  { name: "Eli K.",    role: "Funnel builder",           body: "I've shipped 4 client storefronts this quarter using Reach Studio. Every single one converts above industry average.",                                          avatarGradient: "linear-gradient(135deg,#8B5CF6,#EC4899)", rating: 5 },
  { name: "Aiko S.",   role: "Online educator",          body: "Subscriptions + replays + community in one place. I cancelled three other tools when I moved over.",                                                              avatarGradient: "linear-gradient(135deg,#FBBF24,#34D399)", rating: 5 },
];

export default function TestimonialsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="What vendors say"
        title={<>Trusted by 10,000+ <span className="gradient-text">ambitious operators.</span></>}
        description="From solo creators to multi-location service businesses, here's what running on Reach actually feels like — in their words."
        align="center"
      />

      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extended.map((t, i) => (
            <TestimonialCard key={t.name + i} testimonial={t} index={i} />
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
