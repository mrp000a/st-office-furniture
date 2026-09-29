"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

import ProductClient from "@/components/uiComponent/productClient";
// import ProductPagination from "./paginationCom";
import SearchLayout from "@/components/common/searchLayout";
import SearchShowClient from "@/components/common/searchShowClient";
import { useRouter } from "next/navigation";
import PaginationLayout from "@/components/common/paginationLayout";
import ProductsNotFound from "@/components/common/not-found-pages/products-not-found";
// import { getProducts } from "@/lib/api";

type serializedProductsType = {
  price: number;
  discountPrice: number | null;
  discount: number | null;
  category: {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    image: string | null;
    description: string | null;
  } | null;
  _count: {
    descriptions: number;
    reviews: number;
    orderItems: number;
    cartItems: number;
  };
  id: number;
  title: string;
  productCode: string;
  images: string[];
  brand: string | null;
  keyFeatures: string[];
  stock: number;
  categoryId: number | null;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}[];

const ProductsPageTest = ({
  products,
  totalPages,
  currentPage,
}: {
  products: serializedProductsType;
  totalPages: number;
  currentPage: number;
}) => {
  const router = useRouter();
  return (
    <div className="w-full space-y-1">
      {/* header */}
      <div className="bg-background border-b-gray-secondary/50 relative mx-auto box-border flex w-full max-w-384 flex-wrap items-center justify-between rounded-md border border-b px-3 py-2">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <div className="flex-1">
            <SearchLayout />
          </div>
          {/* buttons  */}

          <Button
            variant={"outline"}
            size={"icon-lg"}
            onClick={async () => router.refresh()}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-382">
        <SearchShowClient pathnameSend="/products" />
      </div>

      <div className="flex-center mx-auto w-full max-w-384">
        {/* <Button onClick={loadProduct}>Set product</Button> */}
        {products && products.length > 0 ? (
          <div className="box-border grid w-full items-stretch justify-items-center gap-3 px-3 py-2 max-[500px]:max-w-90 min-[500px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
            {products.map((item, index) => (
              <ProductClient item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="h-full w-full">
            <ProductsNotFound />
          </div>
        )}{" "}
      </div>
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default ProductsPageTest;
