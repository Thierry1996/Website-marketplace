import type { Metadata } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Marketly account.",
};

export default function SignInPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Marketly account.">
      <AuthForm mode="sign-in" />
    </AuthLayout>
  );
}
