import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductsLoadinglayout = () => {
  return (
    <div className="bg-background mx-auto max-w-384">
      <div className="box-border grid w-full items-stretch justify-items-center gap-3 px-3 py-2 max-[500px]:max-w-90 min-[500px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => index).map((_, index) => (
          <div
            key={index}
            className="box-border flex h-90 w-full max-w-full flex-col gap-2 rounded-sm border p-2"
          >
            <Skeleton className="box-border h-50 w-full max-w-full"></Skeleton>
            <Skeleton className="box-border h-10 w-3/4 max-w-full"></Skeleton>
            <Skeleton className="box-border h-5 w-2/4 max-w-full"></Skeleton>
            <div className="flex items-center gap-2">
              <Skeleton className="box-border h-7 w-2/5 max-w-full"></Skeleton>
              <Skeleton className="box-border h-7 w-2/5 max-w-full"></Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="box-border h-10 w-full max-w-full"></Skeleton>
              <Skeleton className="box-border h-10 w-full max-w-full"></Skeleton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsLoadinglayout;
