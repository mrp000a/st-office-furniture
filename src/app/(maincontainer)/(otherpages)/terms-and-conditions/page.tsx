import { coreInfo, termsText } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";

const Page = () => {
  return (
    <div className="px-2">
      <div className="flex-center bg-background shadow-foreground/30 mx-auto box-border max-w-300 flex-col gap-4 rounded-lg p-4 shadow-lg">
        <span className="w-full py-4 text-center text-lg font-bold">
          Terms & Conditions
        </span>
        <hr className="w-full" />
        <div className="font-bangla w-full whitespace-pre-line">
          <h3 className="text-lg font-semibold">শর্তাবলী</h3>
          <ul className="list-disc space-y-2">
            {termsText &&
              termsText.map((item, index) => (
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
  title: `Terms & Conditions | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
