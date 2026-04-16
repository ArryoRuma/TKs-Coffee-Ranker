"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { WantToTryItem } from "@/lib/mock-data";

let nextId = 100;

export function WannaSipManager({ initialItems }: { initialItems: WantToTryItem[] }) {
  const [items, setItems] = useState<WantToTryItem[]>(initialItems);
  const [drink, setDrink] = useState("");
  const [cafe, setCafe] = useState("");
  const [city, setCity] = useState("");

  function addItem() {
    if (!drink.trim() || !cafe.trim()) return;
    setItems((prev) => [
      { id: `w${nextId++}`, cafe: cafe.trim(), drink: drink.trim(), city: city.trim() },
      ...prev,
    ]);
    setDrink("");
    setCafe("");
    setCity("");
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Wanna Sip</h1>

      <Card className="space-y-3">
        <CardTitle className="text-base">Add to your wishlist</CardTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            placeholder="Drink (e.g. Geisha V60)"
            value={drink}
            onChange={(e) => setDrink(e.target.value)}
          />
          <Input
            placeholder="Cafe"
            value={cafe}
            onChange={(e) => setCafe(e.target.value)}
          />
          <Input
            placeholder="City (optional)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <Button onClick={addItem} disabled={!drink.trim() || !cafe.trim()}>
          Add to Wanna Sip
        </Button>
      </Card>

      {items.length ? (
        <div className="space-y-3">
          {items.map((sip) => (
            <Card key={sip.id} className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>{sip.drink}</CardTitle>
                <CardDescription>
                  {sip.cafe}
                  {sip.city ? ` • ${sip.city}` : ""}
                </CardDescription>
              </div>
              <button
                onClick={() => removeItem(sip.id)}
                aria-label="Remove from wishlist"
                className="mt-0.5 shrink-0 rounded p-1 text-stone-400 hover:text-red-500"
              >
                <Trash2 size={15} />
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-stone-600">Nothing in Wanna Sip yet. Save coffees you want to try next.</p>
      )}
    </div>
  );
}
