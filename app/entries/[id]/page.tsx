import { notFound } from "next/navigation";

import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { coffeeEntries } from "@/lib/mock-data";

export default async function EntryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const entry = coffeeEntries.find((item) => item.id === id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/diary" />
      <main className="mx-auto w-full max-w-3xl px-5 py-8">
        <Card className="space-y-4">
          <div className="space-y-2">
            <CardTitle>{entry.title}</CardTitle>
            <CardDescription>
              {entry.drinkType} at {entry.cafe} • {entry.dateConsumed}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Sip Score {entry.rating}/10</Badge>
            <Badge>{entry.origin}</Badge>
            <Badge>{entry.brewMethod}</Badge>
            <Badge>{entry.roastLevel}</Badge>
            <Badge>{entry.visibility.toLowerCase()}</Badge>
          </div>
          <p className="text-stone-700">{entry.reviewBody}</p>
          <div className="flex flex-wrap gap-2">
            {entry.tastingNotes.map((note) => (
              <Badge key={note} className="bg-amber-50 border-amber-200 text-amber-900">
                {note}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-stone-600">
            Save for Later: {entry.wouldOrderAgain ? "Yes" : "No"}
          </p>
        </Card>
      </main>
    </div>
  );
}
