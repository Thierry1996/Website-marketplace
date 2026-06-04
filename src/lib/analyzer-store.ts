/**
 * Site-analysis report store. Persists to Supabase (public.site_reports) when
 * configured; otherwise an in-memory feed (per dev session). Every report is a
 * copy the master-admin dashboard reads back.
 */

import type { CategoryScore, AuditFinding, AuditSignals } from "@/lib/site-audit";
import { sbData } from "@/lib/supabase/data";

export interface AnalysisReport {
  id: string;
  createdAt: string;
  businessName: string;
  address: string;
  phone: string;
  email?: string;
  url: string;
  socialLinks?: string[];
  focusPrompt?: string;
  requestedByRole?: "customer" | "vendor" | "guest";
  overall: number;
  scores: CategoryScore[];
  findings: AuditFinding[];
  signals: AuditSignals;
  summary: string;
  aiPowered: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var __reach_reports__: AnalysisReport[] | undefined;
}
if (!globalThis.__reach_reports__) globalThis.__reach_reports__ = [];

export async function saveReport(r: AnalysisReport): Promise<void> {
  const sb = sbData();
  if (sb) {
    try {
      const { error } = await sb.from("site_reports").insert({
        id: r.id,
        business_name: r.businessName,
        address: r.address,
        phone: r.phone,
        email: r.email,
        url: r.url,
        social_links: r.socialLinks,
        focus_prompt: r.focusPrompt,
        requested_by_role: r.requestedByRole,
        overall: r.overall,
        scores: r.scores,
        findings: r.findings,
        signals: r.signals,
        summary: r.summary,
        ai_powered: r.aiPowered,
      });
      if (!error) return;
      console.warn("[reports] Supabase insert failed, using memory:", error.message);
    } catch (err) {
      console.warn("[reports] Supabase error, using memory:", (err as Error).message);
    }
  }
  globalThis.__reach_reports__!.unshift(r);
  if (globalThis.__reach_reports__!.length > 200) globalThis.__reach_reports__!.length = 200;
}

export async function getReport(id: string): Promise<AnalysisReport | null> {
  const sb = sbData();
  if (sb) {
    try {
      const { data, error } = await sb.from("site_reports").select("*").eq("id", id).maybeSingle();
      if (!error && data) return fromRow(data);
    } catch { /* fall through */ }
  }
  return globalThis.__reach_reports__!.find((r) => r.id === id) ?? null;
}

export async function listReports(): Promise<AnalysisReport[]> {
  const sb = sbData();
  if (sb) {
    try {
      const { data, error } = await sb.from("site_reports").select("*").order("created_at", { ascending: false }).limit(200);
      if (!error && data) return data.map(fromRow);
    } catch { /* fall through */ }
  }
  return [...(globalThis.__reach_reports__ ?? [])];
}

export function makeReportId() {
  return `RPT-${Date.now()}-${Math.floor(Math.random() * 1e4)}`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromRow(r: any): AnalysisReport {
  return {
    id: r.id,
    createdAt: r.created_at ?? new Date().toISOString(),
    businessName: r.business_name,
    address: r.address,
    phone: r.phone,
    email: r.email ?? undefined,
    url: r.url,
    socialLinks: r.social_links ?? undefined,
    focusPrompt: r.focus_prompt ?? undefined,
    requestedByRole: r.requested_by_role ?? "guest",
    overall: r.overall,
    scores: r.scores ?? [],
    findings: r.findings ?? [],
    signals: r.signals ?? {},
    summary: r.summary ?? "",
    aiPowered: !!r.ai_powered,
  };
}
