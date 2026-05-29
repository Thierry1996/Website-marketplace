"use server";

import { z } from "zod";

import {
  saveSubmission, makeId, makeSlug,
  type Framework, type SubmissionRecord,
} from "@/lib/submissions-store";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const fileSchema = z.object({
  path: z.string().min(1).max(200),
  content: z.string().max(2_000_000), // 2MB hard cap per file
});

const submissionSchema = z.object({
  title:       z.string().min(3).max(120),
  description: z.string().max(1000).optional(),
  framework:   z.enum(["html", "react", "nextjs", "wordpress"]),
  repoUrl:     z.string().url().optional().or(z.literal("")),
  category:    z.string().max(60).optional(),
  files:       z.array(fileSchema).max(40).default([]),
  thumbnail:   z.string().max(200).optional(),
  vendorId:    z.string().min(1).default("anonymous"),
});

export type CreateSubmissionInput = z.infer<typeof submissionSchema>;

/**
 * Create a code submission. Static (HTML/CSS/JS) submissions are auto-approved
 * after a quick safety pass; React/Next/WordPress submissions enter a
 * `needs_build` state that the deploy pipeline picks up.
 *
 * Returns the preview slug — so the form can redirect straight to /preview/<slug>.
 */
export async function createSubmission(input: unknown): Promise<ActionResult<{ id: string; previewSlug: string }>> {
  const parsed = submissionSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  const d = parsed.data;

  // Basic safety check for HTML — strip blatantly unsafe patterns from logging /
  // downstream (the iframe sandbox does the real isolation at render time).
  const flagged = quickSafetyScan(d.files);

  const status: SubmissionRecord["status"] =
    flagged.length > 0       ? "rejected"
    : d.framework === "html" ? "approved"
                              : "needs_build";

  const id = makeId();
  const previewSlug = makeSlug(d.title);

  const record: SubmissionRecord = {
    id,
    vendorId: d.vendorId,
    title: d.title,
    description: d.description ?? "",
    framework: d.framework as Framework,
    repoUrl: d.repoUrl || undefined,
    files: d.files,
    thumbnail: d.thumbnail,
    category: d.category,
    status,
    analysis: status === "rejected"
      ? { summary: "Submission flagged.", score: 0, issues: flagged, highlights: [] }
      : { summary: status === "approved" ? "Static submission accepted." : "Build pipeline will compile this before preview.", score: 70, issues: [], highlights: [] },
    previewSlug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    saveSubmission(record);
    return ok({ id, previewSlug });
  } catch (err) {
    return fail((err as Error).message);
  }
}

// Bare-minimum content safety. Real deployments would route this through the
// AI analyzer below + a third-party scanner.
function quickSafetyScan(files: { path: string; content: string }[]): string[] {
  const issues: string[] = [];
  for (const f of files) {
    const c = f.content.toLowerCase();
    if (c.includes("document.cookie") && c.includes("xhr"))
      issues.push(`${f.path}: cookie + XHR pattern (potential exfiltration)`);
    if (/<script[^>]+src=["']https?:\/\/(?!unpkg\.com|cdn\.|cdnjs\.|jsdelivr\.)/.test(c))
      issues.push(`${f.path}: third-party script from non-CDN origin`);
  }
  return issues;
}
