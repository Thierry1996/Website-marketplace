"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db, hasDatabase } from "@/lib/db";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const createListingSchema = z.object({
  title:        z.string().min(4, "Title must be at least 4 characters").max(120),
  subtitle:     z.string().max(200).optional(),
  description:  z.string().min(20, "Description must be at least 20 characters"),
  type:         z.enum(["PRODUCT", "SERVICE", "DIGITAL", "SUBSCRIPTION", "BOOKING"]),
  categoryId:   z.string().optional(),
  priceCents:   z.coerce.number().int().min(0).max(10_000_000),
  currency:     z.string().length(3).default("USD"),
  thumbnailUrl: z.string().url().optional(),
});

const updateListingSchema = createListingSchema.partial().extend({
  id: z.string().min(1),
});

const deleteListingSchema = z.object({ id: z.string().min(1) });

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;

export async function createListing(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = createListingSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) {
    // Dev fallback — pretend it succeeded so forms can show the flow.
    return ok({ id: `L-${Date.now()}` });
  }

  try {
    const slug = parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60);
    // NOTE: vendorId comes from session; wire once Clerk is enabled.
    const listing = await db.listing.create({
      data: { ...parsed.data, slug, vendorId: "TODO_VENDOR_ID" },
      select: { id: true },
    });
    revalidatePath("/vendor/listings");
    return ok({ id: listing.id });
  } catch (err) {
    return fail((err as Error).message);
  }
}

export async function updateListing(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = updateListingSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) return ok({ id: parsed.data.id });

  try {
    const { id, ...rest } = parsed.data;
    await db.listing.update({ where: { id }, data: rest });
    revalidatePath("/vendor/listings");
    revalidatePath(`/marketplace/${id}`);
    return ok({ id });
  } catch (err) {
    return fail((err as Error).message);
  }
}

export async function deleteListing(input: unknown): Promise<ActionResult> {
  const parsed = deleteListingSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) return ok(undefined);

  try {
    await db.listing.delete({ where: { id: parsed.data.id } });
    revalidatePath("/vendor/listings");
    return ok(undefined);
  } catch (err) {
    return fail((err as Error).message);
  }
}
