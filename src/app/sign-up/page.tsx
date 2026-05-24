import type { Metadata } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your free Marketly account.",
};

export default function SignUpPage() {
  return (
    <AuthLayout title="Create your account" subtitle="Free for 14 days. No credit card required.">
      <AuthForm mode="sign-up" />
    </AuthLayout>
  );
}
