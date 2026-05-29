import { Navbar }               from "@/components/layout/navbar";
import { Footer }               from "@/components/layout/footer";
import { Hero }                 from "@/components/sections/hero";
import { TrustedBy }            from "@/components/sections/trusted-by";
import { Integrations }         from "@/components/sections/integrations";
import { SubscriptionFeatures } from "@/components/sections/subscription-features";
import { HowItWorksStack }      from "@/components/sections/how-it-works-stack";
import { CategoryShowcase }     from "@/components/sections/category-showcase";
import { VideoTestimonials }    from "@/components/sections/video-testimonials";
import { PricingPreview }       from "@/components/sections/pricing-preview";
import { TrustAndPay }          from "@/components/sections/trust-and-pay";
import { FreeSignupBanner }     from "@/components/sections/free-signup-banner";
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

        {/* Overlapping: features pull up over the dark integrations section */}
        <div className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-background shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.25)]">
          <SubscriptionFeatures />
        </div>

        <HowItWorksStack />
        <CategoryShowcase />
        <VideoTestimonials />
        <PricingPreview />
        <TrustAndPay />

        {/* Free sign-up banner overlaps into the final CTA below */}
        <FreeSignupBanner />
        <div className="relative z-10 rounded-t-[2.5rem] bg-background pt-10">
          <Newsletter />
        </div>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
