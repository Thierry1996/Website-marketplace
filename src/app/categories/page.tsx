import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse Marketly by industry — 15+ categories spanning e-commerce, services, education, wellness, and more.",
};

export default function CategoriesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Built for every industry"
        title={<>Categories that <span className="gradient-text">power real businesses.</span></>}
        description="From fashion to fitness, food to freelance — Marketly templates and vendor storefronts are organized by the way real operators actually run their business."
      />

      <Container className="py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 hover:border-foreground/30 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="grid size-12 place-items-center rounded-xl text-white shadow-md"
                    style={{ background: cat.gradient }}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-brand transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{cat.description}</p>
              </Link>
            );
          })}
        </div>
      </Container>
    </PageShell>
  );
}
