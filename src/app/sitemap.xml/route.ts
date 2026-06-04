import { siteConfig } from "@/lib/site";

/**
 * Sitemap as a plain route handler (not Next's sitemap.ts metadata convention),
 * because the metadata-route-loader mis-parses absolute paths that contain an
 * apostrophe (this project lives in ".../Trey's Website Marketplace/..."). A
 * regular GET handler uses a different loader and is immune to that bug — and
 * behaves identically in production.
 */

export const dynamic = "force-static";

const BLOG_SLUGS = [
  "growth-maximizing-playbook",
  "automation-with-ai-marketing",
  "expert-account-management",
  "growing-a-new-store",
  "first-100k-in-profits",
  "reaching-clients-painpoint-solutions",
  "meta-ads-on-autopilot",
  "instagram-marketing-suite",
  "whatsapp-catalog-commerce",
  "pinterest-tiktok-growth-engine",
  "agentic-commerce-ai-and-seo",
];

const ROUTES = [
  "", "/marketplace", "/categories", "/services", "/experts", "/pricing",
  "/testimonials", "/about", "/contact", "/hire-me", "/hire-an-expert",
  "/webinars", "/community", "/blog", "/analyzer", "/start-trial", "/sell",
  "/faq", "/sign-in", "/sign-up", "/vendor/sign-up", "/join",
];

export function GET() {
  const now = new Date().toISOString();
  const base = siteConfig.url;

  const urls = [
    ...ROUTES.map((path) => ({
      loc: `${base}${path}`,
      priority: path === "" ? "1.0" : path === "/blog" ? "0.9" : "0.7",
      freq: "weekly",
    })),
    ...BLOG_SLUGS.map((slug) => ({
      loc: `${base}/blog/${slug}`,
      priority: "0.6",
      freq: "monthly",
    })),
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${u.loc}</loc><lastmod>${now}</lastmod>` +
          `<changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`
      )
      .join("\n") +
    `\n</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
