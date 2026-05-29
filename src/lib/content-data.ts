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
    description: "A teardown of three Reach vendors who went from $0 to $10k MRR — and the 4 systems they all built first.",
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
    description: "Real teardowns of 5 top-converting Reach storefronts. What's universal, what's optional, and what's a trap.",
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
  { id: "p2", author: "Sasha M.", authorTitle: "Ops · Toronto",        initials: "SM", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)", postedAgo: "5h",  title: "Stripe Connect onboarding flow for first-time vendors?", body: "Reach's default handles 90% but I wanted to add a quick KYC reminder. Here's the template I'm using…", tags: ["stripe","onboarding"], replies: 12, likes: 41 },
  { id: "p3", author: "Devon K.", authorTitle: "Eng · Remote",         initials: "DK", gradient: "linear-gradient(135deg,#3B82F6,#10B981)", postedAgo: "1d",  title: "Bundling subscriptions + one-off services = real talk", body: "We doubled LTV by offering a small discount on monthly plans that include 2 in-person services per month. Here's the math…", tags: ["pricing","subscriptions","ltv"], replies: 31, likes: 112 },
  { id: "p4", author: "Lena P.", authorTitle: "Strategist · SF",       initials: "LP", gradient: "linear-gradient(135deg,#EC4899,#F59E0B)", postedAgo: "2d",  title: "Anyone running A/B tests on hourly vs. package pricing?",   body: "We tested $250/hr vs. 4-pack-for-$900. 4-packs increased average booking value 23% but reduced first-time conversions 8%.", tags: ["pricing","experiments"], replies: 18, likes: 60 },
  { id: "p5", author: "Priya S.", authorTitle: "Designer · London",    initials: "PS", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)", postedAgo: "3d",  title: "Sharing my hero section Figma library (free)",              body: "30 hero patterns from top-converting Reach storefronts. Drop the link below and I'll comment access for everyone.", tags: ["design","figma","freebies"], replies: 89, likes: 240 },
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

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readMin: number;
  gradient: string;
  body: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "meta-ads-on-autopilot",
    title: "Meta Ads on autopilot: how Reach runs Facebook & Instagram campaigns from one backend",
    excerpt: "How Reach plugs into the Meta Marketing API to launch, test, and scale Facebook + Instagram ad campaigns — hands-off, at an average 4.7x ROAS.",
    author: "Lena Park", date: "2026-05-22", category: "Meta Ads", readMin: 8,
    gradient: "linear-gradient(135deg,#1877F2,#00C6FF)",
    body: [
      { paragraphs: [
        "Most small businesses lose money on Meta ads for one reason: they set a campaign live and walk away. Winning on Facebook and Instagram in 2026 is about relentless iteration — and that's exactly the part humans hate doing. So Reach does it for you.",
        "When you connect Meta Suite Ads inside your Reach portal, we authenticate against the Meta Marketing API and take over the busywork: audience building, budget pacing, creative rotation, and reporting — all from one backend.",
      ]},
      { heading: "What the automation actually does", paragraphs: [
        "Every campaign Reach runs follows a disciplined test-and-scale loop, the same one agencies charge five figures a month for:",
      ], bullets: [
        "Builds lookalike + interest audiences from your existing customers",
        "Splits budget across 4–6 creative variants and kills losers automatically",
        "Shifts spend toward the best-performing placements in real time",
        "Pulls everything into a single ROAS dashboard in your portal",
      ]},
      { heading: "The result", paragraphs: [
        "Across Reach accounts, automated Meta campaigns average a 4.7x return on ad spend — and our clients spend roughly zero hours a week managing them. That's the whole point: you run your business, we run the ads.",
        "Start a free 7-day trial and connect Meta in about two minutes. $0 today.",
      ]},
    ],
  },
  {
    slug: "instagram-marketing-suite",
    title: "The Instagram marketing suite built into every Reach login",
    excerpt: "Scheduling, DM auto-replies, growth tracking, and shoppable content — the full Instagram toolkit, inside your Reach portal for every logged-in user.",
    author: "Priya Shah", date: "2026-05-16", category: "Instagram", readMin: 7,
    gradient: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)",
    body: [
      { paragraphs: [
        "Instagram is where discovery happens — but managing it well is a full-time job. Reach folds the entire Instagram marketing workflow into your portal so it stops eating your week.",
      ]},
      { heading: "Everything in one place", paragraphs: [
        "The moment you log in, your Instagram suite is live:",
      ], bullets: [
        "Schedule posts, carousels, and Reels weeks ahead",
        "Auto-reply to DMs and comments with on-brand answers",
        "Track follower growth, saves, and reach in real time",
        "Turn engagement straight into bookings and orders",
      ]},
      { heading: "Why it converts", paragraphs: [
        "Reach vendors see an average +182% lift in engagement within 60 days — not from posting more, but from posting smarter and never letting a DM go cold. Every reply is a chance to close, and the suite makes sure none slip through.",
        "It's included on every plan. Try it free for 7 days.",
      ]},
    ],
  },
  {
    slug: "whatsapp-catalog-commerce",
    title: "Sell inside the chat: WhatsApp catalog commerce with Reach",
    excerpt: "Sync your store catalog to the WhatsApp Business API and let customers browse and buy without leaving the conversation — connected to your Reach portal.",
    author: "Sasha Malik", date: "2026-05-10", category: "WhatsApp", readMin: 6,
    gradient: "linear-gradient(135deg,#25D366,#128C7E)",
    body: [
      { paragraphs: [
        "For a huge share of the world, WhatsApp *is* the internet. Reach meets your customers there: we connect your catalog to the WhatsApp Business API and wire it straight into your portal.",
      ]},
      { heading: "How it works", paragraphs: [
        "Your products sync automatically. Customers tap a product in chat, ask a question, and check out — all inside WhatsApp. Orders flow back into your Reach dashboard like any other channel.",
      ], bullets: [
        "One-click catalog sync from your Reach storefront",
        "Automated replies for pricing, stock, and delivery questions",
        "Checkout links that settle to your bank",
        "63% average reply rate — far above email",
      ]},
      { heading: "Why it matters", paragraphs: [
        "Conversational commerce removes the single biggest drop-off in online selling: leaving to 'go check the website.' When the store lives in the chat, the sale happens in the chat.",
      ]},
    ],
  },
  {
    slug: "pinterest-tiktok-growth-engine",
    title: "Pinterest + TikTok: the visual growth engine, managed end to end",
    excerpt: "Rich pins, shopping boards, Spark Ads, and TikTok API setup — how Reach turns the two fastest visual platforms into a predictable traffic source.",
    author: "Aaron Woods", date: "2026-05-03", category: "Pinterest & TikTok", readMin: 9,
    gradient: "linear-gradient(135deg,#E60023,#FE2C55)",
    body: [
      { paragraphs: [
        "Pinterest and TikTok reward consistency and trend-awareness — two things that are brutal to sustain by hand. Reach manages both from setup to scale.",
      ]},
      { heading: "Pinterest Business", paragraphs: [
        "We wire your Pinterest business suite into Reach: publish rich pins, build shopping boards, and track conversions. Pinterest's intent-driven audience routinely delivers 8M+ monthly reach for active Reach accounts.",
      ]},
      { heading: "TikTok API", paragraphs: [
        "TikTok is where trends become traffic — if you can keep up. Reach handles the API setup, content scheduling, Spark Ads, and shop integration so you ride trends instead of chasing them.",
      ], bullets: [
        "Done-for-you TikTok API + shop setup",
        "Trend-aware scheduling and Spark Ads",
        "12M+ video views across active accounts",
        "One dashboard for both platforms",
      ]},
      { heading: "Together", paragraphs: [
        "Run as a pair, Pinterest and TikTok cover both ends of the funnel — discovery and desire. Reach keeps them both fed without adding a single hour to your week.",
      ]},
    ],
  },
  {
    slug: "agentic-commerce-ai-and-seo",
    title: "Agentic-commerce AI + auto-SEO: your storefront that sells and ranks itself",
    excerpt: "Inside Reach's agentic-commerce AI, autopilot shop runs, and automatic SEO + competitor analysis — the engine that grows your store while you sleep.",
    author: "Marcus Reyes", date: "2026-04-26", category: "AI & SEO", readMin: 10,
    gradient: "linear-gradient(135deg,#7C3AED,#2563EB)",
    body: [
      { paragraphs: [
        "The most exciting part of Reach isn't any single channel — it's the AI layer underneath that makes the whole thing run itself.",
      ]},
      { heading: "Agentic-commerce AI", paragraphs: [
        "Reach connects to agentic-commerce AI that answers customer questions, recommends products, and closes sales 24/7. It behaves like your best salesperson — one who never sleeps and remembers every product detail.",
      ]},
      { heading: "Autopilot shop run", paragraphs: [
        "Inventory, pricing, restock alerts, and promotions adjust themselves based on demand. Your storefront operates on autopilot while you focus on the parts of the business only you can do.",
      ]},
      { heading: "Auto-SEO + competitor analysis", paragraphs: [
        "Reach continuously diagnoses your site, surfaces keyword wins, and tears down what your competitors rank for — then acts on it. SEO stops being a quarterly project and becomes a background process.",
      ], bullets: [
        "Automatic site health + speed diagnosis",
        "Keyword gap + competitor teardown reports",
        "Content and metadata suggestions, applied for you",
        "Built-in payments so the sales it drives actually close",
      ]},
      { heading: "The whole point", paragraphs: [
        "One subscription replaces an entire growth team. Start free for 7 days and watch it work — $0 due today.",
      ]},
    ],
  },
];
