import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { MarketplaceGrid } from "@/components/marketing/marketplace-grid";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { getListings, getListingsByCategory } from "@/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Category not found" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  // Filter listings to this category (fall back to all listings if no filter is set).
  const list = cat.listingFilter
    ? await getListingsByCategory(cat.listingFilter)
    : await getListings();
  const fallback = list.length > 0 ? list : await getListings();

  return (
    <PageShell>
      <PageHeader
        eyebrow={cat.name}
        title={<>{cat.name.split(" ")[0]}{" "}<span className="gradient-text">made simple.</span></>}
        description={cat.description}
      />

      <Container className="py-12">
        <Breadcrumb items={[{ label: "Categories", href: "/categories" }, { label: cat.name }]} />
        <div className="mt-8">
          <MarketplaceGrid listings={fallback} defaultCategory={cat.listingFilter ?? "All"} />
        </div>
      </Container>
    </PageShell>
  );
}
