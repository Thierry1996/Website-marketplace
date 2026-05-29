"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { PaymentMethods } from "@/components/marketing/payment-methods";

export function TrustAndPay() {
  return (
    <Section size="md" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 aurora opacity-30" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Payments & security"
          title={<>Get paid every way. <span className="gradient-text-cool">Trusted every time.</span></>}
          description="Collect from your customers straight to your bank — cards, wallets, and stablecoins — on bank-grade, encrypted rails."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* Payment methods */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-7 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold">Accepted payment methods</h3>
                  <Badge variant="brand">Instant payout</Badge>
                </div>
                <PaymentMethods />
                <Button asChild variant="brand" size="lg" className="w-full">
                  <Link href="/pricing">Start collecting payments <ArrowRight className="size-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3 rounded-2xl bg-[linear-gradient(135deg,rgb(var(--success)/0.12),rgb(var(--electric)/0.12))] border border-border p-5">
              <span className="grid size-12 place-items-center rounded-xl bg-surface-elevated shadow text-success">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <div className="font-display font-bold">Bank-grade security on every transaction</div>
                <div className="text-sm text-muted-foreground">Encrypted, tokenized, and independently audited.</div>
              </div>
            </div>
            <TrustBadges variant="grid" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
