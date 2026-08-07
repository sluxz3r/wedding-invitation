import { InvitationOverlayProvider } from "@/app/_components/providers/InvitationOverlayProvider";
import { MusicProvider } from "@/app/_components/providers/MusicProvider";
import { AppShell } from "@/app/_components/layout/AppShell";
import { WelcomeOverlay } from "@/app/_components/sections/WelcomeOverlay";
import { ScrollProgressBar } from "@/app/_components/layout/ScrollProgressBar";
import { CustomCursor } from "@/app/_components/layout/CustomCursor";
import { VinylPlayer } from "@/app/_components/layout/VinylPlayer";

/**
 * The invitation and everything that frames it — the welcome overlay, the nav,
 * the music, the cursor.
 *
 * This used to sit in the root layout, which meant every route was held behind
 * the "Open Invitation" overlay (it opens locked and hides body overflow). The
 * group exists so a page that is not the invitation — app/results — can render
 * on the same fonts and colours without inheriting any of that.
 *
 * The folder name is in parentheses, so it contributes nothing to the URL: the
 * invitation is still served at "/".
 */
export default function InvitationLayout({ children }: { children: React.ReactNode }) {
  return (
    <InvitationOverlayProvider>
      <MusicProvider>
        <ScrollProgressBar />
        <CustomCursor />
        <WelcomeOverlay />
        <AppShell>{children}</AppShell>
        <VinylPlayer />
      </MusicProvider>
    </InvitationOverlayProvider>
  );
}
