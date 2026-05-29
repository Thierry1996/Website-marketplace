/**
 * Curated stable Unsplash photos, grouped by purpose. Hotlinking via
 * images.unsplash.com is permitted and these IDs are long-lived.
 *
 * Helper appends sizing/quality params; use with next/image (hosts are
 * whitelisted in next.config.ts).
 */

function u(id: string, w = 1200, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const media = {
  hero: {
    team:       u("1522071820081-009f0129c71c", 900),  // creative team laughing
    strategy:   u("1551836022-deb4988cc6c0", 700),      // marketing whiteboard
    phone:      u("1611162617474-5b21e879e113", 600),   // social apps on phone
    analytics:  u("1460925895917-afdab827c52f", 800),   // dashboard analytics
  },
  features: {
    web:        u("1467232004584-a241de8bcf5d", 900),   // sleek laptop/design
    ux:         u("1559028012-481c04fa702d", 900),      // ux wireframes
    speed:      u("1551288049-bebda4e38f71", 900),      // data speed charts
    ai:         u("1677442136019-21780ecad995", 900),   // ai abstract
    autopilot:  u("1556742049-0cfed4f6a45d", 900),      // ecommerce cart
    seo:        u("1432888622747-4eb9a8efeb07", 900),   // seo growth chart
    payments:   u("1556742502-ec7c0e9f34b1", 900),      // payment terminal
  },
  projects: [
    { src: u("1556742111-a301076d9d18", 800), alt: "Fashion storefront" },
    { src: u("1607082348824-0a96f2a4b9da", 800), alt: "Restaurant brand" },
    { src: u("1571019613454-1cb2f99b2d8b", 800), alt: "Fitness studio" },
    { src: u("1487014679447-9f8336841d58", 800), alt: "Beauty salon" },
    { src: u("1556745757-8d76bdb6984b", 800), alt: "Wellness spa" },
    { src: u("1517245386807-bb43f82c33c4", 800), alt: "Consulting agency" },
  ],
  categoryThumbs: {
    fashion:    u("1483985988355-763728e1935b", 800),
    beauty:     u("1596462502278-27bfdc403348", 800),
    wellness:   u("1540555700478-4be289fbecef", 800),
    food:       u("1517248135467-4c7edcad34c4", 800),
    fitness:    u("1534438327276-14e5300c3a48", 800),
    salon:      u("1560066984-138dadb4c035", 800),
    ecommerce:  u("1556742049-0cfed4f6a45d", 800),
    digital:    u("1531403009284-440f080d1e12", 800),
    consulting: u("1600880292203-757bb62b4baf", 800),
    education:  u("1503676260728-1c00da094a0b", 800),
    cleaning:   u("1581578731548-c64695cc6952", 800),
    events:     u("1492684223066-81342ee5ff30", 800),
  },
  avatars: {
    monique: u("1494790108377-be9c29b29330", 200),
    james:   u("1500648767791-00dcc994a43e", 200),
    priya:   u("1438761681033-6461ffad8d80", 200),
    jordan:  u("1507003211169-0a1dd7228f2d", 200),
    halima:  u("1573496359142-b8d87734a5a2", 200),
    ben:     u("1472099645785-5658abf4ff4e", 200),
  },
  testimonialPosters: {
    one:   u("1573497019940-1c28c88b4f3e", 800),
    two:   u("1507003211169-0a1dd7228f2d", 800),
    three: u("1438761681033-6461ffad8d80", 800),
  },
} as const;

/** Public domain sample MP4 used for testimonial video previews. */
export const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

export { u as unsplash };
