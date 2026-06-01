import {
  LayoutDashboard, ShoppingBag, Calendar, Heart, MessageSquare,
  CreditCard, Settings, Package, Sparkles, BarChart3,
  Users, Building2, Banknote, ShieldCheck, FileText,
  Store, Code2, Megaphone, Wand2,
} from "lucide-react";

export type DashRole = "user" | "vendor" | "admin";

export interface DashNavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

export interface DashNavGroup {
  heading?: string;
  items: DashNavItem[];
}

export const userDashNav: DashNavGroup[] = [
  {
    items: [
      { label: "Overview",      href: "/dashboard",              icon: LayoutDashboard },
      { label: "Site analyzer", href: "/dashboard/analyzer",     icon: Wand2, badge: "AI" },
      { label: "Campaigns",     href: "/dashboard/campaigns",    icon: Megaphone },
      { label: "Orders",        href: "/dashboard/orders",       icon: ShoppingBag },
      { label: "Bookings",      href: "/dashboard/bookings",     icon: Calendar },
      { label: "Wishlist",      href: "/dashboard/wishlist",     icon: Heart },
      { label: "Messages",      href: "/dashboard/messages",     icon: MessageSquare, badge: "3" },
    ],
  },
  {
    heading: "Marketplace",
    items: [
      { label: "Browse marketplace", href: "/marketplace",       icon: Store, badge: "Add-on" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Subscription",  href: "/dashboard/subscription", icon: CreditCard },
      { label: "Settings",      href: "/dashboard/settings",     icon: Settings },
    ],
  },
];

export const vendorDashNav: DashNavGroup[] = [
  {
    items: [
      { label: "Overview",       href: "/vendor",            icon: LayoutDashboard },
      { label: "Analytics",      href: "/vendor/analytics",  icon: BarChart3 },
    ],
  },
  {
    heading: "Catalog",
    items: [
      { label: "Listings",       href: "/vendor/listings",     icon: Package },
      { label: "Services",       href: "/vendor/services",     icon: Sparkles },
      { label: "Code submissions",href: "/vendor/submissions", icon: Code2, badge: "New" },
    ],
  },
  {
    heading: "Customers",
    items: [
      { label: "Bookings",       href: "/vendor/bookings",   icon: Calendar },
      { label: "Customers",      href: "/vendor/customers",  icon: Users },
    ],
  },
  {
    heading: "Payments",
    items: [
      { label: "Payouts",        href: "/vendor/payouts",    icon: Banknote },
      { label: "Settings",       href: "/vendor/settings",   icon: Settings },
    ],
  },
];

export const adminDashNav: DashNavGroup[] = [
  {
    items: [
      { label: "Overview",       href: "/admin",             icon: LayoutDashboard },
    ],
  },
  {
    heading: "Marketplace",
    items: [
      { label: "Vendors",        href: "/admin/vendors",     icon: Building2,    badge: "12" },
      { label: "Listings",       href: "/admin/listings",    icon: Package },
      { label: "Users",          href: "/admin/users",       icon: Users },
    ],
  },
  {
    heading: "Operations",
    items: [
      { label: "Payments",       href: "/admin/payments",     icon: CreditCard },
      { label: "Site reports",   href: "/admin/site-reports", icon: Wand2, badge: "AI" },
      { label: "Reports",        href: "/admin/reports",      icon: FileText },
      { label: "Moderation",     href: "/admin/moderation",   icon: ShieldCheck },
    ],
  },
];

export function navFor(role: DashRole): DashNavGroup[] {
  return role === "vendor" ? vendorDashNav : role === "admin" ? adminDashNav : userDashNav;
}
