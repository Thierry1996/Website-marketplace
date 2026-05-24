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
    body: "I launched my beauty salon booking site in one afternoon. Marketly's templates feel like they were custom-built — my clients constantly compliment the experience.",
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
    body: "I've used Marketly for six client projects this year. Quality is consistently world-class and customizing for each brand takes hours, not weeks.",
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

export const stats = [
  { value: "10,000+", label: "Active vendors" },
  { value: "120K",    label: "Monthly buyers" },
  { value: "$42M",    label: "Vendor revenue" },
  { value: "4.9 ★",   label: "Customer rating" },
];
