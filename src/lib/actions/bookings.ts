"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { db, hasDatabase } from "@/lib/db";
import { failFromZod, fail, ok, type ActionResult } from "./_result";

const createBookingSchema = z.object({
  serviceId: z.string().min(1),
  startAt:   z.coerce.date(),
  endAt:     z.coerce.date(),
  notes:     z.string().max(2000).optional(),
}).refine((v) => v.endAt > v.startAt, { message: "endAt must be after startAt", path: ["endAt"] });

const updateBookingStatusSchema = z.object({
  id:     z.string().min(1),
  status: z.enum(["REQUESTED", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"]),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export async function createBooking(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = createBookingSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) {
    return ok({ id: `BKG-${Date.now()}` });
  }

  try {
    // NOTE: userId comes from session; wire once Clerk is enabled.
    const booking = await db.booking.create({
      data: { ...parsed.data, userId: "TODO_USER_ID" },
      select: { id: true },
    });
    revalidatePath("/dashboard/bookings");
    revalidatePath("/vendor/bookings");
    return ok({ id: booking.id });
  } catch (err) {
    return fail((err as Error).message);
  }
}

export async function updateBookingStatus(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = updateBookingStatusSchema.safeParse(input);
  if (!parsed.success) return failFromZod(parsed.error);

  if (!hasDatabase || !db) return ok({ id: parsed.data.id });

  try {
    await db.booking.update({ where: { id: parsed.data.id }, data: { status: parsed.data.status } });
    revalidatePath("/vendor/bookings");
    revalidatePath("/dashboard/bookings");
    return ok({ id: parsed.data.id });
  } catch (err) {
    return fail((err as Error).message);
  }
}
