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
    <div className="w-full max-w-384 bg-background border shadow rounded-md mx-auto space-y-6 p-3">
      {/* Header */}
      <div className="flex gap-4 flex-wrap items-center justify-between w-full">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Categories</h1>

            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {totalItems}
            </span>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
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
              className="group overflow-hidden   rounded-xl border bg-violet-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Image */}
              <button
                onClick={() => router.push(`/products?category=${name}`)}
                className="relative cursor-pointer aspect-[16/10] w-full overflow-hidden bg-muted"
              >
                {image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_R2}/${image}`}
                    alt={image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  //   <div>{image}</div>
                  <BiCategory className="h-full w-full" />
                )}

                {/* Product Count */}
                <div className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
                  {_count.products} products
                </div>
              </button>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{name}</h2>

                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                      {description}
                    </p>
                  </div>

                  {/* More */}
                  <button
                    type="button"
                    title="More options"
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 border-t pt-3">
                  <Button className="flex-1" variant={"outline"} asChild>
                    <Link href={`/products?category=${name}`}>
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
        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <FolderOpen className="size-5 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-semibold">No categories found</h3>
        </div>
      )}

      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
