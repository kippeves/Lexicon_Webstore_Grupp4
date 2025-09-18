import { Checkbox } from "@/components/ui/checkbox";
import { ReadonlyURLSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterCard from "./filter-card";

export default function StockCheck({
  params,
  onCheckedChange,
}: {
  params: ReadonlyURLSearchParams;
  onCheckedChange: (index: string, checked: string | undefined) => void;
}) {
  const previousValue = params.has("stock");
  const [inStock, setInStock] = useState<boolean>(previousValue);
  const flip = () => setInStock((stockOnly) => !stockOnly);

  useEffect(() => {
    if (inStock !== previousValue)
      onCheckedChange("stock", inStock ? "1" : undefined);
  }, [previousValue, onCheckedChange, inStock]);

  return (
    <FilterCard title="Stock">
      <div
        className="flex border-0 items-center space-x-3 rounded-lg hover:bg-accent/50 transition-colors"
        onClick={flip}
      >
        <Checkbox
          id="inStock"
          name="inStock"
          text="Show items in stock only"
          className="data-[state=checked]:bg-gray-400 data-[state=checked]:border-none border-gray-400 rounded-none"
          checked={inStock}
          onCheckedChange={flip}
        />
        <span className="text-sm inline-block font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer py-2">
          Only In Stock
        </span>
      </div>
    </FilterCard>
  );
}
