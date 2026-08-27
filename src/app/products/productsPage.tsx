"use client";

import { RotateCcw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Category, Product } from "@/generated/prisma";
import ProductClient from "@/components/uiComponent/productClient";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api";

const ProductsPage = () => {

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [productLoadLimit, setProductLoadLimit] = useState<number>(25);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const [searchProductString, setSearchProductString] = useState<string>(
    searchParams.get("search") ?? "",
  );
  const [searchCategoryString, setSearchCategoryString] = useState<string>(
    searchParams.get("category") ?? "",
  );
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const [products, setProducts] = useState<
    Array<
      Product & {
        category: Category;
        _count: {
          descriptions: number;
          reviews: number;
          orderItems: number;
          cartItems: number;
        };
      }
    >
  >([]);

  const loadProducts = useCallback(async () => {
    const data = await getProducts({
      searchString: searchProductString,
      category: searchCategoryString,
      limit: productLoadLimit ?? 50,
    });
    // console.log(data);
    if (!data.success) return;
    setProducts(data.result);
  }, [searchProductString, productLoadLimit, searchCategoryString]);

  useEffect(() => {
    const a = () => {
      loadProducts();
    };
    a();
  }, [loadProducts]);

  useEffect(() => {
    const s = searchParams.get("search");
    const c = searchParams.get("category");
    const a = () => {
      setSearchProductString(s ?? "");
      setSearchCategoryString(c ?? "");
    };
    a();
  }, [searchParams]);

  // useEffect(() => {
  //   const a = async () => {
  //     await loadProducts();
  //     console.log(searchProductString);
  //   };
  //   a();
  // }, [loadProducts, searchProductString, searchCategoryString]);

  return (
    <div className=" w-full space-y-1">
      <div className="py-2 px-3 relative w-full flex box-border border bg-background rounded-md  justify-between border-b border-b-gray-secondary/50 items-center flex-wrap max-w-384 mx-auto ">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
        <div className="flex-center box-border relative gap-2 flex-wrap max-w-full">
          <div className="hidden sm:flex justify-center items-center focus-within:ring-2 max-w-full focus-within:ring-gray-secondary/80 transition-all ring-gray-secondary/50 ring rounded-md overflow-hidden  gap-1">
            <button
              className="bg-gray-secondary/20 h-full w-fit p-1 px-2"
              onClick={async () =>
                router.push(`/products?search=${searchProductString}`)
              }
            >
              <Search />
            </button>
            <input
              value={searchProductString ?? ""}
              onChange={(e) => setSearchProductString(e.target.value)}
              className="focus:bg-none max-w-full focus:outline-none"
              placeholder="Search Product"
            />
          </div>

          {/* buttons  */}
          <Button
            variant={"outline"}
            size={"icon-lg"}
            onClick={async () => setIsSearchOpen((e) => !e)}
            className="sm:hidden"
          >
            <Search />
          </Button>
          <Button
            variant={"outline"}
            size={"icon-lg"}
            onClick={async () => console.log("object")}
          >
            <RotateCcw />
          </Button>
        </div>
        {/* mobile search overlay */}
        <div
          className={`absolute  left-0 w-full pl-8  rounded-sm  py-1 box-border flex justify-end items-center transition-all duration-300 sm:hidden z-30 ${
            isSearchOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }`}
        >
          <div className="bg-background  flex-center focus-within:ring-2 max-w-full focus-within:ring-gray-secondary/80 transition-all ring-gray-secondary/50 ring rounded-md overflow-hidden  gap-1">
            <button
              className="bg-gray-secondary/20 h-full w-fit p-1 px-2"
              onClick={async () => console.log("object")}
            >
              <Search />
            </button>
            <input
              onChange={(e) => setSearchProductString(e.target.value)}
              className="focus:bg-none max-w-full focus:outline-none"
              placeholder="Search Product"
            />
          </div>

          <Button
            variant={"outline"}
            // size={"icon-lg"}
            onClick={async () => setIsSearchOpen((e) => !e)}
            className="sm:hidden"
          >
            {/* <X /> */}
            Close
          </Button>
        </div>
      </div>
      {/* search client */}
      <div
        className={`max-w-384 w-full mx-auto rounded-md gap-2 flex flex-wrap text-gray-primary/80 `}
      >
        <span className={`${searchProductString.length > 0 ? "" : "hidden"}`}>
          Showing result for {`"${searchProductString}"`}
        </span>
        <span>
          {searchProductString.length > 0 &&
            searchCategoryString.length > 0 &&
            "In"}
        </span>
        <span className={`${searchCategoryString.length > 0 ? "" : "hidden"}`}>
          Category : {`"${searchCategoryString}"`}
        </span>
        <Button
          onClick={() => {
            setSearchCategoryString("");
            setSearchProductString("");
          }}
          className={`${searchCategoryString.length > 0 || searchProductString.length > 0 ? "" : "hidden"}`}
          variant={"destructive"}
        >
          <X />
        </Button>
      </div>

      <div className="max-w-384 flex-center w-full mx-auto ">
        {/* <Button onClick={loadProduct}>Set product</Button> */}
        {products &&
        products.filter((item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchProductString.toLocaleLowerCase()),
        ).length > 0 ? (
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-5  justify-items-center items-stretch  px-3 py-2 box-border  gap-3">
            {products
              .filter((item) =>
                item.title
                  .toLocaleLowerCase()
                  .includes(searchProductString.toLocaleLowerCase()),
              )
              .map((item, index) => (
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
      <div className="flex-center py-4 ">
        <Button
          onClick={() => {
            setProductLoadLimit((e) => e + 15);
          }}
          variant={"outline"}
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export default ProductsPage;
