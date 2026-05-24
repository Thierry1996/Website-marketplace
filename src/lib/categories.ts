import {
  Shirt, Sparkles, Heart, Dumbbell, Pizza, Scissors,
  Stethoscope, Brush, ShoppingBag, Calculator, Code,
  Briefcase, GraduationCap, Calendar, Users,
} from "lucide-react";

export interface CategoryEntry {
  slug: string;
  name: string;
  icon: typeof Shirt;
  description: string;
  gradient: string;
  listingFilter?: string; // matches Listing.category
}

export const categories: CategoryEntry[] = [
  { slug: "fashion",     name: "Fashion & Apparel",        icon: Shirt,         description: "Boutique storefronts, lookbooks, and Shopify-ready templates.",          gradient: "linear-gradient(135deg,#EC4899,#F59E0B)", listingFilter: "Fashion" },
  { slug: "beauty",      name: "Beauty & Cosmetics",       icon: Sparkles,      description: "Salons, makeup brands, and skincare storefronts that convert.",          gradient: "linear-gradient(135deg,#F472B6,#8B5CF6)", listingFilter: "Beauty" },
  { slug: "wellness",    name: "Spa & Wellness",           icon: Heart,         description: "Spa booking, treatment menus, and wellness package builders.",           gradient: "linear-gradient(135deg,#22D3EE,#A78BFA)", listingFilter: "Wellness" },
  { slug: "food",        name: "Restaurant & Food",        icon: Pizza,         description: "Online ordering, table reservations, and ghost kitchens.",                gradient: "linear-gradient(135deg,#F59E0B,#EF4444)", listingFilter: "Food" },
  { slug: "salon",       name: "Hair Stylist & Salon",     icon: Scissors,      description: "Stylist portfolios with bookings, gallery, and prepay deposits.",         gradient: "linear-gradient(135deg,#F472B6,#FBBF24)", listingFilter: "Salon" },
  { slug: "fitness",     name: "Fitness & Gym",            icon: Dumbbell,      description: "Class scheduling, coaching subscriptions, and gym membership tools.",     gradient: "linear-gradient(135deg,#3B82F6,#10B981)", listingFilter: "Fitness" },
  { slug: "health",      name: "Health & Booking",         icon: Stethoscope,   description: "Clinic appointments, telehealth intake, and patient portals.",            gradient: "linear-gradient(135deg,#06B6D4,#8B5CF6)" },
  { slug: "cleaning",    name: "House Cleaning Services",  icon: Brush,         description: "Quote builders, recurring service plans, and dispatch dashboards.",      gradient: "linear-gradient(135deg,#10B981,#06B6D4)", listingFilter: "Services" },
  { slug: "ecommerce",   name: "General E-commerce",       icon: ShoppingBag,   description: "Product catalogs, dropshipping starters, and subscription boxes.",        gradient: "linear-gradient(135deg,#EF4444,#F59E0B)", listingFilter: "E-commerce" },
  { slug: "accounting",  name: "Accounting & Bookkeeping", icon: Calculator,    description: "Client portals, intake forms, and bookkeeping engagement letters.",       gradient: "linear-gradient(135deg,#475569,#0EA5E9)", listingFilter: "Consulting" },
  { slug: "digital",     name: "Digital & Freelance",      icon: Code,          description: "Portfolios, productized services, and freelance funnels.",                 gradient: "linear-gradient(135deg,#F59E0B,#8B5CF6)", listingFilter: "Digital" },
  { slug: "consulting",  name: "Consulting",               icon: Briefcase,     description: "Discovery calls, proposal builders, and retainer subscriptions.",          gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)", listingFilter: "Consulting" },
  { slug: "education",   name: "Education & Coaching",     icon: GraduationCap, description: "Course delivery, cohort management, and replay libraries.",                gradient: "linear-gradient(135deg,#22D3EE,#10B981)", listingFilter: "Education" },
  { slug: "events",      name: "Events & Webinars",        icon: Calendar,      description: "Live event signups, replay catalogs, and speaker management.",              gradient: "linear-gradient(135deg,#A78BFA,#34D399)" },
  { slug: "community",   name: "Community & Membership",   icon: Users,         description: "Membership tiers, forum boards, and gated content access.",                 gradient: "linear-gradient(135deg,#FBBF24,#34D399)" },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
