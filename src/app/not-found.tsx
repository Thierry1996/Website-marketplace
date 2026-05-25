import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <header className="p-5">
        <Logo />
      </header>

      <main className="flex-1 grid place-items-center px-5 py-10">
        <div className="max-w-xl text-center space-y-6">
          <div className="font-display text-7xl sm:text-9xl font-bold gradient-text leading-none">404</div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            We couldn't find that page.
          </h1>
          <p className="text-muted-foreground">
            It may have been moved or never existed. Try one of these instead — or head back home.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild variant="gradient" size="lg">
              <Link href="/"><Home className="size-4" /> Back home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/marketplace">Browse marketplace <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              ["Categories",  "/categories"],
              ["Services",    "/services"],
              ["Pricing",     "/pricing"],
              ["Community",   "/community"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border border-border bg-surface p-3 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
