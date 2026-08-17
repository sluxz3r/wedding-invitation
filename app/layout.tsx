import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { baselineLocale, openGraphLocales } from "@/app/_lib/i18n";
import { couple, getContent } from "@/app/data/content";
import { getDictionary } from "@/app/data/dictionary";
import { MotionProvider } from "@/app/_components/providers/MotionProvider";
import { LanguageProvider } from "@/app/_components/providers/LanguageProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Metadata and the generated og:image are baked once, so they can only speak
// one language: the baseline (see _lib/i18n.ts). The page itself follows the
// guest's browser — and their toggle — from hydration onwards.
const title = `${couple.partnerOneFull} & ${couple.partnerTwoFull}`;
const description = getDictionary(baselineLocale).meta.description(
  getContent(baselineLocale).headline.dateDisplay,
);

export const metadata: Metadata = {
  // TODO: once deployed, set this to the real domain so social crawlers can
  // resolve the generated og:image to an absolute URL, e.g.:
  // metadataBase: new URL("https://your-domain.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: openGraphLocales[baselineLocale],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

/**
 * iOS Safari paints the document edge-to-edge behind the status bar, but
 * without viewport-fit=cover the *layout* viewport still starts below it. The
 * fixed header's `top: 0` therefore resolved to 47pt down on an iPhone 13, and
 * the page scrolled visibly through the strip above it. Opting in makes
 * `top: 0` the true top of the display; everything that touches a screen edge
 * then pads itself back with env(safe-area-inset-*), which is 0 everywhere
 * without a display cutout.
 *
 * Next emits `width=device-width, initial-scale=1` by default, so both are
 * restated here to keep them once this export takes over.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0908", // --color-ink, so Safari's own chrome matches the page
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // LanguageProvider rewrites this attribute once it knows the guest's
    // language; the baseline is what the server sends and what hydration matches.
    <html
      lang={baselineLocale}
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        {/*
          Only what every route needs: motion and language. The invitation's own
          chrome — overlay, nav, music — belongs to app/(invitation)/layout.tsx,
          so it does not reach pages that are not the invitation.
        */}
        <MotionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
