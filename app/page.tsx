import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-10 px-5 py-16">
      <section className="space-y-5">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Your Taste, Logged</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
          Track every sip, and build your coffee story over time.
        </h1>
        <p className="max-w-2xl text-lg text-stone-600">
          Sippd is a social coffee diary for logging cups, scoring flavor, and remembering the cafés, roasters, and beans that shape your taste.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button size="lg">Open Sippd</Button>
          </Link>
          <Link href="/entries/new">
            <Button variant="outline" size="lg">
              Log a Sip
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Log a Sip", "Capture cups quickly with tasting notes and a clear Sip Score."],
          ["Sip Log", "A warm diary of every cup, café, and flavor memory."],
          ["Top + Saved", "Keep your best discoveries and next-up coffees close."],
        ].map(([title, body]) => (
          <Card key={title} className="space-y-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-stone-600">{body}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
