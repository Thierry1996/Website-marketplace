"use server";

import { z } from "zod";

import { saveLead } from "@/lib/leads-store";
import { sendEmail } from "@/lib/email";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const leadSchema = z.object({
  name:    z.string().min(2, "Your name is required"),
  email:   z.string().email("Enter a valid email"),
  phone:   z.string().min(5).optional(),
  company: z.string().min(2, "Business name helps us serve you better"),
  industry:           z.string().optional(),
  monthlyBudgetCents: z.coerce.number().int().min(0).optional(),
  channels: z.array(z.string()).optional(),
  goals:    z.array(z.string()).optional(),
  challenge: z.string().max(2000).optional(),
  source:    z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof leadSchema>;

export async function createLead(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  try {
    const lead = await saveLead(parsed.data);

    // Best-effort notify Reach team; falls back to console.log if no Resend key.
    sendEmail({
      to: process.env.LEADS_TO ?? "hello@reach.com",
      subject: `New lead · ${parsed.data.company} (${parsed.data.name})`,
      html: `
        <p>A new lead just came in via the Reach home page:</p>
        <ul>
          <li><b>Name:</b> ${parsed.data.name}</li>
          <li><b>Email:</b> ${parsed.data.email}</li>
          ${parsed.data.phone ? `<li><b>Phone:</b> ${parsed.data.phone}</li>` : ""}
          <li><b>Business:</b> ${parsed.data.company}</li>
          ${parsed.data.industry ? `<li><b>Industry:</b> ${parsed.data.industry}</li>` : ""}
          ${parsed.data.monthlyBudgetCents ? `<li><b>Budget:</b> $${(parsed.data.monthlyBudgetCents / 100).toLocaleString()}/mo</li>` : ""}
          ${parsed.data.channels?.length ? `<li><b>Channels:</b> ${parsed.data.channels.join(", ")}</li>` : ""}
          ${parsed.data.goals?.length    ? `<li><b>Goals:</b> ${parsed.data.goals.join(", ")}</li>` : ""}
          ${parsed.data.challenge ? `<li><b>Challenge:</b> ${parsed.data.challenge}</li>` : ""}
          <li><b>Source:</b> ${parsed.data.source ?? "home"}</li>
        </ul>
      `,
    }).catch((err) => console.warn("[leads] email failed:", (err as Error).message));

    return ok({ id: lead.id });
  } catch (err) {
    return fail((err as Error).message);
  }
}
