import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContentGrid from "@/components/content-grid";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import { Toaster } from "sonner"
import { ClientProviders } from "@/components/providers/ClientProviders";


const interSans = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webshop - Home",
  description: "Webshop - Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.className} antialiased bg-[#e2e4eb]`}>
        <ClientProviders>
          <Toaster position="bottom-center" richColors />
          <ContentGrid className={"min-h-dvh grid-rows-[auto_auto_1fr_auto]"}>
            <Header />
            <SearchBar />
            <main className="flex flex-col gap-4 my-4">{children}</main>
            <Footer />
          </ContentGrid>
        </ClientProviders>
      </body>
    </html>
  );
}
