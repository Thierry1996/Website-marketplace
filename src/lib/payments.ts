/**
 * Payment + trust configuration. Subscribers can pay Reach via cards, wallets,
 * and stablecoins; their own customers get the same rails through our platform.
 */

export interface PayMethod {
  key: string;
  label: string;
  glyph: string;       // text/emoji mark used in the badge
  color: string;       // brand color
  kind: "card" | "wallet" | "crypto";
  note?: string;
}

export const fiatMethods: PayMethod[] = [
  { key: "stripe",    label: "Stripe",      glyph: "S",   color: "#635BFF", kind: "card",   note: "Cards worldwide" },
  { key: "paypal",    label: "PayPal",      glyph: "P",   color: "#003087", kind: "wallet", note: "Balance & cards" },
  { key: "applepay",  label: "Apple Pay",   glyph: "",   color: "#000000", kind: "wallet", note: "1-tap on iOS" },
  { key: "googlepay", label: "Google Pay",  glyph: "G",   color: "#4285F4", kind: "wallet", note: "1-tap on Android" },
];

export const cryptoMethods: PayMethod[] = [
  { key: "coingate",  label: "CoinGate",    glyph: "◈",   color: "#2C72FF", kind: "crypto", note: "USDT / USDC / BTC" },
  { key: "nexo",      label: "Nexo Pay",    glyph: "N",   color: "#1A4DFF", kind: "crypto", note: "Stablecoins" },
  { key: "coinbase",  label: "Coinbase",    glyph: "C",   color: "#0052FF", kind: "crypto", note: "Coinbase Commerce" },
  { key: "oxo",       label: "OXO",         glyph: "○",   color: "#00D1B2", kind: "crypto", note: "On-chain settle" },
];

export const allMethods = [...fiatMethods, ...cryptoMethods];

export interface TrustBadge {
  key: string;
  label: string;
  sub: string;
  icon: "shield" | "lock" | "card" | "check" | "scan" | "globe";
}

export const trustBadges: TrustBadge[] = [
  { key: "pci",     label: "PCI-DSS Level 1", sub: "Card data never touches our servers", icon: "card" },
  { key: "ssl",     label: "256-bit SSL",     sub: "End-to-end TLS encryption",           icon: "lock" },
  { key: "soc2",    label: "SOC 2 Type II",   sub: "Independently audited controls",      icon: "shield" },
  { key: "gdpr",    label: "GDPR ready",      sub: "Privacy by design",                   icon: "globe" },
  { key: "3ds",     label: "3-D Secure",      sub: "Verified by issuer on every charge",  icon: "scan" },
  { key: "escrow",  label: "Escrow protected",sub: "Funds released on delivery",          icon: "check" },
];
