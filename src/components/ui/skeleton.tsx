import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-surface via-border/50 to-surface bg-[length:200%_100%] animate-[shimmer_1.4s_linear_infinite]",
        className
      )}
      {...props}
    />
  );
}
