"use client";

import React, { createContext, useContext, useState } from "react";

interface LeadContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <LeadContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeadPopup = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeadPopup must be used within a LeadProvider");
  }
  return context;
};
