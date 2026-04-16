import Link from "next/link";

import { signIn } from "@/lib/auth";
import { AppHeader } from "@/components/app-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="min-h-screen">
      <AppHeader activePath="" />
      <main className="mx-auto w-full max-w-xl px-5 py-10">
        <Card className="space-y-6">
          <div className="space-y-1">
            <CardTitle>Welcome to Sippd</CardTitle>
            <CardDescription>
              Sign in to start logging your coffee journey.
            </CardDescription>
          </div>

          {/* GitHub OAuth — requires AUTH_GITHUB_ID + AUTH_GITHUB_SECRET */}
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </form>

          <p className="text-center text-xs text-stone-500">
            Just exploring?{" "}
            <Link href="/dashboard" className="underline hover:text-stone-800">
              Continue in demo mode
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
