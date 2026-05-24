import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 font-display font-bold tracking-tight",
        className
      )}
      aria-label="Marketly home"
    >
      <span
        aria-hidden
        className="relative grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,rgb(var(--brand))_0%,rgb(var(--secondary))_60%,rgb(var(--accent))_100%)] text-white shadow-md ring-1 ring-black/5 transition-transform group-hover:scale-105"
      >
        <span className="font-display text-base font-extrabold">M</span>
      </span>
      <span className="text-lg leading-none">
        Market<span className="gradient-text">ly</span>
      </span>
    </Link>
  );
}
