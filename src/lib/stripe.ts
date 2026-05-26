/**
 * Stripe singleton. Returns `null` when STRIPE_SECRET_KEY is unset so the
 * rest of the app can no-op gracefully in early-stage dev.
 */

import Stripe from "stripe";

declare global {
  // eslint-disable-next-line no-var
  var __stripe__: Stripe | null | undefined;
}

function create(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    // Stripe library auto-pins to latest API; explicit version optional.
    typescript: true,
  });
}

export const stripe = globalThis.__stripe__ ?? (globalThis.__stripe__ = create());
export const hasStripe = stripe != null;
