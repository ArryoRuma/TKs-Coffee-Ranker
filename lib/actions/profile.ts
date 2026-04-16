"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export async function updateProfile(
  userId: string,
  data: {
    displayName?: string;
    bio?: string;
    homeCity?: string;
    favoriteDrink?: string;
    avatarUrl?: string;
  }
) {
  await db.user.update({
    where: { id: userId },
    data: {
      displayName: data.displayName,
      bio: data.bio,
      homeCity: data.homeCity,
      favoriteDrink: data.favoriteDrink,
      avatarUrl: data.avatarUrl,
    },
  });
  revalidatePath("/profile");
}
