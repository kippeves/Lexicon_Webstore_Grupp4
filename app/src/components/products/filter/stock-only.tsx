import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ReadonlyURLSearchParams } from "next/navigation";
import React, { useState } from "react";
import FilterCard from "./filter-card";

export default function StockCheck({
  params,
  onCheckedChange,
}: {
  params: ReadonlyURLSearchParams;
  onCheckedChange: (index: string, checked: string | undefined) => void;
}) {
  const [stock, setStock] = useState<boolean>(params.has("stock"));

  function updateValue(checked: CheckedState): void {
    setStock(checked ? true : false);
    onCheckedChange("stock", checked ? "1" : undefined);
  }

  return (
    <FilterCard title="Stock">
      <div className="flex gap-3 items-center bg-white rounded">
        <Checkbox
          id="inStock"
          className="data-[state=checked]:bg-gray-400 data-[state=checked]:border-none border-gray-400 rounded-none"
          name="inStock"
          onCheckedChange={updateValue}
          checked={stock}
        />
        <label
          className="text-sm inline-block font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer py-2"
          htmlFor="inStock"
        >
          Only In Stock
        </label>
      </div>
    </FilterCard>
  );
}
