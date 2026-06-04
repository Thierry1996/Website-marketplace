import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabaseData = !!(URL && KEY);

declare global {
  // eslint-disable-next-line no-var
  var __reach_sb__: SupabaseClient | null | undefined;
}

/**
 * Plain anon Supabase client for store read/writes (no cookie/session needed).
 * RLS governs access. Returns null when env isn't set so stores fall back to
 * their in-memory implementation.
 */
export function sbData(): SupabaseClient | null {
  if (!hasSupabaseData) return null;
  if (globalThis.__reach_sb__ === undefined) {
    globalThis.__reach_sb__ = createClient(URL!, KEY!, {
      auth: { persistSession: false },
    });
  }
  return globalThis.__reach_sb__;
}
