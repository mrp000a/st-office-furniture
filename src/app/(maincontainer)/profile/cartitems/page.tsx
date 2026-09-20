"use client";


import { ProductDefaultImage } from "@/components/data/core";
import { Button } from "@/components/ui/button";
import { CartProductItemOrder } from "@/components/uiComponent/CartRelated";
import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { handleDeleteCartItem } from "@/lib/api";
import { RootState } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CartItems = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  return (
    <div>
      <div className="space-y-1 p-3">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Cart</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View your the product you added to the cart.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
            <ShoppingCart className="size-5 text-primary" />
            <p>{cart?.items.length ?? 0}</p>
          </div>
        </div>

        <hr />
        {/* main items */}
        <div className="py-3  h-full max-h-110 w-full  overflow-x-hidden overflow-y-auto  max-w-full  flex flex-col  gap-3 box-border">
          {cart && cart.items.length > 0 ? (
            cart.items.map(({ title, product, qty, id }, index) => (
              <div key={index} className="w-full flex flex-col">
                <CartProductItemOrder
                  deleteCartItem={handleDeleteCartItem}
                  id={id ? id : 0}
                  image={product.images[0] ?? ProductDefaultImage}
                  price={Number(
                    product.discount ? product.discountPrice : product.price,
                  )}
                  productCode={product.productCode}
                  qty={qty}
                  title={title}
                />
              </div>
            ))
          ) : (
            <>
              <NoItemsFound />
              <Button asChild className="w-fit mx-auto">
                <Link href={"/products"}>Continue Shopping</Link>
              </Button>
            </>
          )}
        </div>
        <div className="w-full flex items-end justify-end">
          <Button asChild>
            <Link href={"/checkout"} className="">
              Checkout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
