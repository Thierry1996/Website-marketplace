/**
 * Prisma client singleton.
 *
 * Falls back to `null` when DATABASE_URL is not set so the app can still
 * run during local development without a provisioned Postgres instance.
 * Every server action consuming this should check `db != null` before use.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

function createClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;

  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  } catch (err) {
    // Generator hasn't been run yet (no .prisma/client artifacts). Don't crash.
    console.warn("[db] Prisma client unavailable:", (err as Error).message);
    return null;
  }
}

export const db: PrismaClient | null =
  globalThis.__prisma__ ?? (globalThis.__prisma__ = createClient());

export const hasDatabase = db != null;
