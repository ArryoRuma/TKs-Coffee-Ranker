"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export async function createWantToTry(
  userId: string,
  data: { cafe: string; drink: string; city?: string }
) {
  // TODO(v2): persist to a WantToTry table once schema is extended
  // For now this is a placeholder that will revalidate the page
  revalidatePath("/wanna-sip");
}

export async function deleteWantToTry(id: string) {
  // TODO(v2): delete from WantToTry table once schema is extended
  revalidatePath("/wanna-sip");
}
