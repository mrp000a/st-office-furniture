"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  coreInfo,
  MobNavItems,
  navItems,
  ProductDefaultImage,
  ProfileDefaultImage,
} from "../data/core";
import { Button } from "../ui/button";
import {
  Menu,
  RotateCcw,
  ShoppingCart,
  SquareArrowLeft,
  SquareArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { NavLinks, SpecialButton } from "../uiComponent/uiCom";
import { useSession } from "next-auth/react";
import { CartProductItem } from "../uiComponent/CartRelated";
import { handleDeleteCartItem, loadCart } from "@/lib/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HomeNav = () => {
  const [openMobNav, setOpenMobNav] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [shakeCart, setShakeCart] = useState(false);
  const { status, data } = useSession();
  const session = useSession();
  const user = data?.user;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    if (!cart?.items) return;
    const a = () => {
      setShakeCart(true);
    };
    a();

    const timer = setTimeout(() => {
      setShakeCart(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [cart?.items.length, cart?.items]);

  // first load cart
  useEffect(() => {
    const a = async () => {
      if (session && user?.id) {
        await loadCart({ userId: Number(user?.id), dispatch: dispatch });
      } else {
        console.log("Session is required for fetch cart items!");
      }
    };
    a();
  }, [dispatch, session, user?.id]);

  const router = useRouter();
  return (
    <>
      <header className="bg-background/40 backdrop-blur-2xl  sticky z-40 top-0 border border-gray-600 box-border py-2 px-5 ">
        <div className="w-full h-full justify-center items-center flex relative">
          <div className="max-w-384 w-full mx-auto flex justify-between items-center">
            {/* logo left of navbar and menu  */}
            <div className="flex-center gap-3">
              <button
                onClick={() => setOpenMobNav((e) => !e)}
                className="md:hidden flex justify-center items-center box-border p-2 rounded-md hover:bg-secondary active:bg-secondary/20 active:translate-y-px transition-all"
              >
                <Menu />
              </button>
              <Link
                href={"/#"}
                className="md:h-20 md:w-20 h-15 w-15 relative z-30  rounded-full border border-gray-primary overflow-hidden"
              >
                <Image
                  src={coreInfo.image}
                  alt={coreInfo.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  // fill
                  className="object-cover"
                />
              </Link>
            </div>
            {/* right of navbar  */}

            {/* log in / reg button and profile button */}
            <div className="space-x-3 flex justify-center items-center ">
              {status === "unauthenticated" || status === "loading" ? (
                <>
                  <SpecialButton href="/signin" label="Log In" key={"alskd"} />
                  {/* <Button
                    onClick={() => router.push("register")}
                    size={"lg"}
                    className="bg-red-primary text-background"
                  >
                    Register
                  </Button> */}
                </>
              ) : (
                <button
                  className="flex-center flex-col gap-2 font-semibold cursor-pointer px-2 py-1"
                  onClick={() => router.push("/profile")}
                >
                  <div className="relative w-12 h-12 aspect-video  rounded-full overflow-hidden outline-3 outline-gray-secondary">
                    <Image
                      fill
                      className={`object-cover object-center overflow-hidden rounded-full relative w-200 h-300 ${user?.image ? "" : "mix-blend-darken"}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={`${process.env.NEXT_PUBLIC_URL_R2}/${user?.image ?? ProfileDefaultImage}`}
                      alt={user?.image ?? ProfileDefaultImage}
                    />
                  </div>
                  <span className="max-[450px]:hidden hidden text-[10px]">
                    {user?.name?.length !== undefined && user?.name?.length > 15
                      ? user?.name?.split(" ")[0]
                      : `${user?.name?.split(" ")[0]} ${user?.name?.split(" ")[1]}`}
                  </span>
                </button>
              )}
              <button
                onClick={() => {
                  setOpenCart((e) => !e);
                }}
                className={` flex-center ${shakeCart ? "animate-cart-shake shadow-2xl bg-blue-primary/40 shadow-blue-primary " : ""}relative flex-col flex-1 rounded-md p-1 px-2 hover:bg-background bg-background/50 transition-all hover:outline hover:outline-gray-primary/40 border border-gray-primary cursor-pointer `}
              >
                <span className="absolute -top-2.5 -right-2.5 text-xs text-background bg-red-primary rounded-full px-1 outline-2 outline-gray-secondary">
                  {cart && cart.items.length > 0 ? cart.items.length : 0}
                </span>
                <ShoppingCart className="w-6 h-6" />
                <span className="text-[8px] ">{"Cart"}</span>
              </button>
            </div>
          </div>

          <nav className="absolute hidden md:flex justify-between items-center gap-3">
            {navItems.map(({ href, label }, index) => (
              <NavLinks key={index} href={href} label={label} />
            ))}
          </nav>

          {/* testing */}
        </div>
        {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
          <Link
            className="absolute top-0 right-0 text-[9px] rounded-lg border box-border border-gray-primary px-2 py-1 bg-background/60 hover:bg-background active:bg-violet-primary"
            href={"/admin"}
          >
            {user?.email}
          </Link>
        )}
      </header>
      {/* Drawars of the page */}
      <>
        <Drawer open={openMobNav} direction="left" onOpenChange={setOpenMobNav}>
          <DrawerContent className="z-9999 px-3 py-2 ">
            <DrawerHeader>
              <DrawerTitle>
                <div className="flex justify-between items-center">
                  <span>{coreInfo.name}</span>
                  <Button
                    onClick={() => setOpenMobNav(false)}
                    variant={"outline"}
                  >
                    <SquareArrowLeft />
                  </Button>
                </div>
              </DrawerTitle>
              <span className="w-full text-gray-secondary text-center">
                Navigation
              </span>
            </DrawerHeader>
            <div className="flex flex-col justify-start gap-2 px-4 overflow-auto">
              {navItems.map(({ href, label }, index) => (
                <button
                  onClick={() => {
                    router.push(href);
                    const timerId = setTimeout(() => {
                      setOpenMobNav(() => false);
                      clearTimeout(timerId);
                    }, 500);
                  }}
                  key={index}
                  className="px-2 py-1 rounded-sm hover:bg-background/50 bg-gray-secondary/50 transition-all hover:outline hover:outline-gray-primary/40 border border-gray-primary cursor-pointer "
                >
                  {label}
                </button>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
        {/* cart */}
        <Drawer open={openCart} direction="right" onOpenChange={setOpenCart}>
          <DrawerContent className="z-9999 px-3 py-2 ">
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
                <span className="text-center p-3 rounded-md outline-2 outline-gray-secondary box-border">
                  No Items Found
                </span>
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
                  router.push("order");
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
      </>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed bottom-0 min-w-full bg-background/40 z-9999 backdrop-blur-2xl border border-gray-600 box-border p-1">
        <div className="flex w-full justify-between gap-2 overflow-auto">
          {MobNavItems.map(({ href, label, Logo: Logo }, index) => (
            <button
              onClick={() => {
                router.push(href);
                const timerId = setTimeout(() => {
                  setOpenMobNav(() => false);
                  clearTimeout(timerId);
                }, 500);
              }}
              key={index}
              className="px-2 py-1 flex-center flex-col flex-1 rounded-sm hover:bg-background bg-gray-secondary active:bg-violet-primary transition-all hover:outline hover:outline-gray-primary/40 border border-gray-primary cursor-pointer "
            >
              {Logo && <Logo className="w-6 h-6" />}
              <span className="text-[8px] ">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeNav;
