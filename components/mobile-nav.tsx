"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

export function MobileNav({ activePath }: { activePath: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-md p-1.5 text-stone-600 hover:text-stone-900"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-full border-b border-stone-200 bg-stone-50 px-5 py-4 shadow-sm">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900",
                  activePath === item.href && "bg-stone-100 text-stone-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
