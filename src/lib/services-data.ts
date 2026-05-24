export interface ServiceEntry {
  slug: string;
  title: string;
  provider: string;
  category: string;
  description: string;
  durationMin: number;
  priceCents: number;
  rating: number;
  reviews: number;
  location?: string;
  gradient: string;
}

export const services: ServiceEntry[] = [
  { slug: "deep-tissue-massage-90",       title: "Deep Tissue Massage · 90 min",   provider: "Zen Collective",      category: "Wellness", description: "Targeted full-body deep tissue with a licensed therapist. Includes consultation, hot stone option, and aftercare guide.", durationMin: 90, priceCents: 14900, rating: 4.9, reviews: 212, location: "Austin",     gradient: "linear-gradient(135deg,#8B5CF6,#F59E0B)" },
  { slug: "1-on-1-fitness-coaching",      title: "1-on-1 Fitness Coaching Session",provider: "PowerHouse Gym",      category: "Fitness",  description: "Personalized strength + conditioning session with a certified trainer. Custom plan emailed after.",                                durationMin: 60, priceCents: 9900,  rating: 4.9, reviews: 178, location: "Miami",      gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { slug: "full-beauty-makeover",         title: "Full Beauty Makeover Package",   provider: "Studio Lumière",      category: "Beauty",   description: "Hair, makeup, and skincare consult — perfect for events or a full glow-up.",                                                       durationMin: 120,priceCents: 24900, rating: 4.8, reviews: 145, location: "New York",   gradient: "linear-gradient(135deg,#EC4899,#F59E0B)" },
  { slug: "private-yoga-class",           title: "Private Yoga Class",             provider: "FlowYoga",            category: "Wellness", description: "Tailored one-on-one yoga in-studio or in-home. Beginner-friendly.",                                                                  durationMin: 60, priceCents: 7900,  rating: 4.9, reviews: 89,  location: "San Diego",  gradient: "linear-gradient(135deg,#A78BFA,#34D399)" },
  { slug: "deep-clean-3br-home",          title: "Deep Clean · Up to 3BR Home",    provider: "Pristine Pros",       category: "Services", description: "Top-to-bottom deep clean: kitchen, bathrooms, baseboards, windows. Eco-friendly products.",                                          durationMin: 180,priceCents: 18900, rating: 4.6, reviews: 92,  location: "Seattle",    gradient: "linear-gradient(135deg,#10B981,#06B6D4)" },
  { slug: "personalized-meal-plan",       title: "Personalized 4-Week Meal Plan",  provider: "Fresh Bite Co.",      category: "Food",     description: "Custom 28-day plan with shopping lists, prep guides, and substitutions. Includes a 30-min consult.",                                  durationMin: 30, priceCents: 5900,  rating: 4.7, reviews: 156,                          gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { slug: "marketing-strategy-audit",     title: "Marketing Strategy Audit",       provider: "Northwind Studio",    category: "Digital",  description: "60-min strategy call + written audit with actionable next steps for your funnel.",                                                      durationMin: 60, priceCents: 19900, rating: 4.8, reviews: 67,  location: "Remote",     gradient: "linear-gradient(135deg,#F59E0B,#8B5CF6)" },
  { slug: "bookkeeping-monthly",          title: "Monthly Bookkeeping Retainer",   provider: "LedgerStudio",        category: "Consulting", description: "Categorization, reconciliation, monthly close, and a 30-min review call.",                                                              durationMin: 30, priceCents: 29900, rating: 4.7, reviews: 41,  location: "Remote",    gradient: "linear-gradient(135deg,#475569,#0EA5E9)" },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
