import type { Metadata } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";
import { ClerkSignUp } from "@/components/layout/clerk-auth";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your free Marketly account.",
};

export default function SignUpPage() {
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <AuthLayout title="Create your account" subtitle="Free for 14 days. No credit card required.">
      {clerkEnabled ? <ClerkSignUp /> : <AuthForm mode="sign-up" />}
    </AuthLayout>
  );
}
