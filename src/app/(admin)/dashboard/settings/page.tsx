"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import { useRouter } from "next/navigation";
import SettingsPage from "./settingclient";

const Page = () => {
  const router = useRouter();

  return (
    <div className="">
      
      <div>
        <SettingsPage />
      </div>
    </div>
  );
};

export default Page;
