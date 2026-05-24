"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListingCard, type Listing } from "@/components/marketing/listing-card";
import { marketplaceCategories } from "@/lib/sample-data";
import { cn, formatCurrency } from "@/lib/utils";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

interface Props {
  listings: Listing[];
  /** Pre-select a category (used by /categories/[slug] pages). */
  defaultCategory?: string;
}

export function MarketplaceGrid({ listings, defaultCategory = "All" }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(defaultCategory);
  const [sort, setSort] = useState<SortKey>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let out = listings;
    if (category !== "All") out = out.filter((l) => l.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (l) => l.title.toLowerCase().includes(q) || l.vendor.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":  out = [...out].sort((a, b) => a.priceCents - b.priceCents); break;
      case "price-desc": out = [...out].sort((a, b) => b.priceCents - a.priceCents); break;
      case "rating":     out = [...out].sort((a, b) => b.rating - a.rating); break;
      default:           out = [...out].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return out;
  }, [listings, query, category, sort]);

  const cheapest = listings.reduce((m, l) => Math.min(m, l.priceCents), Infinity);
  const dearest  = listings.reduce((m, l) => Math.max(m, l.priceCents), 0);

  return (
    <div className="space-y-6">
      {/* Search + sort row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search listings, vendors, services..."
            className="pl-9 h-11"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-11 rounded-lg border border-border bg-surface-elevated px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="popular">Most popular</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>

        <Button variant="outline" size="md" onClick={() => setShowFilters((v) => !v)}>
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </div>

      {/* Category pills */}
      <div className="-mx-1 overflow-x-auto">
        <div className="flex items-center gap-2 px-1 pb-1">
          {marketplaceCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition",
                category === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {showFilters && (
        <div className="rounded-xl border border-border bg-surface p-4 space-y-3 text-sm">
          <div className="font-medium">Price range</div>
          <div className="text-muted-foreground">
            From {formatCurrency(cheapest / 100)} to {formatCurrency(dearest / 100)}
          </div>
          <div className="text-xs text-muted-foreground/70">
            Full price-range slider lands in Phase 3.
          </div>
        </div>
      )}

      {/* Results header */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
          {listings.length} listings
        </span>
        {category !== "All" && (
          <Badge variant="brand">
            {category}
            <button onClick={() => setCategory("All")} aria-label="Clear category">
              <X className="size-3" />
            </button>
          </Badge>
        )}
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <div className="font-display text-lg font-semibold">No listings match your search</div>
          <p className="mt-2 text-sm text-muted-foreground">Try clearing filters or searching a different term.</p>
          <Button variant="outline" size="md" className="mt-5" onClick={() => { setQuery(""); setCategory("All"); }}>
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
