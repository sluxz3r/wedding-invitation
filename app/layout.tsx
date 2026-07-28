import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { couple, weddingDateDisplay } from "@/app/data/content";
import { MotionProvider } from "@/app/_components/providers/MotionProvider";
import { InvitationOverlayProvider } from "@/app/_components/providers/InvitationOverlayProvider";
import { MusicProvider } from "@/app/_components/providers/MusicProvider";
import { AppShell } from "@/app/_components/layout/AppShell";
import { WelcomeOverlay } from "@/app/_components/sections/WelcomeOverlay";
import { ScrollProgressBar } from "@/app/_components/layout/ScrollProgressBar";
import { CustomCursor } from "@/app/_components/layout/CustomCursor";
import { VinylPlayer } from "@/app/_components/layout/VinylPlayer";

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

const title = `${couple.partnerOneFull} & ${couple.partnerTwoFull}`;
const description = `With gratitude, we invite you to celebrate our wedding — ${weddingDateDisplay}.`;

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
    locale: "en_US",
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
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <MotionProvider>
          <InvitationOverlayProvider>
            <MusicProvider>
              <ScrollProgressBar />
              <CustomCursor />
              <WelcomeOverlay />
              <AppShell>{children}</AppShell>
              <VinylPlayer />
            </MusicProvider>
          </InvitationOverlayProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
