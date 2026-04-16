import { type NextRequest, NextResponse } from "next/server";

/**
 * Route proxy (Next.js 16+ successor to middleware.ts).
 *
 * Demo mode: allows all traffic through unconditionally.
 *
 * Production / real-auth:
 *   Once Auth.js explicitly supports the Next.js 16 proxy convention, replace
 *   the body with:
 *     const { auth } = await import("@/lib/auth");
 *     return auth(request); // after upstream typings are updated
 *
 * Until then, session-aware protection is handled by checking `auth()` inside
 * individual server layouts/pages and redirecting as needed.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!$|auth/|api/auth/|_next/static|_next/image|favicon\\.ico|.*\\.svg$).*)",
  ],
};
