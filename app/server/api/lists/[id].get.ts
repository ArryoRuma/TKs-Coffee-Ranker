import { lists, coffeeEntries } from "~/composables/useMockData";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const list = lists.find((l) => l.id === id);

  if (!list) {
    throw createError({ statusCode: 404, statusMessage: "List not found" });
  }

  const entries = coffeeEntries.filter((e) => list.entryIds.includes(e.id));
  return { ...list, entries };
});
