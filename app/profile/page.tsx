import { AppHeader } from "@/components/app-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { coffeeEntries, demoUserId, users } from "@/lib/mock-data";

export default function ProfilePage() {
  const user = users.find((item) => item.id === demoUserId)!;
  const entries = coffeeEntries.filter((entry) => entry.userId === user.id);

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/profile" />
      <main className="mx-auto w-full max-w-3xl space-y-4 px-5 py-8">
        <Card className="space-y-2">
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>
            {user.handle} • {user.homeCity}
          </CardDescription>
          <p className="text-sm text-stone-700">{user.bio}</p>
        </Card>
        <Card className="space-y-2">
          <CardTitle>Taste identity</CardTitle>
          <CardDescription>
            {entries.length} logs • {entries.filter((entry) => entry.favorite).length} favorites
          </CardDescription>
          <p className="text-sm text-stone-700">
            Prefers light to medium roasts with floral and citrus notes.
          </p>
        </Card>
      </main>
    </div>
  );
}
