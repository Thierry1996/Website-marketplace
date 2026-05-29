import { NextResponse, type NextRequest } from "next/server";

import { SUPPORT_SYSTEM_PROMPT, matchFaq } from "@/lib/support-knowledge";

/**
 * POST /api/chat — Reach AI support agent ("Ray").
 *
 * Streams plain-text chunks. When ANTHROPIC_API_KEY is set it uses Claude with
 * the support knowledge as a *prompt-cached* system prompt (cheap, fast repeat
 * calls). Without a key it streams a keyword-matched FAQ answer so the widget
 * works fully offline.
 */

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages.slice(-12) : [];
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  // ---- Live Claude path -----------------------------------------------------
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      const stream = client.messages.stream({
        model: MODEL,
        max_tokens: 600,
        system: [
          {
            type: "text",
            text: SUPPORT_SYSTEM_PROMPT,
            // Cache the long system prompt — repeat support calls are cheap + fast.
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      const encoder = new TextEncoder();
      const readable = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
                controller.enqueue(encoder.encode(event.delta.text));
              }
            }
          } catch (err) {
            controller.enqueue(encoder.encode("\n\n(Sorry — I hit a snag. Email support@reach.com.)"));
            console.error("[chat] stream error", err);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    } catch (err) {
      console.error("[chat] Anthropic init failed, using fallback:", (err as Error).message);
      // fall through to offline matcher
    }
  }

  // ---- Offline FAQ fallback (typed word-by-word) ----------------------------
  const answer = matchFaq(lastUser);
  const encoder = new TextEncoder();
  const words = answer.split(" ");
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const w of words) {
        controller.enqueue(encoder.encode(w + " "));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Reach-Mode": "fallback" },
  });
}
