import { siteConfig } from "@/lib/site";

/**
 * robots.txt as a plain route handler (see sitemap.xml/route.ts for why we
 * avoid Next's robots.ts metadata convention in this folder).
 */

export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /dashboard",
    "Disallow: /vendor",
    "Disallow: /admin",
    "Disallow: /api",
    "",
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    `Host: ${siteConfig.url}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
