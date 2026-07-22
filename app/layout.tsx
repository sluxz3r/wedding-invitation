import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { couple, weddingDateDisplay } from "@/app/data/content";
import { MotionProvider } from "@/app/_components/providers/MotionProvider";
import { InvitationOverlayProvider } from "@/app/_components/providers/InvitationOverlayProvider";
import { AppShell } from "@/app/_components/layout/AppShell";
import { WelcomeOverlay } from "@/app/_components/sections/WelcomeOverlay";
import { ScrollProgressBar } from "@/app/_components/layout/ScrollProgressBar";
import { CustomCursor } from "@/app/_components/layout/CustomCursor";

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
const description = `Dengan penuh syukur, kami mengundang Anda ke pernikahan kami — ${weddingDateDisplay}.`;

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
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <MotionProvider>
          <InvitationOverlayProvider>
            <ScrollProgressBar />
            <CustomCursor />
            <WelcomeOverlay />
            <AppShell>{children}</AppShell>
          </InvitationOverlayProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
