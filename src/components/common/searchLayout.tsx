"use client";

import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchLayout() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchStringValue, setSearchStringValue] = useState<string>("");

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    setSearchStringValue(value);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const a = searchParams.get("search");
    (function Run() {
      setSearchStringValue(a ?? "");
    })();
  }, [searchParams]);

  return (
    <>
      <div className="focus-within:ring-gray-secondary/80 ring-gray-secondary/50 hidden w-full max-w-full items-center justify-center gap-1 overflow-hidden rounded-md ring transition-all focus-within:ring-2 sm:flex">
        <button className="h-full w-fit p-0.5 px-2">
          <Search />
        </button>
        <input
          value={searchStringValue ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-full flex-1 focus:bg-none focus:outline-none"
          placeholder="Search Item"
        />
      </div>
      {/* trigger button  */}
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
        className={`absolute right-2 z-30 box-border flex w-full max-w-[calc(100vw-50px)] items-center justify-end gap-2 rounded-sm py-1 pl-8 transition-all duration-300 sm:hidden ${
          isSearchOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-background flex-center focus-within:ring-gray-secondary/80 ring-gray-secondary/50 w-full max-w-full gap-1 overflow-hidden rounded-md ring transition-all focus-within:ring-2">
          <button
            className="h-full w-fit p-0.5 px-2"
            onClick={async () => console.log("object")}
          >
            <Search />
          </button>
          <input
            ref={inputRef}
            value={searchStringValue ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full flex-1 focus:bg-none focus:outline-none"
            placeholder="Search Item"
          />
        </div>

        <Button
          variant={"outline"}
          // size={"icon-lg"}
          onClick={async () => setIsSearchOpen((e) => !e)}
          className="sm:hidden"
        >
          <X />
        </Button>
      </div>
    </>
    // <input
    //   placeholder="Search products..."
    //   onChange={(e) => handleSearch(e.target.value)}
    // />
  );
}
