import { AppHeader } from "@/components/app-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { coffeeEntries, demoUserId } from "@/lib/mock-data";

export default function SavedSipsPage() {
  const savedSips = coffeeEntries.filter(
    (entry) => entry.userId === demoUserId && entry.wouldOrderAgain
  );

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/saved-sips" />
      <main className="mx-auto w-full max-w-4xl space-y-4 px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Saved Sips</h1>
        {savedSips.length ? (
          savedSips.map((sip) => (
            <Card key={sip.id} className="space-y-1">
              <CardTitle>{sip.title}</CardTitle>
              <CardDescription>
                Saved Sip • {sip.cafe} • {sip.location}
              </CardDescription>
            </Card>
          ))
        ) : (
          <p className="text-stone-600">No saved sips yet.</p>
        )}
      </main>
    </div>
  );
}
