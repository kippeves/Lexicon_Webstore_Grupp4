import { Input } from "@/components/ui/input";
import { ReadonlyURLSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import FilterCard from "./filter-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NameSearch({
  params,
  onValueChange,
}: {
  params: ReadonlyURLSearchParams;
  onValueChange: (index: string, checked: string | undefined) => void;
}) {
  const previousValue = params?.get("search") ?? "";
  const [search, setSearch] = useState<string | undefined>(previousValue);
  const preset = (previousValue?.length > 0);

  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    () => {
      getSearchValue();
    },
    // delay in ms
    300
  );

  function getSearchValue() {
    const value = ref.current?.value;
    setSearch(value);
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previousValue !== search) {
      onValueChange("search", search);
    }
  }, [onValueChange, previousValue, search]);

  return (
    <FilterCard id="search" title="Search" open={preset}>
      <div className="flex focus-within:outline-2 border border-[var(--primary-green)] outline-[var(--primary-green)] rounded-sm">
        <Input
          defaultValue={search}
          ref={ref}
          type="search"
          onChange={() => debounced()}
          className="rounded-s-sm rounded-e-none border-0 focus-visible:ring-0"
        />
        <Button
          onClick={() => getSearchValue()}
          type="button"
          className="rounded-s-none rounded-e-sm bg-white border border-y-0 border-e-0 border-s-[var(--primary-green)] hover:text-white text-[var(--primary-green)] hover:bg-[var(--primary-green)]"
        >
          <Search />
        </Button>
      </div>
    </FilterCard>
  );
}
