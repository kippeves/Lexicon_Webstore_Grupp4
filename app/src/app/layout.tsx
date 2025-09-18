import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContentGrid from "@/components/content-grid";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchBar from "@/components/search-bar";
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "use-shopping-cart";

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
    <ClerkProvider appearance={{
      cssLayerName: 'clerk',
    }}>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        // Connects to your Stripe account
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
        // Redirected here after successful payments
        successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
        // Redirected here when you click back on Stripe Checkout
        cancelUrl={`${process.env.NEXT_PUBLIC_URL}/?success=false`}
        currency="USD"
        // Enables local storage
        shouldPersist={true}>
        <html lang="en">
          <body className={`${interSans.className} antialiased bg-[#e2e4eb]`}>
            <Toaster position="bottom-center" richColors />
            <ContentGrid className={"min-h-dvh grid-rows-[auto_auto_1fr_auto]"}>
              <Header />
              <SearchBar />
              <main className="flex flex-col gap-4 my-4">{children}</main>
              <Footer />
            </ContentGrid>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
