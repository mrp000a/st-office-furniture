"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { coreInfo, ProfileDefaultImage } from "@/components/data/core";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdMenu } from "react-icons/io";
import { MdNotifications } from "react-icons/md";
import { DropdownMenuAdmin } from "../common/dropdownMenu";
import { DropdownAdminMore } from "../common/dropdownAdminMore";
import { DropdownMenuNotification } from "../common/dropdownNotification";
import { useDashboardDrawer } from "@/context/SidebarContext";

const DashHeader = () => {
  const { setSidebarOpen, setSidebarOpenMob } = useDashboardDrawer();

  return (
    <div className="bg-gray-secondary/20 border-gray-secondary sticky top-0 z-50 flex items-center justify-between gap-1 rounded-sm border px-2 backdrop-blur-sm md:gap-4">
      {/* logo */}
      <span className="flex items-center gap-2 max-md:gap-0">
        <button
          onClick={() => setSidebarOpenMob((e) => !e)}
          className="outline-gray-primary/50 hover:bg-background/80 relative rounded-md px-1 transition-all hover:outline sm:hidden"
        >
          <IoMdMenu className="h-6 w-6" />
        </button>
        <button
          onClick={() => setSidebarOpen((e) => !e)}
          className="outline-gray-primary/50 hover:bg-background/80 relative hidden rounded-md px-1 transition-all hover:outline sm:block"
        >
          <IoMdMenu className="h-6 w-6" />
        </button>
        <Link
          href={"/#"}
          className="relative z-30 block h-12 w-43 overflow-hidden rounded-sm mix-blend-darken max-[500px]:hidden dark:mix-blend-lighten"
        >
          <Image
            unoptimized
            src={coreInfo.image}
            alt={coreInfo.name}
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 33vw"
            fill
            className="object-contain object-center dark:hidden"
          />
          <Image
            unoptimized
            src={coreInfo.imageDark}
            alt={coreInfo.name}
            // loading="eager"
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 33vw"
            fill
            className="hidden object-contain object-center dark:block"
          />
        </Link>
      </span>

      {/* admins options */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-3">
          <span className="flex-center outline-gray-secondary/80 focus-within:outline-gray-secondary max-w-120 flex-1 overflow-hidden rounded-full py-1 outline transition-all focus-within:outline-2 max-sm:hidden">
            <span className="px-2">
              <Search />
            </span>
            <input
              placeholder="Search Now"
              type="text"
              className="flex-1 px-2 outline-none focus:outline-none"
            />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggleButton />

          <button
            onClick={() => console.log("ShowSearch")}
            className="outline-gray-primary/50 hover:bg-background/80 rounded-full px-2 hover:outline sm:hidden"
          >
            <Search />
          </button>

          {/* Notifications */}

          <DropdownMenuNotification />
          <DropdownMenuAdmin />
          <DropdownAdminMore />
          {/* more button */}
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
