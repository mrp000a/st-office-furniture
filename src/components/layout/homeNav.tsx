"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { coreInfo, ProfileDefaultImage } from "../data/core";
import { Button } from "../ui/button";
import { ArrowDown, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProductSearchContainer from "../uiComponent/productSearchContainer";
import FloatingMessage from "../uiComponent/floatingMessage";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import MobileBottomNav from "../common/mobileBottomNav";
import MobileNavDrawar from "../common/drawar/mobileNavDrawar";
import CartDrawar from "../common/drawar/cartDrawar";
import CategoriesNavBar from "../common/categoriesNav";
import DesktopNavBar from "../common/drawar/desktopNav";
import { getImageUrl } from "@/lib/getImageUrl";
import { DropdownMenuHeader } from "../common/drawar/dropdownMenuHeader";

const HomeNav = () => {
  const [openMobNav, setOpenMobNav] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const focusSearchInput = useRef<HTMLInputElement>(null);
  const [shakeCart, setShakeCart] = useState(false);
  const pathname = usePathname();
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

  const router = useRouter();

  return (
    <>
      <header
        className={`bg-background/40 backdrop-blur-2xl  sticky z-40 top-0 border border-gray-secondary/80 box-border  ${pathname.startsWith("/dashboard") ? "hidden" : ""}`}
      >
        <div className="w-full py-2 px-1 sm:px-3 h-full justify-center items-center  flex relative">
          <div className="max-w-384 w-full mx-auto flex justify-between items-center">
            {/* logo left of navbar and menu  */}
            <div className="flex-center gap-3">
              <button
                onClick={() => setOpenMobNav((e) => !e)}
                className=" flex justify-center items-center box-border p-2 rounded-md hover:bg-secondary active:bg-secondary/20 active:translate-y-px transition-all"
              >
                <Menu />
              </button>
              <Link
                href={"/#"}
                className="h-16 w-48  relative z-30  rounded-sm overflow-hidden block max-[500px]:hidden"
              >
                <Image
                  src={coreInfo.image}
                  alt={coreInfo.name}
                  // loading="eager"
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 33vw"
                  fill
                  className="object-contain object-center dark:hidden "
                />
                <Image
                  src={coreInfo.imageDark}
                  alt={coreInfo.name}
                  // loading="eager"
                  sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 33vw"
                  fill
                  className="object-contain object-center hidden dark:block "
                />
              </Link>
              <Link
                href={"/#"}
                className="size-16 rounded-full  relative z-30 overflow-hidden hidden max-[500px]:block"
              >
                <Image
                  src={coreInfo.logo}
                  alt={coreInfo.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-cover object-center "
                />
              </Link>
            </div>

            {/* right of navbar  */}

            {/* log in / reg button and profile button */}
            <div className="space-x-3 flex justify-center items-center px-3 box-border">
              <button
                className="md:hidden "
                onClick={() => {
                  setShowSearchBar((e) => !e);
                  focusSearchInput.current?.focus();
                }}
              >
                <Search />
              </button>
              <ThemeToggleButton />
              {status === "unauthenticated" || status === "loading" ? (
                <>
                  <Button asChild className="bg-green-primary">
                    <Link
                      href="/signin"
                      className="md:text-background text-background dark:md:text-foreground dark:text-foreground"
                    >
                      Log In
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="flex items-center">
                  {/* <button
                    className="flex-center flex-col gap-2 font-semibold cursor-pointer px-2 py-1"
                    onClick={() => router.push("/profile")}
                  >
                    <div className="relative w-12 h-12 aspect-video  rounded-full overflow-hidden outline-3 outline-gray-secondary">
                      <Image
                        fill
                        className={`object-cover object-center overflow-hidden rounded-full relative w-200 h-300 ${user?.image ? "" : "mix-blend-darken"}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={getImageUrl(user?.image)}
                        alt={user?.image ?? ProfileDefaultImage}
                      />
                    </div>
                    <span className="max-[450px]:hidden hidden text-[10px]">
                      {user?.name?.length !== undefined &&
                      user?.name?.length > 15
                        ? user?.name?.split(" ")[0]
                        : `${user?.name?.split(" ")[0]} ${user?.name?.split(" ")[1]}`}
                    </span>
                  </button> */}
                  <DropdownMenuHeader />
                </div>
              )}

              <button
                onClick={() => {
                  setOpenCart((e) => !e);
                }}
                className={` flex-center ${shakeCart ? "animate-cart-shake shadow-2xl bg-blue-primary/40 shadow-blue-primary " : ""}relative flex-col flex-1 rounded-md p-1 px-2 hover:bg-background bg-background/50 transition-all hover:outline hover:outline-gray-primary/40 border border-gray-primary cursor-pointer `}
              >
                <span className="absolute -top-2 -right-2 text-xs dark:text-foreground font-semibold text-background bg-green-primary rounded-full px-1 outline-2 outline-gray-secondary">
                  {cart && cart.items.length > 0 ? cart.items.length : 0}
                </span>
                <ShoppingCart className="w-6 h-6" />
                <span className="text-[8px] ">{"Cart"}</span>
              </button>
            </div>
          </div>
          <>
            <div
              className={`absolute justify-between px-3 transition-all duration-500 z-40 items-center gap-3 w-full max-w-140 md:hidden
              ${
                showSearchBar
                  ? "flex translate-y-8 opacity-100"
                  : "pointer-events-none opacity-0 translate-y-0"
              }`}
            >
              <ProductSearchContainer
                focusRef={focusSearchInput}
                overLayer={setShowSearchBar}
              />
            </div>
            {/* search overlay  */}
            <button
              onClick={() => {
                setShowSearchBar(false);
                focusSearchInput.current?.focus();
              }}
              className={`absolute backdrop-blur-lg   top-0 left-0 z-30  w-screen h-screen min-h-screen  overflow-hidden bg-background/90 transition-color  ${showSearchBar ? "" : "hidden "}`}
            ></button>
            <div
              className={`absolute flex flex-wrap justify-between transition-all duration-500 z-40 items-center gap-3 w-full lg:max-w-130 md:max-w-80 max-md:hidden`}
            >
              <ProductSearchContainer />
              {/* <nav className="">
                    {navItems.map(({ href, label }, index) => (
                      <NavLinks key={index} href={href} label={label} />
                    ))}
                  </nav> */}
            </div>
          </>
        </div>
        {/* desktop nav */}
        {/* <DesktopNavBar /> */}
        {/* category line  */}
        <CategoriesNavBar />

        {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
          <Link
            className="absolute top-0 right-0 text-[9px] rounded-lg border box-border border-gray-primary px-2 py-1 bg-background/60 hover:bg-background active:bg-violet-primary"
            href={"/dashboard"}
          >
            {user?.email}
          </Link>
        )}
      </header>
      {/* Drawars of the page */}
      <>
        {/* nav */}
        <MobileNavDrawar
          openMobNav={openMobNav}
          setOpenMobNav={setOpenMobNav}
        />
        {/* cart */}
        <CartDrawar openCart={openCart} setOpenCart={setOpenCart} />
      </>

      {/* floating message */}
      <FloatingMessage />

      {/* Mobile Navbar */}
      <MobileBottomNav />
    </>
  );
};

export default HomeNav;
