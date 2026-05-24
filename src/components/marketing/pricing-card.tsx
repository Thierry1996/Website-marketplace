"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  description: string;
  priceCents: number;
  period: string;
  features: { label: string; included: boolean }[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
}

export function PricingCard({ plan, index = 0 }: { plan: PricingPlan; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="flex"
    >
      <Card
        className={cn(
          "relative flex flex-col w-full overflow-hidden",
          plan.featured && "border-brand/40 shadow-xl shadow-brand/10 -translate-y-1"
        )}
      >
        {plan.featured && (
          <div className="absolute -top-px inset-x-0 h-1 bg-gradient-to-r from-brand via-secondary to-accent" />
        )}

        <CardContent className="p-7 pt-7 space-y-6 flex-1 flex flex-col">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {plan.name}
              </span>
              {plan.badge && (
                <Badge variant={plan.featured ? "shimmer" : "brand"} className="gap-1">
                  <Sparkles className="size-3" />
                  {plan.badge}
                </Badge>
              )}
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">{plan.description}</h3>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-5xl font-bold tracking-tight">
              {formatCurrency(plan.priceCents / 100)}
            </span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>

          <ul className="space-y-2.5 flex-1">
            {plan.features.map((feature) => (
              <li
                key={feature.label}
                className={cn(
                  "flex items-start gap-2.5 text-sm",
                  !feature.included && "text-muted-foreground line-through"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                    feature.included ? "bg-brand/15 text-brand" : "bg-muted-foreground/10 text-muted-foreground"
                  )}
                >
                  {feature.included ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" />}
                </span>
                {feature.label}
              </li>
            ))}
          </ul>

          <Button
            asChild
            variant={plan.featured ? "gradient" : "outline"}
            size="lg"
            className="w-full mt-2"
          >
            <a href={plan.href}>
              {plan.cta}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
