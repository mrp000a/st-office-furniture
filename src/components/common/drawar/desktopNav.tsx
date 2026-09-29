"use client";

import { CategoriesNav, navItems, navItemShort } from "../../data/core";
import Link from "next/link";
import { Button } from "../../ui/button";

const DesktopNavBar = () => {
  return (
    <div className="mx-auto w-full text-xs md:text-xs lg:text-sm">
      <div className="mx-auto flex max-w-384 items-center justify-start gap-3 px-2">
        <div className="flex items-center justify-start gap-2 overflow-hidden max-md:hidden">
          {navItemShort.map(({ label, href }, index) => (
            <Button key={index} asChild variant={"outline"}>
              <Link href={href} className="">
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopNavBar;
