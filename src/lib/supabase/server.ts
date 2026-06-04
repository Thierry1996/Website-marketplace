import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabase = !!(URL && KEY);

/**
 * Server-side Supabase client (RSC / route handlers / server actions).
 * Wires Next.js cookies for session continuity. Returns null when env is
 * missing so callers can fall back to in-memory stores.
 */
export async function createClient() {
  if (!hasSupabase) return null;

  const cookieStore = await cookies();

  return createServerClient(URL!, KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — safe to ignore; middleware/route
          // handlers refresh the session cookie instead.
        }
      },
    },
  });
}
