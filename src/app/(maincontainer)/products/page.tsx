import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React, { Suspense } from "react";
import ProductsPage from "./productsPage";

const Page = () => {
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Products | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
