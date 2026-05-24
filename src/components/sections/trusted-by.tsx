import { Container } from "@/components/ui/container";
import { trustedBrands } from "@/lib/sample-data";

export function TrustedBy() {
  return (
    <section className="py-14 border-y border-border bg-surface/60">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by vendors building on top of
        </p>
        <div className="mt-6 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-12 sm:gap-16">
            {[...trustedBrands, ...trustedBrands].map((brand, i) => (
              <span
                key={i}
                className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
