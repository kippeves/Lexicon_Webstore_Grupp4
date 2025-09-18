"use client";

import { Slider } from "@/components/ui/slider";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useState } from "react";
import FilterCard from "./filter-card";

export default function PriceSlider({
  onRangeUpdate,
  params,
  values,
}: {
  onRangeUpdate: (index: string, value: string[]) => void;
  params: ReadonlyURLSearchParams;
  values: number[];
  title?: string;
}) {

  const prices = values.map(val => Number(val));

  const rangeMin = prices ? Math.min(...prices) : 0;
  const rangeMax = prices ? Math.max(...prices) : 0;

  const paramsPrice = params.has("price") ? params.get("price")!.split(",") : [];
  const selectedMin = paramsPrice[0] ? Number(paramsPrice[0]) : 0;
  const selectedMax = paramsPrice[1] ? Number(paramsPrice[1]) : 0;

  const [selected, setSelected] = useState([selectedMin, selectedMax]);

  const handleAdjust = (e: number[]) => {
    setSelected(e);
  }

  const handleSelected = (e: number[]) => {
    onRangeUpdate?.("price", e.map((val) => val.toString()));
  }

  return (
    <FilterCard title={"Price"}>
      <div>
        <div className="flex flex-row mb-2 justify-between">
          <div>{rangeMin}</div>
          <div>{rangeMax}</div>
        </div>
        <Slider min={rangeMin} max={rangeMax}
          defaultValue={[selectedMin, selectedMax]}
          onValueChange={(e) => handleAdjust(e)}
          onValueCommit={(e) => handleSelected(e)}
        />
        <div className="flex flex-row mt-2 justify-between">
          <div>{selected[0]}</div>
          <div>{selected[1]}</div>
        </div>
      </div>
    </FilterCard>
  );
}