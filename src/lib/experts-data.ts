export interface ExpertEntry {
  slug: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  expertise: string[];
  hourlyCents: number;
  rating: number;
  reviews: number;
  responseHours: number;
  initials: string;
  gradient: string;
  available: boolean;
}

export const experts: ExpertEntry[] = [
  {
    slug: "lena-park",
    name: "Lena Park",
    title: "Conversion & funnel strategist",
    location: "San Francisco, CA",
    bio: "Helped 80+ SaaS and DTC brands lift conversion 30-90% with disciplined funnel rebuilds, copy testing, and pricing experiments.",
    expertise: ["Funnel design", "Copywriting", "Stripe pricing", "A/B testing"],
    hourlyCents: 25000, rating: 4.9, reviews: 412, responseHours: 2, initials: "LP",
    gradient: "linear-gradient(135deg,#10B981,#8B5CF6)", available: true,
  },
  {
    slug: "marcus-reyes",
    name: "Marcus Reyes",
    title: "Marketing systems architect",
    location: "Austin, TX",
    bio: "I build the marketing engine behind ARR. Specialize in attribution, lifecycle automation, and Stripe-powered subscription flows.",
    expertise: ["Marketing ops", "Lifecycle email", "Stripe subscriptions", "HubSpot/Customer.io"],
    hourlyCents: 22500, rating: 4.9, reviews: 287, responseHours: 4, initials: "MR",
    gradient: "linear-gradient(135deg,#3B82F6,#10B981)", available: true,
  },
  {
    slug: "priya-shah",
    name: "Priya Shah",
    title: "Brand & web designer",
    location: "London, UK",
    bio: "Brand identity and high-converting websites for premium service brands. Past clients include 3 unicorn founders and 2 Michelin-starred restaurants.",
    expertise: ["Brand identity", "Webflow", "Figma", "Visual systems"],
    hourlyCents: 18000, rating: 5.0, reviews: 156, responseHours: 6, initials: "PS",
    gradient: "linear-gradient(135deg,#F59E0B,#EC4899)", available: true,
  },
  {
    slug: "devon-kim",
    name: "Devon Kim",
    title: "Fractional CTO · Next.js + Stripe",
    location: "Remote (US/EU)",
    bio: "Ex-Stripe engineer who helps marketplaces scale from $0 to $1M ARR. Specializes in payments, vendor payouts, and infra-light architectures.",
    expertise: ["Next.js", "Stripe Connect", "Postgres", "Vercel"],
    hourlyCents: 32500, rating: 4.9, reviews: 91, responseHours: 12, initials: "DK",
    gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)", available: false,
  },
  {
    slug: "sasha-malik",
    name: "Sasha Malik",
    title: "Bookings & ops consultant",
    location: "Toronto, ON",
    bio: "I run the ops behind a 12-location wellness chain. Now helping solo and small-team owners design booking, intake, and review flows that scale.",
    expertise: ["Operations", "Cal.com / Calendly", "Intake forms", "Process design"],
    hourlyCents: 14500, rating: 4.8, reviews: 134, responseHours: 3, initials: "SM",
    gradient: "linear-gradient(135deg,#F472B6,#FBBF24)", available: true,
  },
  {
    slug: "aaron-woods",
    name: "Aaron Woods",
    title: "Paid acquisition lead",
    location: "Brooklyn, NY",
    bio: "$120M+ in profitable ad spend across Meta and Google. I help vendors who are stuck under $30k MRR break through to $100k+ profitably.",
    expertise: ["Meta Ads", "Google Ads", "Creative testing", "MMM"],
    hourlyCents: 27500, rating: 4.9, reviews: 203, responseHours: 8, initials: "AW",
    gradient: "linear-gradient(135deg,#06B6D4,#3B82F6)", available: true,
  },
];

export function getExpertBySlug(slug: string) {
  return experts.find((e) => e.slug === slug);
}
