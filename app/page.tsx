import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-10 px-5 py-16">
      <section className="space-y-5">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Taste diary</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
          Build your coffee identity, one cup at a time.
        </h1>
        <p className="max-w-2xl text-lg text-stone-600">
          Log drinks, rate flavor, track cafes and roasters, and build a personal coffee story designed for future social discovery.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button size="lg">Enter demo app</Button>
          </Link>
          <Link href="/auth/sign-in">
            <Button variant="outline" size="lg">
              Auth scaffold
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Logging", "Fast coffee capture with tasting notes and ratings."],
          ["Diary", "A beautiful timeline of your taste over time."],
          ["Discovery-ready", "Structured cafe, roaster, tags, and list model."],
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
