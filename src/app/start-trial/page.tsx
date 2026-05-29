import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { TrialCheckout } from "@/components/marketing/trial-checkout";

export const metadata: Metadata = {
  title: "Start your free trial",
  description: "7 days free, $0 due today. Pick your plan and preferred payment method — cancel anytime.",
};

export default function StartTrialPage() {
  return (
    <PageShell>
      <PageHeader
        align="center"
        eyebrow="Free 7-day trial"
        title={<>Start free. <span className="gradient-text">Grow first, pay later.</span></>}
        description="Unlock every Reach feature for 7 days. $0 due today — choose how you'd like to be billed when your trial ends."
      />
      <Container className="py-12">
        <TrialCheckout />
      </Container>
    </PageShell>
  );
}
