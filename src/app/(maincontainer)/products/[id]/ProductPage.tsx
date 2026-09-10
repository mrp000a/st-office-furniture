"use client";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Zoom } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  ChevronRight,
  CircleMinus,
  CirclePlus,
} from "lucide-react";
import { SimpleBubble } from "@/components/uiComponent/uiCom";
import { HandleAddToCart, HandleAddToLocalCart } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ProductDefaultImage } from "@/components/data/core";
import NotFound from "@/app/not-found";
import { Category, Product, ProductDescription } from "@/generated/prisma";
import { useDispatch } from "react-redux";
import ProductLoadinglayout from "./loading";

// import { useRouter } from "next/navigation";

type ProductCombo = Product & {
  descriptions: ProductDescription[];
  category: Category;
};

const AProductPage = () => {
  const [isLoadingShow, setIsLoadingShow] = useState(true);
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [itemQty, setItemQty] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const params = useParams();
  const [productInfo, setProductInfo] = useState<ProductCombo | null>(null);
  const productCode = params.id?.toString();
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
  });

  const dispatch = useDispatch();

  const handleThumbnailClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index); // Moves the main slider to the target index
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    // Calculate mouse position in percentage relative to the container
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    // Reset the origin when mouse leaves
    setZoomStyle({ transformOrigin: "center center" });
  };

  const loadProduct = useCallback(async () => {
    setIsLoadingShow(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const data = await fetch(
        `/api/products/product?productCode=${productCode}`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        },
      );
      const res = await data.json();
      if (res.success) {
        setProductInfo(res.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingShow(false);
    }
  }, [productCode]);

  useEffect(() => {
    const a = async () => {
      await loadProduct();
    };
    a();
  }, [productCode, loadProduct]);

  return (
    <>
      {/* <Button onClick={loadProduct}>Set product</Button> */}
      {!isLoadingShow ? (
        productInfo ? (
          <div>
            <div className="max-w-384 mx-auto p-1 space-y-3">
              <div className="flex flex-col md:flex-row gap-1 md:gap-4 bg-background p-1 md:p-2  rounded-md border">
                {/* Left side images and something */}
                <div className="space-y-3 max-w-125 mx-auto w-full md:m-0">
                  <div className=" rounded-md  overflow-hidden w-full   lg:max-w-125 mx-auto aspect-video bg-background shadow-2xl relative flex-center">
                    <span
                      className={`bg-red-primary dark:text-foreground flex-center flex-col  text-background rounded-md text-xl ring-2 ring-gray-secondary px-2 py-1  absolute right-0 top-0 z-20 ${productInfo.discount ? "" : "hidden"}`}
                    >
                      <span className="font-bold">
                        {Number(productInfo.discount)}%
                      </span>
                      <span className="text-xs">Off</span>
                    </span>

                    {productInfo.images.length > 1 && (
                      <>
                        <Button
                          size={"icon-lg"}
                          onClick={() => swiperInstance?.slidePrev()}
                          className="showPrevSlide absolute left-0 z-20"
                          variant={"secondary"}
                        >
                          <ArrowLeft />
                        </Button>
                        <Button
                          size={"icon-lg"}
                          onClick={() => {
                            swiperInstance?.slideNext();
                          }}
                          className="showNextSlide absolute right-0 z-20"
                          variant={"secondary"}
                        >
                          <ArrowRight />
                        </Button>
                      </>
                    )}
                    {productInfo.images.length > 0 ? (
                      <Swiper
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) => {
                          setActiveIndex(() => swiper.realIndex);
                        }}
                        modules={[Navigation, Autoplay, Zoom]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        zoom={true}
                        slideNextClass="showNextSlide"
                        slidePrevClass="showPrevSlide"
                        pagination={{ clickable: true }}
                        // autoplay={{ delay: 1500 }}
                        className="h-full rounded-lg"
                      >
                        {productInfo.images.map((item, index) => (
                          <SwiperSlide
                            key={index}
                            className="flex w-full h-full items-center justify-center text-2xl font-bold"
                          >
                            <div
                              className={` relative  h-full w-full  overflow-hidden text-shadow-2xs text-shadow-blue-primary group`}
                              onMouseMove={handleMouseMove}
                              // onMouseMove={(e)=> console.log("object")}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="swiper-zoom-container h-full w-full">
                                <Image
                                  fill
                                  style={zoomStyle}
                                  className={`object-contain object-center overflow-hidden  relative w-200 h-300 transition-transform duration-150 ease-out group-hover:scale-170`}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  src={`${process.env.NEXT_PUBLIC_URL_R2}/${item ? item : ProductDefaultImage}`}
                                  alt={item}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div
                        className={` relative  h-full w-full aspect-video min-w-full  overflow-hidden text-shadow-2xs text-shadow-blue-primary`}
                      >
                        <Image
                          fill
                          className={`object-contain object-center overflow-hidden  relative w-200 h-300 `}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={`${process.env.NEXT_PUBLIC_URL_R2}/${ProductDefaultImage}`}
                          alt={"default image"}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-3 flex-wrap">
                    {productInfo.images.map((item, index) => (
                      <button
                        key={index}
                        onMouseEnter={() => handleThumbnailClick(index)}
                        onClick={() => handleThumbnailClick(index)}
                        className={`h-10 w-10 relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                          activeIndex === index
                            ? "border-blue-500 scale-105"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          fill
                          className={`object-contain object-center overflow-hidden  relative w-200 h-300 `}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={`${process.env.NEXT_PUBLIC_URL_R2}/${item ? item : ProductDefaultImage}`}
                          alt={item}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                {/* right side price and more */}
                <div className="p-2">
                  <div className="flex flex-col gap-1">
                    <h2 className="line-clamp-2 text-2xl font-bold ">
                      {productInfo.title}
                    </h2>

                    {/* buble items */}
                    <div className="flex flex-wrap items-center gap-3 p-2">
                      <SimpleBubble>
                        <span className="text-gray-primary">Category:</span>
                        <span className="font-semibold">
                          {productInfo.category?.name ?? "N/A"}
                        </span>
                      </SimpleBubble>
                      <SimpleBubble
                        visible={productInfo.discount ? true : false}
                      >
                        <span className="text-gray-primary">Discount:</span>{" "}
                        <span className="font-semibold">
                          {Number(productInfo.discount).toFixed(2)}%
                        </span>
                      </SimpleBubble>
                      <SimpleBubble>
                        <span className="text-gray-primary">Status:</span>{" "}
                        <span className="font-semibold ">
                          <span className={`text-foreground font-bold`}>
                            {productInfo.stock && productInfo.stock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        </span>
                      </SimpleBubble>

                      <SimpleBubble visible={productInfo.brand ? true : false}>
                        <span className="text-gray-primary">Brand:</span>{" "}
                        <span className="font-semibold">
                          {productInfo.brand}
                        </span>
                      </SimpleBubble>
                      <SimpleBubble visible={productCode ? true : false}>
                        <span className="text-gray-primary">Code:</span>{" "}
                        <span className="font-semibold">
                          {productInfo.productCode.toUpperCase()}
                        </span>
                      </SimpleBubble>
                    </div>

                    {/* price */}
                    <div className="text-2xl rounded-md p-2 border border-l-red-primary border-l-4 border-gray-secondary w-fit">
                      <span className="text-gray-primary">Price:</span>{" "}
                      <span className="font-semibold">
                        ৳
                        {Number(productInfo.discount)
                          ? Number(productInfo.discountPrice).toFixed(2)
                          : Number(productInfo.price).toFixed(2)}
                      </span>
                      <span
                        className={`text-sm line-through px-1 ${productInfo.discount ? "" : "hidden"}`}
                      >
                        ৳{Number(productInfo.price).toFixed(2)}
                      </span>
                    </div>
                    {/* KEY FEATURES */}
                    <div>
                      <h4 className="text-lg font-semibold">Key Features</h4>
                      <div className="flex flex-col items-start justify-start gap-1  ">
                        {productInfo.keyFeatures.map((item, index) => (
                          <span key={index} className="flex-center gap-1">
                            <ChevronRight /> <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex-center gap-1 w-fit p-1 rounded-md bg-gray-secondary/10 outline">
                      Qty:
                      <Button
                        disabled={itemQty === 1}
                        onClick={() =>
                          setItemQty((e) => {
                            if (e === 1) return e;
                            return e - 1;
                          })
                        }
                        variant={"outline"}
                        size={"icon-lg"}
                      >
                        <CircleMinus />
                      </Button>
                      <span>{itemQty}</span>
                      <Button
                        onClick={() => setItemQty((e) => e + 1)}
                        variant={"outline"}
                        size={"icon-lg"}
                      >
                        <CirclePlus />
                      </Button>
                    </div>

                    {/* add to cart and order now button */}
                    <div className="flex flex-wrap gap-2 p-2 ">
                      <Button
                        onClick={async () => {
                          if (!session || !user?.id) {
                            HandleAddToLocalCart({
                              brand: productInfo.brand,
                              stock: productInfo.stock,
                              keyFeatures: productInfo.keyFeatures,
                              createdAt: productInfo.createdAt,
                              updatedAt: productInfo.updatedAt,
                              categoryId: productInfo.categoryId,
                              id: productInfo.id,
                              title: productInfo.title,
                              price: productInfo.price,
                              productCode: productInfo.productCode,
                              images: productInfo.images,
                              discount: productInfo.discount,
                              discountPrice: productInfo.discountPrice,
                              qty: itemQty,
                              dispatch,
                            });
                            return;
                          }
                          await HandleAddToCart({
                            dispatch,
                            userId: Number(user?.id) ?? undefined,
                            title: productInfo.title,
                            price: Number(productInfo.price),
                            qty: itemQty,
                            productId: productInfo.id,
                          });
                        }}
                        disabled={productInfo.stock < 1}
                        type="button"
                        size={"lg"}
                        variant={"secondary"}
                        className="hover:bg-red-primary  hover:text-background dark:hover:text-foreground text-base cursor-pointer"
                      >
                        <CirclePlus /> Add to Cart
                      </Button>
                      <Button
                        onClick={async () => {
                          if (!session || !user?.id) {
                            HandleAddToLocalCart({
                              dispatch,
                              brand: productInfo.brand,
                              stock: productInfo.stock,
                              keyFeatures: productInfo.keyFeatures,
                              createdAt: productInfo.createdAt,
                              updatedAt: productInfo.updatedAt,
                              categoryId: productInfo.categoryId,
                              id: productInfo.id,
                              title: productInfo.title,
                              price: productInfo.price,
                              productCode: productInfo.productCode,
                              images: productInfo.images,
                              discount: productInfo.discount,
                              discountPrice: productInfo.discountPrice,
                              qty: itemQty,
                            });

                            const time = setTimeout(() => {
                              router.push("/order");
                            }, 1000);

                            return;
                          }
                          // images, discount, discountPrice, price, productCode, id, title, qty
                          const res = await HandleAddToCart({
                            dispatch,
                            title: productInfo.title,
                            price: Number(productInfo.price),
                            qty: itemQty,
                            productId: productInfo.id,
                            userId: Number(user?.id),
                          });
                          if (!res) {
                            return;
                          }
                          router.push("/order");
                        }}
                        disabled={productInfo.stock < 1}
                        type="button"
                        size={"lg"}
                        className="bg-red-primary text-background dark:text-foreground sm:text-base cursor-pointer"
                      >
                        <Banknote /> Order Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* descriptions and more */}
              <div className="p-1 md:p-2 rounded-md border bg-background ">
                <div className="flex flex-col p-2 gap-3">
                  <h2 className="text-2xl font-bold border-l-4 border-l-red-primary px-3 rounded-md">
                    Descriptions
                  </h2>
                  <span className="text-gray-secondary font-semibold text-lg">
                    Product Name:{" "}
                    <span className="text-gray-primary">
                      {productInfo.title}
                    </span>
                  </span>
                  <div className="space-y-2 ">
                    {productInfo.descriptions.map(
                      ({ title, description }, index) => (
                        <div key={index} className="">
                          <h3 className="text-lg font-semibold rounded-md">
                            {title}
                          </h3>
                          <p className="text-justify pl-2 whitespace-pre-line">
                            {" "}
                            {description}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFound />
        )
      ) : (
        <ProductLoadinglayout />
      )}
    </>
  );
};

export default AProductPage;
