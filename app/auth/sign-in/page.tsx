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
          <CardTitle>Welcome to Sippd</CardTitle>
          <CardDescription>
            Jump in with demo mode and explore the full Sippd flow instantly.
          </CardDescription>
          <div className="space-y-3 text-sm text-stone-700">
            <p>Email/password, OAuth, and sessions are intentionally staged for a later pass.</p>
            <ul className="list-disc pl-5">
              <li>TODO: Add provider + real session strategy</li>
              <li>TODO: Gate private Sip Log visibility by follower graph</li>
              <li>TODO: Add profile accents for deeper Sippd brand personalization</li>
            </ul>
          </div>
          <Link href="/dashboard">
            <Button>Continue to Home</Button>
          </Link>
        </Card>
      </main>
    </div>
  );
}
