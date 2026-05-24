export const siteConfig = {
  name: "Marketly",
  shortName: "Marketly",
  tagline: "The all-in-one marketplace for modern businesses.",
  description:
    "Marketly is a premium multi-vendor marketplace platform for e-commerce dealers, service professionals, consultants, and creators. Sell products, book appointments, host webinars, and grow your community — all in one place.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://marketly.app",
  keywords: [
    "marketplace",
    "multi-vendor",
    "e-commerce",
    "saas",
    "booking",
    "subscriptions",
    "vendor storefront",
    "webinars",
    "expert hiring",
  ],
  links: {
    twitter: "https://twitter.com/marketly",
    github: "https://github.com/Thierry1996/Website-marketplace",
    linkedin: "https://linkedin.com/company/marketly",
    instagram: "https://instagram.com/marketly",
  },
  contact: {
    email: "hello@marketly.app",
    support: "support@marketly.app",
  },
} as const;

export type SiteConfig = typeof siteConfig;
