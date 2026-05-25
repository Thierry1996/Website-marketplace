import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  /** Color of the stroke. Tailwind class name preferred. */
  color?: "brand" | "secondary" | "accent" | "danger" | "muted";
  fill?: boolean;
}

const COLORS: Record<NonNullable<SparklineProps["color"]>, string> = {
  brand:     "rgb(var(--brand))",
  secondary: "rgb(var(--secondary))",
  accent:    "rgb(var(--accent))",
  danger:    "rgb(var(--danger))",
  muted:     "rgb(var(--muted-foreground))",
};

export function Sparkline({
  data, width = 160, height = 44,
  className, color = "brand", fill = true,
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => [i * step, height - ((v - min) / range) * height]);
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  const area = `${path} L${width} ${height} L0 ${height} Z`;
  const stroke = COLORS[color];

  return (
    <svg
      role="img"
      aria-label="Sparkline"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
    >
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#spark-${color})`} />}
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="3" fill={stroke} />
    </svg>
  );
}
