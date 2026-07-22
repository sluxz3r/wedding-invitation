"use client";

import { useInvitationOverlay } from "@/app/_components/providers/InvitationOverlayProvider";
import { Nav } from "@/app/_components/layout/Nav";

/**
 * While the welcome overlay is up, the real page is marked inert so it
 * can't be reached by tab/keyboard or announced by screen readers behind it.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen } = useInvitationOverlay();

  return (
    <div inert={isOpen}>
      <Nav />
      <main id="top">{children}</main>
    </div>
  );
}
