"use client";

import Link from "next/link";

import { Logo } from "./logo";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { footerSections } from "@/lib/nav";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description.split(".")[0]}.
            </p>

            <form className="flex max-w-sm gap-2" action="#" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Your email" aria-label="Email" required className="h-10" />
              <Button type="submit" variant="brand" size="md">Subscribe</Button>
            </form>

            <div className="flex items-center gap-2">
              {[
                { href: siteConfig.links.twitter,   name: "x",         label: "X",         color: "#000000" },
                { href: siteConfig.links.instagram, name: "instagram", label: "Instagram", color: "#E1306C" },
                { href: siteConfig.links.linkedin,  name: "linkedin",  label: "LinkedIn",  color: "#0A66C2" },
                { href: siteConfig.links.tiktok,    name: "tiktok",    label: "TikTok",    color: "#000000" },
              ].map(({ href, name, label, color }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ ["--hov" as string]: color }}
                  className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-[var(--hov)]"
                >
                  <BrandIcon name={name} className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.heading}
              </div>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/cookies" className="hover:text-foreground">Cookies</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
