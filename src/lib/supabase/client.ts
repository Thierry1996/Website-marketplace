"use client";

import { createBrowserClient } from "@supabase/ssr";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabase = !!(URL && KEY);

/**
 * Browser-side Supabase client. Returns null when env isn't configured so
 * components can degrade gracefully.
 */
export function createClient() {
  if (!hasSupabase) return null;
  return createBrowserClient(URL!, KEY!);
}
