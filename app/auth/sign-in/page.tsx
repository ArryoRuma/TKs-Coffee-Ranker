import Link from "next/link";

import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="min-h-screen">
      <AppHeader activePath="" />
      <main className="mx-auto w-full max-w-xl px-5 py-10">
        <Card className="space-y-4">
          <CardTitle>Auth scaffold</CardTitle>
          <CardDescription>
            MVP runs in demo-user mode by default so product exploration is instant.
            Replace this with NextAuth/Clerk when ready.
          </CardDescription>
          <div className="space-y-3 text-sm text-stone-700">
            <p>Email/password, OAuth, and sessions are intentionally TODOs for speed.</p>
            <ul className="list-disc pl-5">
              <li>TODO: Add provider + real session strategy</li>
              <li>TODO: Gate private diary visibility by follower graph</li>
            </ul>
          </div>
          <Link href="/dashboard">
            <Button>Continue as demo user</Button>
          </Link>
        </Card>
      </main>
    </div>
  );
}
