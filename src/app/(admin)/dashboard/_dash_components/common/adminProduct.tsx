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
    <article className="group w-full  overflow-hidden rounded-xl border border-green-primary/70 bg-violet-primary/5 p-1.5 text-xs shadow-sm shadow-blue-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-primary/20 hover:ring-2 hover:ring-gray-secondary">
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
          className="h-8 cursor-pointer bg-red-primary px-2 text-xs dark:text-foreground"
        >
          <RiDeleteBinFill className="h-3.5 w-3.5" />
          <span>Delete</span>
        </Button>
      </div>

      {/* Product Image */}
      <Link
        href={`/products/${item.productCode.toLowerCase()}`}
        className="relative block aspect-video w-full overflow-hidden rounded-lg border border-gray-secondary/60 bg-background"
      >
        <Image
          src={getImageUrlProduct(productImage)}
          alt={item.title}
          sizes="256px"
          fill
          className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {discount > 0 && (
          <span className="absolute right-1.5 top-1.5 z-20 flex flex-col items-center justify-center rounded-md bg-red-primary px-2 py-1 text-background shadow-sm ring-1 ring-gray-secondary dark:text-foreground">
            <span className="font-bold">{discount}%</span>
            <span className="text-[9px]">OFF</span>
          </span>
        )}

        <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[9px] font-medium text-foreground shadow-sm backdrop-blur">
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
            className="line-clamp-2 text-sm font-semibold leading-5 transition-colors hover:text-primary"
          >
            {item.title}
          </Link>

          <Link
            href={`/categories/${item.category?.name?.toLowerCase() ?? ""}`}
            className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-gray-secondary transition-colors hover:text-primary"
          >
            <Tag className="h-3 w-3" />
            {item.category?.name ?? "Uncategorized"}
          </Link>
        </div>

        {/* Price */}
        <div className="rounded-md border-y border-border/70 py-1.5">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <span className="block text-[9px] font-medium uppercase tracking-wider text-gray-secondary">
                Selling Price
              </span>

              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-base font-bold text-gray-primary sm:text-lg">
                  ৳{finalPrice.toFixed(2)}
                </span>

                {discount > 0 && (
                  <span className="text-[10px] font-medium text-gray-secondary line-through">
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
          <div className="flex items-center gap-1.5 text-gray-secondary">
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
          <div className="rounded-md bg-muted/40 px-2 py-1.5">
            <span className="block text-[9px] uppercase tracking-wide text-gray-secondary">
              Stock
            </span>

            <span className="block truncate font-semibold">{stock} units</span>
          </div>

          <div className="min-w-0 rounded-md bg-muted/40 px-2 py-1.5">
            <span className="block text-[9px] uppercase tracking-wide text-gray-secondary">
              Brand
            </span>

            <span className="block truncate font-semibold">
              {item.brand || "N/A"}
            </span>
          </div>
        </div>

        {/* Product Metadata */}
        <div className="rounded-md border border-border/60 bg-background/30 px-2 py-1.5">
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
        <div className="border-t border-border/60 pt-1.5 text-[9px] text-gray-secondary">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Created
            </span>

            <span className="font-medium text-gray-primary">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="mt-0.5 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Updated
            </span>

            <span className="font-medium text-gray-primary">
              {new Date(item.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductAdmin;
