import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductsLoadinglayout = () => {
  return (
    <div className="max-w-384 mx-auto bg-background">
      <div className="flex-center">
        <div className="w-full max-[500px]:max-w-90 grid min-[500px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  2xl:grid-cols-5  justify-items-center items-stretch  px-3 py-2 box-border  gap-3">
          {Array.from({ length: 5 }, (_, index) => index).map((_, index) => (
            <div
              key={index}
              className="max-w-full box-border w-full h-90 flex flex-col gap-2 p-2 border rounded-sm"
            >
              <div className="flex items-center gap-2 pl-10">
                <Skeleton className="max-w-full box-border w-full h-8"></Skeleton>
                <Skeleton className="max-w-full box-border w-full h-8"></Skeleton>
              </div>
              <Skeleton className="max-w-full box-border w-full h-50"></Skeleton>
              <Skeleton className="max-w-full box-border w-3/4 h-10"></Skeleton>
              <Skeleton className="max-w-full box-border w-2/4 h-5"></Skeleton>
              <div className="flex items-center gap-2">
                <Skeleton className="max-w-full box-border w-3/5 h-3"></Skeleton>
                <Skeleton className="max-w-full box-border w-2/5 h-3"></Skeleton>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="max-w-full box-border w-3/5 h-3"></Skeleton>
                <Skeleton className="max-w-full box-border w-2/5 h-3"></Skeleton>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="max-w-full box-border w-3/5 h-3"></Skeleton>
                <Skeleton className="max-w-full box-border w-2/5 h-3"></Skeleton>
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
};

export default ProductsLoadinglayout;
