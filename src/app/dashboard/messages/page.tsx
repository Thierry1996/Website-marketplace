"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sampleMessages } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const TRANSCRIPT: Record<string, { from: "me" | "them"; body: string; at: string }[]> = {
  M1: [
    { from: "them", body: "Hi Jane! Just confirming your appointment Friday at 4:30pm.",                                          at: "10:32" },
    { from: "me",   body: "Yes, perfect. Anything I should bring?",                                                                at: "10:40" },
    { from: "them", body: "Just yourself — we provide everything. Looking forward to it!",                                         at: "10:42" },
  ],
};

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(sampleMessages[0].id);
  const [draft, setDraft] = useState("");
  const active = sampleMessages.find((m) => m.id === activeId)!;
  const transcript = TRANSCRIPT[activeId] ?? [
    { from: "them" as const, body: active.preview, at: "Earlier" },
  ];

  return (
    <DashboardShell role="user" title="Messages">
      <DashboardPageHeader title="Messages" description="Conversations with vendors, experts, and platform support." />

      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[300px_1fr]" style={{ minHeight: 520 }}>
          {/* Threads list */}
          <aside className="border-r border-border bg-surface">
            <div className="p-3 border-b border-border">
              <Input placeholder="Search messages..." className="h-9 bg-background" />
            </div>
            <ul className="divide-y divide-border">
              {sampleMessages.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => setActiveId(m.id)}
                    className={cn(
                      "w-full flex items-start gap-3 p-4 text-left hover:bg-background transition-colors",
                      m.id === activeId && "bg-background"
                    )}
                  >
                    <Avatar className="size-10">
                      <AvatarFallback gradient={m.gradient}>{m.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold truncate">{m.partner}</span>
                        <span className="text-[0.65rem] text-muted-foreground">{m.lastAt}</span>
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{m.preview}</div>
                    </div>
                    {m.unread > 0 && <Badge variant="brand" className="text-[0.6rem] px-1.5">{m.unread}</Badge>}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Conversation */}
          <section className="flex flex-col">
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Avatar className="size-10">
                <AvatarFallback gradient={active.gradient}>{active.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{active.partner}</div>
                <div className="text-xs text-muted-foreground">{active.role}</div>
              </div>
              <Badge variant="brand">Online</Badge>
            </div>

            <CardContent className="flex-1 space-y-3 overflow-y-auto p-5 bg-surface/30">
              {transcript.map((t, i) => (
                <div key={i} className={cn("flex", t.from === "me" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                      t.from === "me"
                        ? "bg-brand text-brand-foreground rounded-br-md"
                        : "bg-surface-elevated border border-border rounded-bl-md"
                    )}
                  >
                    <div>{t.body}</div>
                    <div className={cn("mt-1 text-[0.65rem] opacity-70", t.from === "me" ? "text-brand-foreground" : "text-muted-foreground")}>
                      {t.at}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            <form
              className="flex items-center gap-2 p-3 border-t border-border bg-background"
              onSubmit={(e) => {
                e.preventDefault();
                setDraft("");
              }}
            >
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message ${active.partner}...`}
                className="h-10"
              />
              <Button variant="brand" size="md" type="submit" disabled={!draft.trim()}>
                <Send className="size-4" /> Send
              </Button>
            </form>
          </section>
        </div>
      </Card>
    </DashboardShell>
  );
}
