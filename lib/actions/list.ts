"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export async function createList(
  userId: string,
  data: { title: string; description?: string; isPublic: boolean }
) {
  const list = await db.list.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      isPublic: data.isPublic,
      user: { connect: { id: userId } },
    },
  });
  revalidatePath("/lists");
  return list;
}

export async function addEntryToList(listId: string, coffeeEntryId: string, note?: string) {
  await db.listItem.create({
    data: {
      list: { connect: { id: listId } },
      coffeeEntry: { connect: { id: coffeeEntryId } },
      note: note ?? null,
    },
  });
  revalidatePath(`/lists/${listId}`);
}

export async function removeFromList(listItemId: string, listId: string) {
  await db.listItem.delete({ where: { id: listItemId } });
  revalidatePath(`/lists/${listId}`);
}
