import type { Metadata } from "next";
import Link from "next/link";
import { MessagesSquare, Heart, Hash, Users, TrendingUp, ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { communityChannels } from "@/lib/content-data";
import { getCommunityPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Community",
  description: "Forums, channels, and meetups for 28,000+ marketplace operators. Share what's working, get answers in hours.",
};

export default async function CommunityPage() {
  const communityPosts = await getCommunityPosts();
  return (
    <PageShell>
      <PageHeader
        eyebrow="The community"
        title={<>Build alongside <span className="gradient-text">28,000+ marketplace pros.</span></>}
        description="Discussion forums, weekly office hours, and category-specific channels. The fastest place to get unstuck and stay ahead."
        actions={
          <Button asChild variant="gradient" size="lg">
            <Link href="/sign-up">Join free <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Posts feed */}
          <div className="space-y-5">
            <Tabs defaultValue="trending">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-3">
                {communityPosts.map((p) => (
                  <Card key={p.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex gap-4">
                      <Avatar className="size-10">
                        <AvatarFallback gradient={p.gradient}>{p.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className="text-sm font-semibold">{p.author}</span>
                            <span className="ml-1 text-xs text-muted-foreground">· {p.authorTitle}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{p.postedAgo}</span>
                        </div>
                        <h3 className="mt-2 font-semibold">{p.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.body}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex flex-wrap gap-1">
                            {p.tags.map((t) => (
                              <Badge key={t} variant="default" className="text-[0.65rem]">#{t}</Badge>
                            ))}
                          </span>
                          <span className="inline-flex items-center gap-1"><MessagesSquare className="size-3.5" /> {p.replies}</span>
                          <span className="inline-flex items-center gap-1"><Heart className="size-3.5" /> {p.likes}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-3 text-sm text-muted-foreground">
                Sort by recency coming with backend wiring in Phase 3.
              </TabsContent>
              <TabsContent value="unanswered" className="space-y-3 text-sm text-muted-foreground">
                Filter by status coming with backend wiring in Phase 3.
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 self-start">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-semibold inline-flex items-center gap-2">
                    <Hash className="size-4" /> Channels
                  </h2>
                  <Link href="#" className="text-xs hover:underline">See all</Link>
                </div>
                <ul className="space-y-2.5">
                  {communityChannels.map((c) => (
                    <li key={c.name}>
                      <Link href="#" className="flex items-start justify-between gap-3 rounded-lg p-2 hover:bg-surface transition-colors">
                        <div className="min-w-0">
                          <div className="text-sm font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{c.desc}</div>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{c.members.toLocaleString()}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-3">
                <h2 className="font-display font-semibold inline-flex items-center gap-2">
                  <TrendingUp className="size-4" /> Top contributors
                </h2>
                <ul className="space-y-3">
                  {communityPosts.slice(0, 4).map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback gradient={p.gradient}>{p.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 text-sm">
                        <div className="font-medium leading-tight">{p.author}</div>
                        <div className="text-xs text-muted-foreground">{p.authorTitle}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand/10 via-secondary/10 to-accent/10 border-brand/20">
              <CardContent className="p-5 space-y-3">
                <Badge variant="brand"><Users className="size-3" /> Free to join</Badge>
                <h3 className="font-display font-semibold">Start posting</h3>
                <p className="text-sm text-muted-foreground">Sign in or create an account to ask, answer, and join channels.</p>
                <Button asChild variant="gradient" size="md" className="w-full">
                  <Link href="/sign-up">Create account <ArrowRight className="size-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Container>
    </PageShell>
  );
}
