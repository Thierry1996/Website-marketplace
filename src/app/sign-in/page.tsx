import type { Metadata } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";
import { ClerkSignIn } from "@/components/layout/clerk-auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Reach account.",
};

export default function SignInPage() {
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Reach account.">
      {clerkEnabled ? <ClerkSignIn /> : <AuthForm mode="sign-in" />}
    </AuthLayout>
  );
}
