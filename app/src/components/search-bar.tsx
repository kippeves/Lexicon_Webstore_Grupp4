import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

async function SearchBar() {
  return (
    <div
      className={`rounded-b p-4 bg-[var(--primary-green)] flex items-center justify-evenly`}
    >
      <SearchForm />
      <ul className="grow text-sm font-bold text-white justify-evenly hidden md:flex">
        <li className="hidden xl:flex">Free shipping anywhere</li>
        <li className="hidden lg:flex">100% Secure!</li>
        <li className="hidden md:flex">30 Days Money Back Guarantee</li>
      </ul>
    </div>
  );
}

const SearchForm = () => {
  "use client";
  const categories = [
    "all",
    "smartphones",
    "tablets",
    "mobile-accessories",
    "laptops",
  ];

  async function handleSearch(data: FormData) {
    "use server";
    const type = data.get("type");
    const name = data.get("productName");

    if (name) {
      const category = (type) ? type.toString() : "";
      redirect(`/products?search=${name.toString()}&categories=${category}`, RedirectType.push);
    }
  }
  return (
    <form
      className="flex flex-row rounded-3xl pe-1 bg-white items-center focus-within:outline-3 grow outline-green-800"
      action={handleSearch}
    >
      <Select name="type" defaultValue="all" required>
        <SelectTrigger className="ps-4 font-semibold ring-0 outline-0 focus-visible:ring-0 border-0 ">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category, index) => {
            const capitalized = category
              .split("-")
              .map((split) => {
                const [firstLetter, ...rest] = split;
                return [firstLetter.toUpperCase(), ...rest].join("");
              })
              .join(" ");
            return (
              <SelectItem key={index} value={category}>
                {capitalized}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Input
        type="search"
        name="productName"
        className="outline-0 focus-visible:ring-0 border-0"
        placeholder="Search Anything..."
      />
      <Button
        variant={"ghost"}
        className="hover:bg-[var(--primary-green)] hover:text-white rounded-2xl h-7"
        type="submit"
      >
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
