import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/header";
import EmailProvider from "./context/EmailContext";

export const metadata: Metadata = {
  title: "e-commerce-moonshot",
  description: "e-commerce-moonshot",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <EmailProvider>
            <Header />
            <main className="flex min-h-screen flex-col pt-36">{children}</main>
          </EmailProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
