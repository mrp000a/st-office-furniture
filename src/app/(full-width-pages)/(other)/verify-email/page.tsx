import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React, { Suspense } from "react";
import VerifyEmailPage from "./pageVerify";

const page = () => {
  return (
    <>
      <Suspense>
        <VerifyEmailPage />
      </Suspense>
    </>
  );
};

export default page;

export const metadata: Metadata = {
  title: `Verify Email | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
