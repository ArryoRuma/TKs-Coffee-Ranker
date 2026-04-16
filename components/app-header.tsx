import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/entries/new", label: "Log a Sip" },
  { href: "/diary", label: "Sip Log" },
  { href: "/top-sips", label: "Top Sips" },
  { href: "/saved-sips", label: "Saved Sips" },
  { href: "/wanna-sip", label: "Wanna Sip" },
  { href: "/profile", label: "Profile" },
];

export function AppHeader({ activePath }: { activePath: string }) {
  const user = getCurrentUser();

  return (
    <header className="border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-stone-900">
          Sippd
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
        <Link href="/auth/sign-in" className="text-sm text-stone-600 hover:text-stone-900">
          {user ? user.handle : "Sign in"}
        </Link>
      </div>
    </header>
  );
}
