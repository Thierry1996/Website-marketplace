"use server";

import { z } from "zod";

import { db, hasDatabase } from "@/lib/db";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity:  z.coerce.number().int().min(1).max(99),
  })).min(1, "Cart cannot be empty"),
  couponCode: z.string().optional(),
});

const refundSchema = z.object({
  orderId: z.string().min(1),
  reason:  z.string().max(500).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

/**
 * Stripe Checkout session creation lands in Phase 4 once STRIPE_SECRET_KEY is set.
 * For now we return a fake session URL so the UI flow is testable.
 */
export async function createCheckoutSession(input: unknown): Promise<ActionResult<{ url: string }>> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!process.env.STRIPE_SECRET_KEY) {
    return ok({ url: "/checkout/preview?stub=1" });
  }

  // Real implementation will live here in Phase 4.
  return fail("Stripe wiring lands in Phase 4.");
}

export async function refundOrder(input: unknown): Promise<ActionResult<{ orderId: string }>> {
  const parsed = refundSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) return ok({ orderId: parsed.data.orderId });

  try {
    await db.order.update({ where: { id: parsed.data.orderId }, data: { status: "REFUNDED" } });
    return ok({ orderId: parsed.data.orderId });
  } catch (err) {
    return fail((err as Error).message);
  }
}
