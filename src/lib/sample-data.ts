import type { Listing } from "@/components/marketing/listing-card";
import type { Testimonial } from "@/components/marketing/testimonial-card";
import type { PricingPlan } from "@/components/marketing/pricing-card";

export const trustedBrands = [
  "Shopify", "Stripe", "Notion", "Linear", "Vercel", "Figma", "Webflow", "Cloudflare",
];

export const featuredListings: Listing[] = [
  {
    id: "1",
    title: "Premium Beauty Salon Booking Platform",
    vendor: "Studio Lumière",
    category: "Beauty",
    priceCents: 4900,
    rating: 4.9,
    reviewCount: 234,
    location: "New York",
    badge: "BESTSELLER",
    gradient: "linear-gradient(135deg,#10B981 0%,#8B5CF6 100%)",
  },
  {
    id: "2",
    title: "Yoga & Wellness Studio Storefront",
    vendor: "Zen Collective",
    category: "Wellness",
    priceCents: 3900,
    rating: 4.8,
    reviewCount: 156,
    location: "Austin",
    badge: "NEW",
    gradient: "linear-gradient(135deg,#8B5CF6 0%,#F59E0B 100%)",
  },
  {
    id: "3",
    title: "Restaurant Online Ordering Template",
    vendor: "Fresh Bite Co.",
    category: "Food",
    priceCents: 5900,
    rating: 4.7,
    reviewCount: 412,
    location: "Chicago",
    badge: "FEATURED",
    gradient: "linear-gradient(135deg,#F59E0B 0%,#EF4444 100%)",
  },
  {
    id: "4",
    title: "Fitness Coaching & Class Booking",
    vendor: "PowerHouse Gym",
    category: "Fitness",
    priceCents: 6900,
    rating: 4.9,
    reviewCount: 178,
    location: "Miami",
    gradient: "linear-gradient(135deg,#3B82F6 0%,#10B981 100%)",
  },
  {
    id: "5",
    title: "Cleaning Service Marketplace Bundle",
    vendor: "Pristine Pros",
    category: "Services",
    priceCents: 3500,
    rating: 4.6,
    reviewCount: 92,
    location: "Seattle",
    gradient: "linear-gradient(135deg,#06B6D4 0%,#8B5CF6 100%)",
  },
  {
    id: "6",
    title: "Marketing Agency Client Portal",
    vendor: "Northwind Studio",
    category: "Digital",
    priceCents: 7900,
    rating: 4.8,
    reviewCount: 67,
    location: "Remote",
    badge: "NEW",
    gradient: "linear-gradient(135deg,#F59E0B 0%,#8B5CF6 100%)",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Monique Tomas",
    role: "Owner, Studio Lumière",
    body: "I launched my beauty salon booking site in one afternoon. Reach's templates feel like they were custom-built — my clients constantly compliment the experience.",
    rating: 5,
    avatarGradient: "linear-gradient(135deg,#10B981,#8B5CF6)",
  },
  {
    name: "James Rivera",
    role: "Founder, PowerHouse Gym",
    body: "We went from a Google Form to a fully booked schedule in three weeks. The marketplace exposure alone paid for the platform 10x over.",
    rating: 5,
    avatarGradient: "linear-gradient(135deg,#3B82F6,#10B981)",
  },
  {
    name: "Priya Shah",
    role: "Freelance Brand Designer",
    body: "I've used Reach for six client projects this year. Quality is consistently world-class and customizing for each brand takes hours, not weeks.",
    rating: 5,
    avatarGradient: "linear-gradient(135deg,#F59E0B,#EF4444)",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "STARTER",
    description: "Perfect for launching your first storefront",
    priceCents: 2900,
    period: "one-time",
    cta: "Get started",
    href: "/sign-up?plan=starter",
    features: [
      { label: "1 Template License", included: true },
      { label: "Lifetime updates", included: true },
      { label: "Email support", included: true },
      { label: "Commercial use", included: true },
      { label: "Source files included", included: false },
      { label: "White-label rights", included: false },
    ],
  },
  {
    name: "PRO",
    description: "Best for growing businesses",
    priceCents: 7900,
    period: "one-time",
    cta: "Get Pro access",
    href: "/sign-up?plan=pro",
    featured: true,
    badge: "Most popular",
    features: [
      { label: "5 Template licenses", included: true },
      { label: "Lifetime updates", included: true },
      { label: "Priority support", included: true },
      { label: "Commercial use", included: true },
      { label: "Source files included", included: true },
      { label: "White-label rights", included: false },
    ],
  },
  {
    name: "STUDIO",
    description: "Unlimited access for agencies",
    priceCents: 14900,
    period: "per year",
    cta: "Join Studio",
    href: "/sign-up?plan=studio",
    features: [
      { label: "Unlimited templates", included: true },
      { label: "Lifetime updates", included: true },
      { label: "24/7 priority support", included: true },
      { label: "Commercial use", included: true },
      { label: "Source files included", included: true },
      { label: "White-label rights", included: true },
    ],
  },
];

export const marketplaceListings: Listing[] = [
  ...featuredListings,
  { id: "7",  title: "Subscription Box Storefront Template",   vendor: "BoxCraft Studio",  category: "E-commerce", priceCents: 4900, rating: 4.7, reviewCount: 121, location: "Remote",       gradient: "linear-gradient(135deg,#EC4899 0%,#F59E0B 100%)" },
  { id: "8",  title: "Local Service Booking Pro",              vendor: "BookFlow",         category: "Services",   priceCents: 5500, rating: 4.6, reviewCount: 86,  location: "Denver",       badge: "NEW",        gradient: "linear-gradient(135deg,#06B6D4 0%,#3B82F6 100%)" },
  { id: "9",  title: "Yoga Studio Class Schedule Builder",     vendor: "FlowYoga",         category: "Wellness",   priceCents: 3500, rating: 4.9, reviewCount: 203, location: "San Diego",                          gradient: "linear-gradient(135deg,#A78BFA 0%,#34D399 100%)" },
  { id: "10", title: "Hair Salon Pro Template Bundle",         vendor: "Salon Atelier",    category: "Beauty",     priceCents: 4500, rating: 4.8, reviewCount: 148, location: "Los Angeles",                        gradient: "linear-gradient(135deg,#F472B6 0%,#FBBF24 100%)" },
  { id: "11", title: "Online Coaching Course Builder",         vendor: "CoachStack",       category: "Education",  priceCents: 7900, rating: 4.7, reviewCount: 78,  location: "Remote",       badge: "FEATURED",   gradient: "linear-gradient(135deg,#22D3EE 0%,#A78BFA 100%)" },
  { id: "12", title: "Pet Daycare Reservation System",         vendor: "Pawsh",            category: "Services",   priceCents: 3900, rating: 4.5, reviewCount: 54,                                                  gradient: "linear-gradient(135deg,#FBBF24 0%,#34D399 100%)" },
  { id: "13", title: "Bookkeeping Client Portal",              vendor: "LedgerStudio",     category: "Consulting", priceCents: 6900, rating: 4.6, reviewCount: 41,                                                  gradient: "linear-gradient(135deg,#475569 0%,#0EA5E9 100%)" },
  { id: "14", title: "Dropshipping Storefront Starter",        vendor: "ShipFast",         category: "E-commerce", priceCents: 2900, rating: 4.4, reviewCount: 312, location: "Remote",                              gradient: "linear-gradient(135deg,#EF4444 0%,#F59E0B 100%)" },
  { id: "15", title: "Cleaning Service Quote Builder",         vendor: "Spotless Pro",     category: "Services",   priceCents: 4200, rating: 4.7, reviewCount: 99,                                                   gradient: "linear-gradient(135deg,#10B981 0%,#06B6D4 100%)" },
  { id: "16", title: "Laundry & Pickup Tracker",               vendor: "FreshFold",        category: "Services",   priceCents: 3600, rating: 4.5, reviewCount: 67,                                                   gradient: "linear-gradient(135deg,#8B5CF6 0%,#06B6D4 100%)" },
  { id: "17", title: "Grocery Delivery Storefront",            vendor: "Larder Local",     category: "Food",       priceCents: 5800, rating: 4.6, reviewCount: 112, location: "Brooklyn",     badge: "NEW",         gradient: "linear-gradient(135deg,#84CC16 0%,#10B981 100%)" },
  { id: "18", title: "Funnel Builder Templates Pack",          vendor: "FunnelForge",      category: "Digital",    priceCents: 7900, rating: 4.8, reviewCount: 156, location: "Remote",       badge: "BESTSELLER",  gradient: "linear-gradient(135deg,#F59E0B 0%,#EC4899 100%)" },
];

export const marketplaceCategories = [
  "All", "E-commerce", "Beauty", "Wellness", "Food", "Fitness", "Services", "Digital", "Consulting", "Education",
] as const;

export const stats = [
  { value: "10,000+", label: "Active vendors" },
  { value: "120K",    label: "Monthly buyers" },
  { value: "$42M",    label: "Vendor revenue" },
  { value: "4.9 ★",   label: "Customer rating" },
];
