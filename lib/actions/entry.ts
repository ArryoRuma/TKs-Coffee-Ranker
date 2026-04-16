"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { coffeeEntrySchema } from "@/lib/validation/entry";

/**
 * Create a new coffee entry for the given userId.
 * Validates input with Zod before writing to DB.
 */
export async function createEntry(userId: string, formData: unknown) {
  const parsed = coffeeEntrySchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }

  const { cafe, roaster, origin, roastLevel, brewMethod, tastingNotes, dateConsumed, ...rest } =
    parsed.data;

  // Find-or-create cafe and roaster (no unique constraint in schema, so skip dedup for now)
  const cafeRecord = await db.cafe.create({
    data: { name: cafe, city: "Unknown", country: "Unknown" },
  });
  const roasterRecord = await db.roaster.create({
    data: { name: roaster },
  });

  await db.coffeeEntry.create({
    data: {
      ...rest,
      dateConsumed: new Date(dateConsumed),
      origin: origin ?? null,
      roastLevel: roastLevel ?? null,
      brewMethod: brewMethod ?? null,
      tastingNotes: tastingNotes ?? [],
      user: { connect: { id: userId } },
      cafe: { connect: { id: cafeRecord.id } },
      roaster: { connect: { id: roasterRecord.id } },
    },
  });

  revalidatePath("/diary");
  redirect("/diary");
}

/**
 * Update an existing coffee entry.
 */
export async function updateEntry(entryId: string, formData: unknown) {
  const parsed = coffeeEntrySchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }

  const { origin, roastLevel, brewMethod, tastingNotes, dateConsumed, cafe: _cafe, roaster: _roaster, ...rest } =
    parsed.data;

  await db.coffeeEntry.update({
    where: { id: entryId },
    data: {
      ...rest,
      dateConsumed: new Date(dateConsumed),
      origin: origin ?? null,
      roastLevel: roastLevel ?? null,
      brewMethod: brewMethod ?? null,
      tastingNotes: tastingNotes ?? [],
    },
  });

  revalidatePath(`/entries/${entryId}`);
  revalidatePath("/diary");
  redirect(`/entries/${entryId}`);
}

/**
 * Delete an entry by id.
 */
export async function deleteEntry(entryId: string) {
  await db.coffeeEntry.delete({ where: { id: entryId } });
  revalidatePath("/diary");
  redirect("/diary");
}

/**
 * Toggle the favorite flag on an entry.
 */
export async function toggleFavorite(entryId: string, current: boolean) {
  await db.coffeeEntry.update({
    where: { id: entryId },
    data: { favorite: !current },
  });
  revalidatePath(`/entries/${entryId}`);
  revalidatePath("/diary");
  revalidatePath("/top-sips");
}
