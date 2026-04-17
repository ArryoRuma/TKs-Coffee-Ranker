import { coffeeEntries, demoUserId } from "~/composables/useMockData";

export default defineEventHandler(() => {
  return coffeeEntries.filter((e) => e.userId === demoUserId);
});
