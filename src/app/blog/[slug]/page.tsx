import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const all = await getBlogPosts();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const initials = post.author.split(" ").map((w) => w[0]).join("").toUpperCase();

  return (
    <PageShell>
      <Container className="py-8">
        <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      </Container>

      <article className="pb-20">
        <Container className="max-w-3xl">
          <div className="space-y-4">
            <Badge variant="brand">{post.category}</Badge>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              {post.title}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <div className="flex items-center gap-3 pt-2">
              <Avatar className="size-10">
                <AvatarFallback gradient={post.gradient}>{initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-semibold">{post.author}</div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
                  {formatDate(post.date)}
                  <span>·</span>
                  <Clock className="size-3.5" /> {post.readMin} min read
                </div>
              </div>
            </div>
          </div>

          <div className="relative my-10 aspect-[16/9] rounded-2xl overflow-hidden border border-border" style={{ background: post.gradient }} />

          <div className="max-w-none space-y-5 text-base sm:text-[1.06rem] leading-[1.75] text-foreground/85">
            {post.body.map((section, i) => (
              <section key={i} className="space-y-4">
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold tracking-tight pt-4 text-foreground">{section.heading}</h2>
                )}
                {section.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" /> {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-center">
              <p className="font-display text-lg font-bold text-foreground">Ready to put this to work?</p>
              <p className="mt-1 text-sm text-muted-foreground">Start a free 7-day trial — $0 today, cancel anytime.</p>
              <Link href="/start-trial" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition">
                Start free <ArrowLeft className="size-4 rotate-180" />
              </Link>
            </div>
          </div>
        </Container>

        {/* Related */}
        <Container className="max-w-3xl mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">Keep reading</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9]" style={{ background: p.gradient }} />
                  <CardContent className="p-4 space-y-2">
                    <Badge variant="secondary" className="text-[0.65rem]">{p.category}</Badge>
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-brand transition-colors line-clamp-2">{p.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
              <ArrowLeft className="size-4" /> Back to all posts
            </Link>
          </div>
        </Container>
      </article>
    </PageShell>
  );
}
