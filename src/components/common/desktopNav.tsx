"use client";

import { CategoriesNav, navItems, navItemShort } from "../data/core";
import Link from "next/link";
import { Button } from "../ui/button";

const DesktopNavBar = () => {
  return (
    <div className="w-full mx-auto  text-xs md:text-xs lg:text-sm ">
      <div className=" max-w-384 mx-auto px-2 flex justify-start items-center gap-3">
        <div className="flex gap-2 justify-start items-center   max-md:hidden overflow-hidden">
          {navItemShort.map(({ label, href }, index) => (
            <Button
              key={index}
              asChild
              variant={"outline"}
            >
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
