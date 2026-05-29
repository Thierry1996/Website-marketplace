"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQS } from "@/lib/support-knowledge";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hey! I'm Ray, Reach's AI assistant 👋 Ask me about our plans, the free 7-day trial, integrations, or payments.",
};

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setInput("");

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) throw new Error("no stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry, I couldn't reach the server. Email support@reach.com and we'll jump in.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        className="fixed bottom-5 right-5 z-[80] grid size-14 place-items-center rounded-full text-white shadow-2xl bg-[linear-gradient(135deg,rgb(var(--brand)),rgb(var(--accent)),rgb(var(--secondary)))] transition-transform hover:scale-105 active:scale-95"
      >
        <span aria-hidden className="absolute inset-0 rounded-full bg-brand/50 live-dot" />
        <span className="relative">{open ? <X className="size-6" /> : <MessageCircle className="size-6" />}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-[80] flex w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-2xl"
            style={{ height: "min(560px, calc(100vh - 9rem))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[linear-gradient(135deg,rgb(var(--brand)),rgb(var(--accent)),rgb(var(--secondary)))] p-4 text-white">
              <span className="grid size-9 place-items-center rounded-full bg-white/20">
                <Sparkles className="size-4" />
              </span>
              <div className="flex-1">
                <div className="font-display font-bold leading-tight">Ray · Reach AI</div>
                <div className="flex items-center gap-1.5 text-xs text-white/85">
                  <span className="size-1.5 rounded-full bg-lime-300 bg-[rgb(var(--lime))] live-dot" /> Online now
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 bg-surface/40">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                      m.role === "user"
                        ? "bg-brand text-brand-foreground rounded-br-md"
                        : "bg-surface-elevated border border-border rounded-bl-md"
                    )}
                  >
                    {m.content || (busy && i === messages.length - 1 ? <Typing /> : m.content)}
                  </div>
                </div>
              ))}

              {/* Quick replies (only before the user has asked anything) */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {FAQS.slice(0, 4).map((f) => (
                    <button
                      key={f.q}
                      onClick={() => send(f.q)}
                      className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium hover:border-brand hover:text-brand transition"
                    >
                      {f.q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-border p-3 bg-surface-elevated"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Reach…"
                className="h-10"
                disabled={busy}
              />
              <Button type="submit" variant="brand" size="icon" disabled={busy || !input.trim()} aria-label="Send">
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Typing() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
