import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, Users, PlayCircle, ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getWebinars } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Webinars",
  description: "Live workshops and on-demand replays from top Reach vendors. Funnel teardowns, growth tactics, and platform deep-dives.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function WebinarRow({ w }: { w: typeof webinars[number] }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 group">
      <div className="grid sm:grid-cols-[260px_1fr]">
        <Link
          href={`/webinars/${w.slug}`}
          className="relative aspect-video sm:aspect-auto grid place-items-center"
          style={{ background: w.gradient }}
        >
          <span className="grid size-14 place-items-center rounded-full bg-white/95 text-foreground shadow-lg group-hover:scale-110 transition-transform">
            <PlayCircle className="size-7" strokeWidth={1.4} />
          </span>
        </Link>
        <CardContent className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="size-3.5" /> {formatDate(w.date)}
            <span>·</span>
            <Clock className="size-3.5" /> {formatTime(w.date)} · {w.durationMin} min
          </div>
          <Link href={`/webinars/${w.slug}`}>
            <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-brand transition-colors">
              {w.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{w.description}</p>
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="text-xs text-muted-foreground">
              Hosted by <span className="text-foreground font-medium">{w.host}</span> · {w.hostTitle}
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3.5" /> {w.attendees.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default async function WebinarsPage() {
  const webinars = await getWebinars();
  const upcoming = webinars.filter((w) => w.status === "upcoming");
  const replays  = webinars.filter((w) => w.status === "replay");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Webinars & education"
        title={<>Learn from the operators <span className="gradient-text">winning right now.</span></>}
        description="Live workshops, on-demand replays, and a deep library of tactics from the vendors driving real growth on Reach. Free for all members."
        actions={
          <Button asChild variant="gradient" size="lg">
            <Link href="/community">Join the community <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />

      <Container className="py-12">
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="replays">On-demand replays ({replays.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcoming.length === 0 ? (
              <p className="text-muted-foreground">No upcoming webinars right now — check the replay library.</p>
            ) : (
              upcoming.map((w) => <WebinarRow key={w.slug} w={w} />)
            )}
          </TabsContent>
          <TabsContent value="replays" className="space-y-4">
            {replays.map((w) => <WebinarRow key={w.slug} w={w} />)}
          </TabsContent>
        </Tabs>
      </Container>
    </PageShell>
  );
}
