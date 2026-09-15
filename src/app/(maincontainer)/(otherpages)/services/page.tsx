import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex-center flex-col max-w-384 mx-auto p-2 bg-background shadow-md shadow-background dark:shadow-foreground/69 rounded-md">
        <span className="text-lg font-bold">Our Services</span>
        <div className="w-full text-justify space-y-2">
          <p>Here is what we offer:</p>
          <p>
            1. manufacture furniture using highly skilled craftsmen and provide
            delivery across Bangladesh.
          </p>
          <p>2. We sell all types of parts for chairs and sofas.</p>
          <p>3.We repair old or damaged ones.</p>
          <p>
            4 Additionally,we sell all kinds of furniture and parts at wholesale
            prices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Services | ${coreInfo.name}`,
  description: "Services page of st office furniture",
};
