import type { Metadata } from "next";
import { ResultsGate } from "@/app/results/_components/ResultsGate";

/**
 * Unlisted on purpose: nothing on the invitation links here, the URL is typed
 * by hand. noindex keeps it out of search results should the address ever leak,
 * and overrides the invitation's own title and share card, which do not belong
 * on a private page.
 */
export const metadata: Metadata = {
  title: "Ucapan Masuk",
  robots: { index: false, follow: false, nocache: true },
  openGraph: null,
  twitter: null,
};

/**
 * The page itself holds no data. Wishes are fetched only after the password has
 * been checked server-side (app/api/results), so an unopened page has nothing
 * in its HTML to read.
 */
export default function ResultsPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-6 py-16 sm:px-10 sm:py-24">
      <ResultsGate />
    </main>
  );
}
