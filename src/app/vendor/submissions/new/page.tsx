import type { Metadata } from "next";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { SubmissionForm } from "@/components/marketing/submission-form";

export const metadata: Metadata = { title: "New code submission" };

export default function NewSubmissionPage() {
  return (
    <DashboardShell role="vendor" title="New submission">
      <DashboardPageHeader
        title="Submit your code"
        description="HTML/CSS/JS goes live instantly via our sandboxed preview. React, Next.js, and WordPress go through our build pipeline. Both you and our AI reviewer see the same live preview as you type."
      />
      <SubmissionForm />
    </DashboardShell>
  );
}
