import type { Metadata } from "next";
import "./globals.css";

import { getGlobalMetadata } from "@/lib/directus";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalMetadata();
  return {
    title: global.title,
    description: global.tagline,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
