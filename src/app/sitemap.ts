import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/marketplace",
    "/categories",
    "/services",
    "/experts",
    "/pricing",
    "/testimonials",
    "/about",
    "/contact",
    "/hire-me",
    "/hire-an-expert",
    "/webinars",
    "/community",
    "/blog",
    "/faq",
    "/sign-in",
    "/sign-up",
  ];

  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
