"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { CategoriesNav } from "../data/core";
import Link from "next/link";
import { Button } from "../ui/button";

const CategoriesNavBar = () => {
  const [categoriesShow, setCategoriesShow] = useState(false);

  return (
    <div className="w-full bg-green-primary  text-xs md:text-xs lg:text-sm relative">
      <div className=" max-w-384 mx-auto px-2 flex justify-start items-center gap-3">
        <div
          onMouseEnter={() => setCategoriesShow(true)}
          onMouseLeave={() => setCategoriesShow(false)}
        >
          {/* <button onClick={() => setCategoriesShow(true)}>open</button> */}
          <DropdownMenu
            modal={false}
            open={categoriesShow}
            onOpenChange={setCategoriesShow}
          >
            <DropdownMenuTrigger asChild>
              <button className="text-white flex items-center">
                <MenuIcon className="h-5" />
                <span>Categories</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                {CategoriesNav.map(({ label, href }, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link
                      href={href}
                      className="  px-2 rounded-md active:translate-y-[0.5px]"
                      key={index}
                    >
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap justify-start items-center  text-background  max-md:hidden overflow-hidden">
          {CategoriesNav.map(({ label, href }, index) => (
            <Button
              key={index}
              // size={"xs"}
              asChild
              variant={"link"}
              className="text-wrap h-5"
            >
              <Link
                href={href}
                className="text-background sm:text-background lg:text-background dark:md:text-foreground"
              >
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesNavBar;
