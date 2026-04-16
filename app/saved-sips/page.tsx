import { AppHeader } from "@/components/app-header";
import { EntryCard } from "@/components/entry-card";
import { coffeeEntries, demoUserId } from "@/lib/mock-data";

export default function SavedSipsPage() {
  const savedSips = coffeeEntries.filter(
    (entry) => entry.userId === demoUserId && entry.wouldOrderAgain
  );

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/saved-sips" />
      <main className="mx-auto w-full max-w-4xl space-y-4 px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Saved Sips{savedSips.length > 0 && (
            <span className="ml-2 text-base font-normal text-stone-500">({savedSips.length})</span>
          )}
        </h1>
        {savedSips.length ? (
          savedSips.map((sip) => <EntryCard key={sip.id} entry={sip} />)
        ) : (
          <p className="text-stone-600">No saved sips yet.</p>
        )}
      </main>
    </div>
  );
}
