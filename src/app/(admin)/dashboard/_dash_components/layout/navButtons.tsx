"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { DashboardNavItems } from "../data";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SquareArrowLeft } from "lucide-react";
import { useDashboardDrawer } from "@/context/SidebarContext";

const DashNavButtons = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setSidebarOpenMob, sidebarOpen, sidebarOpenMob } =
    useDashboardDrawer();

  return (
    <>
      <div
        className={`border-gray-secondary bg-background sticky top-12 hidden rounded-md border px-1 py-1 sm:block ${sidebarOpen ? "w-fit" : "max-w-full lg:w-50"}`}
      >
        <div className="flex flex-col justify-start gap-2">
          <Button
            onClick={() => {
              router.push("/dashboard");
            }}
            className={"flex items-center justify-between"}
            variant={
              pathname.toLowerCase() == "/dashboard" ? "destructive" : "outline"
            }
          >
            <span className="flex items-center gap-2">
              <MdOutlineSpaceDashboard className="text-red-primary" />
              <span className={`${sidebarOpen ? "hidden" : ""}`}>
                Dashboard
              </span>
            </span>
            <span></span>
          </Button>
          {DashboardNavItems.map(({ label, href, icon: Icon }, index) => (
            <Button
              onClick={() => router.push(href)}
              className={`flex items-center justify-between`}
              variant={pathname.startsWith(href) ? "destructive" : "outline"}
              key={index}
              size={"lg"}
            >
              <span className="flex items-center gap-2">
                <Icon className="text-red-primary" />
                <span className={`${sidebarOpen ? "hidden" : ""}`}>
                  {label}
                </span>
              </span>
              <IoIosArrowForward className={`${sidebarOpen ? "hidden" : ""}`} />
            </Button>
          ))}
        </div>
      </div>
      <div className={`sm:hidden ${sidebarOpenMob ? "" : "bg-red-primary"} `}>
        <Drawer
          open={sidebarOpenMob}
          direction="left"
          onOpenChange={setSidebarOpenMob}
        >
          <DrawerContent className="z-9999 px-3 py-2">
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex items-center justify-between">
                  <span>Dashboard</span>
                  <Button
                    onClick={() => {
                      setSidebarOpenMob((e) => !e);
                    }}
                    variant={"outline"}
                  >
                    <SquareArrowLeft />
                  </Button>
                </div>
              </DrawerTitle>
              <span className="text-gray-secondary w-full text-center">
                Navigation
              </span>
            </DrawerHeader>
            <div className="flex flex-col justify-start gap-2">
              <Button
                onClick={() => {
                  router.push("/dashboard");
                  const time = setTimeout(() => {
                    setSidebarOpenMob(false);
                    clearTimeout(time);
                  }, 500);
                }}
                className={"flex items-center justify-between"}
                variant={
                  pathname.toLowerCase() == "/dashboard" ? "default" : "outline"
                }
              >
                <span className="flex items-center gap-2">
                  <MdOutlineSpaceDashboard className="text-green-primary" />
                  <span className={``}>Dashboard</span>
                </span>
                <span></span>
              </Button>
              {DashboardNavItems.map(({ label, href, icon: Icon }, index) => (
                <Button
                  onClick={() => {
                    router.push(href);
                    const time = setTimeout(() => {
                      setSidebarOpenMob(false);
                      clearTimeout(time);
                    }, 500);
                  }}
                  className={`flex items-center justify-between`}
                  variant={pathname.startsWith(href) ? "default" : "outline"}
                  key={index}
                  size={"lg"}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="text-green-primary" />
                    <span>{label}</span>
                  </span>
                  <IoIosArrowForward />
                </Button>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default DashNavButtons;
