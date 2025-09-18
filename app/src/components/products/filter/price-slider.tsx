"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceSlider({
  onRangeUpdate,
  params,
  values,
  className = "",
  title = ""
}: {
  onRangeUpdate: (index: string, value: string[]) => void;
  params: ReadonlyURLSearchParams;
  values: number[];
  className?: string;
  title?: string;
}) {

  const paramsPrice = params.get("price")!.split(",") ?? [];
  const prices = paramsPrice.map(val => Number(val));

  const rangeMin = prices ? Math.min(...prices) : 0;
  const rangeMax = prices ? Math.max(...prices) : 0;
  const selectedMin = Number(values[0]);
  const selectedMax = Number(values[1]);

  const [selected, setSelected] = useState([selectedMin, selectedMax]);

  const handleAdjust = (e: number[]) => {
    setSelected(e);
  }

  const handleSelected = (e: number[]) => {
    onRangeUpdate?.("price", e.map((val) => val.toString()));
  }

  return (
    <Card className={`${className} gap-2 border-0 px-2 rounded-none shadow-none`}>
      <CardHeader className="px-0">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
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
      </CardContent>
    </Card>
  );
}