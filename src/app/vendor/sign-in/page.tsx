import type { Metadata } from "next";
import Link from "next/link";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";
import { ClerkSignIn } from "@/components/layout/clerk-auth";

export const metadata: Metadata = {
  title: "Vendor sign in",
  description: "Sign in to your Reach vendor portal.",
};

export default function VendorSignInPage() {
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <AuthLayout role="vendor" title="Vendor sign in" subtitle="Access your storefront, submissions, and payouts.">
      {clerkEnabled
        ? <ClerkSignIn redirectUrl="/vendor" signUpUrl="/vendor/sign-up" />
        : <AuthForm mode="sign-in" />}

      <p className="text-center text-xs text-muted-foreground">
        Looking to buy solutions?{" "}
        <Link href="/sign-in" className="font-semibold text-brand hover:underline">
          Customer sign in →
        </Link>
      </p>
    </AuthLayout>
  );
}
