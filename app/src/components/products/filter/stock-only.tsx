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
  const prevValue = params.has("stock");
  const [stock, setStock] = useState(prevValue);

  const flipState = () => setStock((val) => !val);

  useEffect(() => {
    if (prevValue !== stock) onCheckedChange("stock", stock ? "1" : undefined);
  }, [onCheckedChange, prevValue, stock]);

  return (
    <FilterCard id="stock" title="Stock">
      <div
        className="flex px-2 border-0 items-center space-x-3 rounded-lg hover:bg-accent/50 transition-colors"
        onClick={() => flipState()}
      >
        <Checkbox
          id="inStock"
          name="inStock"
          text="Show items in stock only"
          className="data-[state=checked]:bg-primary-green data-[state=checked]:border-none border-primary-green rounded-none"
          checked={stock}
        />
        <span className="text-sm inline-block font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer py-2">
          Only In Stock
        </span>
      </div>
    </FilterCard>
  );
}
