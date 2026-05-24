import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium leading-none transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface text-foreground border border-border",
        brand: "bg-brand-soft text-brand border border-brand/15",
        secondary: "bg-secondary-soft text-secondary border border-secondary/15",
        accent: "bg-accent-soft text-accent-strong border border-accent/20",
        outline: "border border-border text-foreground bg-transparent",
        success: "bg-success/10 text-success border border-success/20",
        danger: "bg-danger/10 text-danger border border-danger/20",
        shimmer: "shimmer text-white border-0",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
