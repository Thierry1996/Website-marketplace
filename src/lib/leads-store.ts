/**
 * Lead capture store. Uses Prisma when DATABASE_URL is set (writes to a `Lead`
 * table once provisioned). Falls back to an in-memory store keyed on a global
 * symbol so it survives HMR within a dev session — good enough until DB lands.
 */

import { db, hasDatabase } from "@/lib/db";

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
  const record: LeadRecord = {
    id: `LEAD-${Date.now()}-${Math.floor(Math.random() * 1e4)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };

  if (hasDatabase && db) {
    try {
      // Lead model lands in the next migration; until then, fall through to memory.
      // await db.lead.create({ data: record });
    } catch (err) {
      console.warn("[leads] DB write failed, using memory:", (err as Error).message);
    }
  }

  globalThis.__reach_leads__!.unshift(record);
  // Keep only the last 200 to bound memory.
  if (globalThis.__reach_leads__!.length > 200) globalThis.__reach_leads__!.length = 200;
  return record;
}

export async function listLeads(): Promise<LeadRecord[]> {
  return [...(globalThis.__reach_leads__ ?? [])];
}
