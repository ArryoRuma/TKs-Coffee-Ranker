import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-5 py-16 md:gap-14">
      <section className="space-y-6 rounded-3xl border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-amber-50 p-8 shadow-sm md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-900">Sippd</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
          Track every sip.
        </h1>
        <p className="max-w-2xl text-lg text-stone-600">
          Sippd is your personal coffee log — rate, review, and remember every cup.
        </p>
        <p className="max-w-2xl text-stone-600">
          From your morning latte to that perfect pour-over — never forget what you loved.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button size="lg">Log your first sip</Button>
          </Link>
          <Link href="/diary">
            <Button variant="outline" size="lg">
              Explore Sips
            </Button>
          </Link>
        </div>
      </section>

      <p className="text-center text-lg text-stone-700">
        Join people who are finally remembering what they actually like.
      </p>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "1. Log a Sip",
              "Add what you’re drinking — the café, roast, notes, and your Sip Score.",
            ],
            [
              "2. Build Your Taste",
              "Over time, see patterns in what you love (and what you don’t).",
            ],
            [
              "3. Never Forget a Great Cup",
              "Your Sip Log becomes your personal coffee memory.",
            ],
          ].map(([title, body]) => (
            <Card key={title} className="space-y-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-stone-600">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900">Core features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["☕ Log Every Coffee", "Track drinks, cafés, roasters, and tasting notes in seconds."],
            ["⭐ Sip Score", "Rate each coffee so your favorites naturally rise to the top."],
            ["📓 Your Sip Log", "A clean, scrollable history of every coffee you’ve had."],
            ["🔖 Saved Sips", "Bookmark coffees you want to come back to."],
            ["👀 Wanna Sip", "Keep a running list of coffees, cafés, and beans to try next."],
            ["🏆 Top Sips", "Your all-time best coffees, automatically organized."],
          ].map(([title, body]) => (
            <Card key={title} className="space-y-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-stone-600">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          [
            "Know your taste.",
            "Most people drink great coffee and forget it the next day. Sippd helps you build a memory for what you actually enjoy — so every next cup gets better.",
          ],
          [
            "From first sip to favorite.",
            "Whether it’s a quick cold brew or a carefully dialed-in espresso, every cup tells a story. Sippd keeps track of them all.",
          ],
        ].map(([title, body]) => (
          <Card key={title} className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-stone-600">{body}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-900">Start logging your coffee.</h2>
        <p className="text-stone-700">It only takes one sip to start building your taste.</p>
        <div>
          <Link href="/dashboard">
            <Button size="lg">Log your first sip</Button>
          </Link>
        </div>
      </section>

      <footer className="pb-2 text-center text-sm text-stone-500">Sippd — your coffee, remembered.</footer>
    </main>
  );
}
