import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Add the mesh gradient backdrop. */
  mesh?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
  mesh = true,
}: PageHeaderProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      {mesh && <div aria-hidden className="absolute inset-0 gradient-mesh" />}
      <Container className="relative py-14 sm:py-20">
        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}
