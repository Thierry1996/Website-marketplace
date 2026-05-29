import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Reach wordmark — energetic Kaushan brush script in the signature warm→cool
 * gradient, with an animated live pulse dot and a gradient underline flourish.
 */
export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group relative inline-flex items-baseline gap-1", className)}
      aria-label="Reach home"
    >
      <span className="relative">
        <span
          className={cn(
            "font-script text-[2rem] leading-none transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 inline-block",
            dark ? "text-white" : "gradient-text"
          )}
        >
          Reach
        </span>
        {/* underline flourish */}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-[linear-gradient(90deg,rgb(var(--brand)),rgb(var(--accent)),rgb(var(--secondary)))] transition-all duration-300 group-hover:w-full"
        />
      </span>
      <span aria-hidden className="mb-1.5 inline-block size-2 rounded-full bg-brand live-dot" />
    </Link>
  );
}
