import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  /** Percentage change vs previous period. Negative is down. */
  delta?: number;
  trend?: number[];
  className?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, delta, trend, className, icon }: StatCardProps) {
  const arrow =
    delta == null   ? Minus :
    delta > 0       ? TrendingUp : TrendingDown;
  const Arrow = arrow;
  const tone =
    delta == null  ? "text-muted-foreground"
    : delta > 0    ? "text-success"
    : delta < 0    ? "text-danger"
                   : "text-muted-foreground";

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
            <div className="mt-1.5 font-display text-2xl font-bold tracking-tight">{value}</div>
          </div>
          {icon && (
            <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">{icon}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          {delta != null && (
            <span className={cn("inline-flex items-center gap-1 text-xs font-medium", tone)}>
              <Arrow className="size-3.5" strokeWidth={2.5} />
              {Math.abs(delta).toFixed(1)}%
              <span className="text-muted-foreground">vs last 30d</span>
            </span>
          )}
          {trend && trend.length > 1 && (
            <Sparkline data={trend} width={88} height={28} color={delta != null && delta < 0 ? "danger" : "brand"} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
