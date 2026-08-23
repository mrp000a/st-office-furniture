import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { ProductDefaultImage } from "../data/core";
import { SessionContextValue, useSession } from "next-auth/react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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
    <div className="flex justify-between items-start gap-2 border p-1 rounded-sm relative">
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
          src={
            image &&
            `${process.env.NEXT_PUBLIC_URL_R2}/${image ?? ProductDefaultImage}`
          }
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
          className="line-clamp-2 font-semibold text-sm text-justify cursor-pointer"
        >
          {title}
        </div>
        <span className="text-gray-secondary text-xs line-clamp-2">
          Unit Price ${Number(price).toFixed(2)} * Qty. {qty}
        </span>
      </div>
      <div className=" font-bold self-center">${price * qty}</div>
      <div className="absolute top-0 right-0">
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
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
