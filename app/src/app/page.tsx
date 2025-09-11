import HeroSection from "@/components/hero";
import ProductsGrid from "@/components/products-grid";
import { getProducts } from "@/lib/data/products";
import { Suspense } from "react";

export default async function Home() {
  const products = getProducts({ limit: 8 });

  return (
    <>
      <HeroSection />
      <Suspense>
        <ProductsGrid title="Featured Products" productsTask={products} />
      </Suspense>
    </>
  );
}
