"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, Building2, MapPin, Phone, Wand2, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const STAGES = [
  "Reaching your site…",
  "Crawling pages & links…",
  "Reading SEO + meta signals…",
  "Auditing mobile & performance…",
  "Scoring organic-marketing health…",
  "Writing your report…",
];

export function AnalyzerForm({ role = "guest", compact = false }: { role?: "customer" | "vendor" | "guest"; compact?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState(0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      url:          String(fd.get("url") || ""),
      businessName: String(fd.get("businessName") || ""),
      address:      String(fd.get("address") || ""),
      phone:        String(fd.get("phone") || ""),
      email:        String(fd.get("email") || ""),
      socialLinks:  String(fd.get("social") || "").split(",").map((s) => s.trim()).filter(Boolean),
      focusPrompt:  String(fd.get("focus") || ""),
      role,
    };
    if (!payload.url || !payload.businessName || !payload.address || !payload.phone) {
      toast.error("Website, business name, address, and phone are all required.");
      return;
    }

    setBusy(true);
    setStage(0);
    const ticker = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 1800);

    try {
      const res = await fetch("/api/analyze-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Analysis failed.");
        setBusy(false);
        clearInterval(ticker);
        return;
      }
      toast.success(`Report ready — your site scored ${data.overall}/100.`);
      router.push(`/analyzer/${data.id}`);
    } catch {
      toast.error("Something went wrong reaching the analyzer. Try again.");
      setBusy(false);
    } finally {
      clearInterval(ticker);
    }
  }

  return (
    <Card className="border-brand/20 overflow-hidden">
      <div className="bg-[linear-gradient(135deg,rgb(var(--brand)),rgb(var(--accent)),rgb(var(--secondary)))] p-5 text-white">
        <div className="flex items-center gap-2">
          <Wand2 className="size-5" />
          <h3 className="font-display text-lg font-bold">Free AI Site Analyzer</h3>
        </div>
        <p className="mt-1 text-sm text-white/85">
          Paste your live website — our AI crawls it and flags every organic-marketing weakness, with fixes. Free PDF report.
        </p>
      </div>

      <CardContent className="p-6 space-y-5">
        {busy ? (
          <div className="py-10 text-center space-y-4">
            <Loader2 className="mx-auto size-10 animate-spin text-brand" />
            <div className="font-display text-lg font-bold">{STAGES[stage]}</div>
            <div className="mx-auto h-2 w-full max-w-sm overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgb(var(--brand)),rgb(var(--accent)))] transition-all duration-700"
                style={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Crawling a live site — this can take up to 20 seconds.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <Label htmlFor="an-url">Website or store URL *</Label>
              <div className="relative mt-1.5">
                <Globe className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="an-url" name="url" placeholder="https://yourstore.com" className="pl-9" required />
              </div>
            </div>

            <div className={compact ? "space-y-4" : "grid sm:grid-cols-2 gap-4"}>
              <div>
                <Label htmlFor="an-biz">Business name *</Label>
                <div className="relative mt-1.5">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="an-biz" name="businessName" placeholder="Glow Studio" className="pl-9" required />
                </div>
              </div>
              <div>
                <Label htmlFor="an-phone">Business phone *</Label>
                <div className="relative mt-1.5">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="an-phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" className="pl-9" required />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="an-addr">Business address *</Label>
              <div className="relative mt-1.5">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="an-addr" name="address" placeholder="123 Main St, Austin, TX 78701" className="pl-9" required />
              </div>
            </div>

            <div className={compact ? "space-y-4" : "grid sm:grid-cols-2 gap-4"}>
              <div>
                <Label htmlFor="an-email">Email (optional)</Label>
                <Input id="an-email" name="email" type="email" placeholder="you@business.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="an-social">Social links (optional)</Label>
                <Input id="an-social" name="social" placeholder="instagram.com/you, tiktok.com/@you" className="mt-1.5" />
              </div>
            </div>

            <div>
              <Label htmlFor="an-focus">What should the AI focus on? (optional prompt)</Label>
              <Textarea id="an-focus" name="focus" rows={2} placeholder="e.g. We're not getting leads from Google — why?" className="mt-1.5" />
            </div>

            <Button type="submit" variant="brand" size="xl" className="w-full">
              <Search className="size-4" /> Analyze my site — free report
            </Button>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5 text-success" /> Live domains only</span>
              <span className="inline-flex items-center gap-1"><Wand2 className="size-3.5 text-brand" /> AI + big-data analysis</span>
              <span className="inline-flex items-center gap-1"><ArrowRight className="size-3.5" /> Downloadable PDF</span>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
