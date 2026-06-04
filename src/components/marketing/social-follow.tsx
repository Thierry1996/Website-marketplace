import Link from "next/link";

import { BrandIcon } from "@/components/ui/brand-icon";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const CHANNELS = [
  { name: "youtube",   label: "YouTube",   href: siteConfig.links.youtube,   color: "#FF0000" },
  { name: "facebook",  label: "Facebook",  href: siteConfig.links.facebook,  color: "#1877F2" },
  { name: "linkedin",  label: "LinkedIn",  href: siteConfig.links.linkedin,  color: "#0A66C2" },
  { name: "instagram", label: "Instagram", href: siteConfig.links.instagram, color: "#E1306C" },
];

export function SocialFollow({ className, variant = "row" }: { className?: string; variant?: "row" | "pills" }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {CHANNELS.map((c) => (
        <Link
          key={c.name}
          href={c.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Follow Reach on ${c.label}`}
          style={{ ["--c" as string]: c.color }}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3.5 py-2 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--c)]",
            variant === "pills" && "text-sm font-medium"
          )}
        >
          <span className="grid size-6 place-items-center rounded-full text-white" style={{ background: c.color }}>
            <BrandIcon name={c.name} className="size-3.5" />
          </span>
          {variant === "pills" && <span className="group-hover:text-[var(--c)]">{c.label}</span>}
        </Link>
      ))}
    </div>
  );
}
