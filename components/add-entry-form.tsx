"use client";

import { type FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { coffeeEntrySchema } from "@/lib/validation/entry";

type EntryFormState = {
  title: string;
  drinkType: string;
  cafe: string;
  roaster: string;
  rating: string;
  reviewBody: string;
  dateConsumed: string;
  wouldOrderAgain: boolean;
  visibility: "PUBLIC" | "PRIVATE" | "FRIENDS";
};

const defaults: EntryFormState = {
  title: "",
  drinkType: "",
  cafe: "",
  roaster: "",
  rating: "8",
  reviewBody: "",
  dateConsumed: "",
  wouldOrderAgain: false,
  visibility: "PUBLIC",
};

export function AddEntryForm() {
  const [form, setForm] = useState({ ...defaults });
  const [result, setResult] = useState<string | null>(null);

  const parsed = useMemo(
    () =>
      coffeeEntrySchema.safeParse({
        ...form,
        rating: Number(form.rating),
      }),
    [form]
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!parsed.success) {
      setResult(parsed.error.issues[0]?.message ?? "Please fix form errors.");
      return;
    }

    setResult(`Draft saved locally: ${parsed.data.title} (Sip Score ${parsed.data.rating}/10).`);
    setForm({ ...defaults });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Sip title"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        />
        <Input
          placeholder="Drink type (e.g. Flat White)"
          value={form.drinkType}
          onChange={(e) => setForm((prev) => ({ ...prev, drinkType: e.target.value }))}
        />
        <Input
          placeholder="Cafe"
          value={form.cafe}
          onChange={(e) => setForm((prev) => ({ ...prev, cafe: e.target.value }))}
        />
        <Input
          placeholder="Roaster"
          value={form.roaster}
          onChange={(e) => setForm((prev) => ({ ...prev, roaster: e.target.value }))}
        />
        <Input
          type="number"
          min={1}
          max={10}
          aria-label="Sip Score"
          value={form.rating}
          onChange={(e) => setForm((prev) => ({ ...prev, rating: e.target.value }))}
        />
        <Input
          type="date"
          value={form.dateConsumed}
          onChange={(e) => setForm((prev) => ({ ...prev, dateConsumed: e.target.value }))}
        />
      </div>
      <Textarea
        placeholder="How did it taste?"
        value={form.reviewBody}
        onChange={(e) => setForm((prev) => ({ ...prev, reviewBody: e.target.value }))}
      />
      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-700">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.wouldOrderAgain}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, wouldOrderAgain: e.target.checked }))
            }
          />
          Save for Later
        </label>
        <label className="inline-flex items-center gap-2">
          Visibility
          <select
            className="rounded-md border border-stone-300 bg-white px-2 py-1"
            value={form.visibility}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                visibility: e.target.value as "PUBLIC" | "PRIVATE" | "FRIENDS",
              }))
            }
          >
            <option value="PUBLIC">Public</option>
            <option value="FRIENDS">Friends</option>
            <option value="PRIVATE">Private</option>
          </select>
        </label>
      </div>
      <Button type="submit">Add to Sip Log</Button>
      {result ? <p className="text-sm text-stone-700">{result}</p> : null}
    </form>
  );
}
