/**
 * Listing queries. Backed by Prisma when `hasDatabase`, by sample data otherwise.
 * Every page in the app reads through this module so flipping the data source
 * is a one-line config change (DATABASE_URL) — no UI rewrites required.
 */

import { cache } from "react";

import { db, hasDatabase } from "@/lib/db";
import {
  marketplaceListings,
  featuredListings,
  type Listing,
} from "@/lib/sample-data";

// Server-side request memoization — multiple components on the same page
// hitting the same query won't hit the DB twice.
export const getListings = cache(async (): Promise<Listing[]> => {
  if (!hasDatabase || !db) return marketplaceListings;

  try {
    const rows = await db.listing.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ featured: "desc" }, { reviewCount: "desc" }],
      take: 60,
      include: { vendor: true, category: true },
    });
    return rows.map(toListing);
  } catch (err) {
    console.warn("[queries/listings] DB read failed, falling back:", (err as Error).message);
    return marketplaceListings;
  }
});

export const getFeaturedListings = cache(async (): Promise<Listing[]> => {
  if (!hasDatabase || !db) return featuredListings;

  try {
    const rows = await db.listing.findMany({
      where: { status: "PUBLISHED", featured: true },
      orderBy: { reviewCount: "desc" },
      take: 6,
      include: { vendor: true, category: true },
    });
    return rows.map(toListing);
  } catch {
    return featuredListings;
  }
});

export const getListingBySlug = cache(async (slug: string): Promise<Listing | null> => {
  if (!hasDatabase || !db) {
    return marketplaceListings.find((l) => l.id === slug) ?? null;
  }

  try {
    const row = await db.listing.findUnique({
      where: { slug },
      include: { vendor: true, category: true },
    });
    return row ? toListing(row) : null;
  } catch {
    return marketplaceListings.find((l) => l.id === slug) ?? null;
  }
});

export const getListingsByCategory = cache(
  async (categoryName: string): Promise<Listing[]> => {
    if (!hasDatabase || !db) {
      return marketplaceListings.filter((l) => l.category === categoryName);
    }
    try {
      const rows = await db.listing.findMany({
        where: { status: "PUBLISHED", category: { name: categoryName } },
        include: { vendor: true, category: true },
      });
      return rows.map(toListing);
    } catch {
      return marketplaceListings.filter((l) => l.category === categoryName);
    }
  }
);

// -----------------------------------------------------------------------------
// Mappers — DB rows → UI-friendly Listing shape.
// -----------------------------------------------------------------------------

type DbListing = {
  id: string;
  title: string;
  priceCents: number;
  rating: number;
  reviewCount: number;
  thumbnailUrl: string | null;
  featured: boolean;
  vendor: { displayName: string } | null;
  category: { name: string } | null;
};

function toListing(row: DbListing): Listing {
  return {
    id: row.id,
    title: row.title,
    vendor: row.vendor?.displayName ?? "Unknown vendor",
    category: row.category?.name ?? "General",
    priceCents: row.priceCents,
    rating: row.rating,
    reviewCount: row.reviewCount,
    badge: row.featured ? "FEATURED" : undefined,
    // Same deterministic gradient so the UI looks consistent across reloads.
    gradient: gradientForId(row.id),
  };
}

const PALETTE = [
  "linear-gradient(135deg,#10B981 0%,#8B5CF6 100%)",
  "linear-gradient(135deg,#8B5CF6 0%,#F59E0B 100%)",
  "linear-gradient(135deg,#F59E0B 0%,#EF4444 100%)",
  "linear-gradient(135deg,#3B82F6 0%,#10B981 100%)",
  "linear-gradient(135deg,#06B6D4 0%,#8B5CF6 100%)",
  "linear-gradient(135deg,#F59E0B 0%,#8B5CF6 100%)",
];

function gradientForId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
