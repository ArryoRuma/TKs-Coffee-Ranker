"use client";

import { type FormEvent, type KeyboardEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BREW_METHODS, ROAST_LEVELS, coffeeEntrySchema } from "@/lib/validation/entry";

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
  origin: string;
  roastLevel: string;
  brewMethod: string;
  tastingNotes: string[];
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
  origin: "",
  roastLevel: "",
  brewMethod: "",
  tastingNotes: [],
};

export function AddEntryForm({ initialValues }: { initialValues?: Partial<EntryFormState> } = {}) {
  const router = useRouter();
  const [form, setForm] = useState({ ...defaults, ...initialValues });
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const parsed = useMemo(
    () =>
      coffeeEntrySchema.safeParse({
        ...form,
        rating: Number(form.rating),
        roastLevel: form.roastLevel || undefined,
        brewMethod: form.brewMethod || undefined,
        origin: form.origin || undefined,
        tastingNotes: form.tastingNotes.length ? form.tastingNotes : undefined,
      }),
    [form]
  );

  function addTag() {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tastingNotes.includes(tag)) {
      setForm((prev) => ({ ...prev, tastingNotes: [...prev.tastingNotes, tag] }));
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setForm((prev) => ({
      ...prev,
      tastingNotes: prev.tastingNotes.filter((t) => t !== tag),
    }));
  }

  function onTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please fix form errors.");
      return;
    }

    // TODO(Phase 7): call createEntry server action here
    router.push("/diary");
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
        <Input
          placeholder="Origin (e.g. Ethiopia Yirgacheffe)"
          value={form.origin}
          onChange={(e) => setForm((prev) => ({ ...prev, origin: e.target.value }))}
        />
        <select
          aria-label="Roast level"
          className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#5e3c23]"
          value={form.roastLevel}
          onChange={(e) => setForm((prev) => ({ ...prev, roastLevel: e.target.value }))}
        >
          <option value="">Roast level (optional)</option>
          {ROAST_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <select
          aria-label="Brew method"
          className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#5e3c23]"
          value={form.brewMethod}
          onChange={(e) => setForm((prev) => ({ ...prev, brewMethod: e.target.value }))}
        >
          <option value="">Brew method (optional)</option>
          {BREW_METHODS.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      {/* Tasting notes tag input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Add tasting note and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
          />
          <Button type="button" variant="outline" onClick={addTag} className="shrink-0">
            Add
          </Button>
        </div>
        {form.tastingNotes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tastingNotes.map((note) => (
              <button
                key={note}
                type="button"
                onClick={() => removeTag(note)}
                className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100"
              >
                {note}
                <X size={11} />
              </button>
            ))}
          </div>
        )}
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
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
