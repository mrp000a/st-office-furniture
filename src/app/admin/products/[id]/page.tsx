import React from "react";
import ProductPage from "./ProductPage";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { id } = await params;
  const { query } = await searchParams;
  return (
    <div>
      <ProductPage /> {id}
      someting you have to know
    </div>
  );
};

export default Page;
