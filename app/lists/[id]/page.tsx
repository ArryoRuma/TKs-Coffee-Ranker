import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, Lock } from "lucide-react";

import { AppHeader } from "@/components/app-header";
import { EntryCard } from "@/components/entry-card";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { coffeeEntries, lists } from "@/lib/mock-data";

export default async function ListDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = lists.find((l) => l.id === id);

  if (!list) {
    notFound();
  }

  const entries = coffeeEntries.filter((e) => list.entryIds.includes(e.id));

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/lists" />
      <main className="mx-auto w-full max-w-4xl space-y-6 px-5 py-8">
        <div>
          <Link href="/lists" className="text-sm text-stone-500 hover:text-stone-800">
            ← Back to Lists
          </Link>
        </div>

        <Card className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <CardTitle>{list.title}</CardTitle>
            <span className="flex shrink-0 items-center gap-1 text-xs text-stone-500">
              {list.isPublic ? <Globe size={12} /> : <Lock size={12} />}
              {list.isPublic ? "Public" : "Private"}
            </span>
          </div>
          {list.description && <CardDescription>{list.description}</CardDescription>}
          <p className="text-xs text-stone-400">
            {entries.length} sip{entries.length !== 1 ? "s" : ""}
          </p>
        </Card>

        {entries.length ? (
          <div className="space-y-4">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="text-stone-600">This list has no entries yet.</p>
        )}
      </main>
    </div>
  );
}
