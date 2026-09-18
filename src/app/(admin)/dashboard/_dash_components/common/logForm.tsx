"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader, Send } from "lucide-react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { InputErrorMessage } from "@/components/uiComponent/uiCom";
import { orderStatuses2 } from "@/components/data/core";
import { OrderLogAdd } from "@/lib/api";
import { OrderStatus } from "@/generated/prisma";

type OrderLogFormValues = {
  status: OrderStatus | string;
  note: string;
};

const OrderLogForm = ({ orderId }: { orderId: number }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderLogFormValues>({
    mode: "onSubmit",
    defaultValues: {
      status: "",
      note: "",
    },
  });

  const handleSubmitData = async (data: OrderLogFormValues) => {
    try {
      const result = await OrderLogAdd({
        orderId,
        status: data.status as OrderStatus,
        note: data.note.trim(),
      });

      if (!result.success) {
        toast.error(result.message ?? "Failed to add order log.");
        return;
      }

      toast.success("Order log added successfully.");

      reset({
        status: "",
        note: "",
      });

      router.refresh();
    } catch (error) {
      console.error("OrderLogAdd error:", error);

      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="w-full">
      <div className="flex flex-col gap-4">
        {/* Order ID */}
        {/* <div className="flex flex-col gap-1">
          <label htmlFor="orderId" className="text-sm font-medium">
            Order ID
          </label>

          <Input
            id="orderId"
            type="number"
            value={orderId}
            disabled
            className="h-10 text-lg"
          />
        </div> */}

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm font-medium">
            Order Status <span className="text-destructive">*</span>
          </label>

          <Controller
            name="status"
            control={control}
            rules={{
              required: "Status is required!",
            }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <SelectTrigger id="status" className="h-10 w-full">
                  <SelectValue placeholder="Select order status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Order Statuses</SelectLabel>

                    {orderStatuses2.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.status && (
            <InputErrorMessage>{errors.status.message}</InputErrorMessage>
          )}
        </div>

        {/* Note */}
        <div className="flex flex-col gap-1">
          <label htmlFor="customerNote" className="text-sm font-medium">
            Note <span className="text-muted-foreground">(optional)</span>
          </label>

          <Textarea
            id="customerNote"
            placeholder="Enter your note..."
            disabled={isSubmitting}
            className="min-h-20 max-h-32 resize-none"
            {...register("note", {
              maxLength: {
                value: 200,
                message: "Maximum 200 characters allowed!",
              },
            })}
          />

          {errors.note && (
            <InputErrorMessage>{errors.note.message}</InputErrorMessage>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Send />
                Submit Log
                <RiVerifiedBadgeFill />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OrderLogForm;
