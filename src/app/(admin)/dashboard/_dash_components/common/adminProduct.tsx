"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Edit, Package, Tag, Boxes, CalendarDays } from "lucide-react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

import { ProductDefaultImage } from "@/components/data/core";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/api";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { AdminProductItem } from "@/lib/formDataTypes";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import { formatDate } from "@/lib/secApi";

const ProductAdmin = ({ item }: { item: AdminProductItem }) => {
  const { confirm } = useAlertDialog();
  const router = useRouter();

  const discount = Number(item.discount) || 0;
  const price = Number(item.price) || 0;
  const discountPrice = Number(item.discountPrice) || 0;
  const stock = Number(item.stock) || 0;

  const finalPrice = discount > 0 ? discountPrice : price;

  const stockStatus =
    stock <= 0 ? "Out of stock" : stock <= 20 ? "Low stock" : "In stock";

  const stockStatusClass =
    stock <= 0
      ? "bg-red-500/10 text-red-500"
      : stock <= 5
        ? "bg-orange-500/10 text-orange-500"
        : "bg-green-500/10 text-green-600 dark:text-green-400";

  const productImage = item.images?.[0]
    ? getImageUrlProduct(item.images[0])
    : ProductDefaultImage;

  const handleDelete = async () => {
    const isConfirm = await confirm({
      confirmText: "Delete",
      description:
        "Are you sure? This product and its related information may be permanently removed.",
      title: "Delete this product?",
    });

    if (!isConfirm) return;

    await deleteProduct({
      id: item.id,
      productCode: item.productCode,
    });

    router.refresh();
  };

  return (
    <article className="group border-green-primary/70 bg-violet-primary/5 shadow-blue-primary/20 hover:shadow-blue-primary/20 hover:ring-gray-secondary w-full overflow-hidden rounded-xl border p-1.5 text-xs shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2">
      {/* Actions */}
      <div className="mb-1.5 flex w-full items-center justify-end gap-1.5">
        <Button
          variant="destructive"
          size="sm"
          asChild
          className="h-8 px-2 text-xs"
        >
          <Link href={`/dashboard/products/${item.productCode}`}>
            <Edit className="h-3.5 w-3.5" />
            <span>Edit</span>
          </Link>
        </Button>

        <Button
          onClick={handleDelete}
          variant="default"
          size="sm"
          className="bg-red-primary dark:text-foreground h-8 cursor-pointer px-2 text-xs"
        >
          <RiDeleteBinFill className="h-3.5 w-3.5" />
          <span>Delete</span>
        </Button>
      </div>

      {/* Product Image */}
      <Link
        href={`/products/${item.productCode.toLowerCase()}`}
        className="border-gray-secondary/60 bg-background relative block aspect-video w-full overflow-hidden rounded-lg border"
      >
        <Image
          unoptimized
          src={getImageUrlProduct(productImage)}
          alt={item.title}
          sizes="256px"
          fill
          className="bg-white object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {discount > 0 && (
          <span className="bg-red-primary text-background ring-gray-secondary dark:text-foreground absolute top-1.5 right-1.5 z-20 flex flex-col items-center justify-center rounded-md px-2 py-1 shadow-sm ring-1">
            <span className="font-bold">{discount}%</span>
            <span className="text-[9px]">OFF</span>
          </span>
        )}

        <span className="bg-background/90 text-foreground absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-medium shadow-sm backdrop-blur">
          <Package className="h-3 w-3" />
          {item.images?.length || 0} images
        </span>
      </Link>

      {/* Product Main Information */}
      <div className="mt-2 flex w-full flex-col gap-2">
        {/* Title + Category */}
        <div>
          <Link
            href={`/products/${item.productCode.toLowerCase()}`}
            className="hover:text-primary line-clamp-2 text-sm leading-5 font-semibold transition-colors"
          >
            {item.title}
          </Link>

          <Link
            href={`/c/${item.category?.name?.toLowerCase() ?? ""}`}
            className="text-gray-secondary hover:text-primary mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium transition-colors"
          >
            <Tag className="h-3 w-3" />
            {item.category?.name ?? "Uncategorized"}
          </Link>
        </div>

        {/* Price */}
        <div className="border-border/70 rounded-md border-y py-1.5">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <span className="text-gray-secondary block text-[9px] font-medium tracking-wider uppercase">
                Selling Price
              </span>

              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-gray-primary text-base font-bold sm:text-lg">
                  ৳{finalPrice.toFixed(2)}
                </span>

                {discount > 0 && (
                  <span className="text-gray-secondary text-[10px] font-medium line-through">
                    ৳{price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {discount > 0 && (
              <span className="shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-500">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="text-gray-secondary flex items-center gap-1.5">
            <Boxes className="h-3.5 w-3.5" />
            <span>Inventory</span>
          </div>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${stockStatusClass}`}
          >
            {stockStatus}
          </span>
        </div>

        {/* Stock + Brand */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-muted/40 rounded-md px-2 py-1.5">
            <span className="text-gray-secondary block text-[9px] tracking-wide uppercase">
              Stock
            </span>

            <span className="block truncate font-semibold">{stock} units</span>
          </div>

          <div className="bg-muted/40 min-w-0 rounded-md px-2 py-1.5">
            <span className="text-gray-secondary block text-[9px] tracking-wide uppercase">
              Brand
            </span>

            <span className="block truncate font-semibold">
              {item.brand || "N/A"}
            </span>
          </div>
        </div>

        {/* Product Metadata */}
        <div className="border-border/60 bg-background/30 rounded-md border px-2 py-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-secondary">Product Code</span>
            <span
              className="max-w-[130px] truncate font-semibold"
              title={item.productCode}
            >
              {item.productCode}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-gray-secondary">Category</span>
            <span className="max-w-[130px] truncate font-semibold">
              {item.category?.name ?? "N/A"}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="border-border/60 text-gray-secondary border-t pt-1.5 text-[9px]">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Created
            </span>

            <span className="text-gray-primary font-medium">
              {formatDate(item.createdAt)}
            </span>
          </div>

          <div className="mt-0.5 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Updated
            </span>

            <span className="text-gray-primary font-medium">
              {formatDate(item.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductAdmin;
