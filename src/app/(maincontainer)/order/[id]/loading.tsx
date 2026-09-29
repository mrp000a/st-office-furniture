import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const OrderLoadinglayout = () => {
  return (
    <div className="bg-background mx-auto max-w-384">
      <div className="flex flex-col items-start justify-start gap-4 p-3 md:flex-row">
        <div className="flex w-full flex-1 flex-col items-center gap-2 rounded-md border p-6">
          <div className="flex-center w-full flex-col gap-2">
            <Skeleton className="box-border min-h-10 w-64 max-w-full"></Skeleton>
            <Skeleton className="box-border min-h-8 w-36 max-w-full"></Skeleton>
          </div>
          <Skeleton className="box-border min-h-50 w-full max-w-full"></Skeleton>
          <div className="flex w-full">
            <Skeleton className="h-7 w-48" />
          </div>
          <div className="w-full space-y-3">
            <Skeleton className="box-border min-h-10 w-full max-w-full"></Skeleton>
            <Skeleton className="box-border min-h-10 w-full max-w-full"></Skeleton>
            <Skeleton className="box-border min-h-10 w-full max-w-full"></Skeleton>
            <Skeleton className="box-border min-h-10 w-full max-w-full"></Skeleton>
          </div>

          <div className="flex w-full items-end justify-end">
            <Skeleton className="h-12 w-48" />
          </div>
        </div>

        <div className="flex w-full max-w-lg flex-1 items-center gap-2 rounded-md border p-5">
          <div className="w-full space-y-5">
            <Skeleton className="box-border h-36 w-full max-w-full"></Skeleton>
            <Skeleton className="box-border h-36 w-full max-w-full"></Skeleton>
            <Skeleton className="box-border h-36 w-full max-w-full"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLoadinglayout;
