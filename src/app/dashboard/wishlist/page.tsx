import type { Metadata } from "next";

import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { ListingCard } from "@/components/marketing/listing-card";
import { getListings } from "@/lib/queries";

export const metadata: Metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  // Pretend the user has saved the first 6 listings.
  const saved = (await getListings()).slice(0, 6);

  return (
    <DashboardShell role="user" title="Wishlist">
      <DashboardPageHeader
        title="Saved for later"
        description="Listings you've hearted across the marketplace."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)}
      </div>
    </DashboardShell>
  );
}
