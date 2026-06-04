/**
 * Code submission store. Persists to Supabase (public.submissions) when
 * configured, merged with the in-memory seed so demo content always shows.
 * Falls back to pure in-memory otherwise.
 */

import { sbData } from "@/lib/supabase/data";

export type Framework = "html" | "react" | "nextjs" | "wordpress";

export interface SubmissionFile {
  path: string;
  content: string;
}

export type SubmissionStatus =
  | "queued"      // freshly submitted, awaiting AI analysis
  | "analyzing"   // AI agent is reviewing
  | "approved"    // analysis passed — preview is live
  | "rejected"    // analysis flagged issues
  | "needs_build"; // React/Next/WP — build step required before preview

export interface SubmissionRecord {
  id: string;
  vendorId: string;     // Clerk userId of the submitter
  title: string;
  description: string;
  framework: Framework;
  repoUrl?: string;
  files: SubmissionFile[];
  thumbnail?: string;
  category?: string;
  status: SubmissionStatus;
  analysis?: {
    summary: string;
    score: number;        // 0..100
    issues: string[];
    highlights: string[];
  };
  previewSlug: string;   // /preview/<previewSlug>
  createdAt: string;
  updatedAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __reach_submissions__: SubmissionRecord[] | undefined;
}

if (!globalThis.__reach_submissions__) globalThis.__reach_submissions__ = seed();

function mem(): SubmissionRecord[] {
  return globalThis.__reach_submissions__ ?? [];
}

/** Merge Supabase rows with the in-memory seed, deduped by id (db wins). */
async function allRecords(): Promise<SubmissionRecord[]> {
  const sb = sbData();
  if (sb) {
    try {
      const { data, error } = await sb.from("submissions").select("*").order("created_at", { ascending: false }).limit(200);
      if (!error && data) {
        const dbRecords = data.map(fromRow);
        const dbIds = new Set(dbRecords.map((r) => r.id));
        const seedOnly = mem().filter((s) => !dbIds.has(s.id));
        return [...dbRecords, ...seedOnly];
      }
    } catch { /* fall through */ }
  }
  return mem();
}

export async function listSubmissions(opts?: { vendorId?: string; status?: SubmissionStatus }): Promise<SubmissionRecord[]> {
  const all = await allRecords();
  return all.filter((s) =>
    (!opts?.vendorId || s.vendorId === opts.vendorId) &&
    (!opts?.status   || s.status   === opts.status)
  );
}

export async function listApproved(): Promise<SubmissionRecord[]> {
  const all = await allRecords();
  return all.filter((s) => s.status === "approved" || s.status === "needs_build");
}

export async function getSubmissionBySlug(slug: string): Promise<SubmissionRecord | null> {
  const sb = sbData();
  if (sb) {
    try {
      const { data, error } = await sb.from("submissions").select("*").eq("preview_slug", slug).maybeSingle();
      if (!error && data) return fromRow(data);
    } catch { /* fall through */ }
  }
  return mem().find((s) => s.previewSlug === slug) ?? null;
}

export async function saveSubmission(s: SubmissionRecord): Promise<void> {
  const sb = sbData();
  if (sb) {
    try {
      const { error } = await sb.from("submissions").upsert({
        id: s.id,
        vendor_id: s.vendorId,
        title: s.title,
        description: s.description,
        framework: s.framework,
        repo_url: s.repoUrl,
        files: s.files,
        thumbnail: s.thumbnail,
        category: s.category,
        status: s.status,
        analysis: s.analysis,
        preview_slug: s.previewSlug,
        updated_at: new Date().toISOString(),
      });
      if (!error) return;
      console.warn("[submissions] Supabase upsert failed, using memory:", error.message);
    } catch (err) {
      console.warn("[submissions] Supabase error, using memory:", (err as Error).message);
    }
  }
  const list = mem();
  const idx = list.findIndex((x) => x.id === s.id);
  if (idx >= 0) list[idx] = s; else list.unshift(s);
  globalThis.__reach_submissions__ = list.slice(0, 200);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromRow(r: any): SubmissionRecord {
  return {
    id: r.id,
    vendorId: r.vendor_id ?? "anonymous",
    title: r.title,
    description: r.description ?? "",
    framework: r.framework,
    repoUrl: r.repo_url ?? undefined,
    files: r.files ?? [],
    thumbnail: r.thumbnail ?? undefined,
    category: r.category ?? undefined,
    status: r.status,
    analysis: r.analysis ?? undefined,
    previewSlug: r.preview_slug,
    createdAt: r.created_at ?? new Date().toISOString(),
    updatedAt: r.updated_at ?? new Date().toISOString(),
  };
}

export function makeId() {
  return `SUB-${Date.now()}-${Math.floor(Math.random() * 1e4)}`;
}
export function makeSlug(title: string) {
  return (
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) ||
    "submission"
  ) + "-" + Math.random().toString(36).slice(2, 7);
}

// -----------------------------------------------------------------------------
// Seed sample submissions so the marketplace + vendor pages have content.
// -----------------------------------------------------------------------------
function seed(): SubmissionRecord[] {
  const now = new Date().toISOString();
  return [
    {
      id: "SUB-DEMO-1",
      vendorId: "demo-vendor",
      title: "Glow Studio — beauty salon storefront",
      description: "Stunning beauty-salon landing page with booking CTA.",
      framework: "html",
      files: [
        {
          path: "index.html",
          content: `<!doctype html><html><head><meta charset="utf-8"><title>Glow Studio</title><style>body{margin:0;font-family:system-ui,sans-serif;background:linear-gradient(135deg,#FFE4E9,#FCE7F3);color:#0F172A;min-height:100vh;display:grid;place-items:center;padding:24px}.card{max-width:560px;background:#fff;border-radius:24px;padding:36px;box-shadow:0 20px 60px rgba(0,0,0,.08);text-align:center}h1{font-size:42px;margin:0 0 12px;background:linear-gradient(135deg,#FF4D6D,#7C3AED);-webkit-background-clip:text;background-clip:text;color:transparent}p{color:#475569;line-height:1.6}a{display:inline-block;margin-top:18px;padding:12px 26px;border-radius:999px;background:#FF4D6D;color:#fff;text-decoration:none;font-weight:600}</style></head><body><div class="card"><h1>Glow Studio</h1><p>The brand-new beauty salon experience — book your appointment in seconds.</p><a href="#">Book now</a></div></body></html>`,
        },
      ],
      thumbnail: "linear-gradient(135deg,#FF4D6D,#7C3AED)",
      category: "Beauty",
      status: "approved",
      analysis: {
        summary: "Clean static site, properly semantic, no external deps. Ready to ship.",
        score: 92,
        issues: [],
        highlights: ["Inline styles for fast load", "Accessible CTA", "Brand-aligned palette"],
      },
      previewSlug: "glow-studio-demo",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "SUB-DEMO-2",
      vendorId: "demo-vendor",
      title: "PowerHouse — fitness landing",
      description: "High-impact fitness landing with gradient hero.",
      framework: "html",
      files: [
        {
          path: "index.html",
          content: `<!doctype html><html><head><meta charset="utf-8"><title>PowerHouse</title><style>body{margin:0;font-family:system-ui;background:#0F172A;color:#fff;min-height:100vh;display:grid;place-items:center;padding:24px}.hero{max-width:640px;text-align:center}h1{font-size:56px;line-height:1.05;margin:0 0 16px}.g{background:linear-gradient(135deg,#3B82F6,#10B981);-webkit-background-clip:text;background-clip:text;color:transparent}p{color:#CBD5E1;line-height:1.6;font-size:18px}a{display:inline-block;margin-top:24px;padding:14px 28px;border-radius:999px;background:linear-gradient(135deg,#3B82F6,#10B981);color:#0F172A;text-decoration:none;font-weight:700}</style></head><body><div class="hero"><h1>Train <span class="g">harder</span>. <br/>Recover smarter.</h1><p>Coaching, classes, and a community that shows up. Start your free week.</p><a href="#">Start free</a></div></body></html>`,
        },
      ],
      thumbnail: "linear-gradient(135deg,#3B82F6,#10B981)",
      category: "Fitness",
      status: "approved",
      analysis: {
        summary: "Bold landing page with strong gradient hierarchy. No external assets.",
        score: 88,
        issues: ["Could use proper heading hierarchy for SEO"],
        highlights: ["Beautiful gradient text", "Mobile-friendly layout"],
      },
      previewSlug: "powerhouse-demo",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "SUB-DEMO-3",
      vendorId: "demo-vendor",
      title: "Northwind Marketing — agency one-pager",
      description: "Conversion-tested agency landing page.",
      framework: "react",
      files: [],
      thumbnail: "linear-gradient(135deg,#7C3AED,#EC4899)",
      category: "Agency",
      status: "needs_build",
      analysis: {
        summary: "React app — needs the build pipeline to compile before live preview.",
        score: 80,
        issues: ["Build step required"],
        highlights: ["Clean component structure"],
      },
      previewSlug: "northwind-demo",
      createdAt: now,
      updatedAt: now,
    },
  ];
}
