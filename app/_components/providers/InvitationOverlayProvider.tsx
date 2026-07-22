"use client";

import { createContext, useContext, useEffect, useState } from "react";

type InvitationOverlayValue = {
  isOpen: boolean;
  close: () => void;
};

const InvitationOverlayContext = createContext<InvitationOverlayValue | null>(null);

export function InvitationOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <InvitationOverlayContext.Provider value={{ isOpen, close: () => setIsOpen(false) }}>
      {children}
    </InvitationOverlayContext.Provider>
  );
}

export function useInvitationOverlay() {
  const context = useContext(InvitationOverlayContext);
  if (!context) {
    throw new Error("useInvitationOverlay must be used within InvitationOverlayProvider");
  }
  return context;
}
