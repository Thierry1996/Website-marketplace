/**
 * Lead capture store. Writes to Supabase (public.leads) when configured,
 * falling back to an in-memory store keyed on a global symbol so it survives
 * HMR within a dev session.
 */

import { sbData } from "@/lib/supabase/data";

export interface LeadRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  monthlyBudgetCents?: number;
  channels?: string[];
  goals?: string[];
  challenge?: string;
  source?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __reach_leads__: LeadRecord[] | undefined;
}
if (!globalThis.__reach_leads__) globalThis.__reach_leads__ = [];

export async function saveLead(input: Omit<LeadRecord, "id" | "createdAt">): Promise<LeadRecord> {
  const sb = sbData();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("leads")
        .insert({
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          industry: input.industry,
          monthly_budget_cents: input.monthlyBudgetCents,
          channels: input.channels,
          goals: input.goals,
          challenge: input.challenge,
          source: input.source,
        })
        .select()
        .single();
      if (!error && data) return fromRow(data);
      if (error) console.warn("[leads] Supabase insert failed, using memory:", error.message);
    } catch (err) {
      console.warn("[leads] Supabase error, using memory:", (err as Error).message);
    }
  }

  // In-memory fallback.
  const record: LeadRecord = {
    id: `LEAD-${Date.now()}-${Math.floor(Math.random() * 1e4)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  globalThis.__reach_leads__!.unshift(record);
  if (globalThis.__reach_leads__!.length > 200) globalThis.__reach_leads__!.length = 200;
  return record;
}

export async function listLeads(): Promise<LeadRecord[]> {
  const sb = sbData();
  if (sb) {
    try {
      const { data, error } = await sb.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
      if (!error && data) return data.map(fromRow);
    } catch { /* fall through */ }
  }
  return [...(globalThis.__reach_leads__ ?? [])];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromRow(r: any): LeadRecord {
  return {
    id: String(r.id),
    createdAt: r.created_at ?? new Date().toISOString(),
    name: r.name,
    email: r.email,
    phone: r.phone ?? undefined,
    company: r.company ?? undefined,
    industry: r.industry ?? undefined,
    monthlyBudgetCents: r.monthly_budget_cents ?? undefined,
    channels: r.channels ?? undefined,
    goals: r.goals ?? undefined,
    challenge: r.challenge ?? undefined,
    source: r.source ?? undefined,
  };
}
