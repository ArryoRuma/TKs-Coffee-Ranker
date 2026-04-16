import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { coffeeEntries, demoUserId, wantToTry } from "@/lib/mock-data";

export default function ListsPage() {
  const topSips = coffeeEntries.filter((entry) => entry.userId === demoUserId && entry.favorite);
  const savedSips = coffeeEntries.filter((entry) => entry.userId === demoUserId && entry.wouldOrderAgain);

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/saved-sips" />
      <main className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-8 md:grid-cols-3">
        <Card className="space-y-3">
          <CardTitle>Top Sips</CardTitle>
          <CardDescription>Your highest-rated standouts.</CardDescription>
          {topSips.length ? (
            topSips.map((favorite) => (
              <div key={favorite.id} className="rounded-lg border border-stone-200 p-3">
                <p className="font-medium">{favorite.title}</p>
                <p className="text-sm text-stone-600">{favorite.cafe} • {favorite.location}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-600">Your Top Sips will show up here.</p>
          )}
        </Card>
        <Card className="space-y-3">
          <CardTitle>Saved Sips</CardTitle>
          <CardDescription>Save for Later and revisit the best cups.</CardDescription>
          {savedSips.length ? (
            savedSips.map((saved) => (
              <div key={saved.id} className="rounded-lg border border-stone-200 p-3">
                <p className="font-medium">{saved.title}</p>
                <p className="text-sm text-stone-600">{saved.cafe} • {saved.location}</p>
                <Badge className="mt-2">Saved Sip</Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-600">No saved sips yet.</p>
          )}
        </Card>
        <Card className="space-y-3">
          <CardTitle>Wanna Sip</CardTitle>
          <CardDescription>Save coffees you want to try next.</CardDescription>
          {wantToTry.length ? (
            wantToTry.map((item) => (
              <div key={item.id} className="rounded-lg border border-stone-200 p-3">
                <p className="font-medium">{item.drink}</p>
                <p className="text-sm text-stone-600">{item.cafe} • {item.city}</p>
                <Badge className="mt-2">Add to Wanna Sip</Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-600">
              Nothing in Wanna Sip yet. Save coffees you want to try next.
            </p>
          )}
        </Card>
      </main>
    </div>
  );
}
