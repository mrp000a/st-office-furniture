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
    <div className="bg-green-primary relative w-full text-xs md:text-xs lg:text-sm">
      <div className="mx-auto flex max-w-384 items-center justify-start gap-3 px-2">
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
              <button className="flex items-center text-white">
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
                      className="rounded-md px-2 active:translate-y-[0.5px]"
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
        <div className="text-background flex flex-wrap items-center justify-start overflow-hidden max-md:hidden">
          {CategoriesNav.map(({ label, href }, index) => (
            <Button
              key={index}
              // size={"xs"}
              asChild
              variant={"link"}
              className="h-5 text-wrap"
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
