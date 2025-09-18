// app/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "use-shopping-cart";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ClerkProvider appearance={{ cssLayerName: "clerk" }}>
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
            shouldPersist={true}
        >
        {children}
      </CartProvider>
    </ClerkProvider>
  );
}
