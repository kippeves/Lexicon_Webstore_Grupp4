import React from "react";
import { getProduct } from "@/lib/data/products";
import Image from "next/image";
import ProductPrice from "@/components/product-price";
import StockStatus from "@/components/stock-status";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import AddToCartButton from "@/components/add-to-cart-button";
import { linkIcon } from "@/components/footer";
import { FooterIcon } from "@/components/footer/footer-icon";


export default async function ProductPage(props: { params: Promise<{ [key: string]: string | undefined }> }) {
  const params = await props.params;
  const productId = params.id ? Number(params.id) : undefined;


  if (typeof productId !== "number" || isNaN(productId)) {
    return <div>Invalid product ID</div>;
  }
  const product = await getProduct(productId);

  const colorIcon: linkIcon[] = [
    { name: "Paypal", width: 14, height: 16 },
    { name: "Mastercard", width: 27, height: 16 },
    { name: "Visa", width: 42, height: 16 },
    { name: "Stripe", width: 40, height: 16 },
    { name: "Klarna", width: 72, height: 16 },
  ];

  return (
    <article>
      <section className="flex flex-row gap-4 p-4 bg-white rounded-lg">
        <div className="flex-shrink-0">
          <Image src={product.images[0]} alt={product.title} width={500} height={500} />
        </div>

        <div className="flex flex-col gap-2 flex-grow mt-2 justify-start">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg font-semibold mb-2">Rating: {product.rating} ⭐</p>
          <ProductPrice price={product.price} discountPercentage={product.discountPercentage} />
          <p className="text-md  mb-2">Description: {product.description}</p>
          <p className="text-lg font-semibold mb-2">Brand: {product.brand}</p>
          <Separator />

          <div className="flex flex-col mt-2 mb-2">
            <StockStatus availabilityStatus={product.availabilityStatus} />
            <div className="flex flex-row justify-start items-center gap-4 mt-2 mb-2">
              <div className="flex flex-row items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                <button
                  type="button"
                  className="text-2xl font-bold px-2"
                  aria-label="Decrease quantity"
                // TODO: handle decrease
                >
                  −
                </button>
                <span className="mx-4 text-lg font-medium select-none">1</span>
                <button
                  type="button"
                  className="text-2xl font-bold px-2"
                  aria-label="Increase quantity"
                // TODO: handle increase
                >
                  +
                </button>
              </div>
              <AddToCartButton />
            </div>
            <p className="text-sm mb-2">Guaranteed Safe Checkout</p>
            <div className="flex gap-4 items-center justify-start">
              {colorIcon.map((item) => (
                <FooterIcon key={item.name} icon={item} />
              ))}
            </div>


          </div>


          <Separator />

          <p className="text-sm font-semibold">SKU: <span className="text-sm text-gray-500">{product.sku}</span></p>
          <p className="text-sm font-semibold">CATEGORY: <span className="text-sm text-gray-500">{product.category}</span></p>
          <p className="text-sm font-semibold">TAGS: <span className="text-sm text-gray-500">{product.tags.join(", ")}</span></p>
        </div>
      </section>

      <section className="mt-4 p-4 bg-white rounded-lg">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="mb-2 bg-white flex flex-row align-middle justify-start">
            <TabsTrigger
              value="description"
              className="px-0 mr-8 text-base font-bold border-b-2 border-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=inactive]:text-gray-400 transition-colors"
            >
              DESCRIPTION
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="px-0 text-base font-bold border-b-2 border-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=inactive]:text-gray-400 transition-colors"
            >
              REVIEWS ({product.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5">
                    <li>Weight: {product.weight} lb</li>
                    <li>Dimensions: {product.dimensions.width}&quot; x {product.dimensions.height}&quot; x {product.dimensions.depth}&quot;</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Warranty and Shipping</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5">
                    <li>Warranty: {product.warrantyInformation}</li>
                    <li>Shipping: {product.shippingInformation}</li>
                    <li>Return Policy: {product.returnPolicy}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="reviews">
            {product.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <ul className="list-disc pl-5 mt-4">
                {product.reviews.map((review, idx) => (
                  <li key={`${review.date}-${review.reviewerName}-${idx}`} className="mb-2">
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                    <p>Rating: {review.rating} ⭐</p>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

      </section>
    </article>

  );
}