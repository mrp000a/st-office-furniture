"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ProductDefaultImage, ProductItemType } from "../data/core";
import { HandleAddToCart, HandleAddToLocalCart } from "@/lib/api";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Banknote, CirclePlus } from "lucide-react";
import RatingStars from "./ratingstars";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import { GiLoveLetter } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";

const ProductClient = ({
  item,
}: {
  item: ProductItemType & { averageRating: number };
}) => {
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [sevenDaysAgo] = useState(
    () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  );

  return (
    <div className="group bg-background dark:bg-background shadow-blue-primary/40 hover:ring-gray-secondary ring-green-primary relative box-border flex w-full max-w-full flex-col items-start justify-start gap-2 rounded-sm p-1 ring-2 transition-all duration-300 hover:translate-y-0.5 hover:shadow-2xl hover:ring-3">
      {/* main image and discount red  */}
      <Link
        href={`/products/${item.productCode.toLowerCase()}`}
        className="border-gray-secondary relative block aspect-square w-full overflow-hidden rounded-md border bg-white"
      >
        <Image
          unoptimized
          src={getImageUrlProduct(item.images[0])}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
          className="object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <span
          className={`bg-red-primary flex-center text-background dark:text-foreground ring-gray-secondary absolute top-0 right-0 z-20 flex-col rounded-md px-2 py-1 text-xs font-bold ring-2 ${item.discount ? "" : "hidden"}`}
        >
          <span className="font-bold">{Number(item.discount)}%</span>
          <span className="text-xs">Off</span>
        </span>
        <span
          className={`bg-red-primary flex-center text-background dark:text-foreground ring-gray-secondary absolute top-0 -left-[18px] z-20 -rotate-45 flex-col px-5 py-1 text-xs font-bold ring-2 ${new Date(item.createdAt) > sevenDaysAgo ? "" : "hidden"}`}
        >
          New
        </span>
      </Link>
      {/* <span className="flex-center absolute z-30 rounded-full p-2 border border-gray-secondary">
        <FaHeart size={4} className="size-8 fill-red-primary" />
      </span> */}

      <div className="flex w-full flex-col">
        <Link
          href={`/products/${item.productCode.toLowerCase()}`}
          className="line-clamp-2 text-justify font-semibold"
        >
          {item.title}
        </Link>
        <Link
          href={`/c/${item.category?.name.trim() ?? ""}`}
          className="text-gray-secondary w-fit text-[10px] font-semibold"
        >
          {item.category?.name ?? "N/A"}
        </Link>
        {/* ratings  */}
        <div>
          <span className="flex items-center gap-1">
            <RatingStars rating={item.averageRating} />
            <span>{item.averageRating.toFixed(1)}</span>
            <span>({item._count?.reviews})</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between font-bold">
          <div className="space-x-2">
            <span className="text-gray-primary">Price:</span>{" "}
            <span className="font-semibold">
              ৳
              {Number(item.discount)
                ? Number(item.discountPrice).toFixed(2)
                : Number(item.price).toFixed(2)}
            </span>
            <span
              className={`text-gray-primary px-1 text-xs line-through ${item.discount ? "" : "hidden"}`}
            >
              ৳{Number(item.price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* buttons - add to cart and order now  */}
        <div className="flex flex-wrap justify-around gap-2 p-2">
          <Button
            onClick={async () => {
              if (!session || !session.data?.user?.id) {
                HandleAddToLocalCart({
                  brand: item.brand,
                  stock: item.stock,
                  keyFeatures: item.keyFeatures,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                  categoryId: item.categoryId,
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  productCode: item.productCode,
                  images: item.images,
                  discount: item.discount,
                  discountPrice: item.discountPrice,
                  qty: 1,
                  dispatch,
                  router,
                });
                return;
              }
              await HandleAddToCart({
                dispatch,
                userId: Number(session.data?.user?.id) ?? undefined,
                title: item.title,
                price: Number(item.price),
                qty: 1,
                productId: item.id,
                router: router,
              });
            }}
            disabled={item.stock < 1}
            type="button"
            size={"lg"}
            variant={"secondary"}

            // className="text-lg px-3 py-1 disabled:bg-gray-secondary/50 disabled:text-background rounded-lg bg-gray-secondary/20 hover:bg-green-primary hover:ring-2 active:bg-green-primary/50 hover:text-background transition-all border-gray-secondary border flex-center gap-2 "
          >
            <CirclePlus /> Add to Cart
          </Button>
          <Button
            onClick={async () => {
              if (!session || !session.data?.user?.id) {
                HandleAddToLocalCart({
                  dispatch,
                  brand: item.brand,
                  stock: item.stock,
                  keyFeatures: item.keyFeatures,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                  categoryId: item.categoryId,
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  productCode: item.productCode,
                  images: item.images,
                  discount: item.discount,
                  discountPrice: item.discountPrice,
                  qty: 1,
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
                title: item.title,
                price: Number(item.price),
                qty: 1,
                productId: item.id,
                userId: Number(session.data?.user?.id),
              });
              if (!res) {
                return;
              }
              router.push("/checkout");
            }}
            disabled={item.stock < 1}
            type="button"
            size={"lg"}
            variant={"default"}
            // className="text-lg px-3 disabled:bg-green-primary/50 py-1 rounded-lg  bg-green-primary hover:bg-green-primary/80 hover:ring-2 active:bg-green-primary/50 text-background transition-all border-gray-secondary border flex-center gap-2 "
          >
            <Banknote /> Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
