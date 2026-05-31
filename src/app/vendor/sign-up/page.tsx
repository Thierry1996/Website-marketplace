import type { Metadata } from "next";
import Link from "next/link";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";
import { ClerkSignUp } from "@/components/layout/clerk-auth";

export const metadata: Metadata = {
  title: "Become a vendor",
  description: "Create your Reach vendor account and start selling your solutions.",
};

export default function VendorSignUpPage() {
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <AuthLayout
      role="vendor"
      title="Become a vendor"
      subtitle="List storefronts, submit code, and get paid via Stripe Connect."
    >
      {clerkEnabled
        ? <ClerkSignUp role="vendor" redirectUrl="/vendor" signInUrl="/vendor/sign-in" />
        : <AuthForm mode="sign-up" />}

      <p className="text-center text-xs text-muted-foreground">
        Just want to buy solutions?{" "}
        <Link href="/sign-up" className="font-semibold text-brand hover:underline">
          Create a customer account →
        </Link>
      </p>
    </AuthLayout>
  );
}
