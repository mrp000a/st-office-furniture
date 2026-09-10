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
  const session = useSession();
  const user = session.data?.user;
  const { setSidebarOpen, setSidebarOpenMob } =
    useDashboardDrawer();

  return (
    <div className="flex sticky top-0 z-50 justify-between gap-1 md:gap-4 items-center bg-gray-secondary/20 backdrop-blur-sm px-2  rounded-sm border border-gray-secondary">
      {/* logo */}
      <span className="flex items-center gap-2 max-md:gap-0">
        <button
          onClick={() => setSidebarOpenMob((e) => !e)}
          className="relative sm:hidden rounded-md hover:outline outline-gray-primary/50 transition-all  px-1 hover:bg-background/80"
        >
          <IoMdMenu className="h-6 w-6" />
        </button>
        <button
          onClick={() => setSidebarOpen((e) => !e)}
          className="relative hidden sm:block rounded-md hover:outline outline-gray-primary/50 transition-all  px-1 hover:bg-background/80"
        >
          <IoMdMenu className="h-6 w-6" />
        </button>
        <Link
          href={"/#"}
          className="w-12 h-12 relative z-10 inline-block rounded-full border border-gray-primary overflow-hidden"
        >
          <Image
            src={coreInfo.image}
            alt={coreInfo.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover w-full h-full"
          />
        </Link>
        <span className="max-md:hidden text-xl font-bold font-mono flex flex-col justify-center">
          <span>Dashboard</span>
          <span className="text-[10px] text-gray-secondary">
            {coreInfo.name}
          </span>
        </span>
      </span>

      {/* admins options */}
      <div className="flex justify-between items-center flex-1">
        <div className="flex items-center  gap-3 flex-1">
          <span className="flex-center max-sm:hidden flex-1 max-w-120 outline outline-gray-secondary/80 rounded-md overflow-hidden focus-within:outline-2 transition-all focus-within:outline-gray-secondary">
            <span className="px-2 bg-gray-secondary/50">
              <Search />
            </span>
            <input
              placeholder="Search Now"
              type="text"
              className="outline-none focus:outline-none px-2 flex-1 "
            />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggleButton />

          <button
            onClick={() => console.log("ShowSearch")}
            className="px-2 sm:hidden rounded-full hover:outline outline-gray-primary/50 hover:bg-background/80"
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
