"use client";
import React, { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../ui/drawer";
import { Button } from "../../ui/button";
import { useSession } from "next-auth/react";
import { handleDeleteCartItem, loadCart, loadCartLocal } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { RotateCcw, SquareArrowRight } from "lucide-react";
import { RootState } from "@/redux/store";
import { CartProductItem } from "../../uiComponent/CartRelated";
import { ProductDefaultImage } from "../../data/core";
import { NoItemsFound } from "../../uiComponent/uiCom";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CartDrawar = ({
  openCart,
  setOpenCart,
}: {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  // first load cart
  useEffect(() => {
    const a = async () => {
      if (session && session.data?.user?.id) {
        await loadCart({
          userId: Number(session.data?.user?.id),
          dispatch: dispatch,
        });
      } else {
        if (!session?.data) loadCartLocal({ dispatch });
      }
    };
    a();
  }, [dispatch, session]);

  useEffect(() => {
    if (cart && !session?.data) {
      const cartString = JSON.stringify(cart);
      localStorage.setItem("stcart", cartString);
    }
    // console.log("set cart local")
  }, [cart, session]);

  return (
    <div>
      <Drawer open={openCart} direction="right" onOpenChange={setOpenCart}>
        <DrawerContent className="z-9999 px-3 py-2 min-[400px]:min-w-sm md:min-w-md lg:min-w-lg max-w-[100vw]">
          <DrawerHeader className="border-b border-b-gray-secondary">
            <DrawerTitle>
              <div className="flex justify-between items-center">
                <span>Cart</span>
                <div>
                  <Button
                    variant={"outline"}
                    onClick={async () =>
                      await loadCart({
                        userId: Number(session.data?.user.id),
                        dispatch,
                      })
                    }
                  >
                    <RotateCcw />
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => setOpenCart(false)}
                  >
                    <SquareArrowRight />
                  </Button>
                </div>
              </div>
            </DrawerTitle>
            <span className="w-full text-gray-secondary ">
              All your cart items are shown below.
            </span>
          </DrawerHeader>
          <div className=" w-full p-2 overflow-x-hidden overflow-y-auto  max-w-full  flex flex-col gap-3 box-border">
            {cart && cart.items.length > 0 ? (
              cart.items.map(({ title, product, qty, id }, index) => (
                <CartProductItem
                  deleteCartItem={handleDeleteCartItem}
                  id={id}
                  image={product.images[0] ?? ProductDefaultImage}
                  price={Number(
                    product.discount ? product.discountPrice : product.price,
                  )}
                  productCode={product.productCode}
                  qty={qty}
                  title={title}
                  key={index}
                  setOpenCart={setOpenCart}
                />
              ))
            ) : (
              <div className="flex-center w-full flex-col">
                <NoItemsFound />
                <Button
                  className="w-fit mx-auto"
                  variant={"default"}
                  onClick={() => {
                    router.push(`/products/`);
                    const timer = setTimeout(() => {
                      if (setOpenCart) setOpenCart(false);
                      clearTimeout(timer);
                    }, 500);
                  }}
                  asChild
                >
                  <span>Continue Shopping</span>
                </Button>
              </div>
            )}
          </div>
          <DrawerFooter className="border-t border-gray-secondary">
            <div className="flex justify-between items-center">
              <div className=" space-x-2">
                <span className="text-gray-secondary font-semibold">
                  Total Price:
                </span>
                <span className="text-gray-primary font-bold">
                  ৳
                  {cart?.items.reduce(
                    (total, item) =>
                      total +
                      (item.product.discount && item.product.discountPrice
                        ? item.product?.discountPrice
                        : item.price) *
                        item.qty,
                    0,
                  )}
                </span>
              </div>{" "}
              <div className="space-x-2 flex flex-wrap">
                <span className="text-gray-secondary font-semibold">
                  Total Qty:
                </span>
                <span className="text-gray-primary font-bold">
                  {cart?.items.reduce((total, item) => total + item.qty, 0)}
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                router.push("/checkout");
                const timer = setTimeout(() => {
                  setOpenCart(false);
                  clearTimeout(timer);
                }, 500);
              }}
            >
              Check Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawar;
