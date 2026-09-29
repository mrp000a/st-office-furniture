"use client";
import { ProductDefaultImage } from "@/components/data/core";
import { Button } from "@/components/ui/button";
import { CartProductItemOrder } from "@/components/uiComponent/CartRelated";
import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { handleDeleteCartItem } from "@/lib/api";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CartItems = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  return (
    <div>
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="text-lg font-bold">Cart Items</h2>
          <div className="flex flex-wrap items-center gap-1">
            {/* <Button>Add</Button>
            <Button>Now</Button> */}
          </div>
        </div>
        <hr />
        <div className="box-border flex h-full max-h-110 w-full max-w-full flex-col gap-3 overflow-x-hidden overflow-y-auto py-3">
          {cart && cart.items.length > 0 ? (
            cart.items.map(({ title, product, qty, id }, index) => (
              <div key={index} className="flex w-full flex-col">
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
              <Button asChild className="mx-auto w-fit">
                <Link href={"/products"}>Continue Shopping</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex w-full items-end justify-end">
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
