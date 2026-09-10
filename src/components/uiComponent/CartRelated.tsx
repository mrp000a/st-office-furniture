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
    <div className="flex justify-between items-center gap-2 border p-1 rounded-sm relative">
      <div
        onClick={() => {
          router.push(`/products/${productCode.toLowerCase()}`);
          const timer = setTimeout(() => {
            if (setOpenCart) setOpenCart(false);
            clearTimeout(timer);
          }, 500);
        }}
        className="h-15 cursor-pointer w-15 relative border box-border border-gray-secondary rounded-md overflow-hidden"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_R2}/${image ?? ProductDefaultImage}`}
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
          className="line-clamp-1 font-semibold text-sm text-justify cursor-pointer"
        >
          {title}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-secondary text-xs line-clamp-2">
            Unit Price ৳{Number(price).toFixed(2)} * Qty. {qty}
          </span>
          <div className="text-sm font-bold self-center">৳{price * qty}</div>
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
          <Trash2 className="w-5 h-5 text-red-primary" />
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
    <div className="flex justify-between items-center gap-2 border p-1 rounded-sm relative">
      <button
        onClick={() => {
          router.push(`/products/${productCode.toLowerCase()}`);
          const timer = setTimeout(() => {
            if (setOpenCart) setOpenCart(false);
            clearTimeout(timer);
          }, 500);
        }}
        className="h-15 cursor-pointer w-15 relative border box-border border-gray-secondary rounded-md overflow-hidden"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_R2}/${image ?? ProductDefaultImage}`}
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
          className="line-clamp-1 font-semibold text-sm text-justify cursor-pointer"
        >
          {title}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-secondary text-xs line-clamp-2">
            Unit Price ৳{Number(price).toFixed(2)} * Qty. {qty}
          </span>
          <div className="text-sm font-bold self-center">৳{price * qty}</div>
        </div>
        {/* Buttons */}
        <div className="flex-center justify-end  gap-1 text-sm w-fit px-2 rounded-md bg-gray-secondary/10 outline">
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
          <Trash2 className="w-5 h-5 text-red-primary" />
        </Button>
      </div>
    </div>
  );
};
