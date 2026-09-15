"use client";
import React from "react";
import { MobNavItems } from "../data/core";
import { usePathname, useRouter } from "next/navigation";

const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 min-w-full bg-background/80 z-9999 backdrop-blur-md border border-gray-600 box-border p-1 ">
      <div className="flex w-full justify-between gap-2 overflow-visible">
        {MobNavItems.map(({ href, label, Logo: Logo }, index) => (
          <button
            onClick={() => {
              router.push(href);
            }}
            key={index}
            className={` ${label.toLowerCase() == "home" ? "relative z-30 rounded-full bg-red-primary text-background  p-1 px-2  ring ring-gray-primary shadow-lg shadow-yellow-500 -translate-y-4" : `px-2 py-1 text-foreground flex-center flex-col flex-1 rounded-sm hover:bg-background active:bg-violet-primary transition-all hover:outline hover:outline-gray-primary/40 border border-gray-primary  cursor-pointer ${pathname.startsWith(href) ? "bg-blue-secondary text-background" : " bg-background"} `}`}
          >
            {Logo && (
              <Logo
                className={`font-bold ${label.toLowerCase() == "home" ? "text-background dark:text-foreground w-8 h-8 " : "text-red-primary w-6 h-6 "}`}
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
