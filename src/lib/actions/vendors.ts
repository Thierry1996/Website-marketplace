"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db, hasDatabase } from "@/lib/db";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const vendorOnboardSchema = z.object({
  displayName: z.string().min(2).max(80),
  slug:        z.string().regex(/^[a-z0-9-]+$/i, "Only letters, numbers, hyphens").min(2).max(48),
  tagline:     z.string().max(140).optional(),
  bio:         z.string().max(2000).optional(),
  websiteUrl:  z.string().url().optional().or(z.literal("")),
});

const approveVendorSchema = z.object({
  id:     z.string().min(1),
  status: z.enum(["APPROVED", "REJECTED", "SUSPENDED"]),
});

export type VendorOnboardInput = z.infer<typeof vendorOnboardSchema>;

export async function onboardVendor(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = vendorOnboardSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) {
    return ok({ id: `V-${Date.now()}` });
  }

  try {
    // NOTE: userId from session; wire once Clerk is enabled.
    const vendor = await db.vendor.create({
      data: {
        userId:      "TODO_USER_ID",
        displayName: parsed.data.displayName,
        slug:        parsed.data.slug.toLowerCase(),
        tagline:     parsed.data.tagline,
        bio:         parsed.data.bio,
        websiteUrl:  parsed.data.websiteUrl || null,
      },
      select: { id: true },
    });
    revalidatePath("/vendor");
    return ok({ id: vendor.id });
  } catch (err) {
    return fail((err as Error).message);
  }
}

export async function approveVendor(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = approveVendorSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) return ok({ id: parsed.data.id });

  try {
    await db.vendor.update({ where: { id: parsed.data.id }, data: { status: parsed.data.status } });
    revalidatePath("/admin/vendors");
    return ok({ id: parsed.data.id });
  } catch (err) {
    return fail((err as Error).message);
  }
}
