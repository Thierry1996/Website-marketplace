"use server";

import { z } from "zod";

import { failFromZod, fail, ok, type ActionResult } from "./_result";

/**
 * Stablecoin checkout. Routes to the configured provider (CoinGate, Nexo,
 * Coinbase Commerce, OXO). Each provider's API key gates real charge creation;
 * without keys we return a preview URL so the flow is testable.
 */

const cryptoSchema = z.object({
  provider:   z.enum(["coingate", "nexo", "coinbase", "oxo"]),
  amountCents: z.coerce.number().int().positive(),
  currency:   z.string().length(3).default("USD"),
  asset:      z.enum(["USDT", "USDC", "BTC", "ETH"]).default("USDC"),
  orderId:    z.string().min(1),
});

const PROVIDER_ENV: Record<string, string | undefined> = {
  coingate: process.env.COINGATE_API_KEY,
  nexo:     process.env.NEXO_API_KEY,
  coinbase: process.env.COINBASE_COMMERCE_API_KEY,
  oxo:      process.env.OXO_API_KEY,
};

export async function startCryptoCheckout(input: unknown): Promise<ActionResult<{ url: string; provider: string }>> {
  const parsed = cryptoSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  const { provider, orderId, asset } = parsed.data;
  const key = PROVIDER_ENV[provider];

  if (!key) {
    return ok({
      url: `/checkout/preview?crypto=${provider}&asset=${asset}&order=${orderId}`,
      provider,
    });
  }

  // Real provider charge creation lands here once API keys are configured.
  // Each provider has a distinct create-charge endpoint + webhook for confirmation.
  return fail(`Live ${provider} charges activate once its API key is configured.`);
}
