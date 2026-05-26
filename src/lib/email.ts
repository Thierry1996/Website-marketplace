/**
 * Transactional email module — Resend-backed.
 *
 * Falls back to console.log when RESEND_API_KEY is unset so booking + order
 * flows keep working in dev. Drop a real key in .env.local and emails fly.
 */

import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM ?? `Marketly <hello@marketly.app>`;

export interface SendEmailInput {
  to:      string | string[];
  subject: string;
  html:    string;
  text?:   string;
  replyTo?: string;
}

export async function sendEmail(input: SendEmailInput) {
  if (!resend) {
    // Dev mode — log the email instead.
    console.log("─── 📧 email (dev) ───");
    console.log("To:     ", input.to);
    console.log("Subject:", input.subject);
    console.log("Body:");
    console.log(input.text ?? stripHtml(input.html).slice(0, 500));
    console.log("─────────────────────");
    return { id: "dev-stub", success: true } as const;
  }

  const res = await resend.emails.send({
    from: FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    replyTo: input.replyTo,
  });

  if (res.error) {
    console.error("[email] Resend send failed:", res.error);
    throw new Error(res.error.message);
  }
  return { id: res.data?.id ?? "unknown", success: true } as const;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// -----------------------------------------------------------------------------
// Templates — kept here as pure HTML strings so they require no extra deps.
// Wrap in @react-email/components later if we want preview UIs.
// -----------------------------------------------------------------------------

const SHELL = (title: string, body: string) => `
<!doctype html>
<html><body style="margin:0;padding:0;background:#F8F8F8;font-family:Inter,system-ui,sans-serif;color:#0F172A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:24px 32px;border-bottom:1px solid #E2E8F0;">
          <div style="font-weight:800;font-size:18px;letter-spacing:0.04em;background:linear-gradient(135deg,#10B981,#8B5CF6);-webkit-background-clip:text;background-clip:text;color:transparent;">MARKETLY</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;">${title}</h1>
          ${body}
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #E2E8F0;background:#FAFAFC;font-size:12px;color:#64748B;">
          © ${new Date().getFullYear()} ${siteConfig.name} · <a style="color:#10B981;text-decoration:none;" href="${siteConfig.url}">${siteConfig.url}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

export function bookingConfirmationEmail(args: {
  customerName: string;
  service:      string;
  vendor:       string;
  whenISO:      string;
}) {
  const when = new Date(args.whenISO).toLocaleString("en-US", {
    weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit",
  });
  const body = `
    <p style="margin:0 0 16px 0;">Hi ${args.customerName},</p>
    <p style="margin:0 0 16px 0;">Your booking is confirmed:</p>
    <div style="margin:16px 0;padding:16px;border:1px solid #E2E8F0;border-radius:12px;background:#FAFAFC;">
      <div style="font-weight:600;">${args.service}</div>
      <div style="color:#64748B;font-size:14px;">By ${args.vendor}</div>
      <div style="margin-top:8px;">${when}</div>
    </div>
    <p style="margin:16px 0;">Free reschedule up to 24 hours before your appointment.</p>
    <a href="${siteConfig.url}/dashboard/bookings" style="display:inline-block;padding:12px 22px;background:linear-gradient(135deg,#10B981,#8B5CF6);color:#FFFFFF;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;">View booking</a>
  `;
  return {
    subject: `Booking confirmed: ${args.service}`,
    html: SHELL(`Your booking is confirmed`, body),
  };
}

export function orderReceiptEmail(args: {
  customerName: string;
  orderId:      string;
  totalCents:   number;
  currency?:    string;
  itemName:     string;
}) {
  const currency = (args.currency ?? "USD").toUpperCase();
  const total = new Intl.NumberFormat("en-US", {
    style: "currency", currency, maximumFractionDigits: 2,
  }).format(args.totalCents / 100);

  const body = `
    <p style="margin:0 0 16px 0;">Hi ${args.customerName},</p>
    <p style="margin:0 0 16px 0;">Thanks for your purchase! Your receipt is below.</p>
    <div style="margin:16px 0;padding:16px;border:1px solid #E2E8F0;border-radius:12px;background:#FAFAFC;">
      <div style="font-size:12px;color:#64748B;">Order #${args.orderId}</div>
      <div style="font-weight:600;margin-top:4px;">${args.itemName}</div>
      <div style="margin-top:12px;font-size:18px;font-weight:700;">${total}</div>
    </div>
    <a href="${siteConfig.url}/dashboard/orders" style="display:inline-block;padding:12px 22px;background:linear-gradient(135deg,#10B981,#8B5CF6);color:#FFFFFF;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;">View order</a>
  `;
  return {
    subject: `Order receipt: ${args.itemName}`,
    html: SHELL(`Receipt for your order`, body),
  };
}
