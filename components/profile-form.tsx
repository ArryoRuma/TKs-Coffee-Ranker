"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AppUser, CoffeeEntry } from "@/lib/mock-data";

export function ProfileForm({
  user: initialUser,
  entries,
}: {
  user: AppUser;
  entries: CoffeeEntry[];
}) {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [draft, setDraft] = useState(initialUser);

  function startEdit() {
    setDraft(user);
    setEditing(true);
  }

  function saveEdit() {
    setUser(draft);
    setEditing(false);
  }

  function cancelEdit() {
    setDraft(user);
    setEditing(false);
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>
              {user.handle} • {user.homeCity}
            </CardDescription>
            {!editing && <p className="mt-1.5 text-sm text-stone-700">{user.bio}</p>}
          </div>
          {!editing && (
            <Button variant="outline" onClick={startEdit}>
              <Pencil size={14} className="mr-1.5" />
              Edit
            </Button>
          )}
        </div>

        {editing && (
          <div className="space-y-3 border-t border-stone-100 pt-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Display name"
                value={draft.name}
                onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Home city"
                value={draft.homeCity}
                onChange={(e) => setDraft((prev) => ({ ...prev, homeCity: e.target.value }))}
              />
              <Input
                placeholder="Favourite drink"
                value={draft.favoriteDrink}
                onChange={(e) => setDraft((prev) => ({ ...prev, favoriteDrink: e.target.value }))}
              />
            </div>
            <Textarea
              placeholder="Bio"
              value={draft.bio}
              onChange={(e) => setDraft((prev) => ({ ...prev, bio: e.target.value }))}
            />
            <div className="flex gap-2">
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="space-y-2">
        <CardTitle>Taste identity</CardTitle>
        <CardDescription>
          {entries.length} sip{entries.length !== 1 ? "s" : ""} •{" "}
          {entries.filter((e) => e.favorite).length} top pick
          {entries.filter((e) => e.favorite).length !== 1 ? "s" : ""}
        </CardDescription>
        {user.favoriteDrink && (
          <p className="text-sm text-stone-700">Favourite drink: {user.favoriteDrink}</p>
        )}
      </Card>
    </div>
  );
}
