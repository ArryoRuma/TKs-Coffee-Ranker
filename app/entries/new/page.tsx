import { AddEntryForm } from "@/components/add-entry-form";
import { AppHeader } from "@/components/app-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function NewEntryPage() {
  return (
    <div className="min-h-screen">
      <AppHeader activePath="/entries/new" />
      <main className="mx-auto w-full max-w-3xl px-5 py-8">
        <Card className="space-y-4">
          <CardTitle>Log a Sip</CardTitle>
          <CardDescription>
            Add to Sip Log with a quick flavor snapshot. This form is validated with Zod and ready for a Prisma create action.
          </CardDescription>
          <AddEntryForm />
        </Card>
      </main>
    </div>
  );
}
