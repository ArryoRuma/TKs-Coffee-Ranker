import { AppHeader } from "@/components/app-header";
import { WannaSipManager } from "@/components/wanna-sip-manager";
import { wantToTry } from "@/lib/mock-data";

export default async function WannaSipPage() {
  return (
    <div className="min-h-screen">
      <AppHeader activePath="/wanna-sip" />
      <main className="mx-auto w-full max-w-4xl px-5 py-8">
        <WannaSipManager initialItems={wantToTry} />
      </main>
    </div>
  );
}
