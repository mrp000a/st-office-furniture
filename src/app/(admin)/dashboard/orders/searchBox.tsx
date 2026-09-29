"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OrdersSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchStringValue, setSearchStringValue] = useState<string>("");

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    setSearchStringValue(value);
    router.push(`/dashboard/orders?${params.toString()}`);
  };

  return (
    <div className=" ">
      <div className="focus-within:ring-gray-secondary/80 ring-gray-secondary/50 hidden max-w-full items-center justify-center gap-1 overflow-hidden rounded-md ring transition-all focus-within:ring-2 sm:flex">
        <button className="bg-gray-secondary/20 h-full w-fit p-1 px-2">
          <Search />
        </button>
        <input
          value={searchStringValue ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-full focus:bg-none focus:outline-none"
          placeholder="Search Item"
        />
      </div>

      <Button
        variant={"outline"}
        size={"icon-lg"}
        onClick={async () => setIsSearchOpen((e) => !e)}
        className="sm:hidden"
      >
        <Search />
      </Button>

      {/* mobile search overlay */}
      <div
        className={`absolute right-0 z-30 box-border flex w-lg max-w-[calc(100vw-50px)] items-center justify-end rounded-sm py-1 pl-8 transition-all duration-300 sm:hidden ${
          isSearchOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-background flex-center focus-within:ring-gray-secondary/80 ring-gray-secondary/50 max-w-full gap-1 overflow-hidden rounded-md ring transition-all focus-within:ring-2">
          <button
            className="bg-gray-secondary/20 h-full w-fit p-1 px-2"
            onClick={async () => console.log("object")}
          >
            <Search />
          </button>
          <input
            value={searchStringValue ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full focus:bg-none focus:outline-none"
            placeholder="Search Item"
          />
        </div>

        <Button
          variant={"default"}
          // size={"icon-lg"}
          onClick={async () => setIsSearchOpen((e) => !e)}
          className="sm:hidden"
        >
          {/* <X /> */}
          Close
        </Button>
      </div>
    </div>
    // <input
    //   placeholder="Search products..."
    //   onChange={(e) => handleSearch(e.target.value)}
    // />
  );
}
