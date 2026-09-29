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
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ProductDefaultImage } from "@/components/data/core";
import NotFound from "@/app/not-found";
import { Category, ProductDescription, ProReview } from "@/generated/prisma";
import { useDispatch } from "react-redux";
import RatingStars from "@/components/uiComponent/ratingstars";
import { MdReviews } from "react-icons/md";
import ProductReviewForm from "@/components/common/forms/reviewForm";
import { ReviewCard } from "@/components/common/reviewCard";
import Link from "next/link";
import { getImageUrlProduct } from "@/lib/getImageUrl";

// import { useRouter } from "next/navigation";

type productWithRating = {
  averageRating: number;
  reviewCount: number;
  category: Category | null;
  _count: {
    descriptions: number;
    reviews: number;
    category: number;
    orderItems: number;
    cartItems: number;
  };
  descriptions: ProductDescription[];
  reviews: (ProReview & {
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  })[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  price: number;
  brand: string | null;
  keyFeatures: string[];
  discountPrice: number | null;
  discount: number | null;
  stock: number;
  productCode: string;
  images: string[];

  categoryId: number | null;
};

const AProductPage = ({
  product: productInfo,
}: {
  product: productWithRating;
}) => {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [itemQty, setItemQty] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const params = useParams();
  // const [productInfo, setProductInfo] = useState<ProductCombo | null>(null);
  const productCode = params.id?.toString();
  const [sevenDaysAgo] = useState(
    () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  );
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

  return (
    <>
      {productInfo ? (
        <div>
          <div className="mx-auto max-w-384 space-y-3 p-1">
            <div className="bg-background flex flex-col gap-1 rounded-md border p-1 md:flex-row md:gap-4 md:p-2">
              {/* Left side images and something */}
              <div className="mx-auto w-full max-w-125 space-y-3 md:m-0">
                <div className="flex-center relative mx-auto aspect-5/4 w-full overflow-hidden rounded-md bg-white shadow-2xl lg:max-w-125">
                  <span
                    className={`bg-red-primary dark:text-foreground flex-center text-background ring-gray-secondary absolute top-0 right-0 z-20 flex-col rounded-md px-2 py-1 text-xl font-bold ring-2 ${productInfo.discount ? "" : "hidden"}`}
                  >
                    <span className="font-bold">
                      {Number(productInfo.discount)}%
                    </span>
                    <span className="text-xs">Off</span>
                  </span>

                  <span
                    className={`bg-red-primary flex-center text-background dark:text-foreground ring-gray-secondary absolute top-0 -left-4.5 z-20 -rotate-45 flex-col px-5 py-1 text-xs font-bold ring-2 ${new Date(productInfo.createdAt) > sevenDaysAgo ? "" : "hidden"}`}
                  >
                    New
                  </span>

                  {productInfo.images.length > 1 && (
                    <>
                      <Button
                        size={"icon-lg"}
                        onClick={() => swiperInstance?.slidePrev()}
                        className="showPrevSlide bg-background/20 absolute left-0 z-20 backdrop-blur-md"
                        variant={"secondary"}
                      >
                        <ArrowLeft />
                      </Button>
                      <Button
                        size={"icon-lg"}
                        onClick={() => {
                          swiperInstance?.slideNext();
                        }}
                        className="showNextSlide bg-background/20 absolute right-0 z-20 backdrop-blur-md"
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
                          className="flex h-full w-full items-center justify-center text-2xl font-bold"
                        >
                          <div
                            className={`text-shadow-blue-primary group relative h-full w-full overflow-hidden text-shadow-2xs`}
                            onMouseMove={handleMouseMove}
                            // onMouseMove={(e)=> console.log("object")}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="swiper-zoom-container h-full w-full">
                              <Image
                                unoptimized
                                fill
                                style={zoomStyle}
                                className={`overflow-hidden object-contain object-center transition-transform duration-150 ease-out group-hover:scale-170`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                src={getImageUrlProduct(item)}
                                alt={item}
                              />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div
                      className={`text-shadow-blue-primary relative h-full w-full min-w-full overflow-hidden text-shadow-2xs`}
                    >
                      <Image
                        unoptimized
                        fill
                        className={`relative h-300 w-200 overflow-hidden object-contain object-center`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        src={getImageUrlProduct(ProductDefaultImage)}
                        alt={"default image"}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {productInfo.images.map((item, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => handleThumbnailClick(index)}
                      onClick={() => handleThumbnailClick(index)}
                      className={`bg-background relative aspect-square w-10 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        activeIndex === index
                          ? "scale-105 border-blue-500"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        unoptimized
                        fill
                        className={`overflow-hidden object-contain object-center`}
                        sizes="10vw"
                        src={getImageUrlProduct(item)}
                        alt={item}
                      />
                    </button>
                  ))}
                </div>
              </div>
              {/* right side price and more */}
              <div className="p-2">
                <div className="flex flex-col gap-1">
                  <h2 className="line-clamp-2 text-2xl font-bold">
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
                    <SimpleBubble visible={productInfo.discount ? true : false}>
                      <span className="text-gray-primary">Discount:</span>{" "}
                      <span className="font-semibold">
                        {Number(productInfo.discount).toFixed(2)}%
                      </span>
                    </SimpleBubble>
                    <SimpleBubble>
                      <span className="text-gray-primary">Status:</span>{" "}
                      <span className="font-semibold">
                        <span className={`text-foreground font-bold`}>
                          {productInfo.stock && productInfo.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </span>
                    </SimpleBubble>

                    <SimpleBubble visible={productInfo.brand ? true : false}>
                      <span className="text-gray-primary">Brand:</span>{" "}
                      <span className="font-semibold">{productInfo.brand}</span>
                    </SimpleBubble>
                    <SimpleBubble visible={productCode ? true : false}>
                      <span className="text-gray-primary">Code:</span>{" "}
                      <span className="font-semibold">
                        {productInfo.productCode.toUpperCase()}
                      </span>
                    </SimpleBubble>
                  </div>

                  {/* price */}
                  <div className="border-l-green-primary border-gray-secondary w-fit rounded-md border border-l-4 p-2 text-2xl">
                    <span className="text-gray-primary">Price:</span>{" "}
                    <span className="font-semibold">
                      ৳
                      {Number(productInfo.discount)
                        ? Number(productInfo.discountPrice).toFixed(2)
                        : Number(productInfo.price).toFixed(2)}
                    </span>
                    <span
                      className={`px-1 text-sm line-through ${productInfo.discount ? "" : "hidden"}`}
                    >
                      ৳{Number(productInfo.price).toFixed(2)}
                    </span>
                  </div>

                  {/* ratings */}
                  <span className="flex flex-wrap items-center gap-1 text-base">
                    <div className="flex items-center gap-1">
                      <RatingStars
                        rating={productInfo.averageRating}
                        size={20}
                      />
                      <span>{productInfo.averageRating.toFixed(1)}</span>
                      <span>({productInfo._count?.reviews})</span>
                    </div>
                    <Button variant={"link"} asChild>
                      <Link href={"#reviews"}>See Reviews</Link>
                    </Button>
                  </span>
                  {/* KEY FEATURES */}

                  <div>
                    <h4 className="text-lg font-semibold">Key Features</h4>
                    <div className="flex flex-col items-start justify-start gap-1">
                      {productInfo.keyFeatures.map((item, index) => (
                        <span key={index} className="flex-center gap-1">
                          <ChevronRight /> <span>{item}</span>
                        </span>
                      ))}
                    </div>
                    <Button variant={"link"} asChild>
                      <Link href={"#descriptions"}>More Description</Link>
                    </Button>
                  </div>

                  {/* Buttons */}
                  <div className="flex-center bg-gray-secondary/10 w-fit gap-1 rounded-md p-1 outline">
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
                  <div className="flex flex-wrap gap-2 p-2">
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
                            router,
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
                          router: router,
                        });
                      }}
                      disabled={productInfo.stock < 1}
                      type="button"
                      size={"lg"}
                      variant={"secondary"}
                      className="hover:bg-red-primary hover:text-background dark:hover:text-foreground cursor-pointer text-base"
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
                            router,
                          });

                          const time = setTimeout(() => {
                            router.push("/checkout");
                            clearTimeout(time);
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
                        router.push("/checkout");
                      }}
                      disabled={productInfo.stock < 1}
                      type="button"
                      size={"lg"}
                      className="bg-red-primary text-background dark:text-foreground cursor-pointer text-base"
                    >
                      <Banknote /> Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* descriptions and more */}
            <div
              id="descriptions"
              className="bg-background rounded-md border p-1 md:p-2"
            >
              <div className="flex flex-col gap-3 p-2">
                <h2 className="border-l-green-primary rounded-md border-l-4 px-3 text-2xl font-bold">
                  Descriptions
                </h2>
                <span className="text-gray-secondary text-lg font-semibold">
                  Product Name:{" "}
                  <span className="text-gray-primary">{productInfo.title}</span>
                </span>
                <div className="space-y-2">
                  {productInfo.descriptions.map(
                    ({ title, description }, index) => (
                      <div key={index} className="">
                        <h3 className="rounded-md text-lg font-semibold">
                          {title}
                        </h3>
                        <p className="pl-2 text-justify whitespace-pre-line">
                          {" "}
                          {description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div
              id="reviews"
              className="flex flex-col items-start justify-start gap-2 px-1 md:flex-row-reverse"
            >
              <ProductReviewForm
                productCode={productInfo.productCode}
                productId={productInfo.id}
              />
              <div className="bg-background w-full max-w-200 rounded-md p-2 shadow-md">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Customer Reviews</h4>
                  {/* <Button>Put a Review</Button> */}
                </div>
                <hr />
                <div className="rounded-md border p-1">
                  {productInfo && productInfo.reviews.length > 0 ? (
                    productInfo.reviews.map((item, index) => (
                      <ReviewCard review={item} key={index} />
                    ))
                  ) : (
                    <div>
                      <div className="flex-center p-3">
                        <MdReviews className="size-20 fill-amber-500" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span>No review yet...</span>
                        <span className="font-medium">
                          Be the first one to write a review
                        </span>
                      </div>
                    </div>
                  )}
                  {/* no items */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default AProductPage;
