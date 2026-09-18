"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";

const SearchShowClient = ({ pathnameSend }: { pathnameSend?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchString, setSearchString] = useState<string | null>(
    searchParams.get("search"),
  );
  const [searchCategory, setSearchCategory] = useState<string | null>(
    searchParams.get("category"),
  );

  useEffect(() => {
    const s = searchParams.get("search");
    const c = searchParams.get("category");
    const a = () => {
      setSearchString(s ?? null);
      setSearchCategory(c ?? null);
    };
    a();
  }, [searchParams]);

  return (
    <div>
      <div
        className={` w-full  rounded-md gap-2 flex flex-wrap text-gray-primary/80 `}
      >
        <span className={`${searchString ? "" : "hidden"}`}>
          Showing result for {`"${searchString}"`}
        </span>
        <span>{searchString && searchCategory && "In"}</span>
        <span className={`${searchCategory ? "" : "hidden"}`}>
          Category : {`"${searchCategory}"`}
        </span>
        <Button
          onClick={() => router.push(pathnameSend ?? pathname)}
          className={`${searchCategory || searchString ? "" : "hidden"}`}
          variant={"destructive"}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default SearchShowClient;
