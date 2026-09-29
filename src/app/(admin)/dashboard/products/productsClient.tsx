"use client";

import { ChevronRight, CirclePlus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SearchLayout from "@/components/common/searchLayout";
import Link from "next/link";
import { IoReload } from "react-icons/io5";
import ProductAdmin from "../_dash_components/common/adminProduct";
import PaginationLayout from "@/components/common/paginationLayout";
import SearchShowClient from "@/components/common/searchShowClient";
import { Badge } from "@/components/ui/badge";
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

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <Settings className="h-4 w-4" />
              <span>Administration</span>
              <ChevronRight className="h-4 w-4" />
              <span>Products</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Products
            </h1>

            <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
              Manage your products from one place.
            </p>
          </div>
        </div>
      </section>
      <div className="relative box-border flex flex-wrap items-center justify-between">
        <div className="flex w-full flex-wrap items-center gap-1">
          <div className="flex-1">
            <SearchLayout />
          </div>
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
      <hr className="inline-block w-full py-1" />
      <SearchShowClient />

      {/* main  */}
      <div className="flex-center">
        <div className="max-sm:flex-center flex-center flex w-full flex-wrap items-stretch gap-4">
          {products &&
            products.length > 0 &&
            products.map((item, index) => (
              <div key={index} className="flex w-full max-w-70 max-sm:max-w-65">
                <ProductAdmin item={item} />
              </div>
            ))}
        </div>
      </div>
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default ProductsPageTest;
