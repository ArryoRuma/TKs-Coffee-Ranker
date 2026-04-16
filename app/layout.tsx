import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TK's Coffee Ranker",
  description: "A social coffee tracking prototype inspired by Untappd and Letterboxd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-stone-100 text-stone-900">{children}</body>
    </html>
  );
}
