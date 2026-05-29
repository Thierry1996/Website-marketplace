import { NextResponse, type NextRequest } from "next/server";

/**
 * POST /api/analyze-code — AI agent that analyzes a submitted codebase.
 *
 * Uses Claude with a prompt-cached system prompt when ANTHROPIC_API_KEY is set.
 * Without a key, runs a deterministic rule-based scan so the form still gets a
 * useful response — same JSON shape either way.
 */

export const runtime = "nodejs";

const SYSTEM = `You are Reach's automated code reviewer. You receive a small bundle of files
from a vendor submission to our marketplace and must produce a JSON object with:

  - summary  (one-paragraph review, max 280 chars)
  - score    (integer 0–100; 90+ ready to ship, 70–89 minor polish, <70 issues)
  - issues   (string[]; concrete problems — accessibility, security, perf)
  - highlights (string[]; what's done well)

Be terse, concrete, and constructive. Never invent dependencies or claim
behavior you can't see in the files. Output ONLY valid JSON.`;

type AnalyzeBody = {
  framework: string;
  files: { path: string; content: string }[];
};

export async function POST(req: NextRequest) {
  let body: AnalyzeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const corpus = (body.files ?? [])
    .slice(0, 10)
    .map((f) => `// ${f.path}\n${(f.content ?? "").slice(0, 8000)}`)
    .join("\n\n");

  // ---- Live Claude path ----
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const res = await client.messages.create({
        model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest",
        max_tokens: 500,
        system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
        messages: [{
          role: "user",
          content: `Framework: ${body.framework}\n\nFiles:\n${corpus}\n\nReturn JSON only.`,
        }],
      });
      const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
      // Extract first JSON object.
      const match = text.match(/\{[\s\S]*\}/);
      if (match) return NextResponse.json(JSON.parse(match[0]));
      return NextResponse.json({ summary: text.slice(0, 280), score: 70, issues: [], highlights: [] });
    } catch (err) {
      console.error("[analyze-code] Claude failed, falling back:", err);
    }
  }

  // ---- Deterministic fallback ----
  return NextResponse.json(localAnalyze(body));
}

function localAnalyze(body: AnalyzeBody) {
  const files = body.files ?? [];
  const allContent = files.map((f) => f.content ?? "").join("\n").toLowerCase();
  const issues: string[] = [];
  const highlights: string[] = [];
  let score = 80;

  // Heuristics — fast and rule-based.
  if (!allContent.includes("<title>") && body.framework === "html") {
    issues.push("Missing <title> in HTML — hurts SEO.");
    score -= 5;
  }
  if (!allContent.includes("viewport") && body.framework === "html") {
    issues.push("Missing responsive viewport meta tag.");
    score -= 5;
  }
  if (allContent.includes("alert(")) {
    issues.push("Uses alert() — replace with a proper UI affordance.");
    score -= 4;
  }
  if (allContent.includes("eval(")) {
    issues.push("Use of eval() flagged — common XSS vector.");
    score -= 20;
  }
  if (/<script[^>]+src=["']https?:\/\/(?!unpkg\.com|cdn\.)/.test(allContent)) {
    issues.push("Loads a third-party script from a non-CDN origin.");
    score -= 10;
  }

  if (allContent.includes("linear-gradient(")) highlights.push("Uses brand-friendly gradients.");
  if (allContent.includes("aria-")) highlights.push("Includes ARIA attributes for accessibility.");
  if (allContent.includes("meta name=\"description\"")) highlights.push("SEO description tag present.");
  if (files.length > 1) highlights.push("Multi-file project — modular structure.");

  const summary = issues.length === 0
    ? "Looks ready to ship — no blockers detected. Consider the highlights above for extra polish."
    : `${issues.length} issue${issues.length === 1 ? "" : "s"} to address; otherwise solid foundation.`;

  return { summary, score: Math.max(20, Math.min(100, score)), issues, highlights };
}
