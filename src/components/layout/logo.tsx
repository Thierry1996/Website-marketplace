import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Reach wordmark — cursive ligature script in a signature warm→cool gradient,
 * paired with a small "live" pulse dot to signal an always-on agency.
 */
export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-baseline gap-1", className)}
      aria-label="Reach home"
    >
      <span
        className={cn(
          "font-script text-3xl leading-none transition-transform group-hover:-rotate-2",
          dark ? "text-white" : "gradient-text"
        )}
        style={{ paddingRight: 2 }}
      >
        Reach
      </span>
      <span
        aria-hidden
        className="mb-1 inline-block size-1.5 rounded-full bg-brand live-dot"
      />
    </Link>
  );
}
