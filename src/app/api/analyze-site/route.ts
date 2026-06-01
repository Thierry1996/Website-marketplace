import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { auditSite } from "@/lib/site-audit";
import { saveReport, makeReportId, type AnalysisReport } from "@/lib/analyzer-store";
import { sendEmail } from "@/lib/email";

/**
 * POST /api/analyze-site
 *
 * The AI big-data site analyzer. Validates a live business website + identity,
 * crawls it (src/lib/site-audit), scores organic-marketing health, writes an
 * executive summary (Claude when ANTHROPIC_API_KEY is set, rule-based
 * otherwise), stores the report, and pushes a copy to the master-admin feed.
 *
 * Returns { id } so the client can redirect to /analyzer/<id>.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  url:          z.string().min(3, "Enter your website URL"),
  businessName: z.string().min(2, "Business name is required"),
  address:      z.string().min(4, "Business address is required"),
  phone:        z.string().min(5, "Business phone number is required"),
  email:        z.string().email().optional().or(z.literal("")),
  socialLinks:  z.array(z.string()).optional(),
  focusPrompt:  z.string().max(1000).optional(),
  role:         z.enum(["customer", "vendor", "guest"]).optional(),
});

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = bodySchema.safeParse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please complete all required fields." },
      { status: 400 }
    );
  }
  const d = parsed.data;

  // Crawl + score (also validates the domain is live + public).
  const audit = await auditSite(d.url);
  if (!audit.ok || !audit.signals || !audit.scores || audit.overall == null || !audit.findings) {
    return NextResponse.json({ error: audit.error ?? "Analysis failed." }, { status: 422 });
  }

  // Executive summary — Claude when available, deterministic otherwise.
  const { summary, aiPowered } = await buildSummary({
    businessName: d.businessName,
    url: audit.signals.finalUrl,
    overall: audit.overall,
    scores: audit.scores,
    findings: audit.findings,
    focusPrompt: d.focusPrompt,
  });

  const report: AnalysisReport = {
    id: makeReportId(),
    createdAt: new Date().toISOString(),
    businessName: d.businessName,
    address: d.address,
    phone: d.phone,
    email: d.email || undefined,
    url: audit.signals.finalUrl,
    socialLinks: d.socialLinks,
    focusPrompt: d.focusPrompt,
    requestedByRole: d.role ?? "guest",
    overall: audit.overall,
    scores: audit.scores,
    findings: audit.findings,
    signals: audit.signals,
    summary,
    aiPowered,
  };

  saveReport(report); // also the master-admin copy (admin feed reads this store)

  // Notify the master admin (best effort; logs to console without Resend key).
  sendEmail({
    to: process.env.ADMIN_REPORTS_TO ?? "admin@reach.com",
    subject: `Site analysis · ${d.businessName} scored ${audit.overall}/100`,
    html: `<p>A new site analysis was generated:</p>
      <ul>
        <li><b>Business:</b> ${d.businessName}</li>
        <li><b>Address:</b> ${d.address}</li>
        <li><b>Phone:</b> ${d.phone}</li>
        <li><b>Site:</b> ${audit.signals.finalUrl}</li>
        <li><b>Overall score:</b> ${audit.overall}/100</li>
        <li><b>Top issues:</b> ${audit.findings.slice(0, 3).map((f) => f.problem).join("; ") || "None"}</li>
      </ul>
      <p>Full report in the admin dashboard → Site reports.</p>`,
  }).catch((err) => console.warn("[analyze-site] admin email failed:", (err as Error).message));

  return NextResponse.json({ id: report.id, overall: report.overall });
}

async function buildSummary(args: {
  businessName: string;
  url: string;
  overall: number;
  scores: { label: string; score: number }[];
  findings: { severity: string; problem: string; solution: string }[];
  focusPrompt?: string;
}): Promise<{ summary: string; aiPowered: boolean }> {
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const res = await client.messages.create({
        model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest",
        max_tokens: 450,
        system: [{
          type: "text",
          text: "You are Reach's senior growth strategist. Given an automated audit of a small business website, write a warm, specific executive summary (3 short paragraphs max) for the business owner: where they stand, the 2–3 highest-impact organic-marketing fixes, and the upside of fixing them. Plain language, no jargon dumps. Never invent data not in the audit.",
          cache_control: { type: "ephemeral" },
        }],
        messages: [{
          role: "user",
          content:
            `Business: ${args.businessName}\nURL: ${args.url}\nOverall score: ${args.overall}/100\n` +
            `Category scores: ${args.scores.map((s) => `${s.label} ${s.score}`).join(", ")}\n` +
            `Findings: ${args.findings.slice(0, 8).map((f) => `[${f.severity}] ${f.problem} → ${f.solution}`).join("; ")}\n` +
            (args.focusPrompt ? `Owner asked us to focus on: ${args.focusPrompt}\n` : "") +
            `Write the executive summary now.`,
        }],
      });
      const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
      if (text) return { summary: text, aiPowered: true };
    } catch (err) {
      console.warn("[analyze-site] Claude summary failed, using fallback:", (err as Error).message);
    }
  }

  // Deterministic fallback summary.
  const band = args.overall >= 80 ? "in strong shape" : args.overall >= 60 ? "doing okay but leaving growth on the table" : "underperforming and losing customers";
  const high = args.findings.filter((f) => f.severity === "high").slice(0, 3);
  const focusLine = args.focusPrompt ? ` You asked us to focus on "${args.focusPrompt}", and that's reflected in the priorities below.` : "";
  const fixes = high.length
    ? ` The highest-impact fixes right now: ${high.map((f) => f.solution).join(" ")}`
    : " No critical blockers were found — the recommendations below are about compounding gains.";
  return {
    summary:
      `${args.businessName}'s website scored ${args.overall}/100 — ${band}.${focusLine}${fixes} ` +
      `Addressing the flagged items below typically lifts organic traffic, trust, and conversion within a few weeks.`,
    aiPowered: false,
  };
}
