"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, Chrome } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/**
 * Dev-mode auth form — keyless fallback when Clerk isn't configured.
 * Mimics the look of Clerk's standard widget so the visual hand-off later is seamless.
 */
export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" | "forgot" }) {
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      toast.success(
        mode === "sign-in"
          ? "Sign-in is wired in Phase 3 with Clerk."
          : mode === "sign-up"
          ? "Sign-up is wired in Phase 3 with Clerk."
          : "Reset email simulated — Clerk handles the real flow."
      );
    }, 600);
  }

  return (
    <div className="space-y-5">
      {mode !== "forgot" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" type="button" onClick={() => toast.info("OAuth available once Clerk keys are set.")}>
              <Chrome className="size-4" /> Google
            </Button>
            <Button variant="outline" size="lg" type="button" onClick={() => toast.info("OAuth available once Clerk keys are set.")}>
              <Github className="size-4" /> GitHub
            </Button>
          </div>
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
              or with email
            </span>
          </div>
        </>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "sign-up" && (
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Jane Founder" className="mt-1.5" required />
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@business.com" className="mt-1.5" required />
        </div>

        {mode !== "forgot" && (
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode === "sign-in" && (
                <Link href="/forgot-password" className="text-xs text-brand hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <Input id="password" name="password" type="password" placeholder="••••••••" className="mt-1.5" required minLength={8} />
            {mode === "sign-up" && (
              <p className="mt-1.5 text-xs text-muted-foreground">At least 8 characters with one number.</p>
            )}
          </div>
        )}

        <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={busy}>
          {busy
            ? "Working..."
            : mode === "sign-in"
            ? "Sign in"
            : mode === "sign-up"
            ? "Create account"
            : "Email me a reset link"}
          {!busy && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "sign-in" && (
          <>Don't have an account? <Link href="/sign-up" className="font-semibold text-foreground hover:underline">Sign up free</Link></>
        )}
        {mode === "sign-up" && (
          <>Already on Marketly? <Link href="/sign-in" className="font-semibold text-foreground hover:underline">Sign in</Link></>
        )}
        {mode === "forgot" && (
          <>Remembered it? <Link href="/sign-in" className="font-semibold text-foreground hover:underline">Back to sign in</Link></>
        )}
      </p>

      <p className="text-center text-xs text-muted-foreground/70">
        Clerk auth activates once <code className="rounded bg-surface px-1 py-0.5">CLERK_SECRET_KEY</code> is set in <code className="rounded bg-surface px-1 py-0.5">.env.local</code>.
      </p>
    </div>
  );
}
