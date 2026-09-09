import { Suspense } from "react";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import PageRegisterForm from "./PageRegister";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <PageRegister /> */}
      <PageRegisterForm />
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: `Register | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
