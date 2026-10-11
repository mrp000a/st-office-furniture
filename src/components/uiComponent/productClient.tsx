"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  Check,
  CirclePlus,
  Package,
  ShoppingCart,
  Star,
} from "lucide-react";

import { ProductItemType } from "../data/core";
import { HandleAddToCart, HandleAddToLocalCart } from "@/lib/api";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import RatingStars from "./ratingstars";
import { Button } from "../ui/button";
import { getProductPricing } from "@/lib/pricing";

const ProductClient = ({
  item,
}: {
  item: ProductItemType & { averageRating: number };
}) => {
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const [addingToCart, setAddingToCart] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const pricing = getProductPricing(item);
  const isNew = useMemo(() => {
    const createdAt = new Date(item.createdAt).getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    return (
      Number.isFinite(createdAt) &&
      Date.now() - createdAt >= 0 &&
      Date.now() - createdAt <= sevenDays
    );
  }, [item.createdAt]);

  const hasReviews = Number(item._count?.reviews ?? 0) > 0;

  const productHref = `/products/${item.productCode.toLowerCase()}`;

  const handlePurchase = async (orderNow = false) => {
    if (item.stock < 1) return;

    if (orderNow) {
      setOrdering(true);
    } else {
      setAddingToCart(true);
    }

    try {
      if (!session.data?.user?.id) {
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

        if (orderNow) {
          // Keep the delay if your local cart requires time to persist.
          window.setTimeout(() => {
            router.push("/checkout");
          }, 500);
        }

        return;
      }

      const result = await HandleAddToCart({
        dispatch,
        userId: Number(session.data.user.id),
        title: item.title,
        price: pricing.originalPrice,
        qty: 1,
        productId: item.id,
        router,
      });

      if (orderNow && result) {
        router.push("/checkout");
      }
    } finally {
      setAddingToCart(false);
      setOrdering(false);
    }
  };

  return (
    <article className="group border-border/70 bg-card text-card-foreground hover:border-primary/30 hover:shadow-primary/5 relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product image */}
      <Link
        href={productHref}
        aria-label={`View ${item.title}`}
        className="bg-muted/30 relative block overflow-hidden"
      >
        <div className="dark:bg-muted/20 relative aspect-5/4 w-full overflow-hidden bg-white">
          {item.images?.[0] ? (
            <Image
              unoptimized
              src={getImageUrlProduct(item.images[0])}
              alt={item.title}
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-5"
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
              Product image unavailable
            </div>
          )}

          {/* Top badges */}
          <div className="absolute inset-x-2 top-2 z-10 flex items-start justify-between gap-2 sm:inset-x-3 sm:top-3">
            {isNew ? (
              <span className="border-border/60 bg-background/95 text-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold shadow-sm backdrop-blur sm:text-xs">
                <span className="bg-primary size-1.5 rounded-full" />
                New arrival
              </span>
            ) : (
              <span />
            )}

            {pricing.hasDiscount && (
              <span className="bg-destructive text-destructive-foreground rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm sm:text-xs">
                {pricing.discountLabel}
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {item.stock < 1 && (
            <div className="bg-background/65 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px]">
              <span className="border-border bg-background rounded-full border px-4 py-2 text-xs font-semibold shadow-sm sm:text-sm">
                Out of stock
              </span>
            </div>
          )}

          {/* Image hover label */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center bg-gradient-to-t from-black/40 to-transparent px-3 pt-8 pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 text-xs font-medium text-white">
              View product <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Title */}
        <Link
          href={productHref}
          className="hover:text-primary line-clamp-2 min-h-10 text-sm leading-5 font-semibold tracking-tight transition-colors sm:min-h-11 sm:text-base sm:leading-[1.4]"
        >
          {item.title}
        </Link>
        {/* Category */}
        <Link
          href={`/c/${encodeURIComponent(item.category?.name.trim() ?? "")}`}
          className="text-muted-foreground hover:text-primary mb-1.5 w-fit max-w-full truncate text-[9px] font-semibold tracking-[0.12em] uppercase transition-colors sm:text-[10px]"
        >
          {item.category?.name ?? "Furniture"}
        </Link>
        {/* Rating */}
        <div className="mt-2 flex min-h-5 items-center gap-1.5 overflow-hidden">
          {hasReviews ? (
            <>
              <RatingStars rating={item.averageRating} />
              <span className="text-xs font-semibold tabular-nums">
                {item.averageRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground truncate text-[10px] sm:text-xs">
                ({item._count?.reviews ?? 0})
              </span>
            </>
          ) : (
            <span className="text-muted-foreground flex items-center gap-1 text-[10px] sm:text-xs">
              <Star size={13} />
              No reviews yet
            </span>
          )}
        </div>

        {/* Price */}
        <div className="border-border/70 mt-3 flex min-h-12 flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t pt-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-lg font-bold tracking-tight tabular-nums sm:text-xl">
                ৳
                {pricing.salePrice.toLocaleString("en-BD", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {pricing.hasDiscount && (
              <span className="text-muted-foreground text-xs line-through">
                ৳
                {pricing.originalPrice.toLocaleString("en-BD", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </div>

          <span
            className={`flex shrink-0 items-center gap-1 text-[10px] font-medium sm:text-xs ${
              item.stock > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground"
            }`}
          >
            {item.stock > 0 ? (
              <>
                <Check size={12} />
                In stock
              </>
            ) : (
              "Unavailable"
            )}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={item.stock < 1 || addingToCart || ordering}
            onClick={() => void handlePurchase(false)}
            className="hover:border-primary hover:bg-primary/5 hover:text-primary h-9 min-w-0 gap-1.5 rounded-xl px-2 text-xs font-semibold transition-all sm:text-sm"
          >
            {addingToCart ? (
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <ShoppingCart size={15} />
            )}
            <span className="truncate">
              {addingToCart ? "Adding..." : "Add to Cart"}
            </span>
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={item.stock < 1 || ordering || addingToCart}
            onClick={() => void handlePurchase(true)}
            className="h-9 min-w-0 gap-1.5 rounded-xl px-2 text-xs font-semibold shadow-sm transition-all hover:shadow-md sm:text-sm"
          >
            {ordering ? (
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Banknote size={15} />
            )}
            <span className="truncate">
              {ordering ? "Processing..." : "Order Now"}
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductClient;
