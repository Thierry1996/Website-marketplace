/**
 * Site-analysis report store. In-memory (per dev session, DB-ready). Every
 * report is also pushed to an admin feed so the master admin dashboard
 * receives a copy of each analysis a subscriber/visitor runs.
 */

import type { CategoryScore, AuditFinding, AuditSignals } from "@/lib/site-audit";

export interface AnalysisReport {
  id: string;
  createdAt: string;
  // Business identity (required by the form)
  businessName: string;
  address: string;
  phone: string;
  email?: string;
  // Target
  url: string;
  socialLinks?: string[];
  focusPrompt?: string;
  requestedByRole?: "customer" | "vendor" | "guest";
  // Results
  overall: number;
  scores: CategoryScore[];
  findings: AuditFinding[];
  signals: AuditSignals;
  summary: string;        // AI / rule-based executive summary
  aiPowered: boolean;     // true when Claude generated the narrative
}

declare global {
  // eslint-disable-next-line no-var
  var __reach_reports__: AnalysisReport[] | undefined;
}
if (!globalThis.__reach_reports__) globalThis.__reach_reports__ = [];

export function saveReport(r: AnalysisReport) {
  globalThis.__reach_reports__!.unshift(r);
  if (globalThis.__reach_reports__!.length > 200) globalThis.__reach_reports__!.length = 200;
}

export function getReport(id: string): AnalysisReport | null {
  return globalThis.__reach_reports__!.find((r) => r.id === id) ?? null;
}

/** Admin feed = every report, newest first (the "copy to master admin"). */
export function listReports(): AnalysisReport[] {
  return [...(globalThis.__reach_reports__ ?? [])];
}

export function makeReportId() {
  return `RPT-${Date.now()}-${Math.floor(Math.random() * 1e4)}`;
}
