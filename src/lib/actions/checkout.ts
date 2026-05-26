"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { stripe, hasStripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/site";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const PLAN_PRICE_ENV: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro:     process.env.STRIPE_PRICE_PRO,
  studio:  process.env.STRIPE_PRICE_STUDIO,
};

const subscribeSchema = z.object({
  plan: z.enum(["starter", "pro", "studio"]),
});

const oneOffSchema = z.object({
  name:        z.string().min(2),
  priceCents:  z.coerce.number().int().positive(),
  currency:    z.string().length(3).default("usd"),
  successPath: z.string().startsWith("/").default("/dashboard"),
  cancelPath:  z.string().startsWith("/").default("/pricing"),
});

/**
 * Subscribe action — creates a Stripe Checkout session for a recurring plan.
 * Falls back to /checkout/preview when no STRIPE_SECRET_KEY is configured.
 */
export async function startSubscription(input: unknown): Promise<ActionResult<{ url: string }>> {
  const parsed = subscribeSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasStripe || !stripe) {
    return ok({ url: `/checkout/preview?plan=${parsed.data.plan}` });
  }

  const priceId = PLAN_PRICE_ENV[parsed.data.plan];
  if (!priceId) return fail(`No Stripe price ID configured for plan "${parsed.data.plan}".`);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteConfig.url}/dashboard/subscription?status=success&session={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${siteConfig.url}/pricing?status=cancelled`,
      allow_promotion_codes: true,
    });
    return ok({ url: session.url ?? "/pricing" });
  } catch (err) {
    return fail((err as Error).message);
  }
}

/**
 * One-off product checkout — for template purchases on /marketplace/[slug].
 */
export async function startOneOffCheckout(input: unknown): Promise<ActionResult<{ url: string }>> {
  const parsed = oneOffSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasStripe || !stripe) {
    return ok({ url: `/checkout/preview?item=${encodeURIComponent(parsed.data.name)}` });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency:     parsed.data.currency,
          unit_amount:  parsed.data.priceCents,
          product_data: { name: parsed.data.name },
        },
        quantity: 1,
      }],
      success_url: `${siteConfig.url}${parsed.data.successPath}?status=success&session={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${siteConfig.url}${parsed.data.cancelPath}?status=cancelled`,
    });
    return ok({ url: session.url ?? parsed.data.cancelPath });
  } catch (err) {
    return fail((err as Error).message);
  }
}

/**
 * Form-friendly variant that redirects on success. Use from <form action={...}>.
 */
export async function subscribeFormAction(formData: FormData) {
  const result = await startSubscription({ plan: formData.get("plan") });
  if (result.success) redirect(result.data.url);
}
