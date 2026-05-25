import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import type { DashRole } from "@/lib/dashboard-nav";

interface DashboardShellProps {
  role: DashRole;
  title?: string;
  children: React.ReactNode;
}

export function DashboardShell({ role, title, children }: DashboardShellProps) {
  return (
    <div className="min-h-dvh flex bg-surface/40">
      {/* Fixed sidebar (desktop) */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="fixed inset-y-0 w-64">
          <DashboardSidebar role={role} />
        </div>
      </div>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar role={role} title={title} />
        <main className="flex-1 px-5 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

interface DashboardPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardPageHeader({ title, description, actions }: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
