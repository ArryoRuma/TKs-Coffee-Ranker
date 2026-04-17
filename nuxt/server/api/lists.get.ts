import { lists, demoUserId } from "~/composables/useMockData";

export default defineEventHandler(() => {
  return lists.filter((l) => l.userId === demoUserId);
});
