import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { db, hasDatabase } from "@/lib/db";

/**
 * POST /api/webhooks/stripe
 *
 * Stripe webhook receiver. Reads the signature header, verifies the body
 * with STRIPE_WEBHOOK_SECRET, and dispatches to handlers per event type.
 *
 * Returns 200 once successfully verified — Stripe retries 4xx/5xx.
 */

export const runtime = "nodejs"; // need raw body for signature verification

export async function POST(req: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Stripe is not configured on this environment." },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn("[stripe webhook] signature verification failed:", (err as Error).message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await onCheckoutComplete(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await onSubscriptionChange(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await onSubscriptionDelete(event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_succeeded":
        await onInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "account.updated":
        await onConnectAccountUpdate(event.data.object as Stripe.Account);
        break;
      default:
        // Acknowledge unknown events so Stripe stops retrying.
        console.log(`[stripe webhook] ignored event: ${event.type}`);
    }
  } catch (err) {
    console.error("[stripe webhook] handler failed:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// -----------------------------------------------------------------------------
// Handlers
// -----------------------------------------------------------------------------

async function onCheckoutComplete(session: Stripe.Checkout.Session) {
  console.log("[stripe] checkout.session.completed", session.id);
  if (!hasDatabase || !db) return;
  // Once Orders are wired to a real cart, update the order status here.
  // Stub: nothing to persist yet.
}

async function onSubscriptionChange(sub: Stripe.Subscription) {
  console.log("[stripe] subscription change", sub.id, sub.status);
  if (!hasDatabase || !db) return;
  // Map Stripe sub → our SubscriptionStatus enum
  const status = mapStripeSubStatus(sub.status);
  try {
    await db.subscription.upsert({
      where: { stripeSubscriptionId: sub.id },
      update: { status, currentPeriodEnd: new Date(sub.current_period_end * 1000), cancelAtPeriodEnd: sub.cancel_at_period_end },
      create: {
        stripeSubscriptionId: sub.id,
        stripeCustomerId:     typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        plan:                 (sub.items.data[0]?.price.lookup_key as string | null) ?? "unknown",
        status,
        currentPeriodEnd:     new Date(sub.current_period_end * 1000),
        cancelAtPeriodEnd:    sub.cancel_at_period_end,
        userId:               "TODO_USER_ID_FROM_CUSTOMER_LOOKUP",
      },
    });
  } catch (err) {
    console.warn("[stripe] sub upsert failed:", (err as Error).message);
  }
}

async function onSubscriptionDelete(sub: Stripe.Subscription) {
  if (!hasDatabase || !db) return;
  await db.subscription.updateMany({
    where: { stripeSubscriptionId: sub.id },
    data:  { status: "CANCELED" },
  });
}

async function onInvoicePaid(invoice: Stripe.Invoice) {
  console.log("[stripe] invoice paid", invoice.id, invoice.amount_paid);
}

async function onConnectAccountUpdate(account: Stripe.Account) {
  console.log("[stripe] connect account update", account.id, account.charges_enabled, account.payouts_enabled);
  if (!hasDatabase || !db) return;
  await db.vendor.updateMany({
    where: { stripeAccountId: account.id },
    data: { status: account.charges_enabled ? "APPROVED" : "PENDING" },
  });
}

function mapStripeSubStatus(s: Stripe.Subscription.Status): "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELED" | "INCOMPLETE" {
  switch (s) {
    case "trialing":             return "TRIALING";
    case "active":               return "ACTIVE";
    case "past_due":             return "PAST_DUE";
    case "canceled":             return "CANCELED";
    case "unpaid":               return "PAST_DUE";
    default:                     return "INCOMPLETE";
  }
}
