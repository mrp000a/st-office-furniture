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
        className={`px-1 hidden sm:block  sticky top-12 py-1 border border-gray-secondary rounded-md bg-background ${sidebarOpen ? "w-fit" : " lg:w-50 max-w-full"}`}
      >
        <div className="flex flex-col  justify-start gap-2 ">
          <Button
            onClick={() => {
              router.push("/dashboard");
            }}
            className={"flex justify-between items-center"}
            variant={
              pathname.toLowerCase() == "/dashboard" ? "default" : "outline"
            }
          >
            <span className="flex items-center gap-2">
              <MdOutlineSpaceDashboard className="text-green-primary" />
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
              variant={pathname.startsWith(href) ? "default" : "outline"}
              key={index}
              size={"lg"}
            >
              <span className="flex items-center gap-2">
                <Icon className="text-green-primary" />
                <span className={`${sidebarOpen ? "hidden" : ""}`}>
                  {label}
                </span>
              </span>
              <IoIosArrowForward className={`${sidebarOpen ? "hidden" : ""}`} />
            </Button>
          ))}
        </div>
      </div>
      <div className={`sm:hidden ${sidebarOpenMob ? "" : "bg-green-primary"} `}>
        <Drawer
          open={sidebarOpenMob}
          direction="left"
          onOpenChange={setSidebarOpenMob}
        >
          <DrawerContent className="z-9999 px-3 py-2 ">
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex justify-between items-center">
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
              <span className="w-full text-gray-secondary text-center">
                Navigation
              </span>
            </DrawerHeader>
            <div className="flex flex-col  justify-start gap-2 ">
              <Button
                onClick={() => {
                  router.push("/dashboard");
                  const time = setTimeout(() => {
                    setSidebarOpenMob(false);
                    clearTimeout(time);
                  }, 500);
                }}
                className={"flex justify-between items-center"}
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
