"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { coreInfo, navItems } from "@/components/data/core";
import { Button } from "@/components/ui/button";
import { SquareArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const MobileNavDrawar = ({
  openMobNav,
  setOpenMobNav,
}: {
  openMobNav: boolean;
  setOpenMobNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <Drawer open={openMobNav} direction="left" onOpenChange={setOpenMobNav}>
        <DrawerContent className="z-9999 px-3 py-2 ">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex justify-between items-center">
                <span>{coreInfo.name}</span>
                <Button
                  onClick={() => setOpenMobNav(false)}
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
          <div className="flex flex-col justify-start gap-2 px-4 overflow-auto">
            {navItems.map(({ href, label }, index) => (
              <Button
                variant={
                  pathname === href
                    ? "destructive"
                    : href !== "/" && pathname.startsWith(href)
                      ? "destructive"
                      : "outline"
                }
                onClick={() => {
                  router.push(href);
                  const timerId = setTimeout(() => {
                    setOpenMobNav(() => false);
                    clearTimeout(timerId);
                  }, 500);
                }}
                key={index}
              >
                {label}
              </Button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavDrawar;
