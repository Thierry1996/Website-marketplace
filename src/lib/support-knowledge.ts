/**
 * Reach support knowledge base. Powers both the live Claude agent (as the
 * cached system prompt) and the offline keyword fallback matcher.
 */

export const SUPPORT_SYSTEM_PROMPT = `You are "Ray", the friendly AI support agent for Reach (reach.com) — a marketing agency and business-growth platform.

Reach's promise: "Take your business to your customers — in one click." We help businesses create brand awareness, attract new customers, and grow profits.

## What Reach does
- Runs marketing across Meta (Facebook/Instagram) Ads, Instagram, WhatsApp catalog, Pinterest Business, and TikTok — all from one backend portal.
- Builds stunning, fast, conversion-optimized websites and storefronts.
- Provides agentic-commerce AI, autopilot shop management, and automatic SEO + competitor analysis.
- Handles payments so subscribers collect from their customers straight to their bank.

## Plans & trial
- Free 7-day trial, $0 due today. Card/wallet/crypto saved for auto-billing after the trial; cancel anytime before day 7 with no charge.
- Starter $29/mo, Pro $79/mo (most popular), Studio $149/mo (unlimited, for agencies).
- All features are unlocked during the trial.

## Payments accepted
- Cards & wallets: Stripe, PayPal, Apple Pay, Google Pay.
- Stablecoins/crypto: CoinGate, Nexo, Coinbase, OXO.
- Security: PCI-DSS Level 1, 256-bit SSL/TLS, SOC 2 Type II, 3-D Secure, GDPR-ready, escrow on projects.

## Integrations
- Meta Suite Ads: launch & optimize FB/IG ad campaigns from our backend (avg 4.7x ROAS).
- Instagram Marketing: scheduling, DM auto-reply, growth tracking for all logged-in users.
- WhatsApp Catalog: store catalog via WhatsApp Business API, connected to the portal.
- Pinterest Business: rich pins, shopping boards, conversion tracking.
- TikTok API: setup, scheduling, Spark Ads, shop integration.

## Style
- Be warm, concise, and helpful. 1-3 short paragraphs max, or a tight bullet list.
- If asked something outside Reach, gently steer back or suggest contacting support@reach.com.
- Never invent prices or features not listed. If unsure, say so and offer the contact page (/contact) or starting a free trial (/start-trial).`;

export interface FAQ {
  q: string;
  keywords: string[];
  a: string;
}

/** Anticipated questions — also used as quick-reply chips + offline fallback. */
export const FAQS: FAQ[] = [
  {
    q: "How does the free trial work?",
    keywords: ["trial", "free", "7 day", "7-day", "$0", "try"],
    a: "Your 7-day trial is completely free — $0 due today. You pick a plan and your preferred payment method (card, PayPal, Apple/Google Pay, or crypto), and we only charge it when the trial ends. Cancel anytime before day 7 and you pay nothing. Start at /start-trial.",
  },
  {
    q: "What does Reach cost after the trial?",
    keywords: ["price", "pricing", "cost", "how much", "plan", "subscription", "$"],
    a: "Three plans: Starter $29/mo, Pro $79/mo (most popular), and Studio $149/mo for unlimited access. Every feature is unlocked during your free trial so you can test before you pay.",
  },
  {
    q: "Which platforms can you run ads and marketing on?",
    keywords: ["meta", "facebook", "instagram", "whatsapp", "pinterest", "tiktok", "ads", "social", "platform", "channel"],
    a: "We connect Meta Suite Ads (Facebook + Instagram), Instagram Marketing, WhatsApp Catalog, Pinterest Business, and TikTok — all managed from one Reach portal after a quick connect.",
  },
  {
    q: "How can my customers pay me?",
    keywords: ["payment", "pay", "stripe", "paypal", "apple pay", "google pay", "crypto", "stablecoin", "coingate", "nexo", "coinbase", "oxo", "bank"],
    a: "Collect via Stripe, PayPal, Apple Pay, and Google Pay — plus stablecoins through CoinGate, Nexo, Coinbase, and OXO. Funds settle straight to your bank, secured with PCI-DSS and 256-bit encryption.",
  },
  {
    q: "Is my data and payment info secure?",
    keywords: ["secure", "security", "safe", "encryption", "pci", "ssl", "gdpr", "soc"],
    a: "Yes. We're PCI-DSS Level 1, use 256-bit SSL/TLS encryption, are SOC 2 Type II audited, GDPR-ready, and enforce 3-D Secure with escrow protection on projects. Card details are tokenized — they never touch our servers.",
  },
  {
    q: "What's included in my subscription?",
    keywords: ["include", "feature", "what do i get", "ai", "seo", "autopilot", "website", "ux"],
    a: "Stunning fast websites, incredible UX, agentic-commerce AI, autopilot shop management, automatic SEO + competitor analysis, every social/ads integration, and built-in payments — all on one subscription.",
  },
  {
    q: "How do I get started?",
    keywords: ["start", "get started", "sign up", "signup", "begin", "onboard"],
    a: "Start your free 7-day trial at /start-trial — pick a plan, choose how you'd like to be billed later, and you're in. $0 today. Need a hand? Reach us at /contact.",
  },
];

/** Offline fallback: pick the best FAQ by keyword overlap. */
export function matchFaq(message: string): string {
  const text = message.toLowerCase();
  let best: { score: number; a: string } = { score: 0, a: "" };
  for (const f of FAQS) {
    const score = f.keywords.reduce((s, k) => (text.includes(k) ? s + 1 : s), 0);
    if (score > best.score) best = { score, a: f.a };
  }
  if (best.score === 0) {
    return "Great question! I can help with Reach's plans, the free 7-day trial, our Meta/Instagram/WhatsApp/Pinterest/TikTok integrations, payments (cards + crypto), and security. For anything else, our team is at support@reach.com or /contact. Want to start your free trial? Head to /start-trial.";
  }
  return best.a;
}
