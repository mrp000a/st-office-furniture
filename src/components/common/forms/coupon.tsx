"use client";
import React from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const CouponForm = () => {
  return (
    <div className="dark:bg-background bg-background flex-center w-full flex-col gap-2 rounded-md border px-3 py-5">
      {/* <label className="text-gray-primary">
              Have a coupon? Enter here
            </label> */}
      <div className="wfull outline-gray-secondary focus-within:outline-gray-primary box-border flex items-center overflow-hidden rounded-md outline transition-all focus-within:outline-2">
        <Input
          placeholder="Have a coupon? Enter here..."
          type="text"
          className="h-10 w-full flex-1 border-none px-2 text-base outline-none md:text-base"
        />
        <button
          type="button"
          onClick={async () =>
            toast.error("Invalid Coupon Entered!", {
              description: "Please make sure the coupon is valid.",
            })
          }
          className="active:bg-gray-primary/50 bg-gray-primary text-background dark:text-foreground box-border line-clamp-1 h-full w-fit cursor-pointer px-1 py-2 transition-all"
        >
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default CouponForm;
