"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ServiceEntry } from "@/lib/services-data";
import { formatCurrency } from "@/lib/utils";

export function ServiceCard({ service, index = 0 }: { service: ServiceEntry; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        <div className="relative aspect-[5/3]" style={{ background: service.gradient }}>
          <Badge variant="default" className="absolute left-3 top-3 bg-white/90 text-foreground">
            <Clock className="size-3" /> {service.durationMin} min
          </Badge>
        </div>

        <CardContent className="flex flex-col flex-1 space-y-3 p-5">
          <div>
            <div className="text-xs text-muted-foreground">{service.provider}</div>
            <h3 className="mt-0.5 font-semibold leading-snug line-clamp-2 group-hover:text-brand transition-colors">
              {service.title}
            </h3>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-accent-strong text-accent-strong" strokeWidth={0} />
              <span className="font-medium">{service.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({service.reviews})</span>
            </span>
            <Badge variant="secondary">{service.category}</Badge>
          </div>

          <div className="flex items-end justify-between gap-3 pt-2 mt-auto">
            <div>
              <div className="text-xs text-muted-foreground">From</div>
              <div className="font-display text-xl font-bold leading-none">{formatCurrency(service.priceCents / 100)}</div>
            </div>
            <Button asChild variant="brand" size="sm">
              <Link href={`/services/${service.slug}`}>
                Book <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
