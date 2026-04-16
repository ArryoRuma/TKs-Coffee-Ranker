import { demoUserId, users } from "@/lib/mock-data";

export function getCurrentUser() {
  const demoMode = process.env.DEMO_USER_MODE !== "false";
  if (!demoMode) {
    return null;
  }

  return users.find((user) => user.id === demoUserId) ?? null;
}
