import { cache } from "react";

import { db, hasDatabase } from "@/lib/db";
import {
  webinars   as sampleWebinars,
  blogPosts  as sampleBlogPosts,
  communityPosts as sampleCommunityPosts,
  type WebinarEntry,
  type BlogPost,
  type CommunityPostEntry,
} from "@/lib/content-data";

// -----------------------------------------------------------------------------
// Webinars
// -----------------------------------------------------------------------------

export const getWebinars = cache(async (): Promise<WebinarEntry[]> => {
  if (!hasDatabase || !db) return sampleWebinars;
  try {
    const rows = await db.webinar.findMany({
      orderBy: { startAt: "desc" },
      take: 24,
      include: { vendor: true },
    });
    return rows.map(toWebinar);
  } catch {
    return sampleWebinars;
  }
});

export const getWebinarBySlug = cache(async (slug: string): Promise<WebinarEntry | null> => {
  if (!hasDatabase || !db) return sampleWebinars.find((w) => w.slug === slug) ?? null;
  try {
    const row = await db.webinar.findUnique({ where: { slug }, include: { vendor: true } });
    return row ? toWebinar(row) : null;
  } catch {
    return sampleWebinars.find((w) => w.slug === slug) ?? null;
  }
});

type DbWebinar = {
  id: string;
  slug: string;
  title: string;
  description: string;
  startAt: Date;
  durationMin: number;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";
  vendor: { displayName: string } | null;
};

function toWebinar(row: DbWebinar): WebinarEntry {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    host: row.vendor?.displayName ?? "Reach team",
    hostTitle: "Vendor",
    date: row.startAt.toISOString(),
    durationMin: row.durationMin,
    status: row.status === "COMPLETED" ? "replay" : "upcoming",
    attendees: 0, // computed from WebinarSignup later
    gradient: "linear-gradient(135deg,#10B981,#8B5CF6)",
    agenda: [],
  };
}

// -----------------------------------------------------------------------------
// Blog (filesystem-backed in Phase 5; for now sample data only)
// -----------------------------------------------------------------------------

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => sampleBlogPosts);
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> =>
  sampleBlogPosts.find((p) => p.slug === slug) ?? null);

// -----------------------------------------------------------------------------
// Community
// -----------------------------------------------------------------------------

export const getCommunityPosts = cache(async (): Promise<CommunityPostEntry[]> => {
  if (!hasDatabase || !db) return sampleCommunityPosts;
  try {
    const rows = await db.communityPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      include: { author: true },
      take: 20,
    });
    return rows.map((r) => ({
      id: r.id,
      author: r.author.name ?? "Anonymous",
      authorTitle: "Member",
      initials: (r.author.name ?? "?").split(" ").map((s) => s[0]).join("").toUpperCase(),
      gradient: "linear-gradient(135deg,#10B981,#8B5CF6)",
      postedAgo: ago(r.createdAt),
      title: r.title,
      body: r.body,
      tags: r.tags,
      replies: 0,
      likes: r.likes,
    }));
  } catch {
    return sampleCommunityPosts;
  }
});

function ago(d: Date) {
  const ms = Date.now() - d.getTime();
  const h = Math.floor(ms / 3_600_000);
  if (h < 1) return "now";
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
