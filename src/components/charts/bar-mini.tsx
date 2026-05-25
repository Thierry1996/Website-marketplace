import { cn } from "@/lib/utils";

interface BarMiniProps {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
}

export function BarMini({ data, height = 160, className }: BarMiniProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cn("flex items-end gap-2", className)} style={{ height }} role="img" aria-label="Bar chart">
      {data.map((d) => {
        const h = (d.value / max) * 100;
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <div className="w-full flex-1 flex items-end">
              <div
                className="w-full rounded-md bg-[linear-gradient(180deg,rgb(var(--brand))_0%,rgb(var(--secondary))_100%)] transition-all hover:opacity-80"
                style={{ height: `${h}%`, minHeight: 4 }}
                title={`${d.label}: ${d.value}`}
              />
            </div>
            <div className="text-[0.65rem] text-muted-foreground truncate w-full text-center">{d.label}</div>
          </div>
        );
      })}
    </div>
  );
}
