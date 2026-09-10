"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProducts } from "@/lib/api";
import ProductAdmin from "../_dash_components/common/adminProduct";
import { ProductTypeAdmin } from "@/lib/formDataTypes";
import { CirclePlus, Search, X } from "lucide-react";
import Link from "next/link";

const DashProducts = () => {
  const router = useRouter();
  const [openEditProductDialog, setOpenEditProductDialog] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const [products, setProducts] = useState<ProductTypeAdmin[] | null>(null);

  const searchParams = useSearchParams();
  const [productLoadLimit, setProductLoadLimit] = useState<number>(25);
  const [searchProductString, setSearchProductString] = useState<string>("");
  const [searchCategoryString, setSearchCategoryString] = useState<string>(
    searchParams.get("category") ?? "",
  );

  const loadProducts = useCallback(async () => {
    const res = await getProducts({
      searchString: searchProductString,
      category: searchCategoryString,
      limit: productLoadLimit ?? 50,
    });
    if (!res.success) return;

    setProducts(res.result);
  }, [searchCategoryString, searchProductString, productLoadLimit]);

  useEffect(() => {
    function Load() {
      loadProducts();
    }
    Load();
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

  return (
    <div className="box-border">
      {/* header  */}
      <div className="flex justify-between items-center flex-wrap box-border relative">
        <h2 className="text-2xl font-bold font-mono">Products</h2>
        <div className="gap-1 flex items-center flex-wrap ">
          <div
            className={`${openSearchBar ? "max-sm:opacity-100 max-sm:top-full max-sm:right-0" : "max-sm:opacity-0 max-sm:-top-8 max-sm:z-0 max-sm:right-0"} absolute  bg-background z-30  sm:relative  flex justify-center items-center  transition-all focus-within:ring-2 max-w-full focus-within:ring-gray-secondary/80 duration-500 ring-gray-secondary/50 ring rounded-md overflow-hidden  gap-1`}
          >
            <button
              className="bg-gray-secondary/20 h-full w-fit p-1 px-2"
              onClick={async () =>
                router.push(`/dashboard/products?search=${searchProductString}`)
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
          <Button
            onClick={() => setOpenSearchBar((e) => !e)}
            variant={"outline"}
            className={`sm:hidden`}
            type="button"
          >
            <Search />
          </Button>
          <Button variant={"default"} asChild>
            <Link href={"/dashboard/products/add"}>
              <CirclePlus /> <span>Add </span>
            </Link>
          </Button>
          <Button onClick={() => loadProducts()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="py-1 inline-block w-full" />
      {/* search show client  */}
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

      <div>
        <div className="flex flex-wrap items-stretch gap-3">
          {products &&
            products.length > 0 &&
            products.map((item, index) => (
              <div key={index} className="w-60 max-w-60 flex">
                <ProductAdmin item={item} load={loadProducts} />
              </div>
            ))}
        </div>
      </div>

      {/* all dialogs  */}
      <Dialog
        open={openEditProductDialog}
        onOpenChange={setOpenEditProductDialog}
      >
        <DialogContent
          className="
      sm:max-w-350
      sm:w-[calc(100%-8rem)]
      max-h-[90vh]
      flex
      flex-col
      overflow-hidden
    "
        >
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to your product here. Click save when {"you're"}{" "}
              done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashProducts;
