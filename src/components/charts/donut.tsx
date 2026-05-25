import { cn } from "@/lib/utils";

interface DonutProps {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  className?: string;
  centerLabel?: React.ReactNode;
}

export function Donut({ segments, size = 160, thickness = 22, className, centerLabel }: DonutProps) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const arcs = segments.map((s) => {
    const len = (s.value / total) * circumference;
    const dasharray = `${len} ${circumference - len}`;
    const node = (
      <circle
        key={s.label}
        r={radius}
        cx={cx}
        cy={cy}
        fill="none"
        stroke={s.color}
        strokeWidth={thickness}
        strokeDasharray={dasharray}
        strokeDashoffset={-offset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="butt"
      />
    );
    offset += len;
    return node;
  });

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Donut chart">
        <circle r={radius} cx={cx} cy={cy} fill="none" stroke="rgb(var(--border))" strokeWidth={thickness} />
        {arcs}
      </svg>
      {centerLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerLabel}
        </div>
      )}
    </div>
  );
}
