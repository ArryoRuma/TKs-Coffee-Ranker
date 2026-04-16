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
          <CardTitle>Favorites</CardTitle>
          <CardDescription>Saved cups worth ordering again.</CardDescription>
          {favorites.map((favorite) => (
            <div key={favorite.id} className="rounded-lg border border-stone-200 p-3">
              <p className="font-medium">{favorite.title}</p>
              <p className="text-sm text-stone-600">{favorite.cafe} • {favorite.location}</p>
            </div>
          ))}
        </Card>
        <Card className="space-y-3">
          <CardTitle>Want to try</CardTitle>
          <CardDescription>Wishlist for upcoming coffee hunts.</CardDescription>
          {wantToTry.map((item) => (
            <div key={item.id} className="rounded-lg border border-stone-200 p-3">
              <p className="font-medium">{item.drink}</p>
              <p className="text-sm text-stone-600">{item.cafe} • {item.city}</p>
              <Badge className="mt-2">Want to try</Badge>
            </div>
          ))}
        </Card>
      </main>
    </div>
  );
}
