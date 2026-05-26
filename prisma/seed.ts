/**
 * Prisma seed — populates a fresh database with the same sample data the
 * UI shows in dev mode. Run after `npx prisma db push`:
 *
 *     npm run db:seed
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";

import { marketplaceListings }            from "../src/lib/sample-data";
import { services as serviceSeed }        from "../src/lib/services-data";
import { categories }                     from "../src/lib/categories";
import { webinars, communityPosts }       from "../src/lib/content-data";
import { testimonials }                   from "../src/lib/sample-data";

const db = new PrismaClient();

async function main() {
  console.log("[seed] starting");

  // -----------------------------------------------------------------------
  // Categories
  // -----------------------------------------------------------------------
  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, icon: cat.icon.name },
      create: { slug: cat.slug, name: cat.name, description: cat.description, icon: cat.icon.name },
    });
  }
  console.log(`[seed] upserted ${categories.length} categories`);

  // -----------------------------------------------------------------------
  // Demo vendors (so listings + services have FK targets)
  // -----------------------------------------------------------------------
  const VENDORS = [
    { slug: "studio-lumiere",    displayName: "Studio Lumière",    email: "vendor@studio-lumiere.app" },
    { slug: "powerhouse-gym",    displayName: "PowerHouse Gym",    email: "ops@powerhousegym.com" },
    { slug: "fresh-bite-co",     displayName: "Fresh Bite Co.",    email: "hi@freshbite.co" },
    { slug: "northwind-studio",  displayName: "Northwind Studio",  email: "team@northwind.studio" },
    { slug: "zen-collective",    displayName: "Zen Collective",    email: "hello@zen-collective.app" },
    { slug: "flowyoga",          displayName: "FlowYoga",          email: "yoga@flowyoga.app" },
    { slug: "pristine-pros",     displayName: "Pristine Pros",     email: "ops@pristinepros.co" },
    { slug: "ledgerstudio",      displayName: "LedgerStudio",      email: "team@ledgerstudio.app" },
  ];

  const vendorBySlug = new Map<string, { id: string }>();
  for (const v of VENDORS) {
    const user = await db.user.upsert({
      where: { email: v.email },
      update: { name: v.displayName, role: "VENDOR" },
      create: { email: v.email, name: v.displayName, role: "VENDOR" },
    });
    const vendor = await db.vendor.upsert({
      where: { userId: user.id },
      update: { slug: v.slug, displayName: v.displayName, status: "APPROVED" },
      create: { userId: user.id, slug: v.slug, displayName: v.displayName, status: "APPROVED" },
    });
    vendorBySlug.set(v.displayName, { id: vendor.id });
  }
  console.log(`[seed] upserted ${VENDORS.length} demo vendors`);

  // -----------------------------------------------------------------------
  // Listings
  // -----------------------------------------------------------------------
  let listingsInserted = 0;
  for (const l of marketplaceListings) {
    const vendor = vendorBySlug.get(l.vendor) ?? vendorBySlug.get("Studio Lumière")!;
    const slug = `listing-${l.id}`;
    await db.listing.upsert({
      where: { slug },
      update: { title: l.title, priceCents: l.priceCents, rating: l.rating, reviewCount: l.reviewCount, featured: l.badge === "FEATURED" || l.badge === "BESTSELLER" },
      create: {
        slug,
        title: l.title,
        description: `${l.title} by ${l.vendor}`,
        type: "PRODUCT",
        status: "PUBLISHED",
        priceCents: l.priceCents,
        rating: l.rating,
        reviewCount: l.reviewCount,
        featured: l.badge === "FEATURED" || l.badge === "BESTSELLER",
        vendorId: vendor.id,
      },
    });
    listingsInserted++;
  }
  console.log(`[seed] upserted ${listingsInserted} listings`);

  // -----------------------------------------------------------------------
  // Services
  // -----------------------------------------------------------------------
  for (const s of serviceSeed) {
    const vendor = vendorBySlug.get(s.provider) ?? vendorBySlug.get("Studio Lumière")!;
    await db.service.upsert({
      where: { slug: s.slug },
      update: { title: s.title, priceCents: s.priceCents, durationMinutes: s.durationMin },
      create: {
        slug: s.slug,
        title: s.title,
        description: s.description,
        durationMinutes: s.durationMin,
        priceCents: s.priceCents,
        vendorId: vendor.id,
        available: true,
      },
    });
  }
  console.log(`[seed] upserted ${serviceSeed.length} services`);

  // -----------------------------------------------------------------------
  // Webinars
  // -----------------------------------------------------------------------
  for (const w of webinars) {
    await db.webinar.upsert({
      where: { slug: w.slug },
      update: { title: w.title, status: w.status === "replay" ? "COMPLETED" : "SCHEDULED" },
      create: {
        slug: w.slug,
        title: w.title,
        description: w.description,
        startAt: new Date(w.date),
        durationMin: w.durationMin,
        status: w.status === "replay" ? "COMPLETED" : "SCHEDULED",
      },
    });
  }
  console.log(`[seed] upserted ${webinars.length} webinars`);

  // -----------------------------------------------------------------------
  // Community posts — need an author
  // -----------------------------------------------------------------------
  const seedAuthor = await db.user.upsert({
    where: { email: "community@marketly.app" },
    update: { name: "Marketly community" },
    create: { email: "community@marketly.app", name: "Marketly community", role: "CUSTOMER" },
  });
  for (const p of communityPosts) {
    await db.communityPost.upsert({
      where: { id: p.id },
      update: { title: p.title, body: p.body, tags: p.tags, likes: p.likes },
      create: { id: p.id, authorId: seedAuthor.id, title: p.title, body: p.body, tags: p.tags, likes: p.likes },
    });
  }
  console.log(`[seed] upserted ${communityPosts.length} community posts`);

  // -----------------------------------------------------------------------
  // Testimonials
  // -----------------------------------------------------------------------
  for (const t of testimonials) {
    await db.testimonial.create({
      data: {
        name: t.name,
        role: t.role,
        body: t.body,
        rating: t.rating ?? 5,
        featured: true,
      },
    });
  }
  console.log(`[seed] inserted ${testimonials.length} testimonials`);

  console.log("[seed] done.");
}

main()
  .catch((err) => {
    console.error("[seed] failed:", err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
