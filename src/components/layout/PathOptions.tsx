"use client";
import { Home } from "lucide-react";
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
      className={`text-gray-secondary relative z-30 mx-auto box-border w-full px-3 py-2 font-semibold max-sm:py-1`}
    >
      <div className="scrollbar-thumb-gray-secondary/20 flex scrollbar-thin items-center gap-2 overflow-auto overflow-y-hidden scroll-auto md:gap-3 xl:gap-4">
        <Link href={"/"}>
          <Home className="size-5" />
        </Link>
        {pathnamesArray.map((item, index) => (
          <div key={index} className="space-x-2 md:space-x-4">
            <span>/</span>
            <Link
              href={"/" + pathnamesArray.slice(0, index + 1).join("/") + "/"}
              className="capitalize"
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
