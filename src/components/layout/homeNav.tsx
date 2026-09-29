"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { coreInfo } from "../data/core";
import { Button } from "../ui/button";
import { Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProductSearchContainer from "../uiComponent/productSearchContainer";
import FloatingMessage from "../uiComponent/floatingMessage";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import MobileBottomNav from "../common/mobileBottomNav";
import MobileNavDrawar from "../common/drawar/mobileNavDrawar";
import CartDrawar from "../common/drawar/cartDrawar";
import CategoriesNavBar from "../common/categoriesNav";
import { DropdownMenuHeader } from "../common/drawar/dropdownMenuHeader";

const HomeNav = () => {
  const [openMobNav, setOpenMobNav] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const focusSearchInput = useRef<HTMLInputElement>(null);
  const [shakeCart, setShakeCart] = useState(false);
  const { status, data } = useSession();
  const user = data?.user;
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

  return (
    <>
      <header
        className={`bg-background/50 border-gray-secondary/80 sticky top-0 z-50 box-border w-full border backdrop-blur-xl`}
      >
        {/* <div className="absolute pointer-events-none inset-0 bg-background/60 backdrop-blur-2xl backdrop-saturate-150" /> */}
        <div className="w-full">
          <div className="relative flex h-full w-full items-center justify-center px-1 py-2 sm:px-3">
            <div className="mx-auto flex w-full max-w-384 items-center justify-between">
              {/* logo left of navbar and menu  */}
              <div className="flex-center gap-3">
                <button
                  onClick={() => setOpenMobNav((e) => !e)}
                  className="hover:bg-secondary active:bg-secondary/20 box-border flex items-center justify-center rounded-md p-2 transition-all active:translate-y-px"
                >
                  <Menu />
                </button>
                <Link
                  href={"/#"}
                  className="relative z-30 block h-16 w-48 overflow-hidden rounded-sm mix-blend-darken max-[500px]:hidden dark:mix-blend-lighten"
                >
                  <Image
                    unoptimized
                    src={coreInfo.image}
                    alt={coreInfo.name}
                    sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 33vw"
                    fill
                    className="object-contain object-center dark:hidden"
                  />
                  <Image
                    unoptimized
                    src={coreInfo.imageDark}
                    alt={coreInfo.name}
                    // loading="eager"
                    sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 33vw"
                    fill
                    className="hidden object-contain object-center dark:block"
                  />
                </Link>
                <Link
                  href={"/#"}
                  className="relative z-30 hidden size-16 overflow-hidden rounded-full max-[500px]:block"
                >
                  <Image
                    unoptimized
                    src={coreInfo.logo}
                    alt={coreInfo.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover object-center"
                  />
                </Link>
              </div>

              {/* right of navbar  */}

              {/* log in / reg button and profile button */}
              <div className="box-border flex items-center justify-center space-x-3 px-3">
                <button
                  className="md:hidden"
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
                      <Image unoptimized
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
                  className={`flex-center ${shakeCart ? "animate-cart-shake bg-blue-primary/40 shadow-blue-primary shadow-2xl" : ""}relative hover:bg-background bg-background/50 hover:outline-gray-primary/40 border-gray-primary flex-1 cursor-pointer flex-col rounded-md border p-1 px-2 transition-all hover:outline`}
                >
                  <span className="dark:text-foreground text-background bg-green-primary outline-gray-secondary absolute -top-2 -right-2 rounded-full px-1 text-xs font-semibold outline-2">
                    {cart && cart.items.length > 0 ? cart.items.length : 0}
                  </span>
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-[8px]">{"Cart"}</span>
                </button>
              </div>
            </div>
            <>
              <div
                className={`absolute z-40 w-full max-w-140 items-center justify-between gap-3 px-3 transition-all duration-500 md:hidden ${
                  showSearchBar
                    ? "flex translate-y-8 opacity-100"
                    : "pointer-events-none translate-y-0 opacity-0"
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
                className={`bg-background/90 transition-color absolute top-0 left-0 z-30 h-screen min-h-screen w-screen overflow-hidden backdrop-blur-lg ${showSearchBar ? "" : "hidden"}`}
              ></button>
              <div
                className={`absolute z-40 flex w-full flex-wrap items-center justify-between gap-3 transition-all duration-500 max-md:hidden md:max-w-80 lg:max-w-130`}
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
              className="border-gray-primary bg-background/60 hover:bg-background active:bg-violet-primary absolute top-0 right-0 box-border rounded-lg border px-2 py-1 text-[9px]"
              href={"/dashboard"}
            >
              {user?.email}
            </Link>
          )}
        </div>
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
