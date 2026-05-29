"use server";

import { z } from "zod";

import { stripe, hasStripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/site";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const PLAN_PRICE_ENV: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro:     process.env.STRIPE_PRICE_PRO,
  studio:  process.env.STRIPE_PRICE_STUDIO,
};

const trialSchema = z.object({
  email:   z.string().email("Enter a valid email"),
  plan:    z.enum(["starter", "pro", "studio"]).default("pro"),
  // The rail the subscriber wants auto-charged when the trial ends.
  method:  z.enum(["stripe", "paypal", "applepay", "googlepay", "coingate", "nexo", "coinbase", "oxo"]).default("stripe"),
});

export type StartTrialInput = z.infer<typeof trialSchema>;

/**
 * Start a FREE 7-day trial behind a $0 paywall.
 *
 * The subscriber picks the plan and their preferred auto-deduction method.
 * $0 is charged today; Stripe Checkout collects the payment method and the
 * subscription auto-bills after the 7-day trial (`trial_period_days: 7`,
 * `payment_behavior: default_incomplete` w/ a $0 setup).
 *
 * Card rails (Stripe / Apple Pay / Google Pay) run through Stripe Checkout.
 * Wallet/crypto rails (PayPal, CoinGate, Nexo, Coinbase, OXO) note the
 * preference and route to their own mandate flow once keys are configured.
 * Without any keys we return the preview page so the flow is fully testable.
 */
export async function startFreeTrial(input: unknown): Promise<ActionResult<{ url: string }>> {
  const parsed = trialSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  const { plan, method, email } = parsed.data;

  // Card-based rails settle via Stripe Checkout with a real $0 trial.
  const cardRails = ["stripe", "applepay", "googlepay"];

  if (hasStripe && stripe && cardRails.includes(method)) {
    const priceId = PLAN_PRICE_ENV[plan];
    if (!priceId) return fail(`No Stripe price ID configured for "${plan}".`);
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: email,
        line_items: [{ price: priceId, quantity: 1 }],
        subscription_data: { trial_period_days: 7 },
        payment_method_collection: "always", // collect a card now, charge $0
        success_url: `${siteConfig.url}/dashboard?trial=started&session={CHECKOUT_SESSION_ID}`,
        cancel_url:  `${siteConfig.url}/start-trial?status=cancelled`,
        allow_promotion_codes: true,
      });
      return ok({ url: session.url ?? "/start-trial" });
    } catch (err) {
      return fail((err as Error).message);
    }
  }

  // Wallet / crypto rails (or no Stripe key) → preview the $0 mandate flow.
  return ok({
    url: `/checkout/preview?trial=1&plan=${plan}&method=${method}&email=${encodeURIComponent(email)}`,
  });
}
