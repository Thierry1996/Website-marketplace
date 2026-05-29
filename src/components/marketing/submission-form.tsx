"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Code2, FileCode, Sparkles, ShieldCheck, ArrowRight, Eye, Wand2, AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createSubmission } from "@/lib/actions/submissions";
import { cn } from "@/lib/utils";

const FRAMEWORKS: Array<{ id: "html" | "react" | "nextjs" | "wordpress"; label: string; hint: string }> = [
  { id: "html",      label: "HTML / CSS / JS", hint: "Instant preview, no build step" },
  { id: "react",     label: "React",           hint: "Compiled by our build pipeline" },
  { id: "nextjs",    label: "Next.js",         hint: "App or Pages router supported" },
  { id: "wordpress", label: "WordPress",       hint: "ZIP your theme or plugin" },
];

const STARTER_HTML = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>My storefront</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; min-height: 100vh;
           display: grid; place-items: center;
           background: linear-gradient(135deg, #FFE4E9, #EDE6FE); }
    .card { background: #fff; padding: 32px; border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,.08); text-align: center; max-width: 420px; }
    h1 { margin: 0 0 12px; font-size: 32px;
         background: linear-gradient(135deg,#FF4D6D,#7C3AED);
         -webkit-background-clip: text; background-clip: text; color: transparent; }
    p  { color: #475569; line-height: 1.6; }
    a  { display: inline-block; margin-top: 16px; padding: 12px 22px; border-radius: 999px;
         background: #FF4D6D; color: #fff; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, Reach!</h1>
    <p>This live preview updates as you type. Click <b>Test &amp; analyze</b> to see what the AI agent thinks.</p>
    <a href="#">Get started</a>
  </div>
</body>
</html>
`;

interface Analysis { summary: string; score: number; issues: string[]; highlights: string[]; }

export function SubmissionForm() {
  const router = useRouter();
  const [framework, setFramework] = useState<typeof FRAMEWORKS[number]["id"]>("html");
  const [title, setTitle]         = useState("");
  const [description, setDesc]    = useState("");
  const [category, setCategory]   = useState("");
  const [repoUrl, setRepoUrl]     = useState("");
  const [code, setCode]           = useState(STARTER_HTML);
  const [analysis, setAnalysis]   = useState<Analysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [pending, startTransition] = useTransition();

  // Live preview srcdoc — only HTML is rendered live; other frameworks show a
  // friendly "build pending" card.
  const previewSrc = useMemo(() => {
    if (framework !== "html") {
      return `<!doctype html><html><body style="margin:0;font-family:system-ui;background:#0F172A;color:#fff;min-height:100vh;display:grid;place-items:center;text-align:center;padding:24px">
        <div><h2 style="font-size:28px;margin:0 0 8px">⚙️ Build required</h2><p style="color:#94A3B8;max-width:360px;margin:0 auto">${framework.toUpperCase()} submissions are compiled by our pipeline. You'll get a live preview URL once the build finishes.</p></div>
      </body></html>`;
    }
    return code;
  }, [code, framework]);

  // Debounced auto-clear of stale analysis when code changes
  useEffect(() => { setAnalysis(null); }, [code, framework]);

  async function runAnalysis() {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          framework,
          files: [{ path: framework === "html" ? "index.html" : `entry.${framework === "react" ? "tsx" : "ts"}`, content: code }],
        }),
      });
      const data: Analysis = await res.json();
      setAnalysis(data);
    } catch (err) {
      toast.error("Couldn't reach the analyzer — try again.");
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  }

  function submit() {
    if (!title.trim()) { toast.error("Give your submission a title."); return; }
    startTransition(async () => {
      const res = await createSubmission({
        title, description, framework, category: category || undefined,
        repoUrl: repoUrl || undefined,
        files: [{ path: framework === "html" ? "index.html" : `entry.${framework === "react" ? "tsx" : "ts"}`, content: code }],
        thumbnail: "linear-gradient(135deg,#FF4D6D,#7C3AED)",
        vendorId: "demo-vendor",
      });
      if (res.success) {
        toast.success("Submitted — opening live preview.");
        router.push(`/preview/${res.data.previewSlug}`);
      } else {
        toast.error(res.error.formError ?? "Submission failed");
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      {/* LEFT — form */}
      <Card>
        <CardContent className="p-6 sm:p-7 space-y-6">
          <Badge variant="brand"><Sparkles className="size-3" /> AI-reviewed · live preview</Badge>

          <div className="space-y-2">
            <Label>Framework</Label>
            <div className="grid grid-cols-2 gap-2">
              {FRAMEWORKS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFramework(f.id)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition",
                    framework === f.id ? "border-brand bg-brand-soft/40 ring-1 ring-brand" : "border-border hover:border-foreground/30"
                  )}
                >
                  <div className="font-semibold text-sm">{f.label}</div>
                  <div className="text-[0.7rem] text-muted-foreground mt-0.5">{f.hint}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="sub-title">Project title</Label>
            <Input id="sub-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Glow Studio storefront" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="sub-desc">Description (optional)</Label>
            <Textarea id="sub-desc" value={description} onChange={(e) => setDesc(e.target.value)} placeholder="One-liner about your project…" className="mt-1.5" rows={2} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="sub-cat">Category (optional)</Label>
              <Input id="sub-cat" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Beauty, Fitness, Food…" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="sub-repo">Repo URL (optional)</Label>
              <Input id="sub-repo" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/…" className="mt-1.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label htmlFor="sub-code"><FileCode className="size-3.5 inline mr-1" /> Code</Label>
              <span className="text-[0.7rem] text-muted-foreground">{code.length.toLocaleString()} chars</span>
            </div>
            <Textarea
              id="sub-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="mt-1.5 min-h-[260px] font-mono text-[0.78rem] leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" size="md" onClick={runAnalysis} disabled={analyzing}>
              <Wand2 className="size-4" />
              {analyzing ? "Analyzing…" : "Test & analyze"}
            </Button>
            <Button type="button" variant="brand" size="md" onClick={submit} disabled={pending}>
              {pending ? "Submitting…" : "Submit for review"}
              {!pending && <ArrowRight className="size-4" />}
            </Button>
            <span className="ml-auto text-[0.7rem] text-muted-foreground inline-flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-success" /> Sandboxed preview · encrypted at rest
            </span>
          </div>

          {analysis && (
            <Card className="border-brand/20 bg-brand-soft/20">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Wand2 className="size-4 text-brand" /> AI review
                  </div>
                  <Badge variant={analysis.score >= 90 ? "brand" : analysis.score >= 70 ? "secondary" : "danger"}>
                    Score {analysis.score}/100
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed">{analysis.summary}</p>
                {analysis.issues.length > 0 && (
                  <ul className="space-y-1 text-xs">
                    {analysis.issues.map((i) => (
                      <li key={i} className="flex items-start gap-1.5"><AlertTriangle className="size-3.5 text-warning mt-0.5" /> {i}</li>
                    ))}
                  </ul>
                )}
                {analysis.highlights.length > 0 && (
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {analysis.highlights.map((h) => <li key={h}>✦ {h}</li>)}
                  </ul>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* RIGHT — live preview */}
      <div className="lg:sticky lg:top-24 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold inline-flex items-center gap-2">
            <Eye className="size-4" /> Live preview
          </h3>
          <Badge variant="brand">
            <span className="size-1.5 rounded-full bg-white live-dot" /> {framework === "html" ? "Updating live" : "Build required"}
          </Badge>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-xl">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-surface">
            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-[0.7rem] text-muted-foreground font-mono">preview.reach.com/sandbox</span>
          </div>
          <iframe
            title="Live submission preview"
            srcDoc={previewSrc}
            sandbox="allow-scripts"
            className="w-full h-[520px] bg-white"
          />
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-surface border border-border p-3 text-xs text-muted-foreground">
          <Code2 className="size-3.5 text-muted-foreground" />
          Both you and our reviewers see this exact preview in real time. Each submission ships with a unique <code>/preview/&lt;slug&gt;</code> URL.
        </div>
      </div>
    </div>
  );
}
