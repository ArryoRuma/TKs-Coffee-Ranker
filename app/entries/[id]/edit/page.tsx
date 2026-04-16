import Link from "next/link";
import { notFound } from "next/navigation";

import { AddEntryForm } from "@/components/add-entry-form";
import { AppHeader } from "@/components/app-header";
import { Card, CardTitle } from "@/components/ui/card";
import { coffeeEntries } from "@/lib/mock-data";

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = coffeeEntries.find((item) => item.id === id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/diary" />
      <main className="mx-auto w-full max-w-3xl px-5 py-8">
        <div className="mb-4">
          <Link href={`/entries/${id}`} className="text-sm text-stone-500 hover:text-stone-800">
            ← Back to entry
          </Link>
        </div>
        <Card className="space-y-4">
          <CardTitle>Edit Sip</CardTitle>
          <AddEntryForm
            initialValues={{
              title: entry.title,
              drinkType: entry.drinkType,
              cafe: entry.cafe,
              roaster: entry.roaster,
              rating: String(entry.rating),
              reviewBody: entry.reviewBody,
              dateConsumed: entry.dateConsumed,
              wouldOrderAgain: entry.wouldOrderAgain,
              visibility: entry.visibility,
              origin: entry.origin,
              roastLevel: entry.roastLevel as never,
              brewMethod: entry.brewMethod as never,
              tastingNotes: entry.tastingNotes,
            }}
          />
        </Card>
      </main>
    </div>
  );
}
