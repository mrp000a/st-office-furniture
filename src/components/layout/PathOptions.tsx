"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PathOptions = ({ forceShow = false }: { forceShow?: boolean }) => {
  const pathname = usePathname();
  const pathnamesArray: string[] = pathname.split("/").filter(Boolean);

  if (pathnamesArray?.length === 0) {
    return <></>;
  }
  return (
    <div
      className={` w-full mx-auto px-3  box-border text-gray-secondary font-semibold relative z-30 `}
    >
      <div className="flex items-center gap-2 md:gap-3 xl:gap-4 scroll-auto scrollbar-thin scrollbar-thumb-gray-secondary/20 overflow-auto overflow-y-hidden">
        <Link href={"/"}>home</Link>
        {pathnamesArray.map((item, index) => (
          <div key={index} className="md:space-x-4 space-x-2">
            <span>/</span>
            <Link
              href={"/" + pathnamesArray.slice(0, index + 1).join("/") + "/"}
              className=""
            >
              {item.toLowerCase()}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathOptions;
