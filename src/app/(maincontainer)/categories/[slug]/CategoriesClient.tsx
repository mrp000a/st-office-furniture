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
import { Category } from "@/generated/prisma";
import CategoryHeader from "@/components/common/categoryHeader";
import { getImageUrlProduct } from "@/lib/getImageUrl";
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

const CategoryClient = ({
  category,
  products,
  currentPage,
  totalPages,
}: {
  category: Category & { _count: { products: number } };
  products: serializedProductsType;
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  return (
    <div className=" w-full space-y-3">
      {/* header */}

      <CategoryHeader
        name={category.name}
        image={getImageUrlProduct(category.image)}
        description={category.description}
        productCount={category._count.products}
      />

      <div className="max-w-384 flex-center flex-col w-full mx-auto bg-background rounded-md border">
        <div className="w-full p-3">
          <h2 className="text-lg font-bold">Products</h2>
        </div>
        {/* <Button onClick={loadProduct}>Set product</Button> */}
        {products && products.length > 0 ? (
          <div className="w-full max-[500px]:max-w-90 grid min-[500px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-5  justify-items-center items-stretch  px-3 py-2 box-border  gap-3">
            {products.map((item, index) => (
              <ProductClient item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full h-full">
            <ProductsNotFound />
          </div>
        )}{" "}
      </div>
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default CategoryClient;
