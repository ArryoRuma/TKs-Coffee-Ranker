import { coffeeEntries } from "~/composables/useMockData";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const entry = coffeeEntries.find((e) => e.id === id);

  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: "Entry not found" });
  }

  return entry;
});
