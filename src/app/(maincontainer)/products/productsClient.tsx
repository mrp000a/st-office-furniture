"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

import ProductClient from "@/components/uiComponent/productClient";
// import ProductPagination from "./paginationCom";
import SearchLayout from "@/components/common/searchLayout";
import SearchShowClient from "@/components/common/searchShowClient";
import { useRouter } from "next/navigation";
import PaginationLayout from "@/components/common/paginationLayout";
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
    <div className=" w-full space-y-1">
      <div className="py-2 px-3 relative w-full flex box-border border bg-background rounded-md  justify-between border-b border-b-gray-secondary/50 items-center flex-wrap max-w-384 mx-auto ">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
        <div className="gap-1 flex items-center flex-wrap">
          <div className=" flex-1">
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

      <div className="w-full max-w-382 mx-auto">
        <SearchShowClient pathnameSend="/products" />
      </div>

      <div className="max-w-384 flex-center w-full mx-auto ">
        {/* <Button onClick={loadProduct}>Set product</Button> */}
        {products && products.length > 0 ? (
          <div className="w-full max-[500px]:max-w-90 grid min-[500px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-5  justify-items-center items-stretch  px-3 py-2 box-border  gap-3">
            {products.map((item, index) => (
              <ProductClient item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className=" w-full flex-center pt-5 h-[calc(100vh - 300px)] max-h-100 px-4 box-border">
            <span className="text-center p-3 w-full rounded-md border-2 border-gray-secondary box-border">
              No Items Found
              {/* <Link href={`/products/${item.productCode}`}></Link> */}
            </span>
          </div>
        )}{" "}
      </div>
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default ProductsPageTest;
