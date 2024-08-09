"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface EmailContextType {
  emailToBeVerified: string | null;
  setEmailToBeVerified: (email: string | null) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emailToBeVerified, setEmailToBeVerified] = useState<string | null>(
    null,
  );

  return (
    <EmailContext.Provider value={{ emailToBeVerified, setEmailToBeVerified }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmailContext must be used within an EmailProvider");
  }
  return context;
};

export default EmailProvider;
