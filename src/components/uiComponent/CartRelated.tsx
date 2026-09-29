import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { ProductDefaultImage } from "../data/core";
import { SessionContextValue, useSession } from "next-auth/react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateQuantity } from "@/redux/features/cart/cartSlice";
import { getImageUrlProduct } from "@/lib/getImageUrl";

export const CartProductItem = ({
  id,
  title,
  productCode,
  image,
  qty,
  price,
  deleteCartItem,
  setOpenCart,
}: {
  id: number;
  title: string;
  productCode: string;
  image: string;
  qty: number;
  price: number;
  setOpenCart?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCartItem: ({
    itemId,
  }: {
    itemId: number;
    session: SessionContextValue;
    dispatch: Dispatch;
  }) => Promise<void>;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();
  return (
    <div className="relative flex items-center justify-between gap-2 rounded-sm border p-1">
      <div
        onClick={() => {
          router.push(`/products/${productCode.toLowerCase()}`);
          const timer = setTimeout(() => {
            if (setOpenCart) setOpenCart(false);
            clearTimeout(timer);
          }, 500);
        }}
        className="border-gray-secondary relative box-border h-15 w-15 cursor-pointer overflow-hidden rounded-md border"
      >
        <Image
          unoptimized
          src={getImageUrlProduct(image)}
          alt={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div
          onClick={() => {
            router.push(`/products/${productCode.toLowerCase()}`);
            const timer = setTimeout(() => {
              if (setOpenCart) setOpenCart(false);
              clearTimeout(timer);
            }, 500);
          }}
          className="line-clamp-1 cursor-pointer text-justify text-sm font-semibold"
        >
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-secondary line-clamp-2 text-xs">
            Unit Price ৳{Number(price).toFixed(2)} * Qty. {qty}
          </span>
          <div className="self-center text-sm font-bold">৳{price * qty}</div>
        </div>
        {/* Buttons */}
        {/* <div className="flex-center justify-end  gap-1 text-sm w-fit px-2 rounded-md bg-gray-secondary/10 outline">
          Qty:
          <Button
            disabled={qty === 1}
            onClick={() => {
              dispatch(updateQuantity({ itemId: id ? id : 0, qty: qty - 1 }));
            }}
            type="button"
            variant={"outline"}
            size={"icon-sm"}
          >
            <CircleMinus />
          </Button>
          <span>{qty}</span>
          <Button
            onClick={() => {
              dispatch(updateQuantity({ itemId: id ? id : 0, qty: qty + 1 }));
            }}
            type="button"
            variant={"outline"}
            size={"icon-sm"}
          >
            <CirclePlus />
          </Button>
        </div> */}
      </div>

      <div className="w-fit">
        <Button
          onClick={() => {
            deleteCartItem({
              itemId: id,
              dispatch: dispatch,
              session: session,
            });
          }}
          variant={"outline"}
        >
          <Trash2 className="text-green-primary h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
export const CartProductItemOrder = ({
  id,
  title,
  productCode,
  image,
  qty,
  price,
  deleteCartItem,
  setOpenCart,
}: {
  id: number;
  title: string;
  productCode: string;
  image: string;
  qty: number;
  price: number;
  setOpenCart?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCartItem: ({
    itemId,
  }: {
    itemId: number;
    session: SessionContextValue;
    dispatch: Dispatch;
  }) => Promise<void>;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();
  return (
    <div className="relative flex items-center justify-between gap-2 rounded-sm border p-1">
      <button
        onClick={() => {
          router.push(`/products/${productCode.toLowerCase()}`);
          const timer = setTimeout(() => {
            if (setOpenCart) setOpenCart(false);
            clearTimeout(timer);
          }, 500);
        }}
        className="border-gray-secondary relative box-border h-15 w-15 cursor-pointer overflow-hidden rounded-md border"
      >
        <Image
          unoptimized
          src={getImageUrlProduct(image)}
          alt={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-cover"
        />
      </button>
      <div className="flex-1">
        <div
          onClick={() => {
            router.push(`/products/${productCode.toLowerCase()}`);
            const timer = setTimeout(() => {
              if (setOpenCart) setOpenCart(false);
              clearTimeout(timer);
            }, 500);
          }}
          className="line-clamp-1 cursor-pointer text-justify text-sm font-semibold"
        >
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-secondary line-clamp-2 text-xs">
            Unit Price ৳{Number(price).toFixed(2)} * Qty. {qty}
          </span>
          <div className="self-center text-sm font-bold">৳{price * qty}</div>
        </div>
        {/* Buttons */}
        <div className="flex-center bg-gray-secondary/10 w-fit justify-end gap-1 rounded-md px-2 text-sm outline">
          Qty:
          <Button
            disabled={qty === 1}
            onClick={() => {
              dispatch(updateQuantity({ itemId: id ? id : 0, qty: qty - 1 }));
            }}
            type="button"
            variant={"outline"}
            size={"icon-sm"}
          >
            <CircleMinus />
          </Button>
          <span>{qty}</span>
          <Button
            onClick={() => {
              dispatch(updateQuantity({ itemId: id ? id : 0, qty: qty + 1 }));
            }}
            type="button"
            variant={"outline"}
            size={"icon-sm"}
          >
            <CirclePlus />
          </Button>
        </div>
      </div>

      <div className="w-fit">
        <Button
          onClick={() => {
            deleteCartItem({
              itemId: id,
              dispatch: dispatch,
              session: session,
            });
          }}
          type="button"
          variant={"outline"}
        >
          <Trash2 className="text-green-primary h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
