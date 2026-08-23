"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PathOptions = () => {
  const pathname = usePathname();
  const pathnamesArray: string[] = pathname.split("/").filter(Boolean);
  if (pathname === "/") {
    return;
  }
  return (
    <div className=" max-w-384 w-full mx-auto px-3 py-3 box-border text-gray-secondary font-semibold relative z-30">
      <div className="flex items-center gap-4 scroll-auto scrollbar-thin scrollbar-thumb-gray-secondary/20 overflow-auto overflow-y-hidden">
        <Link href={"/"}>Home</Link>
        {pathnamesArray.map((item, index) => (
          <div key={index} className="space-x-4">
            <span>/</span>
            <Link
              href={"/" + pathnamesArray.slice(0, index + 1).join("/") + "/"}
              className="capitalize"
            >
              {item}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathOptions;
