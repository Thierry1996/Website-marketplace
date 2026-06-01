/**
 * Reach Site Audit engine.
 *
 * Server-only. Fetches a live website, crawls the homepage + a few internal
 * pages, extracts organic-marketing signals via regex (no heavy DOM dep), and
 * scores six categories. SSRF-guarded: only public http/https hosts, bounded
 * time + size.
 */

export interface AuditSignals {
  finalUrl: string;
  statusCode: number;
  responseMs: number;
  htmlBytes: number;
  https: boolean;
  lang: string | null;
  title: string | null;
  titleLen: number;
  metaDescription: string | null;
  metaDescriptionLen: number;
  hasViewport: boolean;
  hasCharset: boolean;
  hasCanonical: boolean;
  h1Count: number;
  h2Count: number;
  imgCount: number;
  imgMissingAlt: number;
  linkCount: number;
  internalLinks: number;
  externalLinks: number;
  scriptCount: number;
  wordCount: number;
  hasFavicon: boolean;
  ogTags: number;        // count of og:* present (title/description/image)
  hasTwitterCard: boolean;
  hasJsonLd: boolean;
  hasLocalBusiness: boolean;
  telLinks: number;
  mailtoLinks: number;
  formCount: number;
  mixedContent: number;  // http:// asset refs on an https page
  crawledPages: number;
  brokenLinks: number;
  social: { facebook: boolean; instagram: boolean; tiktok: boolean; pinterest: boolean; whatsapp: boolean; linkedin: boolean; youtube: boolean; x: boolean };
  detectedBusiness: { name?: string; address?: string; phone?: string };
}

export interface CategoryScore {
  key: "seo" | "performance" | "mobile" | "trust" | "content" | "conversion" | "social";
  label: string;
  score: number; // 0..100
}

export interface AuditFinding {
  category: CategoryScore["key"];
  severity: "high" | "medium" | "low";
  problem: string;
  solution: string;
}

export interface SiteAudit {
  ok: boolean;
  error?: string;
  signals?: AuditSignals;
  scores?: CategoryScore[];
  overall?: number;
  findings?: AuditFinding[];
}

// -----------------------------------------------------------------------------
// SSRF guard — only allow public hostnames.
// -----------------------------------------------------------------------------
function isPublicHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return false;
  if (!h.includes(".")) return false; // bare host
  // Block obvious private IPv4 ranges + loopback + link-local.
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return false;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return false;
  if (h === "0.0.0.0" || h === "::1" || h.startsWith("[")) return false;
  return true;
}

export function normalizeUrl(input: string): URL | null {
  let raw = input.trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!isPublicHost(u.hostname)) return null;
    return u;
  } catch {
    return null;
  }
}

const UA = "ReachSiteAnalyzer/1.0 (+https://reach.com/analyzer)";
const MAX_BYTES = 2_000_000;
const FETCH_TIMEOUT = 12_000;

async function fetchPage(url: string): Promise<{ status: number; html: string; ms: number; bytes: number } | null> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    });
    const reader = res.body?.getReader();
    let received = 0;
    const chunks: Uint8Array[] = [];
    if (reader) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          received += value.length;
          chunks.push(value);
          if (received > MAX_BYTES) { controller.abort(); break; }
        }
      }
    }
    const html = Buffer.concat(chunks).toString("utf8");
    return { status: res.status, html, ms: Date.now() - start, bytes: received };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

// Lightweight HEAD/GET status check for broken-link detection.
async function checkStatus(url: string): Promise<number> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { "User-Agent": UA } });
    return res.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(t);
  }
}

// -----------------------------------------------------------------------------
// Signal extraction (regex-based)
// -----------------------------------------------------------------------------
function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
}

function extractSignals(url: URL, page: { status: number; html: string; ms: number; bytes: number }): AuditSignals {
  const html = page.html;
  const lower = html.toLowerCase();
  const origin = url.origin;

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : null;

  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  let metaDescription: string | null = null;
  let hasViewport = false;
  let hasTwitterCard = false;
  const ogSet = new Set<string>();
  for (const m of metaTags) {
    const nameAttr = (attr(m, "name") ?? "").toLowerCase();
    const prop = (attr(m, "property") ?? "").toLowerCase();
    if (nameAttr === "description") metaDescription = attr(m, "content");
    if (nameAttr === "viewport") hasViewport = true;
    if (nameAttr.startsWith("twitter:")) hasTwitterCard = true;
    if (prop.startsWith("og:")) ogSet.add(prop);
  }

  const links = html.match(/<a\b[^>]*href\s*=\s*["'][^"']*["'][^>]*>/gi) ?? [];
  let internalLinks = 0, externalLinks = 0, telLinks = 0, mailtoLinks = 0;
  const internalHrefs: string[] = [];
  for (const a of links) {
    const href = attr(a, "href") ?? "";
    if (href.startsWith("tel:")) { telLinks++; continue; }
    if (href.startsWith("mailto:")) { mailtoLinks++; continue; }
    if (href.startsWith("#") || href.startsWith("javascript:")) continue;
    try {
      const abs = new URL(href, origin);
      if (abs.origin === origin) { internalLinks++; internalHrefs.push(abs.href); }
      else if (abs.protocol.startsWith("http")) externalLinks++;
    } catch { /* ignore */ }
  }

  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const imgMissingAlt = imgs.filter((i) => !/\balt\s*=\s*["'][^"']*\S[^"']*["']/i.test(i)).length;

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = text ? text.split(" ").length : 0;

  const https = url.protocol === "https:";
  const mixedContent = https ? (lower.match(/(?:src|href)\s*=\s*["']http:\/\//gi) ?? []).length : 0;

  // Structured data + LocalBusiness extraction
  const jsonLdBlocks = html.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  let hasLocalBusiness = false;
  const detectedBusiness: AuditSignals["detectedBusiness"] = {};
  for (const block of jsonLdBlocks) {
    const inner = block.replace(/<[^>]+>/g, "");
    try {
      const data = JSON.parse(inner);
      const nodes = Array.isArray(data) ? data : [data, ...(data["@graph"] ?? [])];
      for (const n of nodes) {
        const type = String(n?.["@type"] ?? "").toLowerCase();
        if (type.includes("localbusiness") || type.includes("organization") || type.includes("store") || type.includes("restaurant")) {
          hasLocalBusiness = hasLocalBusiness || type.includes("localbusiness") || type.includes("store") || type.includes("restaurant");
          if (!detectedBusiness.name && n.name) detectedBusiness.name = String(n.name);
          if (!detectedBusiness.phone && n.telephone) detectedBusiness.phone = String(n.telephone);
          if (!detectedBusiness.address && n.address) {
            const a = n.address;
            detectedBusiness.address = typeof a === "string"
              ? a
              : [a.streetAddress, a.addressLocality, a.addressRegion, a.postalCode, a.addressCountry].filter(Boolean).join(", ");
          }
        }
      }
    } catch { /* ignore malformed JSON-LD */ }
  }

  const social = {
    facebook:  /facebook\.com\//i.test(html),
    instagram: /instagram\.com\//i.test(html),
    tiktok:    /tiktok\.com\//i.test(html),
    pinterest: /pinterest\.com\//i.test(html),
    whatsapp:  /(wa\.me|whatsapp\.com)\//i.test(html),
    linkedin:  /linkedin\.com\//i.test(html),
    youtube:   /(youtube\.com|youtu\.be)\//i.test(html),
    x:         /(twitter\.com|x\.com)\//i.test(html),
  };

  return {
    finalUrl: url.href,
    statusCode: page.status,
    responseMs: page.ms,
    htmlBytes: page.bytes,
    https,
    lang: attr(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang"),
    title,
    titleLen: title?.length ?? 0,
    metaDescription,
    metaDescriptionLen: metaDescription?.length ?? 0,
    hasViewport,
    hasCharset: /<meta[^>]+charset/i.test(html),
    hasCanonical: /<link[^>]+rel\s*=\s*["']canonical["']/i.test(html),
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    h2Count: (html.match(/<h2\b/gi) ?? []).length,
    imgCount: imgs.length,
    imgMissingAlt,
    linkCount: links.length,
    internalLinks,
    externalLinks,
    scriptCount: (html.match(/<script\b/gi) ?? []).length,
    wordCount,
    hasFavicon: /<link[^>]+rel\s*=\s*["'][^"']*icon[^"']*["']/i.test(html),
    ogTags: ogSet.size,
    hasTwitterCard,
    hasJsonLd: jsonLdBlocks.length > 0,
    hasLocalBusiness,
    telLinks,
    mailtoLinks,
    formCount: (html.match(/<form\b/gi) ?? []).length,
    mixedContent,
    crawledPages: 1,
    brokenLinks: 0,
    social,
    detectedBusiness,
    // internalHrefs is used by the crawler below but not part of the public shape
    ...(({ } as object)),
  } as AuditSignals & { _internalHrefs?: string[] };
}

// -----------------------------------------------------------------------------
// Scoring + findings
// -----------------------------------------------------------------------------
function scoreAudit(s: AuditSignals): { scores: CategoryScore[]; overall: number; findings: AuditFinding[] } {
  const findings: AuditFinding[] = [];
  const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

  // SEO
  let seo = 100;
  if (!s.title)                       { seo -= 25; findings.push(F("seo","high","No <title> tag found.","Add a unique, keyword-rich title (50–60 chars) to every page.")); }
  else if (s.titleLen < 30 || s.titleLen > 65) { seo -= 8; findings.push(F("seo","low",`Title length is ${s.titleLen} chars.`,"Aim for 50–60 characters so it isn't truncated in search results.")); }
  if (!s.metaDescription)             { seo -= 18; findings.push(F("seo","high","Missing meta description.","Write a 140–160 char description with a clear value prop and call to action.")); }
  else if (s.metaDescriptionLen < 70) { seo -= 6;  findings.push(F("seo","low","Meta description is short.","Expand to 140–160 characters to use the full SERP snippet.")); }
  if (s.h1Count === 0)                { seo -= 15; findings.push(F("seo","high","No H1 heading.","Add exactly one H1 that states what the page is about.")); }
  else if (s.h1Count > 1)             { seo -= 6;  findings.push(F("seo","medium",`${s.h1Count} H1 tags found.`,"Use a single H1 per page; demote the rest to H2/H3.")); }
  if (!s.hasCanonical)                { seo -= 8;  findings.push(F("seo","low","No canonical link.","Add a canonical tag to avoid duplicate-content dilution.")); }
  if (!s.hasJsonLd)                   { seo -= 10; findings.push(F("seo","medium","No structured data (JSON-LD).","Add Organization/LocalBusiness schema so Google can show rich results.")); }

  // Performance
  let perf = 100;
  if (s.responseMs > 2500)            { perf -= 25; findings.push(F("performance","high",`Slow first response (${s.responseMs}ms).`,"Enable caching/CDN and reduce server work — aim for under 800ms TTFB.")); }
  else if (s.responseMs > 1200)       { perf -= 10; findings.push(F("performance","medium",`Response time is ${s.responseMs}ms.`,"Use a CDN + edge caching to get under 800ms.")); }
  if (s.htmlBytes > 600_000)          { perf -= 15; findings.push(F("performance","medium",`Large HTML payload (${Math.round(s.htmlBytes/1024)}KB).`,"Trim inline data, defer non-critical markup, and paginate long pages.")); }
  if (s.scriptCount > 25)             { perf -= 12; findings.push(F("performance","medium",`${s.scriptCount} script tags.`,"Bundle and defer scripts; remove unused third-party tags.")); }
  if (s.imgCount > 0 && s.imgMissingAlt / s.imgCount > 0.5) perf -= 5;

  // Mobile
  let mobile = 100;
  if (!s.hasViewport)                 { mobile -= 40; findings.push(F("mobile","high","No responsive viewport meta tag.","Add <meta name=viewport content='width=device-width, initial-scale=1'> — most traffic is mobile.")); }
  if (!s.hasCharset)                  { mobile -= 8; }

  // Trust / security
  let trust = 100;
  if (!s.https)                       { trust -= 40; findings.push(F("trust","high","Site is not served over HTTPS.","Install an SSL certificate — browsers flag http sites as 'Not secure' and Google demotes them.")); }
  if (s.mixedContent > 0)             { trust -= 15; findings.push(F("trust","medium",`${s.mixedContent} insecure (http://) resources on a secure page.`,"Serve every asset over https to avoid mixed-content warnings.")); }
  if (!s.hasFavicon)                  { trust -= 6;  findings.push(F("trust","low","No favicon.","Add a favicon for brand recognition in tabs and bookmarks.")); }
  if (s.telLinks === 0 && s.mailtoLinks === 0) { trust -= 10; findings.push(F("trust","medium","No clickable phone or email found.","Add tappable tel: and mailto: links so customers can reach you in one click.")); }
  if (s.brokenLinks > 0)              { trust -= 12; findings.push(F("trust","high",`${s.brokenLinks} broken link(s) detected.`,"Fix or remove dead links — they hurt UX and crawlability.")); }

  // Content
  let content = 100;
  if (s.wordCount < 250)              { content -= 25; findings.push(F("content","high",`Thin content (${s.wordCount} words).`,"Add at least 500–800 words of helpful, keyword-relevant copy.")); }
  else if (s.wordCount < 500)         { content -= 10; findings.push(F("content","low",`Content is light (${s.wordCount} words).`,"Expand with FAQs, benefits, and proof to rank for more queries.")); }
  if (s.imgCount > 0 && s.imgMissingAlt > 0) { content -= Math.min(20, s.imgMissingAlt * 2); findings.push(F("content","medium",`${s.imgMissingAlt}/${s.imgCount} images missing alt text.`,"Add descriptive alt text for accessibility and image SEO.")); }
  if (s.h2Count === 0 && s.wordCount > 300) { content -= 8; findings.push(F("content","low","No subheadings (H2).","Break content into scannable sections with H2s.")); }

  // Conversion
  let conversion = 100;
  if (s.formCount === 0)              { conversion -= 20; findings.push(F("conversion","medium","No lead-capture form found.","Add a short form or booking widget so visitors can become leads.")); }
  if (s.telLinks === 0)               { conversion -= 10; findings.push(F("conversion","low","No click-to-call.","Add a tap-to-call button — critical for local & mobile conversion.")); }
  const socialCount = Object.values(s.social).filter(Boolean).length;
  if (socialCount === 0)              { conversion -= 12; findings.push(F("conversion","medium","No social media links detected.","Link your Instagram, Facebook, TikTok, etc. to build trust and retarget visitors.")); }

  // Social presence (organic reach)
  let social = clamp(socialCount * 16 + (s.ogTags >= 2 ? 20 : 0) + (s.hasTwitterCard ? 12 : 0));
  if (s.ogTags < 2)                   findings.push(F("social","medium","Missing Open Graph tags.","Add og:title, og:description, og:image so shared links look great on social."));
  if (socialCount < 2)                findings.push(F("social","low","Few social profiles linked.","Connect more channels — organic reach compounds across platforms."));

  const scores: CategoryScore[] = [
    { key: "seo",         label: "SEO",          score: clamp(seo) },
    { key: "performance", label: "Performance",  score: clamp(perf) },
    { key: "mobile",      label: "Mobile",       score: clamp(mobile) },
    { key: "trust",       label: "Trust & Security", score: clamp(trust) },
    { key: "content",     label: "Content",      score: clamp(content) },
    { key: "conversion",  label: "Conversion",   score: clamp(conversion) },
    { key: "social",      label: "Social reach", score: clamp(social) },
  ];

  const weights: Record<CategoryScore["key"], number> = {
    seo: 0.22, performance: 0.16, mobile: 0.14, trust: 0.16, content: 0.14, conversion: 0.12, social: 0.06,
  };
  const overall = clamp(scores.reduce((sum, c) => sum + c.score * weights[c.key], 0));

  // Sort findings high → low severity.
  const rank = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => rank[a.severity] - rank[b.severity]);

  return { scores, overall, findings };
}

function F(category: CategoryScore["key"], severity: AuditFinding["severity"], problem: string, solution: string): AuditFinding {
  return { category, severity, problem, solution };
}

// -----------------------------------------------------------------------------
// Public entry — crawl + score
// -----------------------------------------------------------------------------
export async function auditSite(rawUrl: string): Promise<SiteAudit> {
  const url = normalizeUrl(rawUrl);
  if (!url) return { ok: false, error: "Please enter a valid public website URL (e.g. https://yourstore.com)." };

  const home = await fetchPage(url.href);
  if (!home) return { ok: false, error: "We couldn't reach that site. Make sure it's a live, public domain and try again." };
  if (home.status >= 400) return { ok: false, error: `The site returned HTTP ${home.status}. Confirm the domain is live and publicly accessible.` };
  if (!/<html|<!doctype/i.test(home.html)) return { ok: false, error: "That URL didn't return a web page we can analyze." };

  const signalsWithHrefs = extractSignals(url, home) as AuditSignals & { _internalHrefs?: string[] };
  const internalHrefs = (signalsWithHrefs as unknown as { internalHrefs?: string[] }).internalHrefs;

  // Mini-crawl: check up to 4 internal links for broken-link detection.
  const toCheck = dedupeInternal(url, home.html).slice(0, 4);
  let broken = 0;
  for (const link of toCheck) {
    const status = await checkStatus(link);
    if (status === 0 || status >= 400) broken++;
  }
  signalsWithHrefs.crawledPages = 1 + toCheck.length;
  signalsWithHrefs.brokenLinks = broken;
  void internalHrefs;

  const { scores, overall, findings } = scoreAudit(signalsWithHrefs);
  return { ok: true, signals: signalsWithHrefs, scores, overall, findings };
}

function dedupeInternal(url: URL, html: string): string[] {
  const out = new Set<string>();
  const links = html.match(/<a\b[^>]*href\s*=\s*["']([^"']*)["']/gi) ?? [];
  for (const a of links) {
    const href = a.match(/href\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
    if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:")) continue;
    try {
      const abs = new URL(href, url.origin);
      if (abs.origin === url.origin && abs.href !== url.href) out.add(abs.href);
    } catch { /* ignore */ }
    if (out.size >= 8) break;
  }
  return [...out];
}
