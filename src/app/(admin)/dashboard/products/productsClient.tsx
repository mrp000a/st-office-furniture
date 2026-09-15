"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SearchLayout from "@/components/common/searchLayout";
import Link from "next/link";
import { IoReload } from "react-icons/io5";
import ProductAdmin from "../_dash_components/common/adminProduct";
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
    <div className="box-border">
      {/* header  */}
      <div className="flex justify-between items-center flex-wrap box-border relative">
        <h2 className="text-2xl font-bold font-mono">Products</h2>
        <div className="gap-1 flex items-center flex-wrap ">
          <SearchLayout />
          <Button variant={"default"} asChild>
            <Link href={"/dashboard/products/add"}>
              <CirclePlus /> <span>Add </span>
            </Link>
          </Button>
          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="py-1 inline-block w-full" />

      <div>
        <div className="flex flex-wrap items-stretch gap-3">
          {products &&
            products.length > 0 &&
            products.map((item, index) => (
              <div key={index} className="w-60 max-w-60 flex">
                <ProductAdmin item={item} />
              </div>
            ))}
        </div>
        <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ProductsPageTest;
