import {
  coreInfo,
  deliveryPolicyText,
  termsText,
} from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div className="px-2">
      <div className="flex-center gap-4 flex-col max-w-300 mx-auto p-4 box-border rounded-lg bg-background shadow-lg shadow-foreground/30 ">
        <span className="text-lg font-bold py-4  w-full text-center">
          Delivery Policy
        </span>
        <hr className="w-full" />
        <div className="whitespace-pre-line font-bangla w-full">
          <h3 className="text-lg font-semibold">ডেলিভারি নীতিমালা</h3>
          <ul className="list-disc space-y-2">
            {deliveryPolicyText &&
              deliveryPolicyText.map((item, index) => (
                <li className="list-inside" key={index}>
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Delivery Policy | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
