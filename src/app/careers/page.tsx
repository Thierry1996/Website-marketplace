import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Reach — engineering, design, and partnerships. Remote-first, async-first.",
};

const roles = [
  { team: "Engineering",    title: "Senior Full-stack Engineer · Marketplace", location: "Remote · US/EU",       type: "Full-time" },
  { team: "Engineering",    title: "Senior Engineer · Payments & Stripe",      location: "Remote · Americas",    type: "Full-time" },
  { team: "Design",         title: "Brand & Marketing Designer",                location: "Remote · global",       type: "Full-time" },
  { team: "Growth",         title: "Performance Marketing Lead",                location: "NYC or remote",         type: "Full-time" },
  { team: "Partnerships",   title: "Partner Manager · Top vendors",             location: "Remote · US",           type: "Full-time" },
  { team: "Operations",     title: "Trust & Safety Specialist",                 location: "Remote · global",       type: "Contract" },
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Work at Reach"
        title={<>Build the marketplace platform <span className="gradient-text">operators wish existed.</span></>}
        description="Remote-first, async-first, ship-every-week. We're 24 people in 9 countries hiring across engineering, design, and partnerships."
      />

      <Container className="py-12">
        <h2 className="font-display text-2xl font-bold mb-6">Open roles ({roles.length})</h2>
        <div className="space-y-3">
          {roles.map((r) => (
            <Card key={r.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{r.team}</Badge>
                    <Badge variant="outline">{r.type}</Badge>
                  </div>
                  <div className="mt-2 font-semibold">{r.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                    <MapPin className="size-3.5" /> {r.location}
                  </div>
                </div>
                <Button variant="brand" size="sm">
                  Apply <ArrowRight className="size-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center">
          <Briefcase className="size-6 mx-auto text-brand" />
          <h3 className="mt-3 font-display text-lg font-semibold">Don't see your role?</h3>
          <p className="mt-2 text-sm text-muted-foreground">We always want to talk to exceptional operators. Send us your story.</p>
          <Button asChild variant="outline" size="md" className="mt-4">
            <Link href="/contact">Get in touch <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </Container>
    </PageShell>
  );
}
