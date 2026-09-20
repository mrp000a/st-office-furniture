import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const OrderLoadinglayout = () => {
  return (
    <div className="max-w-384 mx-auto bg-background">
      <div className="flex justify-start items-start flex-col md:flex-row p-3 gap-4">
        <div className="flex flex-1 items-center flex-col   gap-2   w-full border rounded-md p-6">
          <div className="w-full flex-center flex-col gap-2">
            <Skeleton className="max-w-full box-border  w-64   min-h-10"></Skeleton>
            <Skeleton className="max-w-full box-border  w-36 min-h-8"></Skeleton>
          </div>
          <Skeleton className="max-w-full box-border  w-full min-h-50"></Skeleton>
          <div className="flex  w-full">
            <Skeleton className="w-48 h-7" />
          </div>
          <div className="w-full space-y-3">
            <Skeleton className="max-w-full box-border w-full min-h-10 "></Skeleton>
            <Skeleton className="max-w-full box-border w-full min-h-10 "></Skeleton>
            <Skeleton className="max-w-full box-border w-full min-h-10 "></Skeleton>
            <Skeleton className="max-w-full box-border w-full min-h-10 "></Skeleton>
          </div>
          
          <div className="flex items-end justify-end w-full">
            <Skeleton className="w-48 h-12" />
          </div>
        </div>

        <div className="flex flex-1 max-w-lg items-center gap-2 w-full border p-5 rounded-md">
          <div className="w-full space-y-5">
            <Skeleton className="max-w-full box-border w-full h-36"></Skeleton>
            <Skeleton className="max-w-full box-border w-full h-36"></Skeleton>
            <Skeleton className="max-w-full box-border w-full h-36"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLoadinglayout;
