import { AppHeader } from "@/components/app-header";
import { EntryCard } from "@/components/entry-card";
import { coffeeEntries, demoUserId } from "@/lib/mock-data";

export default function DiaryPage() {
  const entries = coffeeEntries
    .filter((entry) => entry.userId === demoUserId)
    .sort((a, b) => b.dateConsumed.localeCompare(a.dateConsumed));

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/diary" />
      <main className="mx-auto w-full max-w-4xl px-5 py-8">
        <h1 className="mb-5 text-2xl font-semibold tracking-tight">Diary</h1>
        <div className="space-y-4">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </main>
    </div>
  );
}
