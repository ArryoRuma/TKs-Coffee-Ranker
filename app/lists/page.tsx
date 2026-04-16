import { AppHeader } from "@/components/app-header";
import { ListsManager } from "@/components/lists-manager";
import { demoUserId, lists } from "@/lib/mock-data";

export default async function ListsPage() {
  const userLists = lists.filter((l) => l.userId === demoUserId);

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/lists" />
      <main className="mx-auto w-full max-w-4xl px-5 py-8">
        <ListsManager initialLists={userLists} userId={demoUserId} />
      </main>
    </div>
  );
}
