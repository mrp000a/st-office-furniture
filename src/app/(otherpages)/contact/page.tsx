import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex-center max-w-384 mx-auto p-2">
        <span className="text-lg font-bold">Contact Us</span>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Contact | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
