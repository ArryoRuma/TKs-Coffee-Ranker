import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { demoUserId, users } from "@/lib/mock-data";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    authorized({ auth: session }) {
      // In demo mode (no env vars), allow all requests through
      if (!process.env.AUTH_GITHUB_ID) return true;
      return !!session?.user;
    },
  },
});

/**
 * Sync helper used by server components.
 * Returns the demo user in demo mode.
 * When real auth is active (AUTH_GITHUB_ID set), returns null —
 * use `auth()` directly in async server components for the live session.
 */
export function getCurrentUser() {
  if (!process.env.AUTH_GITHUB_ID || process.env.DEMO_USER_MODE !== "false") {
    return users.find((u) => u.id === demoUserId) ?? null;
  }
  return null;
}
