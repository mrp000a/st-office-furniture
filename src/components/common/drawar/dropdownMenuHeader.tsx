"use client";

import { LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { dropdownAdminData, ProfileDefaultImage } from "@/components/data/core";
import Link from "next/link";
import { SignOut } from "@/components/sec_lib/Sessions";
import { getImageUrl } from "@/lib/getImageUrl";

export function DropdownMenuHeader() {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex-center rounded-full">
        <button>
          <span className="size-12 relative z-10 inline-block rounded-full border border-gray-primary overflow-hidden">
            <Image
              unoptimized
              src={getImageUrl(data?.user?.image)}
              alt={data?.user?.name ?? ""}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover w-full h-full"
            />
          </span>
        </button>
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

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => SignOut()}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
