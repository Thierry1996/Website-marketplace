import { cache } from "react";

import { db, hasDatabase } from "@/lib/db";
import { services as sampleServices, type ServiceEntry } from "@/lib/services-data";

export const getServices = cache(async (): Promise<ServiceEntry[]> => {
  if (!hasDatabase || !db) return sampleServices;
  try {
    const rows = await db.service.findMany({
      where: { available: true },
      include: { vendor: true, category: true },
      take: 60,
    });
    return rows.map(toService);
  } catch {
    return sampleServices;
  }
});

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceEntry | null> => {
  if (!hasDatabase || !db) return sampleServices.find((s) => s.slug === slug) ?? null;
  try {
    const row = await db.service.findUnique({
      where: { slug },
      include: { vendor: true, category: true },
    });
    return row ? toService(row) : null;
  } catch {
    return sampleServices.find((s) => s.slug === slug) ?? null;
  }
});

type DbService = {
  id: string;
  slug: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
  vendor: { displayName: string } | null;
  category: { name: string } | null;
};

function toService(row: DbService): ServiceEntry {
  return {
    slug: row.slug,
    title: row.title,
    provider: row.vendor?.displayName ?? "Unknown vendor",
    category: row.category?.name ?? "Services",
    description: row.description,
    durationMin: row.durationMinutes,
    priceCents: row.priceCents,
    rating: 4.8, // TODO: aggregate from Review when wired
    reviews: 0,
    gradient: "linear-gradient(135deg,#10B981,#8B5CF6)",
  };
}
