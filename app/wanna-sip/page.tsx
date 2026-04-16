import { AppHeader } from "@/components/app-header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { wantToTry } from "@/lib/mock-data";

export default function WannaSipPage() {
  return (
    <div className="min-h-screen">
      <AppHeader activePath="/wanna-sip" />
      <main className="mx-auto w-full max-w-4xl space-y-4 px-5 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Wanna Sip</h1>
        {wantToTry.length ? (
          wantToTry.map((sip) => (
            <Card key={sip.id} className="space-y-1">
              <CardTitle>{sip.drink}</CardTitle>
              <CardDescription>
                Wanna Sip • {sip.cafe} • {sip.city}
              </CardDescription>
            </Card>
          ))
        ) : (
          <p className="text-stone-600">
            Nothing in Wanna Sip yet. Save coffees you want to try next.
          </p>
        )}
      </main>
    </div>
  );
}
