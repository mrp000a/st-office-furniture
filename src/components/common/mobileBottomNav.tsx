"use client";
import React from "react";
import { MobNavItems } from "../data/core";
import { usePathname, useRouter } from "next/navigation";

const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-background/80 fixed bottom-0 z-50 box-border min-w-full border border-gray-600 p-1 backdrop-blur-md md:hidden">
      <div className="flex w-full justify-between gap-2 overflow-visible">
        {MobNavItems.map(({ href, label, Logo: Logo }, index) => (
          <button
            onClick={() => {
              router.push(href);
            }}
            key={index}
            className={` ${label.toLowerCase() == "home" ? "bg-green-primary text-background ring-gray-primary relative z-30 -translate-y-4 rounded-full p-1 px-2 shadow-lg ring shadow-yellow-500" : `text-foreground flex-center hover:bg-background active:bg-violet-primary hover:outline-gray-primary/40 border-gray-primary flex-1 cursor-pointer flex-col rounded-sm border px-2 py-1 transition-all hover:outline ${pathname.startsWith(href) ? "bg-blue-secondary text-background" : "bg-background"} `}`}
          >
            {Logo && (
              <Logo
                className={`font-bold ${label.toLowerCase() == "home" ? "text-background dark:text-foreground h-8 w-8" : "text-green-primary h-6 w-6"}`}
              />
            )}
            <span
              className={`text-[8px] ${label.toLowerCase() == "home" ? "hidden" : ""} `}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
