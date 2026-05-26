import { cache } from "react";

import { db, hasDatabase } from "@/lib/db";
import { experts as sampleExperts, type ExpertEntry } from "@/lib/experts-data";

/**
 * Experts are modeled as Users with role=ADMIN/VENDOR + bio fields, with
 * extended metadata living in a future `Expert` table. For Phase 4 we read
 * from sample data — flip to Prisma once the Expert schema lands.
 */

export const getExperts = cache(async (): Promise<ExpertEntry[]> => {
  if (!hasDatabase || !db) return sampleExperts;
  // Real implementation will land in Phase 5 once Expert model exists.
  return sampleExperts;
});

export const getExpertBySlug = cache(async (slug: string): Promise<ExpertEntry | null> => {
  return sampleExperts.find((e) => e.slug === slug) ?? null;
});
