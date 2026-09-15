import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div className="p-2">
      <div className="flex-center flex-col max-w-384 mx-auto p-2 shadow-background dark:shadow-foreground/69 bg-background shadow-md rounded-md">
        <span className="text-lg font-bold">About Us</span>
        <div className="w-full text-justify space-y-2">
          <h3>Welcome to ST Office Furniture.</h3>
          <p>
            ST Office Furniture is a company with extensive experience in
            furniture manufacturing. We produce chairs, sofas, and various
            furniture items in our own factory using skilled craftsmen, and we
            supply them on a wholesale basis across Bangladesh with a commitment
            to integrity. We bring seven years of experience to the table.
            Please contact us to furnish your office, workstation, or home.
          </p>
          <p>
            Our primary goal is to provide highly durable furniture featuring
            modern designs, allowing you to decorate your space without worrying
            about product longevity.
          </p>
          <p>
            As the world and {"people's"} tastes evolve over time, we continuously
            introduce new collections to ensure customers can find products that
            match their preferences.
          </p>
          <p>Thanks.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `About | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
