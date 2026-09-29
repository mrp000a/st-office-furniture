"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";

import { FiEdit3 } from "react-icons/fi";
import { deleteCategories } from "@/lib/api";
import { Category } from "@/generated/prisma";
import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { ProductDefaultImage } from "@/components/data/core";
import { useRouter } from "next/navigation";
import PaginationLayout from "@/components/common/paginationLayout";
import SearchLayout from "@/components/common/searchLayout";
import SearchShowClient from "@/components/common/searchShowClient";
import { getImageUrlProduct } from "@/lib/getImageUrl";

const PageCategoriesAdmin = ({
  categories,
  currentPage,
  totalPages,
}: {
  categories: Category[];
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const { confirm } = useAlertDialog();

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="font-mono text-2xl font-bold">Categories</h2>
        <div className="flex flex-wrap items-center gap-1">
          <div className="flex-1">
            <SearchLayout />
          </div>

          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="inline-block w-full py-1" />
      <SearchShowClient />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {categories &&
          categories.length > 0 &&
          categories.map(({ description, name, id, image }, index) => (
            <div
              className="border-gray-secondary flex items-start justify-between rounded-md border p-1"
              key={index}
            >
              <div className="flex gap-2">
                <span className="border-gray-primary relative z-10 inline-block h-14 w-14 overflow-hidden rounded-md border">
                  {image ? (
                    <Image
                      unoptimized
                      src={getImageUrlProduct(image)}
                      alt={name}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <TbCategoryPlus className="h-full w-full" />
                  )}
                </span>
                <div className="flex flex-col items-start">
                  <span className="line-clamp-2 text-base font-bold">
                    {name}
                  </span>
                  <span className="line-clamp-3 text-[10px]">
                    Description:{description}
                  </span>
                  {/* <span className="flex text-[9px] flex-col">
                      <span>Created At:{new Date(createdAt).toISOString()}</span>
                      <span>Updated At:{new Date(updatedAt).toISOString()}</span>
                    </span> */}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button className="" variant={"outline"}>
                  <FiEdit3 />
                  <span>Edit</span>
                </Button>
                <Button
                  onClick={async () => {
                    const a = await confirm({
                      title: "This action can't be undone!",
                      description: "Are you sure? Delete the category",
                    });
                    if (!a) return;
                    await deleteCategories({ id, name });
                    router.refresh();
                  }}
                  className=" "
                  variant={"destructive"}
                >
                  <RiDeleteBin5Fill />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          ))}
      </div>

      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PageCategoriesAdmin;
