import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductLoadinglayout = () => {
  return (
    <div className="max-w-384 mx-auto bg-background">
      <div className="flex gap-5 md:flex-row flex-col p-3">
        <Skeleton className="aspect-video  w-full max-w-130"></Skeleton>
        <div className="w-full flex flex-col gap-4">
          <Skeleton className="h-12  w-1/2"></Skeleton>
          <Skeleton className="h-10  w-2/3"></Skeleton>
          <Skeleton className="h-10  w-full"></Skeleton>
          <Skeleton className="h-6  w-1/2"></Skeleton>
          <Skeleton className="h-6  w-full"></Skeleton>
          <div className="flex gap-4 w-1/2">
            <Skeleton className="h-16  w-full"></Skeleton>
            <Skeleton className="h-16  w-full"></Skeleton>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-4">
          <Skeleton className="h-12 w-2/5"></Skeleton>
          <Skeleton className="h-5 w-full"></Skeleton>
          <Skeleton className="h-5 w-2/3"></Skeleton>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-2/5"></Skeleton>
          <Skeleton className="h-5 w-full"></Skeleton>
          <Skeleton className="h-5 w-2/3"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default ProductLoadinglayout;
