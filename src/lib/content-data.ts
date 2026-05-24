export interface WebinarEntry {
  slug: string;
  title: string;
  host: string;
  hostTitle: string;
  date: string;          // ISO
  durationMin: number;
  status: "upcoming" | "replay";
  attendees: number;
  description: string;
  gradient: string;
  agenda: string[];
}

export const webinars: WebinarEntry[] = [
  {
    slug: "scaling-service-business-bookings-subscriptions",
    title: "Scaling your service business with bookings & subscriptions",
    host: "Lena Park",
    hostTitle: "Conversion & funnel strategist",
    date: "2026-06-04T18:00:00Z",
    durationMin: 60,
    status: "upcoming",
    attendees: 412,
    description: "How the top quartile of service vendors blend bookings, packages, and subscriptions to triple LTV without touching their ad budget.",
    gradient: "linear-gradient(135deg,#10B981,#8B5CF6)",
    agenda: [
      "Anatomy of a high-LTV booking funnel",
      "Bundling sessions into subscriptions",
      "Pricing experiments that actually moved the needle",
      "Live Q&A",
    ],
  },
  {
    slug: "from-zero-to-10k-mrr-in-90-days",
    title: "From zero to $10k MRR in 90 days",
    host: "Marcus Reyes",
    hostTitle: "Marketing systems architect",
    date: "2026-06-12T16:00:00Z",
    durationMin: 75,
    status: "upcoming",
    attendees: 287,
    description: "A teardown of three Marketly vendors who went from $0 to $10k MRR — and the 4 systems they all built first.",
    gradient: "linear-gradient(135deg,#3B82F6,#10B981)",
    agenda: [
      "Picking your wedge product",
      "The minimum-viable funnel",
      "Lifecycle email that drives upgrades",
      "Live Q&A",
    ],
  },
  {
    slug: "designing-storefront-that-converts",
    title: "Designing a storefront that converts",
    host: "Priya Shah",
    hostTitle: "Brand & web designer",
    date: "2026-05-12T17:00:00Z",
    durationMin: 60,
    status: "replay",
    attendees: 624,
    description: "Real teardowns of 5 top-converting Marketly storefronts. What's universal, what's optional, and what's a trap.",
    gradient: "linear-gradient(135deg,#F59E0B,#EC4899)",
    agenda: ["Hero anatomy", "Social proof placement", "Pricing visualizations", "Mobile-first cuts"],
  },
  {
    slug: "stripe-connect-for-marketplaces",
    title: "Stripe Connect for marketplaces — under the hood",
    host: "Devon Kim",
    hostTitle: "Fractional CTO",
    date: "2026-04-21T18:00:00Z",
    durationMin: 90,
    status: "replay",
    attendees: 156,
    description: "Vendor onboarding, payouts, refunds, and disputes — the engineer's tour of a production-grade marketplace payments stack.",
    gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)",
    agenda: ["Express vs. Custom accounts", "Onboarding flows", "Webhook patterns", "Dispute handling"],
  },
];

export function getWebinarBySlug(slug: string) {
  return webinars.find((w) => w.slug === slug);
}

// -----------------------------------------------------------------------------
// Community
// -----------------------------------------------------------------------------

export interface CommunityPostEntry {
  id: string;
  author: string;
  authorTitle: string;
  initials: string;
  gradient: string;
  postedAgo: string;
  title: string;
  body: string;
  tags: string[];
  replies: number;
  likes: number;
}

export const communityPosts: CommunityPostEntry[] = [
  { id: "p1", author: "Aaron W.", authorTitle: "Paid ads · Brooklyn",  initials: "AW", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)", postedAgo: "2h",  title: "What's converting best on your booking pages?", body: "We tested 6 hero variants — the one with a testimonial above the fold lifted bookings 38%. What's working for everyone else?", tags: ["bookings","conversion","heros"], replies: 24, likes: 78 },
  { id: "p2", author: "Sasha M.", authorTitle: "Ops · Toronto",        initials: "SM", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)", postedAgo: "5h",  title: "Stripe Connect onboarding flow for first-time vendors?", body: "Marketly's default handles 90% but I wanted to add a quick KYC reminder. Here's the template I'm using…", tags: ["stripe","onboarding"], replies: 12, likes: 41 },
  { id: "p3", author: "Devon K.", authorTitle: "Eng · Remote",         initials: "DK", gradient: "linear-gradient(135deg,#3B82F6,#10B981)", postedAgo: "1d",  title: "Bundling subscriptions + one-off services = real talk", body: "We doubled LTV by offering a small discount on monthly plans that include 2 in-person services per month. Here's the math…", tags: ["pricing","subscriptions","ltv"], replies: 31, likes: 112 },
  { id: "p4", author: "Lena P.", authorTitle: "Strategist · SF",       initials: "LP", gradient: "linear-gradient(135deg,#EC4899,#F59E0B)", postedAgo: "2d",  title: "Anyone running A/B tests on hourly vs. package pricing?",   body: "We tested $250/hr vs. 4-pack-for-$900. 4-packs increased average booking value 23% but reduced first-time conversions 8%.", tags: ["pricing","experiments"], replies: 18, likes: 60 },
  { id: "p5", author: "Priya S.", authorTitle: "Designer · London",    initials: "PS", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)", postedAgo: "3d",  title: "Sharing my hero section Figma library (free)",              body: "30 hero patterns from top-converting Marketly storefronts. Drop the link below and I'll comment access for everyone.", tags: ["design","figma","freebies"], replies: 89, likes: 240 },
];

export const communityChannels = [
  { name: "Announcements", desc: "Platform updates and roadmap", members: 12400 },
  { name: "Funnels & growth", desc: "Conversion, copywriting, paid ads", members: 8900 },
  { name: "Design feedback", desc: "Get critiques on your hero, pricing page, more", members: 6700 },
  { name: "Engineering", desc: "Next.js, Stripe, Prisma, infra", members: 3400 },
  { name: "Bookings & ops", desc: "Calendly, intake, automation", members: 2900 },
];

// -----------------------------------------------------------------------------
// Blog
// -----------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readMin: number;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "marketplace-launch-playbook-2026",      title: "The 2026 marketplace launch playbook",            excerpt: "What we've learned from launching 1,200+ vendor storefronts on Marketly — the patterns that work and the traps to avoid.", author: "Lena Park",    date: "2026-05-20", category: "Strategy", readMin: 9,  gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { slug: "stripe-connect-2026-vendor-payouts",    title: "Stripe Connect in 2026: vendor payouts that scale",excerpt: "A hands-on tour of the new Connect APIs, payout cadence options, and the patterns that work for marketplaces over $10M GMV.", author: "Devon Kim",    date: "2026-05-14", category: "Engineering", readMin: 12, gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { slug: "high-converting-booking-pages",         title: "Anatomy of a high-converting booking page",        excerpt: "10 patterns that show up again and again on the highest-converting service pages in our marketplace.",                                author: "Priya Shah",   date: "2026-05-07", category: "Design",      readMin: 7,  gradient: "linear-gradient(135deg,#F59E0B,#EC4899)" },
  { slug: "from-side-hustle-to-100k-mrr",          title: "From side hustle to $100K MRR — 4 case studies",   excerpt: "Four Marketly vendors break down their journey from first sale to a six-figure monthly run rate.",                                  author: "Marcus Reyes", date: "2026-04-29", category: "Stories",     readMin: 11, gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)" },
  { slug: "pricing-experiments-that-moved-needle", title: "5 pricing experiments that actually moved the needle", excerpt: "Real tests with real numbers. What ran, what worked, what surprised us.",                                                          author: "Aaron Woods",  date: "2026-04-22", category: "Strategy",    readMin: 8,  gradient: "linear-gradient(135deg,#06B6D4,#3B82F6)" },
  { slug: "shipping-vendor-storefronts-in-a-day",  title: "How to ship a vendor storefront in a single day",  excerpt: "Our team's exact playbook for going from blank Figma to live storefront — in under 8 hours.",                                       author: "Sasha Malik",  date: "2026-04-15", category: "Design",      readMin: 6,  gradient: "linear-gradient(135deg,#F472B6,#FBBF24)" },
];
