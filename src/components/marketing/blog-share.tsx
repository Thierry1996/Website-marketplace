"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { toast } from "sonner";

import { BrandIcon } from "@/components/ui/brand-icon";

/**
 * Social share row for a blog post — boosts reach across Facebook, LinkedIn,
 * X, and WhatsApp, plus a copy-link button.
 */
export function BlogShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function url() {
    return typeof window !== "undefined" ? window.location.href : "";
  }
  function open(href: string) {
    window.open(href, "_blank", "noopener,noreferrer,width=620,height=560");
  }
  function copy() {
    navigator.clipboard?.writeText(url());
    setCopied(true);
    toast.success("Link copied — share it anywhere.");
    setTimeout(() => setCopied(false), 2000);
  }

  const u = () => encodeURIComponent(url());
  const t = encodeURIComponent(title);

  const SHARES = [
    { name: "facebook", label: "Facebook", color: "#1877F2", href: () => `https://www.facebook.com/sharer/sharer.php?u=${u()}` },
    { name: "linkedin", label: "LinkedIn", color: "#0A66C2", href: () => `https://www.linkedin.com/sharing/share-offsite/?url=${u()}` },
    { name: "x",        label: "X",        color: "#000000", href: () => `https://twitter.com/intent/tweet?url=${u()}&text=${t}` },
    { name: "whatsapp", label: "WhatsApp", color: "#25D366", href: () => `https://wa.me/?text=${t}%20${u()}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">Share</span>
      {SHARES.map((s) => (
        <button
          key={s.name}
          onClick={() => open(s.href())}
          aria-label={`Share on ${s.label}`}
          className="grid size-9 place-items-center rounded-full text-white transition-transform hover:scale-110"
          style={{ background: s.color }}
        >
          <BrandIcon name={s.name} className="size-4" />
        </button>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
      >
        {copied ? <Check className="size-4 text-success" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
