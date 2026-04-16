import Link from "next/link";
import { Heart, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { CoffeeEntry } from "@/lib/mock-data";

export function EntryCard({ entry }: { entry: CoffeeEntry }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">
              <Link href={`/entries/${entry.id}`} className="hover:underline">
                {entry.title}
              </Link>
            </CardTitle>
            {entry.favorite && (
              <Heart size={15} className="shrink-0 fill-amber-600 text-amber-600" aria-label="Top sip" />
            )}
          </div>
          <CardDescription>
            {entry.cafe} • {entry.roaster} • {entry.location}
          </CardDescription>
          <p className="mt-0.5 text-xs text-stone-400">{entry.dateConsumed}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge>Sip Score {entry.rating}/10</Badge>
          <Link
            href={`/entries/${entry.id}/edit`}
            aria-label="Edit entry"
            className="rounded p-1 text-stone-400 hover:text-stone-700"
          >
            <Pencil size={14} />
          </Link>
        </div>
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
