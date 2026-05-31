import type { Metadata } from "next";
import Link from "next/link";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";
import { ClerkSignUp } from "@/components/layout/clerk-auth";

export const metadata: Metadata = {
  title: "Create your customer account",
  description: "Create your free Reach customer account and start buying market solutions.",
};

export default function SignUpPage() {
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <AuthLayout
      role="customer"
      title="Create your customer account"
      subtitle="Free for 14 days. Run campaigns and buy market solutions."
    >
      {clerkEnabled
        ? <ClerkSignUp role="customer" redirectUrl="/dashboard" signInUrl="/sign-in" />
        : <AuthForm mode="sign-up" />}

      <p className="text-center text-xs text-muted-foreground">
        Want to sell on Reach instead?{" "}
        <Link href="/vendor/sign-up" className="font-semibold text-secondary hover:underline">
          Create a vendor account →
        </Link>
      </p>
    </AuthLayout>
  );
}
