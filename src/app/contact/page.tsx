import type { Metadata } from "next";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/marketing/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Reach team — support, sales, partnerships, or press.",
};

const channels = [
  { Icon: Mail,            title: "Support",       body: siteConfig.contact.support,            href: `mailto:${siteConfig.contact.support}` },
  { Icon: MessageSquare,   title: "Sales",         body: "Talk to a Reach specialist",       href: "#contact-form" },
  { Icon: MapPin,          title: "Headquarters",  body: "San Francisco · Austin · Remote-first" },
  { Icon: Phone,           title: "Press",         body: "press@reach.com",                  href: "mailto:press@reach.com" },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact us"
        title={<>Let's <span className="gradient-text">talk shop.</span></>}
        description="Support, sales, partnerships, or press — we read every message. Most inquiries get a reply within 6 business hours."
      />

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {channels.map(({ Icon, title, body, href }) => {
              const inner = (
                <CardContent className="p-5 flex items-start gap-4">
                  <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand shrink-0">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{body}</div>
                  </div>
                </CardContent>
              );
              return href ? (
                <a key={title} href={href}>
                  <Card className="hover:shadow-md hover:border-foreground/20 transition">{inner}</Card>
                </a>
              ) : (
                <Card key={title}>{inner}</Card>
              );
            })}
          </div>

          <div id="contact-form">
            <ContactForm />
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
