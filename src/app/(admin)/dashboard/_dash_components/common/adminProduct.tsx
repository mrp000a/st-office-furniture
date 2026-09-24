"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductDefaultImage } from "@/components/data/core";
import { deleteProduct } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { AdminProductItem } from "@/lib/formDataTypes";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { getImageUrlProduct } from "@/lib/getImageUrl";

const ProductAdmin = ({ item }: { item: AdminProductItem }) => {
  const { confirm } = useAlertDialog();
  const router = useRouter();

  return (
    <div className="hover:shadow-2xl text-xs bg-violet-primary/5 hover:translate-y-1 shadow-blue-primary/40 hover:ring-3 hover:ring-gray-secondary transition-all flex flex-col max-w-full box-border w-full justify-start items-start gap-2 ring-2 ring-green-primary p-1 rounded-sm relative">
      <div className="w-full flex justify-end flex-wrap gap-2">
        <Button variant={"destructive"} asChild>
          <Link href={`/dashboard/products/${item.productCode}`}>
            <Edit /> <span>Edit</span>
          </Link>
        </Button>
        <Button
          onClick={async () => {
            const isConfirm = await confirm({
              confirmText: "Delete",
              description: "Are you sure? The item will be deleted!",
              title: "This action can't be undone!",
            });
            if (!isConfirm) return;
            await deleteProduct({ id: item.id, productCode: item.productCode });
            router.refresh();
          }}
          variant={"default"}
          className="bg-green-primary dark:text-foreground cursor-pointer"
        >
          <RiDeleteBinFill /> <span>Delete</span>
        </Button>
      </div>
      {/* main image and discont red  */}
      <Link
        href={`/products/${item.productCode.toLowerCase()}`}
        className="  w-full aspect-video relative border box-border border-gray-secondary rounded-md overflow-hidden"
      >
        <Image
          src={getImageUrlProduct(item.images[0])}
          alt={item.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-contain hover:scale-120 active:sca1e-120 transition-all duration-500 ease-in-out"
        />
        <span
          className={`bg-green-primary flex-center flex-col  text-background dark:text-foreground rounded-md text-xs ring-2 ring-gray-secondary px-2 py-1  absolute right-0 top-0 z-20 ${item.discount ? "" : "hidden"}`}
        >
          <span className="font-bold">{Number(item.discount)}%</span>
          <span className="text-xs">Off</span>
        </span>
      </Link>

      <div className="flex w-full flex-col gap-0">
        {/* Product title + category */}
        <div className="space-y-0">
          <Link
            href={`/products/${item.productCode.toLowerCase()}`}
            className="line-clamp-2 text-sm font-semibold leading-5 transition-colors hover:text-primary sm:text-base"
          >
            {item.title}
          </Link>

          <Link
            href={`/products?category=${item.category?.name?.toLowerCase() ?? ""}`}
            className="inline-flex text-xs font-medium text-gray-secondary transition-colors hover:text-primary"
          >
            {item.category?.name ?? "N/A"}
          </Link>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between gap-1 border-y ">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-secondary">
              Price
            </span>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-lg font-bold text-gray-primary sm:text-xl">
                ৳
                {Number(item.discount)
                  ? Number(item.discountPrice).toFixed(2)
                  : Number(item.price).toFixed(2)}
              </span>

              {Number(item.discount) > 0 && (
                <span className="text-xs font-medium text-gray-secondary line-through">
                  ৳{Number(item.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Discount badge */}
          {Number(item.discount) > 0 && (
            <span className="shrink-0 rounded-full bg-red-500/10 px-2.5  text-xs font-bold text-red-500">
              -{Number(item.discount)}%
            </span>
          )}
        </div>

        {/* Product details */}
        <div className="grid grid-cols-2 gap-x-2  text-xs sm:text-sm">
          <div className="flex min-w-0 items-center justify-between ">
            <span className="text-gray-secondary">Stock</span>
            <span className="truncate font-semibold">{Number(item.stock)}</span>
          </div>

          <div className="flex min-w-0 items-center justify-between">
            <span className="text-gray-secondary">Brand</span>
            <span className="truncate font-semibold">
              {item.brand || "N/A"}
            </span>
          </div>

          <div className="flex min-w-0 items-center justify-between">
            <span className="text-gray-secondary">Code</span>
            <span className="truncate font-semibold">{item.productCode}</span>
          </div>

          <div className="flex min-w-0 items-center justify-between">
            <span className="text-gray-secondary">Category</span>
            <span className="truncate font-semibold">
              {item.category?.name ?? "N/A"}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className=" border-t  text-[11px] text-gray-secondary">
          <div className="flex justify-between gap-3">
            <span>Created</span>
            <span className="font-medium text-gray-primary">
              {new Date(item.createdAt).toDateString()}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span>Updated</span>
            <span className="font-medium text-gray-primary">
              {new Date(item.updatedAt).toDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
