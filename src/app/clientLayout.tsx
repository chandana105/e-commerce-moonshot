"use client";

import useErrorHandling from "./hooks/useErrorHandling";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  useErrorHandling();
  return <main className="flex min-h-screen flex-col pt-36">{children}</main>;
};

export default ClientLayout;
