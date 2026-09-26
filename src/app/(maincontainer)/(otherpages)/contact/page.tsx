import ContactInfoClient from "@/components/common/contactInfo";
import MessageForm from "@/components/common/forms/messageForm";
import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import officeImage from "@/components/images/Office/open-plan-work-space.jpg";

const Page = () => {
  return (
    <div className="p-2">
      <div className="flex-center flex-col max-w-384 mx-auto p-2 gap-2 shadow-background dark:shadow-foreground/69 bg-background shadow-md rounded-md">
        <span className="text-lg font-bold">Contact Us</span>

        <div className="space-y-2 w-full flex flex-col md:flex-row  gap-2">
          <div className="flex-1 w-full">
            <ContactInfoClient />
          </div>
          <div className="flex-1 w-full space-y-1 ">
            <div className="w-full flex-center p-2 border rounded-md">
              <div
                className={` relative aspect-video w-full max-w-lg rounded-md ring ring-gray-secondary   overflow-hidden text-shadow-2xs text-shadow-blue-primary `}
              >
                <Image
                  unoptimized
                  fill
                  className={`object-cover object-center overflow-hidden `}
                  sizes="80vw"
                  src={officeImage}
                  alt={"Hero images"}
                  loading={"eager"}
                />
              </div>
            </div>
            <div>
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Contact | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
