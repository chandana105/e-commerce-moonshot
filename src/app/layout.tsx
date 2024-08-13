import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/header";
import EmailProvider from "./context/EmailContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "./clientLayout";

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
            <ClientLayout>{children}</ClientLayout>
            <ToastContainer />
          </EmailProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
