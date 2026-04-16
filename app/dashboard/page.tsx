import Link from "next/link";

import { AppHeader } from "@/components/app-header";
import { EntryCard } from "@/components/entry-card";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { coffeeEntries, demoUserId, users } from "@/lib/mock-data";

export default function DashboardPage() {
  const user = users.find((item) => item.id === demoUserId)!;
  const entries = coffeeEntries.filter((entry) => entry.userId === user.id);

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/dashboard" />
      <main className="mx-auto w-full max-w-6xl space-y-8 px-5 py-8">
        <section className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Home</p>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user.name.split(" ")[0]}</h1>
          <p className="text-stone-600">Your Taste, Logged — all in one place.</p>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardTitle>{entries.length}</CardTitle>
            <CardDescription>Total Sips</CardDescription>
          </Card>
          <Card>
            <CardTitle>{entries.filter((e) => e.favorite).length}</CardTitle>
            <CardDescription>Top Sips</CardDescription>
          </Card>
          <Card>
            <CardTitle>{user.favoriteDrink}</CardTitle>
            <CardDescription>Signature Sip</CardDescription>
          </Card>
        </section>

        <section className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Recent Sips</h2>
          <Link href="/entries/new">
            <Button>Log a Sip</Button>
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {entries.length ? (
            entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
          ) : (
            <Card>
              <CardTitle>No Recent Sips yet.</CardTitle>
              <CardDescription>Start with your first great cup.</CardDescription>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
