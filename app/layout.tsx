import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Banner from "./_components/Banner";
import { Suspense } from "react";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgeStore";
import TanstackProvider from "./_components/TanstackProvider";
import HeaderScroller from "./_components/HeaderScroller";

const poppins = Poppins({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <TanstackProvider>
          <HeaderScroller>
        <Header />
          </HeaderScroller>
       <EdgeStoreProvider> <main className=" ">
        {children}
        </main></EdgeStoreProvider>
        <Footer/>
        <Toaster richColors />
        </TanstackProvider>
      </body>
    </html>
  );
}
