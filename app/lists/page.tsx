import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { coffeeEntries, demoUserId, wantToTry } from "@/lib/mock-data";

export default function ListsPage() {
  const favorites = coffeeEntries.filter((entry) => entry.userId === demoUserId && entry.favorite);

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/lists" />
      <main className="mx-auto grid w-full max-w-6xl gap-5 px-5 py-8 md:grid-cols-2">
        <Card className="space-y-3">
          <CardTitle>Top Sips</CardTitle>
          <CardDescription>Saved cups worth ordering again.</CardDescription>
          {favorites.length ? (
            favorites.map((favorite) => (
              <div key={favorite.id} className="rounded-lg border border-stone-200 p-3">
                <p className="font-medium">{favorite.title}</p>
                <p className="text-sm text-stone-600">{favorite.cafe} • {favorite.location}</p>
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3 text-sm text-stone-600">
              Your Top Sips will show up here.
            </p>
          )}
        </Card>
        <Card className="space-y-3">
          <CardTitle>Wanna Sip</CardTitle>
          <CardDescription>Wishlist for upcoming coffee hunts.</CardDescription>
          {wantToTry.length ? (
            wantToTry.map((item) => (
              <div key={item.id} className="rounded-lg border border-stone-200 p-3">
                <p className="font-medium">{item.drink}</p>
                <p className="text-sm text-stone-600">{item.cafe} • {item.city}</p>
                <Badge className="mt-2">Wanna Sip</Badge>
              </div>
            ))
          ) : (
            <p className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3 text-sm text-stone-600">
              Nothing in Wanna Sip yet.
            </p>
          )}
        </Card>
      </main>
    </div>
  );
}
