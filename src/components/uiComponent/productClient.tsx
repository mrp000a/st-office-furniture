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
    <div className="hover:shadow-2xl group bg-background dark:bg-background hover:translate-y-0.5 duration-300 shadow-blue-primary/40 hover:ring-3 hover:ring-gray-secondary  transition-all flex flex-col max-w-full box-border w-full justify-start items-start gap-2 ring-2 ring-green-primary p-1 rounded-sm relative">
      {/* main image and discount red  */}
      <Link
        href={`/products/${item.productCode.toLowerCase()}`}
        className=" relative block w-full aspect-square overflow-hidden rounded-md border border-gray-secondary bg-white"
      >
        <Image
          src={getImageUrlProduct(item.images[0])}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
          className="   object-contain   transition-transform   duration-700   ease-in-out   group-hover:scale-110 "
        />
        <span
          className={`bg-red-primary flex-center flex-col font-bold  text-background dark:text-foreground rounded-md text-xs ring-2 ring-gray-secondary px-2 py-1  absolute right-0 top-0 z-20 ${item.discount ? "" : "hidden"}`}
        >
          <span className="font-bold">{Number(item.discount)}%</span>
          <span className="text-xs">Off</span>
        </span>
        <span
          className={`bg-red-primary flex-center flex-col  font-bold text-background dark:text-foreground  text-xs ring-2 ring-gray-secondary px-5 py-1  absolute -left-[18px]  -rotate-45 top-0 z-20 ${new Date(item.createdAt) > sevenDaysAgo ? "" : "hidden"}`}
        >
          New
        </span>
      </Link>

      <div className="flex flex-col w-full">
        <Link
          href={`/products/${item.productCode.toLowerCase()}`}
          className="line-clamp-2 font-semibold  text-justify"
        >
          {item.title}
        </Link>
        <Link
          href={`/products?category=${item.category?.name?.toLowerCase() ?? ""}`}
          className="font-semibold text-gray-secondary text-[10px] w-fit"
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
        <div className=" font-bold flex flex-wrap justify-between items-center">
          <div className="space-x-2">
            <span className="text-gray-primary">Price:</span>{" "}
            <span className="font-semibold">
              ৳
              {Number(item.discount)
                ? Number(item.discountPrice).toFixed(2)
                : Number(item.price).toFixed(2)}
            </span>
            <span
              className={`text-xs text-gray-primary line-through px-1 ${item.discount ? "" : "hidden"}`}
            >
              ৳{Number(item.price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* buttons - add to cart and order now  */}
        <div className="flex  flex-wrap gap-2 p-2 justify-around">
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
