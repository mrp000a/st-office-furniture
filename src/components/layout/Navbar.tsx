"use client";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { coreInfo, navItems, ProfileDefaultImage } from "../data/core";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useRouter } from "next/navigation";
import { NavLinks } from "../uiComponent/uiCom";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [openMobNav, setOpenMobNav] = useState<boolean>(false);
  const { status, data } = useSession();
  const user = data?.user;
  const pathName = usePathname();
  const batchSlug = pathName.split("/").filter(Boolean)[0];

  const router = useRouter();
  return (
    <header className="bg-gray-primary/20 z-9999 backdrop-blur-sm sticky top-0 border border-gray-600 box-border py-2 px-3 ">
      <div className="w-full h-full justify-center items-center flex relative">
        <div className="max-w-384 w-full mx-auto flex justify-between items-center">
          {/* left of navbar  */}
          {/* <Link
            href={"/ "}
            className="h-20 w-32 relative rounded-md border border-gray-primary overflow-hidden"
          >
            <Image
              src={coreInfo.image}
              alt="Ais 30 logo"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover z-999"
            />
          </Link> */}

          <Link href={"/"}>
            <span className="text-4xl font-bold text-shadow-md text-shadow-blue-800 text-background">
              AIS
            </span>
          </Link>

          {/* right of navbar  */}

          <div className="space-x-3 flex justify-center items-center ">
            {status === "unauthenticated" || status === "loading" ? (
              <>
                <Button
                  className=""
                  onClick={() => router.push("signin")}
                  variant={"default"}
                  size={"lg"}
                >
                  Log In
                </Button>
                <Button
                  onClick={() => router.push("register")}
                  size={"lg"}
                  className="bg-red-primary text-background"
                >
                  Register
                </Button>
              </>
            ) : (
              <button
                className="flex-center gap-2 font-semibold cursor-pointer px-2 py-1"
                onClick={() => router.push("/profile")}
              >
                <div className="relative w-12 h-12 aspect-video  rounded-full overflow-hidden outline-3 outline-gray-secondary">
                  <Image
                    fill
                    className={`object-cover object-center overflow-hidden rounded-full relative w-200 h-300 ${user?.image ? "" : "mix-blend-darken"}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={`${process.env.NEXT_PUBLIC_URL_R2}/${user?.image ?? ProfileDefaultImage}`}
                    alt=""
                  />
                </div>
                <span>
                  {user?.name?.split(" ")[0]} {user?.name?.split(" ")[1]}
                </span>
              </button>
            )}
            <button
              onClick={() => setOpenMobNav((e) => !e)}
              className="md:hidden flex justify-center items-center box-border p-2 rounded-md hover:bg-secondary active:bg-secondary/20 active:translate-y-px transition-all"
            >
              <Menu />
            </button>
            <Drawer
              open={openMobNav}
              direction="right"
              onOpenChange={setOpenMobNav}
            >
              <DrawerContent className="z-9999 px-3 py-2 ">
                <DrawerHeader>
                  <DrawerTitle>AIS</DrawerTitle>
                  <span className="w-full text-gray-secondary text-center">
                    Navigation
                  </span>
                </DrawerHeader>
                <div className="flex flex-col justify-start gap-2 px-4 overflow-auto">
                  {navItems.map(({ href, label }, index) => (
                    <button
                      onClick={() => {
                        router.push(`${batchSlug}/${href}`);
                        const timerId = setTimeout(() => {
                          setOpenMobNav(() => false);
                          clearTimeout(timerId);
                        }, 500);
                      }}
                      key={index}
                      className="px-2 py-1 rounded-sm hover:bg-background/50 bg-gray-secondary/50 transition-all hover:outline hover:outline-gray-primary/40 border border-gray-primary cursor-pointer "
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <nav className="absolute hidden md:flex justify-between items-center gap-3">
          {navItems.map(({ href, label }, index) => (
            <NavLinks key={index} href={`/${batchSlug}${href}`} label={label} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
