import { Suspense } from "react";
import PageRegister from "./PageRegister";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageRegister />
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: `Register | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
