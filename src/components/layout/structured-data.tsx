import { siteConfig } from "@/lib/site";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
      siteConfig.links.github,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer support",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
