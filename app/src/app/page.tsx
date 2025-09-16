import { ContentWrapper } from "@/components/content-wrapper";
import FeaturedGrid from "@/components/featured-grid";
import HeroSection from "@/components/hero";
import { getProducts } from "@/lib/data/products";
import { Suspense } from "react";

export default async function Home() {
  const products = getProducts({ limit: 10 });
  return (
    <>
      <ContentWrapper className="p-0 sm:p-6 bg-transparent sm:bg-white">
        <HeroSection />
      </ContentWrapper>
      <ContentWrapper>
        <Suspense>
          <FeaturedGrid productsTask={products} />
        </Suspense>
      </ContentWrapper>
    </>
  );
}
