"use client";

import { SignIn, SignUp } from "@clerk/nextjs";

/**
 * Themed Clerk widgets, parameterized per account type so customers and
 * vendors get distinct sign-in flows (different redirect targets + the
 * cross-linked sign-up URL for their portal). Vendor sign-ups also tag
 * `role: "vendor"` into Clerk unsafeMetadata.
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
    colorText: "rgb(15 23 42)",
    fontFamily: "var(--font-sans)",
    borderRadius: "0.5rem",
  },
} as const;

interface ClerkAuthProps {
  /** Where to send the user after a successful sign-in / sign-up. */
  redirectUrl: string;
  /** The matching sign-in route for this portal (so Clerk's footer links stay in-flow). */
  signInUrl: string;
  /** The matching sign-up route for this portal. */
  signUpUrl: string;
}

export function ClerkSignIn({ redirectUrl, signUpUrl }: Omit<ClerkAuthProps, "signInUrl">) {
  return (
    <SignIn
      appearance={APPEARANCE as never}
      routing="hash"
      signUpUrl={signUpUrl}
      fallbackRedirectUrl={redirectUrl}
    />
  );
}

export function ClerkSignUp({
  redirectUrl,
  signInUrl,
  role,
}: Omit<ClerkAuthProps, "signUpUrl"> & { role: "customer" | "vendor" }) {
  return (
    <SignUp
      appearance={APPEARANCE as never}
      routing="hash"
      signInUrl={signInUrl}
      fallbackRedirectUrl={redirectUrl}
      unsafeMetadata={{ role }}
    />
  );
}
