"use client";

import Image from "next/image";
import { Edit, FolderOpen, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "@/generated/prisma";
import SearchLayout from "@/components/common/searchLayout";
import { BiCategory } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import PaginationLayout from "@/components/common/paginationLayout";
import { deleteCategories } from "@/lib/api";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoReload } from "react-icons/io5";
import { MdViewList } from "react-icons/md";
import Link from "next/link";
import { getImageUrlProduct } from "@/lib/getImageUrl";

export default function CategoriesPageClient({
  categories,
  currentPage,
  totalPages,
  totalItems,
}: {
  categories: (Category & { _count: { products: number } })[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  return (
    <div className="bg-background mx-auto w-full max-w-384 space-y-6 rounded-md border p-3 shadow">
      {/* Header */}
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Categories</h1>

            <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-semibold">
              {totalItems}
            </span>
          </div>

          <p className="text-muted-foreground mt-1 text-sm">
            Explore our products into categories.
          </p>
        </div>

        {/* Add Category */}
        <div className="flex items-center gap-2">
          <div className="w-full flex-1">
            <SearchLayout />
          </div>

          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map(
          ({ id, name, description, _count, createdAt, image, updatedAt }) => (
            <div
              key={id}
              className="group bg-violet-primary/10 overflow-hidden rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Image */}
              <button
                onClick={() => router.push(`/c/${name}`)}
                className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-white"
              >
                {image ? (
                  <Image
                    unoptimized
                    src={getImageUrlProduct(image)}
                    alt={image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  //   <div>{image}</div>
                  <BiCategory className="h-full w-full" />
                )}

                {/* Product Count */}
                <div className="bg-background/90 absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
                  {_count.products} products
                </div>
              </button>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{name}</h2>

                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-5">
                      {description}
                    </p>
                  </div>

                  {/* More */}
                  <button
                    type="button"
                    title="More options"
                    className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 shrink-0 items-center justify-center rounded-md transition"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t pt-3">
                  <Button className="flex-1" variant={"outline"} asChild>
                    <Link href={`/c/${name}`}>
                      <MdViewList className="size-3.5" />
                      See Products
                    </Link>
                  </Button>
                  {/* <Button className=" " variant={"destructive"}>
                    <Trash2 className="size-3.5" />
                  </Button> */}
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="bg-card flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <div className="bg-muted flex size-12 items-center justify-center rounded-full">
            <FolderOpen className="text-muted-foreground size-5" />
          </div>

          <h3 className="mt-4 font-semibold">No categories found</h3>
        </div>
      )}

      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
