"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { DashboardNavItems } from "../data";

const DashNavButtons = ({ shortNav }: { shortNav: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`px-1 py-1 border border-gray-secondary rounded-md bg-background ${shortNav? "w-fit": " lg:w-50 max-w-full"}`}>
      <div className="flex flex-col  justify-start gap-2 ">
        <Button
          onClick={() => router.push("/dashboard")}
          className={"flex justify-between items-center"}
          variant={
            pathname.toLowerCase() == "/dashboard" ? "default" : "outline"
          }
        >
          <span className="flex items-center gap-2">
            <MdOutlineSpaceDashboard />
            <span className={`${shortNav ? "hidden" : ""}`}>Dashboard</span>
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
              <Icon className="text-red-primary" />
              <span className={`${shortNav ? "hidden" : ""}`}>{label}</span>
            </span>
            <IoIosArrowForward className={`${shortNav ? "hidden" : ""}`} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashNavButtons;
