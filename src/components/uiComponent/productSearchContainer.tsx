"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Product } from "@/generated/prisma";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/api";
import Image from "next/image";
import { NoItemsFound } from "./uiCom";
import { getImageUrlProduct } from "@/lib/getImageUrl";

const ProductSearchContainer = ({
  focusRef,
  overLayer,
}: {
  focusRef?: React.RefObject<HTMLInputElement | null>;
  overLayer?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [productSearchString, setProductSearchString] = useState<string>("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const router = useRouter();

  const loadProducts = useCallback(async () => {
    if (productSearchString.length === 0) return;
    const data = await getProducts({ searchString: productSearchString ?? "" });
    if (!data.success) return;
    setProducts(data.result);
  }, [productSearchString]);

  useEffect(() => {
    const a = () => {
      loadProducts();
    };
    a();
  }, [loadProducts]);

  return (
    <div className="relative grid w-full max-w-280 flex-1 grid-cols-1 space-y-1">
      <div className="outline-gray-secondary flex h-8 w-full overflow-hidden rounded-full outline transition-all focus-within:outline-3">
        <input
          ref={focusRef}
          className={`bg-background/50 w-full flex-1 bg-none px-4 backdrop-blur-sm outline-none`}
          value={productSearchString}
          onChange={(e) => setProductSearchString(e.target.value)}
          placeholder="Search Products!"
        />{" "}
        <button
          className="bg-gray-primary dark:bg-gray-secondary h-full px-3"
          type="button"
          onClick={() => {
            if (productSearchString.length === 0) return;
            setProductSearchString("");
            router.push(`/products?search=${productSearchString}`);
          }}
        >
          <Search className="text-white" />
        </button>
      </div>
      <div
        className={`${productSearchString.length > 0 ? "" : "hidden"} bg-background absolute top-full z-30 flex max-h-125 w-full flex-col gap-2 overflow-x-hidden overflow-y-auto p-2`}
      >
        {products && productSearchString.length > 0 && products.length > 0 ? (
          products.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                router.push(`/products/${item.productCode}`);
                setProductSearchString("");
                if (typeof overLayer !== "undefined") overLayer(false);
              }}
              className="hover:bg-violet-primary/30 border-gray-secondary box-border flex min-h-14 cursor-pointer items-center justify-start gap-2 overflow-hidden rounded-md border px-2 py-1 hover:-translate-y-0.5"
            >
              <div className="border-green-primary relative h-10 min-h-10 w-10 min-w-10 overflow-hidden rounded-sm border">
                <Image
                  unoptimized
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="overflow-hidden object-cover"
                  src={getImageUrlProduct(item.images[0])}
                  alt=""
                />
              </div>
              <div className="flex-1 gap-2 text-start">
                <span className="line-clamp-2">{item.title}</span>
              </div>
              <span className=" ">
                ৳
                {item.discount
                  ? item.discountPrice?.toString()
                  : item.price.toString()}
              </span>
            </button>
          ))
        ) : (
          <NoItemsFound />
        )}
      </div>
    </div>
  );
};

export default ProductSearchContainer;
