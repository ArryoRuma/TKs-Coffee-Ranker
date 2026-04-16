import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { CoffeeEntry } from "@/lib/mock-data";

export function EntryCard({ entry }: { entry: CoffeeEntry }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-lg">
            <Link href={`/entries/${entry.id}`} className="hover:underline">
              {entry.title}
            </Link>
          </CardTitle>
          <CardDescription>
            {entry.cafe} • {entry.roaster} • {entry.location}
          </CardDescription>
        </div>
        <Badge>Sip Score {entry.rating}/10</Badge>
      </div>
      <p className="text-sm text-stone-700">{entry.reviewBody}</p>
      <div className="flex flex-wrap gap-2">
        {entry.tastingNotes.map((note) => (
          <Badge key={note} className="bg-amber-50 border-amber-200 text-amber-900">
            {note}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
