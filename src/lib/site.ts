export const siteConfig = {
  name: "Reach",
  shortName: "Reach",
  tagline: "Take your business to your customers in one click.",
  slogan: "Take Your Business to Your Customers — In One Click",
  description:
    "Reach is a lead-generation and marketing agency trusted by millions of small and medium businesses. Social media advertising, content generation, lead magnets, sales funnels, websites, and social media management — one team, one platform, predictable growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://reach.com",
  keywords: [
    "marketing agency",
    "business growth",
    "brand awareness",
    "Meta ads",
    "Instagram marketing",
    "WhatsApp catalog",
    "Pinterest business",
    "TikTok marketing",
    "SEO",
    "agentic commerce",
    "autopilot storefront",
  ],
  links: {
    twitter: "https://twitter.com/reach",
    github: "https://github.com/Thierry1996/Website-marketplace",
    linkedin: "https://linkedin.com/company/reach",
    instagram: "https://instagram.com/reach",
    tiktok: "https://tiktok.com/@reach",
    youtube: "https://youtube.com/@reach",
    facebook: "https://facebook.com/reach",
  },
  contact: {
    email: "hello@reach.com",
    support: "support@reach.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
