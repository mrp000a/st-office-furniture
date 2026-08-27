"use client";
import { coreInfo, ProfileDefaultImage } from "@/components/data/core";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdMenu } from "react-icons/io";
import { MdMoreHoriz, MdNotifications } from "react-icons/md";

const DashHeader = ({
  shortNav,
  setShortNav,
}: {
  shortNav: boolean;
  setShortNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="flex justify-between gap-1 md:gap-4 items-center bg-gray-secondary/20 px-2  rounded-sm border border-gray-secondary">
      {/* logo */}
      <span className="flex items-center gap-2 max-md:gap-0">
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
          <button
            onClick={() => setShortNav((e) => !e)}
            className="relative rounded-md hover:outline outline-gray-primary/50 transition-all  px-1 hover:bg-background/80"
          >
            <IoMdMenu className="h-6 w-6" />
          </button>
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
          <button onClick={()=> console.log("ShowSearch")} className="px-2 sm:hidden rounded-full hover:outline outline-gray-primary/50 hover:bg-background/80">
            <Search />
          </button>

          {/* Notifications */}
          <span className="relative rounded-full hover:outline outline-gray-primary/50 transition-all  py-1 hover:bg-background/80">
            <MdNotifications className="h-7 w-10 " />
            <span className="absolute top-1 right-1.5">
              <GoDotFill className="rounded-full text-red-primary" />
            </span>
          </span>

          {/* admin profile */}
          <span>
            <span className="w-8 h-8 relative z-10 inline-block rounded-full border border-gray-primary overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_R2}/${user?.image ?? ProfileDefaultImage}`}
                alt={user?.name ?? ""}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover w-full h-full"
              />
            </span>
          </span>

          {/* more button */}
          <button className="rounded-full text-lg px-1 hover:bg-background/80 hover:outline outline-gray-primary/50 transition-all">
            <MdMoreHoriz className="h-7 w-10   text-lg font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
