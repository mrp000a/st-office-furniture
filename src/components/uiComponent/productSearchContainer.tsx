"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Product } from "@/generated/prisma";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { NoItemsFound } from "./uiCom";
import { ProductDefaultImage } from "../data/core";
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
    <div className="grid grid-cols-1 space-y-1 flex-1 w-full max-w-280 relative ">
      <div className="flex w-full rounded-md">
        <Input
          ref={focusRef}
          className={`w-full   backdrop-blur-sm`}
          value={productSearchString}
          onChange={(e) => setProductSearchString(e.target.value)}
          placeholder="Search Products!"
        />{" "}
        <Button
          type="button"
          onClick={() => {
            if (productSearchString.length === 0) return;
            router.push(`/products?search=${productSearchString}`);
            setProductSearchString("");
          }}
        >
          <span className="flex items-center gap-2">
            <Search />
            <span>Search</span>
          </span>
        </Button>
      </div>
      <div
        className={`${productSearchString.length > 0 ? "" : "hidden"} flex flex-col  gap-2 p-2 w-full absolute top-full bg-background z-30  max-h-125 overflow-y-auto overflow-x-hidden`}
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
              className="flex hover:-translate-y-0.5 cursor-pointer hover:bg-violet-primary/30 min-h-14 justify-start items-center gap-2 overflow-hidden px-2 py-1 rounded-md border box-border border-gray-secondary "
            >
              <div className=" relative h-10 w-10 min-h-10 min-w-10 overflow-hidden rounded-sm border border-green-primary">
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
