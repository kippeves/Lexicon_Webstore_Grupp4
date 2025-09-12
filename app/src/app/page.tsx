import HeroSection from "@/components/hero";
import ProductsGrid from "@/components/products-grid";
import { getProducts } from "@/lib/data/products";
import { Suspense } from "react";

export default async function Home() {
  const products = getProducts({ limit: 10 });
  return (
    <>
      <div className="rounded p-0 sm:p-8 bg-transparent sm:bg-white">
        <HeroSection />
      </div>
      <div className="rounded p-8 bg-white grow">
        <Suspense>
          <ProductsGrid title="Featured Products" productsTask={products} />
        </Suspense>
      </div>
    </>
  );
}
