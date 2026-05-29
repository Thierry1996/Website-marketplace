import type { Metadata } from "next";

import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthForm } from "@/components/layout/auth-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Recover access to your Reach account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email on your account and we'll send a secure reset link."
    >
      <AuthForm mode="forgot" />
    </AuthLayout>
  );
}
