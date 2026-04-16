import { AppHeader } from "@/components/app-header";
import { ProfileForm } from "@/components/profile-form";
import { coffeeEntries, demoUserId, users } from "@/lib/mock-data";

export default async function ProfilePage() {
  const user = users.find((item) => item.id === demoUserId)!;
  const entries = coffeeEntries.filter((entry) => entry.userId === user.id);

  return (
    <div className="min-h-screen">
      <AppHeader activePath="/profile" />
      <main className="mx-auto w-full max-w-3xl px-5 py-8">
        <ProfileForm user={user} entries={entries} />
      </main>
    </div>
  );
}
