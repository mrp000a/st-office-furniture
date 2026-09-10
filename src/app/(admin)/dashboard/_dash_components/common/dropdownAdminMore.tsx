"use client";

import { LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { dropdownAdminData } from "@/components/data/core";
import Link from "next/link";
import { SignOut } from "@/components/sec_lib/Sessions";
import { Button } from "@/components/ui/button";
import { HiDotsHorizontal } from "react-icons/hi";
export function DropdownAdminMore() {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-center rounded-md">
        <Button size={"icon"} variant={"outline"}>
          <HiDotsHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {dropdownAdminData &&
          dropdownAdminData.map(({ label, href, icon: Icon }, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={href}>
                <Icon />
                {label}
              </Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
