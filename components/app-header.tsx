import Link from "next/link";
import Image from "next/image";

import { auth, getCurrentUser, signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";

const navItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/entries/new", label: "Log a Sip" },
  { href: "/diary", label: "Sip Log" },
  { href: "/top-sips", label: "Top Sips" },
  { href: "/saved-sips", label: "Saved Sips" },
  { href: "/wanna-sip", label: "Wanna Sip" },
  { href: "/profile", label: "Profile" },
];

export async function AppHeader({ activePath }: { activePath: string }) {
  // Demo mode: use sync helper. Real auth: check live session.
  const demoUser = getCurrentUser();
  const session = process.env.AUTH_GITHUB_ID ? await auth() : null;
  const displayName = session?.user?.name ?? demoUser?.handle ?? null;

  return (
    <header className="relative border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo-horiz.svg" alt="Sippd logo" width={1501} height={1250} className="h-12 w-auto" priority />
        </Link>
        <nav className="hidden gap-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-stone-600 transition hover:text-stone-900",
                activePath === item.href && "text-stone-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="hidden md:block"
            >
              <button type="submit" className="text-sm text-stone-600 hover:text-stone-900">
                Sign out
              </button>
            </form>
          ) : (
            <Link href="/auth/sign-in" className="hidden text-sm text-stone-600 hover:text-stone-900 md:block">
              {displayName ?? "Sign in"}
            </Link>
          )}
          <MobileNav activePath={activePath} />
        </div>
      </div>
    </header>
  );
}
