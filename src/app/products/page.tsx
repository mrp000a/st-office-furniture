import { coreInfo } from "@/components/data/core";
import { Metadata } from "next";
import React from "react";
import ProductsPage from "./productsPage";

const Page = () => {
  return (
    <>
      <ProductsPage />
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: `Products | ${coreInfo.name}`,
  description: "contact page of st office furniture",
};
