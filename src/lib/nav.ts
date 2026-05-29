import {
  ShoppingBag, Calendar, Users, Briefcase, GraduationCap,
  Sparkles, Heart, Dumbbell, Pizza, Scissors, Stethoscope,
  Brush, Shirt, Calculator, Code,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: typeof ShoppingBag;
};

export type NavSection = { heading: string; items: NavItem[] };

export const mainNav: { label: string; href: string; sections?: NavSection[] }[] = [
  {
    label: "Marketplace",
    href: "/marketplace",
    sections: [
      {
        heading: "Shop",
        items: [
          { label: "All listings",    href: "/marketplace",        description: "Browse 1,000+ vendors", icon: ShoppingBag },
          { label: "Featured vendors",href: "/marketplace/featured", description: "Top-rated this week", icon: Sparkles },
          { label: "Categories",      href: "/categories",         description: "12+ industries",       icon: Briefcase },
        ],
      },
      {
        heading: "Discover",
        items: [
          { label: "Services",        href: "/services",  description: "Book a pro",        icon: Calendar },
          { label: "Experts",         href: "/experts",   description: "1-on-1 consults",   icon: Users },
          { label: "Webinars",        href: "/webinars",  description: "Learn live",        icon: GraduationCap },
        ],
      },
    ],
  },
  { label: "Experts",   href: "/experts" },
  { label: "Webinars",  href: "/webinars" },
  { label: "Community", href: "/community" },
  { label: "Pricing",   href: "/pricing" },
];

export const featuredCategories: NavItem[] = [
  { label: "Fashion & Apparel",      href: "/categories/fashion",     icon: Shirt },
  { label: "Beauty & Cosmetics",     href: "/categories/beauty",      icon: Sparkles },
  { label: "Health & Wellness",      href: "/categories/health",      icon: Heart },
  { label: "Fitness & Sport",        href: "/categories/fitness",     icon: Dumbbell },
  { label: "Restaurant & Food",      href: "/categories/food",        icon: Pizza },
  { label: "Hair Stylist & Salon",   href: "/categories/salon",       icon: Scissors },
  { label: "Spa & Booking",          href: "/categories/spa",         icon: Stethoscope },
  { label: "House Cleaning",         href: "/categories/cleaning",    icon: Brush },
  { label: "Accounting",             href: "/categories/accounting",  icon: Calculator },
  { label: "Digital & Freelance",    href: "/categories/digital",     icon: Code },
  { label: "Consulting",             href: "/categories/consulting",  icon: Briefcase },
  { label: "Education",              href: "/categories/education",   icon: GraduationCap },
];

export const footerSections = [
  {
    heading: "Marketplace",
    links: [
      { label: "Browse listings",    href: "/marketplace" },
      { label: "Featured vendors",   href: "/marketplace/featured" },
      { label: "Categories",         href: "/categories" },
      { label: "Services",           href: "/services" },
      { label: "Experts",            href: "/experts" },
    ],
  },
  {
    heading: "For vendors",
    links: [
      { label: "Sell on Reach",   href: "/sell" },
      { label: "Vendor pricing",     href: "/pricing#vendors" },
      { label: "Vendor dashboard",   href: "/vendor" },
      { label: "Stripe payouts",     href: "/docs/payouts" },
      { label: "Affiliate program",  href: "/affiliates" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Webinars",          href: "/webinars" },
      { label: "Community",         href: "/community" },
      { label: "Blog",              href: "/blog" },
      { label: "FAQ",               href: "/faq" },
      { label: "Hire an expert",    href: "/hire-an-expert" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us",          href: "/about" },
      { label: "Contact",           href: "/contact" },
      { label: "Hire me",           href: "/hire-me" },
      { label: "Press kit",         href: "/press" },
      { label: "Careers",           href: "/careers" },
    ],
  },
];
