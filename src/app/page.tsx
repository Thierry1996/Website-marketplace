import { Navbar }               from "@/components/layout/navbar";
import { Footer }               from "@/components/layout/footer";
import { Hero }                 from "@/components/sections/hero";
import { TrustedBy }            from "@/components/sections/trusted-by";
import { Integrations }         from "@/components/sections/integrations";
import { SubscriptionFeatures } from "@/components/sections/subscription-features";
import { CategoryShowcase }     from "@/components/sections/category-showcase";
import { VideoTestimonials }    from "@/components/sections/video-testimonials";
import { PricingPreview }       from "@/components/sections/pricing-preview";
import { TrustAndPay }          from "@/components/sections/trust-and-pay";
import { Newsletter }           from "@/components/sections/newsletter";
import { FinalCta }             from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Integrations />
        <SubscriptionFeatures />
        <CategoryShowcase />
        <VideoTestimonials />
        <PricingPreview />
        <TrustAndPay />
        <Newsletter />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
