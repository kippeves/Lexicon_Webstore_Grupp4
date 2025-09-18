"use client";

import { SidebarFilterValues } from "@/lib/types";
import { use } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SliderRange } from "../slider-range";
import StockCheck from "./filter/stock-only";
import BrandSelect from "./filter/brand-select";

export default function FilterArea({
  task,
}: {
  task: Promise<SidebarFilterValues>;
}) {
  const path = usePathname();
  const params = useSearchParams();
  const { replace, price } = useRouter();

  const paramsPrice = params.has("price")
    ? params.get("price")!.split(",")
    : [];

  const priceMin = price ? Math.min(...price) : 0;
  const priceMax = price ? Math.max(...price) : 0;

  const updateRoute = ({
    index,
    value,
  }: {
    index: string;
    value: string | string[];
  }) => {
  const updateRoute = (index: string, value: string | string[] | undefined) => {
    const newParams = new URLSearchParams(params);
    if (value?.length) {
      const exportValue = Array.isArray(value)
        ? value.join(",").toLowerCase()
        : value;
      newParams.set(index, exportValue);
    } else newParams.delete(index);
    replace(`${path}?${newParams}`);
  };

  const { brand } = use(task);

  return (
    <>
      <BrandSelect
        params={params}
        values={brand}
        onSelectedUpdate={updateRoute}
      />
      <StockCheck params={params} onCheckedChange={updateRoute} />
      {price && (
        <SliderRange title="Filter by price"
          rangeMin={priceMin}
          rangeMax={priceMax}
          selectedMin={Number(paramsPrice[0]) ? Number(paramsPrice[0]) : priceMin}
          selectedMax={Number(paramsPrice[1]) ? Number(paramsPrice[1]) : priceMax}
          onSelectionChange={(value) => updateRoute({ index: "price", value })}
        />
      )}
    </>
  );
}
