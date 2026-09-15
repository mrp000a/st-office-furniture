"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IoMailOpenOutline,
  IoMailUnreadOutline,
  IoReload,
} from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PageAddCategory from "../_dash_components/common/addCategory";
import { deleteMessages, editMessages } from "@/lib/api";
import { Message } from "@/generated/prisma";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { useRouter } from "next/navigation";
import PaginationLayout from "@/components/common/paginationLayout";
import SearchLayout from "@/components/common/searchLayout";
import { FaReadme } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const PageMessagesAdmin = ({
  categories,
  currentPage,
  totalPages,
}: {
  categories: Message[];
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const { confirm } = useAlertDialog();
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
  const [openEditCategory, setOpenEditCategory] = useState<boolean>(false);
  // const [categories, setCategories] = useState<Category[] | null>(null);
  const [editCategoryData, setEditCategoryData] = useState<{
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    isRead: boolean;
  } | null>(null);

  return (
    <div className="">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-2xl font-bold font-mono">Messages</h2>
        <div className="gap-1 flex items-center flex-wrap">
          <SearchLayout />
          <Button
            onClick={() => setOpenAddCategory((e) => !e)}
            variant={"outline"}
          >
            Add
          </Button>
          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="py-1 inline-block w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 ">
        {categories &&
          categories.length > 0 &&
          categories.map(
            (
              {
                name,
                id,
                email,
                message,
                createdAt,
                updatedAt,
                isRead,
                subject,
              },
              index,
            ) => (
              <div
                className="flex items-start justify-between border border-gray-secondary rounded-md p-1"
                key={index}
              >
                <div className="flex flex-col  w-full">
                  <div className="flex  justify-between items-center w-full">
                    {/* nameemail */}
                    <div>
                      <span className="text-base font-bold line-clamp-1">
                        {name}
                      </span>
                      <Link
                        target="_blank"
                        href={`mailto:${email}`}
                        className="text-xs text-gray-primary line-clamp-1"
                      >
                        {email}
                      </Link>
                    </div>
                    {/* buttons */}
                    <div className="flex flex-col  items-end">
                      <div className="text-xs">
                        <Badge variant={"destructive"}>
                          {new Date(createdAt).toISOString()}
                        </Badge>
                      </div>
                      <div className="flex items-center flex-wrap gap-2">
                        <Button
                          onClick={async () => {
                            await editMessages({ id, isRead: !isRead });
                            router.refresh();
                          }}
                          className=""
                          variant={"outline"}
                        >
                          {isRead ? (
                            <IoMailOpenOutline />
                          ) : (
                            <IoMailUnreadOutline />
                          )}

                          <span></span>
                        </Button>
                        <Button
                          onClick={async () => {
                            const a = await confirm({
                              title: "This action can't be undone!",
                              description: "Are you sure? Delete the Message",
                            });
                            if (!a) return;
                            await deleteMessages({ id, name });
                            router.refresh();
                          }}
                          className=" "
                          variant={"destructive"}
                        >
                          <RiDeleteBin5Fill />
                          <span>Delete</span>
                        </Button>

                        <Button
                          onClick={() => {
                            setEditCategoryData({
                              id,
                              name,
                              email,
                              subject,
                              message,
                              createdAt,
                              updatedAt,
                              isRead,
                            });
                            setOpenEditCategory(true);
                          }}
                          className=""
                          variant={"default"}
                        >
                          <FaReadme />
                          <span>View</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className=" flex flex-col gap-1">
                    <span className="text-sm ">
                      <span className="font-semibold">Subject: </span>
                      <span className="font-medium">{subject} </span>
                    </span>
                    <span className="text-sm line-clamp-3 whitespace-pre-line">
                      {message}
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
      </div>

      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />

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
          <DialogContent className="sm:max-w-lg max-h-screen flex flex-col">
            <DialogHeader>
              <DialogTitle>View Message</DialogTitle>
              <DialogDescription>
                Read your messages here. Click ok when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex h-full overflow-auto items-start justify-between border border-gray-secondary rounded-md p-1">
              <div className="flex flex-col  w-full">
                <div className="flex  justify-between items-center w-full">
                  {/* nameemail */}
                  <div>
                    <span className="text-base font-bold line-clamp-1">
                      {editCategoryData?.name}
                    </span>
                    <Link
                      target="_blank"
                      href={`mailto:${editCategoryData?.email}`}
                      className="text-xs text-gray-primary line-clamp-1"
                    >
                      {editCategoryData?.email}
                    </Link>
                  </div>
                  {/* buttons */}
                  <div className="flex flex-col  items-end">
                    <div className="text-xs">
                      <Badge variant={"destructive"}>
                        {editCategoryData?.createdAt &&
                          new Date(editCategoryData?.createdAt).toISOString()}
                      </Badge>
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                      <Button
                        onClick={async () => {
                          if (!editCategoryData?.id) return;
                          await editMessages({
                            id: editCategoryData?.id,
                            isRead: !editCategoryData?.isRead,
                          });
                          router.refresh();
                          setOpenEditCategory(false);
                        }}
                        className=""
                        variant={"outline"}
                      >
                        {editCategoryData?.isRead ? (
                          <IoMailOpenOutline />
                        ) : (
                          <IoMailUnreadOutline />
                        )}

                        <span></span>
                      </Button>
                      <Button
                        onClick={async () => {
                          const a = await confirm({
                            title: "This action can't be undone!",
                            description: "Are you sure? Delete the Message",
                          });
                          if (!a) return;
                          if (editCategoryData?.id)
                            await deleteMessages({
                              id: editCategoryData?.id,
                              name: editCategoryData?.name,
                            });
                          router.refresh();
                          setOpenEditCategory(false);
                        }}
                        className=" "
                        variant={"destructive"}
                      >
                        <RiDeleteBin5Fill />
                        <span>Delete</span>
                      </Button>

                      <Button
                        onClick={() => {
                          setOpenEditCategory(false);
                        }}
                        className=""
                        variant={"default"}
                      >
                        <FaReadme />
                        <span>Close</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col gap-1">
                  <span className="text-sm ">
                    <span className="font-semibold">Subject: </span>
                    <span className="font-medium">
                      {editCategoryData?.subject}{" "}
                    </span>
                  </span>
                  <span className="text-sm  whitespace-pre-line">
                    {editCategoryData?.message}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <div className="w-full flex items-end justify-end">
                <Button
                  variant={"outline"}
                  onClick={() => setOpenEditCategory(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={"default"}
                  onClick={() => setOpenEditCategory(false)}
                >
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default PageMessagesAdmin;
