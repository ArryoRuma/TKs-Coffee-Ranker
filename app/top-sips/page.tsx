import { AppHeader } from "@/components/app-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
          topSips.map((sip) => (
            <Card key={sip.id} className="space-y-1">
              <CardTitle>{sip.title}</CardTitle>
              <CardDescription>
                Sip Score {sip.rating}/10 • {sip.cafe} • {sip.location}
              </CardDescription>
            </Card>
          ))
        ) : (
          <p className="text-stone-600">Your Top Sips will show up here.</p>
        )}
      </main>
    </div>
  );
}
