"use client";
import React from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

const CouponForm = () => {
  return (
    <div className="w-full dark:bg-background bg-background border rounded-md  gap-2 px-3 py-5 flex-center flex-col">
      {/* <label className="text-gray-primary">
              Have a coupon? Enter here
            </label> */}
      <div className="outline wfull outline-gray-secondary focus-within:outline-2 transition-all focus-within:outline-gray-primary box-border flex items-center  rounded-md overflow-hidden">
        <Input
          placeholder="Have a coupon? Enter here..."
          type="text"
          className="outline-none w-full px-2  flex-1 border-none h-10 text-base md:text-base"
        />
        <button
          type="button"
          onClick={async () =>
            toast.error("Invalid Coupon Entered!", {
              description: "Please make sure the coupon is valid.",
            })
          }
          className="px-1  py-1 line-clamp-1 w-fit bg-blue-secondary cursor-pointer box-border text-background dark:text-foreground"
        >
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default CouponForm;
