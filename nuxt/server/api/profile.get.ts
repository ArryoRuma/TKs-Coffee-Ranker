import { users, demoUserId } from "~/composables/useMockData";

export default defineEventHandler(() => {
  const user = users.find((u) => u.id === demoUserId);
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }
  return user;
});
