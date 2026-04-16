"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DeleteEntryButton({ entryId }: { entryId: string }) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  // TODO(Phase 7): call deleteEntry server action
  function handleDelete() {
    // For now, just navigate away — server action will handle the actual delete
    router.push("/diary");
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-stone-700">Delete this entry?</span>
        <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50">
          Yes, delete
        </Button>
        <Button variant="ghost" onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" onClick={() => setConfirming(true)} aria-label="Delete entry">
      <Trash2 size={14} className="mr-1.5 text-red-500" />
      Delete
    </Button>
  );
}
