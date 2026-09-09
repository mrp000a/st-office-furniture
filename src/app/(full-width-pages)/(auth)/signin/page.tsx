import { Suspense } from "react";
import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import PageLogin from "./signinPage";
import SignInForm from "./signInNewPage";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <PageLogin /> */}
      <SignInForm />
      {/* <PageLogin/> */}
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: `Sign In | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
