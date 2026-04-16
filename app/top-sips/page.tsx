import { AppHeader } from "@/components/app-header";
import { EntryCard } from "@/components/entry-card";
import { coffeeEntries, demoUserId } from "@/lib/mock-data";

export default function TopSipsPage() {
  const topSips = coffeeEntries
    .filter((entry) => entry.userId === demoUserId && entry.favorite)
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/top-sips" />
      <main className="mx-auto w-full max-w-4xl space-y-4 px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Top Sips</h1>
        {topSips.length ? (
          topSips.map((sip, index) => (
            <div key={sip.id} className="flex items-start gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-900">
                {index + 1}
              </span>
              <div className="flex-1">
                <EntryCard entry={sip} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-stone-600">Your Top Sips will show up here.</p>
        )}
      </main>
    </div>
  );
}
