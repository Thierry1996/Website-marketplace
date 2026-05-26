import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { UserJSON, DeletedObjectJSON } from "@clerk/nextjs/server";

import { db, hasDatabase } from "@/lib/db";

/**
 * POST /api/webhooks/clerk
 *
 * Receives Clerk webhook events and syncs them into our Prisma User table.
 * Uses `verifyWebhook` (Clerk v7+) — no svix dependency required.
 *
 * Set CLERK_WEBHOOK_SIGNING_SECRET in your env to enable verification.
 */

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Clerk webhook signing secret not configured." },
      { status: 503 }
    );
  }

  let event;
  try {
    event = await verifyWebhook(req);
  } catch (err) {
    console.warn("[clerk webhook] verification failed:", (err as Error).message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!hasDatabase || !db) {
    // Acknowledge so Clerk doesn't retry — but log because we'd want this in production.
    console.warn(`[clerk webhook] ${event.type} received without database; skipping sync.`);
    return NextResponse.json({ received: true, skipped: "no_database" });
  }

  try {
    switch (event.type) {
      case "user.created":
      case "user.updated":
        await upsertUser(event.data as UserJSON);
        break;
      case "user.deleted":
        await deleteUser(event.data as DeletedObjectJSON);
        break;
      default:
        console.log(`[clerk webhook] ignored event: ${event.type}`);
    }
  } catch (err) {
    console.error("[clerk webhook] handler failed:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function upsertUser(u: UserJSON) {
  const email = u.email_addresses?.[0]?.email_address;
  if (!email) {
    console.warn("[clerk webhook] user without email, skipping:", u.id);
    return;
  }

  const name =
    [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || email.split("@")[0];

  await db!.user.upsert({
    where:  { clerkId: u.id },
    update: {
      email,
      name,
      image: u.image_url ?? undefined,
    },
    create: {
      clerkId: u.id,
      email,
      name,
      image: u.image_url ?? undefined,
      role:  "CUSTOMER",
    },
  });
}

async function deleteUser(d: DeletedObjectJSON) {
  if (!d.id) return;
  await db!.user.deleteMany({ where: { clerkId: d.id } });
}
