import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical padding scale. */
  size?: "sm" | "md" | "lg";
  /** Add subtle mesh background. */
  mesh?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, size = "md", mesh, children, ...props }, ref) => {
    const pad = {
      sm: "py-12 sm:py-16",
      md: "py-16 sm:py-24",
      lg: "py-24 sm:py-32",
    }[size];

    return (
      <section
        ref={ref}
        className={cn("relative", pad, mesh && "gradient-mesh", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

export function Eyebrow({ className, icon, children, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/40 px-3.5 py-1.5",
        "text-xs font-semibold uppercase tracking-[0.14em] text-brand",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
