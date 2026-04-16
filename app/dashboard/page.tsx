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
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardTitle>{entries.length}</CardTitle>
            <CardDescription>Total logs</CardDescription>
          </Card>
          <Card>
            <CardTitle>{entries.filter((e) => e.favorite).length}</CardTitle>
            <CardDescription>Current favorites</CardDescription>
          </Card>
          <Card>
            <CardTitle>{user.favoriteDrink}</CardTitle>
            <CardDescription>Signature cup</CardDescription>
          </Card>
        </section>

        <section className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Recent Sips</h1>
          <Link href="/entries/new">
            <Button>Add new entry</Button>
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {entries.length ? (
            entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
          ) : (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-600">
              No Recent Sips yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
