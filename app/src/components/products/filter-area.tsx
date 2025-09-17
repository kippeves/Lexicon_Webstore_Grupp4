"use client";

import { SidebarFilterValues } from "@/lib/types";
import { use } from "react";
import { MultiSelectList } from "../multi-select-list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SliderRange } from "../slider-range";

export default function FilterArea({
  task,
}: {
  task: Promise<SidebarFilterValues>;
}) {
  const { replace } = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const { brand, price } = use(task);

  const paramsBrand = params.has("brand")
    ? params.get("brand")!.split(",")
    : [];

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
    const newParams = new URLSearchParams(params);
    if (value.length)
      newParams.set(
        index,
        Array.isArray(value) ? value.join(",").toLowerCase() : value
      );
    else newParams.delete("brand");
    replace(decodeURIComponent(`${path}?${newParams}`));
  };

  const brandOptions = brand?.map((b) => ({
    id: b.toLowerCase(),
    label: b,
  }));

  return (
    <>
      {brandOptions && (
        <MultiSelectList
          title="Filter by brand"
          selected={paramsBrand}
          items={brandOptions}
          onSelectionChange={(value) => updateRoute({ index: "brand", value })}
        />
      )}
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
