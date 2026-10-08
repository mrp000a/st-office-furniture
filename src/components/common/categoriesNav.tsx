"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MenuIcon, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CategoriesNav } from "../data/core";
import { usePathname } from "next/navigation";

const CategoriesNavBar = () => {
  const [categoriesShow, setCategoriesShow] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-green-primary text-background relative z-40 w-full">
      <div className="mx-auto flex h-7 max-w-384 items-center px-3 sm:px-4 lg:px-6">
        {/* Mobile */}
        <div className="md:hidden">
          <DropdownMenu
            modal={false}
            open={categoriesShow}
            onOpenChange={setCategoriesShow}
          >
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="group flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
              >
                <MenuIcon className="size-5 transition-transform group-data-[state=open]:rotate-90" />
                <span>Categories</span>
                <ChevronDown className="ml-0.5 size-4 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              sideOffset={7}
              className="w-[calc(100vw-24px)] max-w-sm rounded-xl border p-2 shadow-xl"
            >
              <div className="px-3">
                <p className="text-sm font-semibold">Shop by Category</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Find the right furniture for your workspace
                </p>
              </div>

              <div className="bg-border my-1 h-px" />

              {CategoriesNav.map(({ label, href }) => (
                <DropdownMenuItem
                  key={href}
                  asChild
                  className="focus:bg-muted cursor-pointer rounded-lg px-3 text-sm font-medium"
                >
                  <Link href={href} onClick={() => setCategoriesShow(false)}>
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop */}

        <div className="hidden h-full min-w-0 items-center md:flex">
          <div className="flex h-full min-w-0 scrollbar-none items-center gap-1 overflow-x-auto">
            {CategoriesNav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`group text-background/90 dark:text-foreground/90 hover:text-background relative flex h-6 shrink-0 items-center rounded-md px-3 text-xs font-medium transition-all duration-200 hover:bg-white/10 active:scale-[0.98] lg:px-3.5 ${pathname.startsWith(href) ? "bg-background/20" : ""}`}
              >
                {label}

                <span className="bg-background dark:bg-foreground pointer-events-none absolute inset-x-3 bottom-0 h-0.5 origin-center scale-x-0 rounded-full transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CategoriesNavBar;
