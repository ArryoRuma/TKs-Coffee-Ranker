"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Lock, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { List } from "@/lib/mock-data";

let nextId = 100;

export function ListsManager({
  initialLists,
  userId,
}: {
  initialLists: List[];
  userId: string;
}) {
  const [lists, setLists] = useState<List[]>(initialLists);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  function createList() {
    if (!title.trim()) return;
    const newList: List = {
      id: `l${nextId++}`,
      userId,
      title: title.trim(),
      description: description.trim(),
      isPublic,
      entryIds: [],
    };
    setLists((prev) => [newList, ...prev]);
    setTitle("");
    setDescription("");
    setIsPublic(true);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">My Lists</h1>
        <Button variant="outline" onClick={() => setShowForm((v) => !v)}>
          <Plus size={15} className="mr-1.5" />
          {showForm ? "Cancel" : "New List"}
        </Button>
      </div>

      {showForm && (
        <Card className="space-y-3">
          <CardTitle className="text-base">Create a new list</CardTitle>
          <Input
            placeholder="List name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Make this list public
          </label>
          <Button onClick={createList} disabled={!title.trim()}>
            Create List
          </Button>
        </Card>
      )}

      {lists.length ? (
        <div className="space-y-3">
          {lists.map((list) => (
            <Link key={list.id} href={`/lists/${list.id}`} className="block">
              <Card className="space-y-1 transition hover:border-stone-300">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle>{list.title}</CardTitle>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-stone-500">
                    {list.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                    {list.isPublic ? "Public" : "Private"}
                  </span>
                </div>
                {list.description && (
                  <CardDescription>{list.description}</CardDescription>
                )}
                <p className="text-xs text-stone-400">
                  {list.entryIds.length} sip{list.entryIds.length !== 1 ? "s" : ""}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-stone-600">No lists yet. Create one to organise your sips.</p>
      )}
    </div>
  );
}
