"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

/**
 * App-level error boundary. Triggered when any Server/Client Component throws.
 * Stays minimal so it can't crash itself.
 */

export default function GlobalAppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error boundary]", error);
  }, [error]);

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <header className="p-5">
        <Logo />
      </header>

      <main className="flex-1 grid place-items-center px-5 py-10">
        <div className="max-w-xl text-center space-y-6">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-danger/10 text-danger">
            <AlertTriangle className="size-6" />
          </span>

          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Something went wrong on our end.
          </h1>
          <p className="text-muted-foreground">
            We're already looking into it. Try refreshing — if the problem keeps happening,
            let us know and we'll investigate.
          </p>

          {isDev && error.message && (
            <pre className="text-left text-xs bg-surface border border-border rounded-lg p-4 overflow-auto max-h-48">
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button onClick={reset} variant="gradient" size="lg">
              <RotateCcw className="size-4" /> Try again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/"><Home className="size-4" /> Back home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
