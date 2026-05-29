/**
 * Social + ads platform integrations Reach connects to on behalf of subscribers.
 * Brand colors are used for the glyph tiles in the integrations section.
 */

export interface Integration {
  key: string;
  name: string;
  blurb: string;
  detail: string;
  glyph: string;          // short letter/symbol for the brand tile
  color: string;          // brand color
  gradient: string;       // tile gradient
  status: "Connected" | "1-click" | "Beta";
  stat: { value: string; label: string };
}

export const integrations: Integration[] = [
  {
    key: "meta",
    name: "Meta Suite Ads",
    blurb: "Run Facebook & Instagram ad campaigns from our backend.",
    detail:
      "We plug into the Meta Marketing API to launch, optimize, and report on your ad campaigns — audiences, budgets, and creative tested automatically.",
    glyph: "f",
    color: "#1877F2",
    gradient: "linear-gradient(135deg,#1877F2,#00C6FF)",
    status: "Connected",
    stat: { value: "4.7x", label: "avg ROAS" },
  },
  {
    key: "instagram",
    name: "Instagram Marketing",
    blurb: "Full IG marketing suite inside your Reach portal.",
    detail:
      "Schedule posts and reels, auto-reply to DMs, track follower growth, and convert engagement into bookings — for every logged-in user.",
    glyph: "◎",
    color: "#E1306C",
    gradient: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)",
    status: "Connected",
    stat: { value: "+182%", label: "engagement" },
  },
  {
    key: "whatsapp",
    name: "WhatsApp Catalog",
    blurb: "Display your store catalog via WhatsApp Business API.",
    detail:
      "Your product catalog syncs to WhatsApp Business and connects straight to your Reach portal — customers browse and buy inside the chat.",
    glyph: "✆",
    color: "#25D366",
    gradient: "linear-gradient(135deg,#25D366,#128C7E)",
    status: "1-click",
    stat: { value: "63%", label: "reply rate" },
  },
  {
    key: "pinterest",
    name: "Pinterest Business",
    blurb: "Pinterest business suite wired into your dashboard.",
    detail:
      "Publish rich pins, build shopping boards, and track conversions from Pinterest — all managed from your Reach analytics.",
    glyph: "P",
    color: "#E60023",
    gradient: "linear-gradient(135deg,#E60023,#FF7A7A)",
    status: "1-click",
    stat: { value: "8.1M", label: "monthly reach" },
  },
  {
    key: "tiktok",
    name: "TikTok API",
    blurb: "TikTok management & setup, end to end.",
    detail:
      "We handle TikTok API setup, content scheduling, Spark Ads, and shop integration — so trends turn into traffic without the busywork.",
    glyph: "♪",
    color: "#000000",
    gradient: "linear-gradient(135deg,#25F4EE,#000000,#FE2C55)",
    status: "Beta",
    stat: { value: "12.4M", label: "video views" },
  },
];
