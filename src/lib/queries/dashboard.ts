import { cache } from "react";

import { db, hasDatabase } from "@/lib/db";
import {
  sampleOrders,
  sampleBookings,
  sampleMessages,
  vendorListings,
  vendorBookings,
  vendorCustomers,
  vendorPayouts,
  vendorRevenue30d,
  vendorBookings30d,
  adminUsers,
  adminVendors,
  adminListingFlags,
  adminPayments,
  platformRevenue30d,
} from "@/lib/dashboard-data";

/**
 * Dashboard queries — typed to match what each dashboard page consumes.
 * Every query falls back to sample data so dashboards keep rendering
 * before DATABASE_URL is provisioned.
 */

// USER DASHBOARD
export const getMyOrders = cache(async (userId?: string) => {
  if (!hasDatabase || !db || !userId) return sampleOrders;
  try {
    const rows = await db.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { items: { include: { product: true } } },
    });
    // Map → UI shape (kept compatible with sampleOrders type).
    return rows.map((r) => ({
      id: r.id,
      vendor: r.items[0]?.product.vendorId ?? "—",
      item: r.items[0]?.product.title ?? "Order",
      totalCents: r.totalCents,
      status: r.status.toLowerCase() as "pending" | "paid" | "fulfilled" | "refunded",
      placedAt: r.createdAt.toISOString().slice(0, 10),
    }));
  } catch {
    return sampleOrders;
  }
});

export const getMyBookings = cache(async (userId?: string) => {
  if (!hasDatabase || !db || !userId) return sampleBookings;
  try {
    const rows = await db.booking.findMany({
      where: { userId },
      orderBy: { startAt: "asc" },
      include: { service: true },
      take: 30,
    });
    return rows.map((r) => ({
      id: r.id,
      service: r.service.title,
      provider: r.service.vendorId,
      at: r.startAt.toISOString(),
      durationMin: r.service.durationMinutes,
      status: r.status === "CONFIRMED" || r.status === "REQUESTED" ? "upcoming" as const
            : r.status === "CANCELLED" ? "cancelled" as const
            : "completed" as const,
      gradient: "linear-gradient(135deg,#10B981,#8B5CF6)",
    }));
  } catch {
    return sampleBookings;
  }
});

export const getMyMessages = cache(async () => sampleMessages);

// VENDOR DASHBOARD
export const getVendorListings = cache(async (vendorId?: string) => {
  if (!hasDatabase || !db || !vendorId) return vendorListings;
  try {
    const rows = await db.listing.findMany({
      where: { vendorId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      type: "Template" as const,
      status: (r.status === "PUBLISHED" ? "Published" : r.status === "DRAFT" ? "Draft" : "Archived") as
        "Published" | "Draft" | "Archived",
      priceCents: r.priceCents,
      sales: 0,
      rating: r.rating,
      views30d: 0,
    }));
  } catch {
    return vendorListings;
  }
});

export const getVendorBookings    = cache(async () => vendorBookings);
export const getVendorCustomers   = cache(async () => vendorCustomers);
export const getVendorPayouts     = cache(async () => vendorPayouts);
export const getVendorRevenue30d  = cache(async () => vendorRevenue30d);
export const getVendorBookings30d = cache(async () => vendorBookings30d);

// ADMIN
export const getAdminUsers     = cache(async () => adminUsers);
export const getAdminVendors   = cache(async () => adminVendors);
export const getAdminFlags     = cache(async () => adminListingFlags);
export const getAdminPayments  = cache(async () => adminPayments);
export const getPlatformRevenue30d = cache(async () => platformRevenue30d);
