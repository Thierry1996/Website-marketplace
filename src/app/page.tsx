import { Navbar }              from "@/components/layout/navbar";
import { Footer }              from "@/components/layout/footer";
import { Hero }                from "@/components/sections/hero";
import { TrustedBy }           from "@/components/sections/trusted-by";
import { Categories }          from "@/components/sections/categories";
import { FeaturedVendors }     from "@/components/sections/featured-vendors";
import { FeaturedServices }    from "@/components/sections/featured-services";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WebinarSection }      from "@/components/sections/webinar-section";
import { CommunitySection }    from "@/components/sections/community-section";
import { PricingPreview }      from "@/components/sections/pricing-preview";
import { Newsletter }          from "@/components/sections/newsletter";
import { FinalCta }            from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Categories />
        <FeaturedVendors />
        <FeaturedServices />
        <TestimonialsSection />
        <WebinarSection />
        <CommunitySection />
        <PricingPreview />
        <Newsletter />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
