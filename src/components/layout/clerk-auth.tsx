"use client";

import { SignIn, SignUp } from "@clerk/nextjs";

/**
 * Themed Clerk widgets. We unstyle Clerk's container so it sits cleanly inside
 * AuthLayout, then theme the form elements to match our design tokens.
 */

const APPEARANCE = {
  elements: {
    rootBox: "w-full",
    card: "shadow-none bg-transparent p-0",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "border border-border bg-surface-elevated hover:bg-surface text-sm font-medium",
    socialButtonsBlockButtonText: "text-foreground",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground text-xs",
    formFieldLabel: "text-sm font-medium",
    formFieldInput:
      "h-11 rounded-lg border-border bg-surface-elevated text-sm focus:ring-2 focus:ring-ring focus:ring-offset-2",
    formButtonPrimary:
      "h-12 rounded-lg bg-[linear-gradient(135deg,rgb(var(--brand))_0%,rgb(var(--secondary))_60%,rgb(var(--accent-strong))_100%)] hover:shadow-xl text-white font-semibold text-sm",
    footerActionLink: "text-brand hover:underline",
    identityPreviewText: "text-sm",
    identityPreviewEditButtonIcon: "text-brand",
  },
  variables: {
    colorPrimary: "rgb(16 185 129)",
    colorText: "rgb(15 23 42)",
    fontFamily: "var(--font-sans)",
    borderRadius: "0.5rem",
  },
} as const;

export function ClerkSignIn() {
  return <SignIn appearance={APPEARANCE as never} routing="hash" />;
}

export function ClerkSignUp() {
  return <SignUp appearance={APPEARANCE as never} routing="hash" />;
}
