"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiEdit3 } from "react-icons/fi";
import PageAddCategory from "../_dash_components/components/addCategory";
import { deleteCategories, getCategories } from "@/lib/api";
import { Category } from "@/generated/prisma";
import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { ProductDefaultImage } from "@/components/data/core";

const Page = () => {
  const { confirm } = useAlertDialog();
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [editCategoryData, setEditCategoryData] = useState<{
    name: string;
    description?: string | undefined;
    imageString: string;
    id: number;
  } | null>(null);

  const loadCategories = async () => {
    const res = await getCategories();
    if (!res.success) return;

    setCategories(res.result);
  };

  useEffect(() => {
    function Load() {
      loadCategories();
    }
    Load();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-2xl font-bold font-mono">Categories</h2>
        <div className="gap-1 flex items-center flex-wrap">
          <Button
            onClick={() => setOpenAddCategory((e) => !e)}
            variant={"outline"}
          >
            Add
          </Button>
          <Button onClick={() => loadCategories()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="py-1 inline-block w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 ">
        {categories &&
          categories.length > 0 &&
          categories.map(({ description, name, id, image }, index) => (
            <div
              className="flex items-start justify-between border border-gray-secondary rounded-md p-1"
              key={index}
            >
              <div className="flex  gap-2">
                <span className="w-14  h-14 relative z-10 inline-block rounded-md border border-gray-primary overflow-hidden">
                  {image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL_R2}/${image ? image : ProductDefaultImage}`}
                      alt={name}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <TbCategoryPlus className="h-full w-full" />
                  )}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-base font-bold line-clamp-2">
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
              <div className="flex items-center flex-wrap gap-2">
                <Button
                  onClick={() => {
                    setEditCategoryData({
                      name,
                      id,
                      description: description ?? "",
                      imageString: image ?? "",
                    });
                    setOpenEditCategory(true);
                  }}
                  className=""
                  variant={"outline"}
                >
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
                    loadCategories();
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

      {/* all dialogs  */}
      <>
        {/* add category dialog */}
        <Dialog
          open={openAddCategory}
          onOpenChange={setOpenAddCategory}
          // modal={false}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Make changes to your product here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <PageAddCategory
                load={loadCategories}
                setOpenAddCategory={setOpenAddCategory}
                saveButtonText="Add Category"
              />
            </div>
          </DialogContent>
        </Dialog>
        {/* edit category dialog */}
        <Dialog
          open={openEditCategory}
          onOpenChange={setOpenEditCategory}
          // modal={false}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Make changes to your category here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <PageAddCategory
                load={loadCategories}
                isEdit={true}
                id={editCategoryData?.id}
                setOpenAddCategory={setOpenEditCategory}
                name={editCategoryData?.name}
                description={editCategoryData?.description}
                oldImage={editCategoryData?.imageString}
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default Page;
