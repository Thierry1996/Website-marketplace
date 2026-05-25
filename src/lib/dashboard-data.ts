// Sample data used to render dashboards before real DB / Stripe / Clerk are wired.
// Every record matches the shape we'll fetch via Prisma later, so swapping in real
// data is a one-line change per page.

export interface OrderRecord {
  id: string;
  vendor: string;
  item: string;
  totalCents: number;
  status: "pending" | "paid" | "fulfilled" | "refunded";
  placedAt: string;
}

export const sampleOrders: OrderRecord[] = [
  { id: "ORD-3947", vendor: "Studio Lumière",    item: "Luxe Boutique Template",     totalCents: 4900,  status: "fulfilled", placedAt: "2026-05-21" },
  { id: "ORD-3946", vendor: "PowerHouse Gym",    item: "PowerHouse Coaching Bundle", totalCents: 9900,  status: "paid",      placedAt: "2026-05-19" },
  { id: "ORD-3935", vendor: "FreshBite Co.",     item: "Restaurant Order Template",  totalCents: 5900,  status: "fulfilled", placedAt: "2026-05-12" },
  { id: "ORD-3920", vendor: "FlowYoga",          item: "Class Schedule Builder",     totalCents: 3500,  status: "refunded",  placedAt: "2026-05-04" },
  { id: "ORD-3911", vendor: "Northwind Studio",  item: "Marketing Strategy Audit",   totalCents: 19900, status: "fulfilled", placedAt: "2026-04-29" },
];

export interface BookingRecord {
  id: string;
  service: string;
  provider: string;
  at: string;
  durationMin: number;
  status: "upcoming" | "completed" | "cancelled";
  gradient: string;
}

export const sampleBookings: BookingRecord[] = [
  { id: "BKG-5821", service: "Deep Tissue Massage · 90 min",   provider: "Zen Collective",  at: "2026-05-29T16:30:00Z", durationMin: 90, status: "upcoming", gradient: "linear-gradient(135deg,#8B5CF6,#F59E0B)" },
  { id: "BKG-5819", service: "1-on-1 Fitness Coaching",        provider: "PowerHouse Gym",  at: "2026-05-31T13:00:00Z", durationMin: 60, status: "upcoming", gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { id: "BKG-5780", service: "Marketing Strategy Audit",       provider: "Northwind Studio",at: "2026-05-12T15:00:00Z", durationMin: 60, status: "completed",gradient: "linear-gradient(135deg,#F59E0B,#8B5CF6)" },
  { id: "BKG-5751", service: "Private Yoga Class",             provider: "FlowYoga",        at: "2026-04-22T11:00:00Z", durationMin: 60, status: "completed",gradient: "linear-gradient(135deg,#A78BFA,#34D399)" },
];

export interface MessageThread {
  id: string;
  partner: string;
  role: string;
  preview: string;
  unread: number;
  lastAt: string;
  initials: string;
  gradient: string;
}

export const sampleMessages: MessageThread[] = [
  { id: "M1", partner: "Studio Lumière",  role: "Vendor",   preview: "Hey! Quick update — your booking confirmation just went out, looking forward to Friday.",                                                                  unread: 2, lastAt: "12m",  initials: "SL", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { id: "M2", partner: "PowerHouse Gym",  role: "Vendor",   preview: "Just wrapped your custom 4-week plan — let me know if you'd like to adjust anything before our next session.",                                            unread: 0, lastAt: "2h",   initials: "PG", gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { id: "M3", partner: "Lena Park",       role: "Expert",   preview: "Thanks for the brief! I'll have your funnel teardown back by end of day Thursday.",                                                                          unread: 1, lastAt: "1d",   initials: "LP", gradient: "linear-gradient(135deg,#EC4899,#F59E0B)" },
  { id: "M4", partner: "Marketly Support",role: "Platform", preview: "Reminder: your subscription renews on June 1st. Update your payment method if needed.",                                                                      unread: 0, lastAt: "3d",   initials: "MS", gradient: "linear-gradient(135deg,#6B7280,#9CA3AF)" },
];

// -----------------------------------------------------------------------------
// Vendor data
// -----------------------------------------------------------------------------

export interface VendorListingRow {
  id: string;
  title: string;
  type: "Template" | "Service" | "Bundle";
  status: "Published" | "Draft" | "Archived";
  priceCents: number;
  sales: number;
  rating: number;
  views30d: number;
}

export const vendorListings: VendorListingRow[] = [
  { id: "L-4521", title: "Premium Beauty Salon Booking Platform", type: "Template", status: "Published", priceCents: 4900,  sales: 234, rating: 4.9, views30d: 4_212 },
  { id: "L-4519", title: "Glow Studio Storefront",                type: "Template", status: "Published", priceCents: 4900,  sales: 89,  rating: 4.8, views30d: 1_823 },
  { id: "L-4488", title: "Salon Membership Subscription Bundle",  type: "Bundle",   status: "Published", priceCents: 12900, sales: 47,  rating: 4.9, views30d: 980 },
  { id: "L-4471", title: "Glow Studio · Express Edition",         type: "Template", status: "Draft",     priceCents: 2900,  sales: 0,   rating: 0,   views30d: 12 },
  { id: "L-4399", title: "Hair Pro Template (Legacy)",            type: "Template", status: "Archived",  priceCents: 3500,  sales: 312, rating: 4.7, views30d: 0 },
];

export interface VendorBookingRow {
  id: string;
  customer: string;
  service: string;
  at: string;
  status: "Requested" | "Confirmed" | "Completed" | "Cancelled";
  initials: string;
  gradient: string;
  totalCents: number;
}

export const vendorBookings: VendorBookingRow[] = [
  { id: "B-9128", customer: "Aaron W.",  service: "Full Beauty Makeover",      at: "2026-05-29T17:00:00Z", status: "Confirmed", initials: "AW", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)", totalCents: 24900 },
  { id: "B-9127", customer: "Sasha M.",  service: "Hair Color & Treatment",    at: "2026-05-29T14:30:00Z", status: "Confirmed", initials: "SM", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)", totalCents: 18500 },
  { id: "B-9126", customer: "Devon K.",  service: "Bridal Makeup Trial",       at: "2026-05-30T10:00:00Z", status: "Requested", initials: "DK", gradient: "linear-gradient(135deg,#3B82F6,#10B981)", totalCents: 21000 },
  { id: "B-9120", customer: "Priya S.",  service: "Skincare Consultation",     at: "2026-05-24T15:30:00Z", status: "Completed", initials: "PS", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)", totalCents:  9500 },
  { id: "B-9118", customer: "Jordan B.", service: "Full Beauty Makeover",      at: "2026-05-22T13:00:00Z", status: "Completed", initials: "JB", gradient: "linear-gradient(135deg,#06B6D4,#3B82F6)", totalCents: 24900 },
];

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  totalSpentCents: number;
  bookings: number;
  joinedAt: string;
  initials: string;
  gradient: string;
}

export const vendorCustomers: CustomerRecord[] = [
  { id: "C-201", name: "Aaron Woods",   email: "aaron@northwind.studio", totalSpentCents: 124900, bookings: 6, joinedAt: "2025-09-04", initials: "AW", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { id: "C-198", name: "Sasha Malik",   email: "sasha@bookflow.co",      totalSpentCents:  84500, bookings: 4, joinedAt: "2025-10-12", initials: "SM", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { id: "C-187", name: "Devon Kim",     email: "devon@stripe.dev",       totalSpentCents:  60000, bookings: 3, joinedAt: "2025-11-30", initials: "DK", gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { id: "C-176", name: "Priya Shah",    email: "priya@studio.london",    totalSpentCents:  29500, bookings: 2, joinedAt: "2026-01-19", initials: "PS", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)" },
  { id: "C-165", name: "Jordan Banks",  email: "jordan@salonbanks.com",  totalSpentCents:  74700, bookings: 3, joinedAt: "2026-02-08", initials: "JB", gradient: "linear-gradient(135deg,#06B6D4,#3B82F6)" },
  { id: "C-154", name: "Halima Razak",  email: "halima@yogaflow.ng",     totalSpentCents:  19800, bookings: 1, joinedAt: "2026-03-25", initials: "HR", gradient: "linear-gradient(135deg,#A78BFA,#34D399)" },
];

export interface PayoutRow {
  id: string;
  date: string;
  amountCents: number;
  status: "Paid" | "Pending" | "In transit";
  reference: string;
}

export const vendorPayouts: PayoutRow[] = [
  { id: "PO-7240", date: "2026-05-22", amountCents:  98_400, status: "Paid",       reference: "Stripe payout #PO-7240" },
  { id: "PO-7239", date: "2026-05-15", amountCents: 124_900, status: "Paid",       reference: "Stripe payout #PO-7239" },
  { id: "PO-7232", date: "2026-05-08", amountCents:  78_500, status: "Paid",       reference: "Stripe payout #PO-7232" },
  { id: "PO-7228", date: "2026-05-25", amountCents:  41_200, status: "In transit", reference: "Stripe payout #PO-7228" },
  { id: "PO-7225", date: "2026-05-26", amountCents:  18_700, status: "Pending",    reference: "Stripe payout #PO-7225" },
];

export interface DailyPoint { date: string; value: number; }

export const vendorRevenue30d: DailyPoint[] = [
  3200, 2800, 3600, 4100, 3900, 3300, 2900, 3500, 4200, 4800,
  4100, 3700, 4400, 5100, 5400, 4900, 4600, 5300, 5800, 6100,
  5500, 5700, 6300, 6800, 6500, 6100, 6700, 7200, 7600, 7900,
].map((value, i) => ({ date: `D-${30 - i}`, value }));

export const vendorBookings30d: DailyPoint[] = [
  3, 5, 4, 7, 6, 4, 3, 5, 8, 9,
  7, 6, 8, 11, 10, 8, 9, 11, 13, 14,
  12, 13, 15, 17, 16, 14, 17, 19, 21, 22,
].map((value, i) => ({ date: `D-${30 - i}`, value }));

// -----------------------------------------------------------------------------
// Admin data
// -----------------------------------------------------------------------------

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Vendor" | "Admin";
  joinedAt: string;
  status: "Active" | "Suspended" | "Pending";
  initials: string;
  gradient: string;
}

export const adminUsers: AdminUserRow[] = [
  { id: "U-9821", name: "Lena Park",         email: "lena@marketly.app",        role: "Admin",    joinedAt: "2023-04-01", status: "Active",   initials: "LP", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { id: "U-7401", name: "Studio Lumière",    email: "vendor@studio-lumiere.app",role: "Vendor",   joinedAt: "2024-03-12", status: "Active",   initials: "SL", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)" },
  { id: "U-7398", name: "Aaron Woods",       email: "aaron@northwind.studio",   role: "Vendor",   joinedAt: "2025-02-04", status: "Active",   initials: "AW", gradient: "linear-gradient(135deg,#10B981,#8B5CF6)" },
  { id: "U-6010", name: "Jane Founder",      email: "jane@business.com",        role: "Customer", joinedAt: "2025-09-22", status: "Active",   initials: "JF", gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { id: "U-5984", name: "Priya Shah",        email: "priya@studio.london",      role: "Vendor",   joinedAt: "2025-11-30", status: "Pending",  initials: "PS", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)" },
  { id: "U-5921", name: "Spam Account",      email: "noreply@spam.host",        role: "Customer", joinedAt: "2026-05-12", status: "Suspended",initials: "SA", gradient: "linear-gradient(135deg,#6B7280,#9CA3AF)" },
];

export interface AdminVendorRow {
  id: string;
  name: string;
  category: string;
  listings: number;
  gmvCents: number;
  rating: number;
  joinedAt: string;
  status: "Approved" | "Pending" | "Suspended";
  initials: string;
  gradient: string;
}

export const adminVendors: AdminVendorRow[] = [
  { id: "V-201", name: "Studio Lumière",    category: "Beauty",     listings: 12, gmvCents:  742_900,  rating: 4.9, joinedAt: "2024-03-12", status: "Approved", initials: "SL", gradient: "linear-gradient(135deg,#F472B6,#FBBF24)" },
  { id: "V-188", name: "PowerHouse Gym",    category: "Fitness",    listings:  8, gmvCents:  421_400,  rating: 4.9, joinedAt: "2024-06-04", status: "Approved", initials: "PG", gradient: "linear-gradient(135deg,#3B82F6,#10B981)" },
  { id: "V-176", name: "FreshBite Co.",     category: "Food",       listings: 24, gmvCents: 1_120_300, rating: 4.8, joinedAt: "2024-09-19", status: "Approved", initials: "FB", gradient: "linear-gradient(135deg,#F59E0B,#EF4444)" },
  { id: "V-244", name: "Glow Atelier",      category: "Beauty",     listings:  4, gmvCents:        0,  rating: 0,   joinedAt: "2026-05-21", status: "Pending",  initials: "GA", gradient: "linear-gradient(135deg,#EC4899,#F59E0B)" },
  { id: "V-242", name: "PrintFast Shop",    category: "E-commerce", listings:  9, gmvCents:        0,  rating: 0,   joinedAt: "2026-05-20", status: "Pending",  initials: "PF", gradient: "linear-gradient(135deg,#06B6D4,#8B5CF6)" },
  { id: "V-141", name: "Shady Shop",        category: "Services",   listings:  2, gmvCents:    8_400,  rating: 2.1, joinedAt: "2025-12-04", status: "Suspended",initials: "SS", gradient: "linear-gradient(135deg,#6B7280,#9CA3AF)" },
];

export interface AdminListingFlag {
  id: string;
  title: string;
  vendor: string;
  reason: string;
  reportedAt: string;
  reporter: string;
}

export const adminListingFlags: AdminListingFlag[] = [
  { id: "F-1041", title: "Hair Pro Template",       vendor: "Shady Shop",      reason: "Misleading screenshots vs. delivered product",          reportedAt: "2026-05-25", reporter: "Customer #C-7621" },
  { id: "F-1038", title: "Drop-ship Starter Kit",   vendor: "PrintFast Shop",  reason: "Copyrighted images without attribution",                reportedAt: "2026-05-24", reporter: "Marketly trust" },
  { id: "F-1031", title: "Quick Funnel 2026",       vendor: "Funnel Forge",    reason: "Spam outreach in support thread",                       reportedAt: "2026-05-22", reporter: "Customer #C-3104" },
];

export const platformRevenue30d: DailyPoint[] = [
  18_400, 17_900, 19_600, 21_400, 22_800, 21_500, 20_300, 22_700, 24_300, 25_800,
  23_900, 24_400, 26_100, 28_300, 29_800, 28_700, 28_400, 30_100, 31_900, 33_700,
  31_100, 32_300, 34_700, 36_200, 35_400, 33_800, 36_100, 38_900, 40_700, 42_800,
].map((value, i) => ({ date: `D-${30 - i}`, value }));

export interface AdminPaymentRow {
  id: string;
  date: string;
  vendor: string;
  customer: string;
  grossCents: number;
  feeCents: number;
  status: "Succeeded" | "Refunded" | "Disputed";
}

export const adminPayments: AdminPaymentRow[] = [
  { id: "P-44021", date: "2026-05-25", vendor: "Studio Lumière", customer: "Jane Founder", grossCents: 24900, feeCents: 1245, status: "Succeeded" },
  { id: "P-44017", date: "2026-05-25", vendor: "PowerHouse Gym", customer: "Aaron Woods",  grossCents:  9900, feeCents:  495, status: "Succeeded" },
  { id: "P-44009", date: "2026-05-24", vendor: "FreshBite Co.",  customer: "Sasha Malik",  grossCents:  5900, feeCents:  295, status: "Succeeded" },
  { id: "P-44002", date: "2026-05-24", vendor: "Shady Shop",     customer: "Devon Kim",    grossCents:  3500, feeCents:  175, status: "Refunded"  },
  { id: "P-43990", date: "2026-05-23", vendor: "Northwind Studio",customer: "Priya Shah",  grossCents: 19900, feeCents:  995, status: "Succeeded" },
  { id: "P-43977", date: "2026-05-22", vendor: "PrintFast Shop", customer: "Jordan Banks", grossCents:  4900, feeCents:  245, status: "Disputed"  },
];
