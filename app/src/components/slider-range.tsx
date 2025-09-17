"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";

interface SliderRangeProps {
  title?: string;
  rangeMin: number;
  rangeMax: number;
  selectedMin?: number;
  selectedMax?: number;
  onSelectionChange?: (selected: string[]) => void;
  className?: string;
}

export function SliderRange({
  title = "Select Range",
  rangeMin = 0,
  rangeMax = 1,
  selectedMin = rangeMin,
  selectedMax = rangeMax,
  onSelectionChange,
  className = "",
}: SliderRangeProps) {

  const [selected, setSelected] = useState([selectedMin, selectedMax]);

  const handleAdjust = (e: number[]) => {
    setSelected(e);
  }

  const handleSelected = (e: number[]) => {
    onSelectionChange?.(e.map((val) => val.toString()));
  }

  return (
    <Card
      className={`${className} gap-2 border-0 px-2 rounded-none shadow-none`}
    >
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