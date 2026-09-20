"use client";

import { Message } from "@/generated/prisma";
import { deleteMessages, editMessages } from "@/lib/api";
import { Check, MailOpen, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaReadme } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IoReload } from "react-icons/io5";
import { messagesFilter } from "@/components/data/core";
import SearchLayout from "@/components/common/searchLayout";
import PaginationLayout from "@/components/common/paginationLayout";
import { GoDotFill } from "react-icons/go";
import { NoItemsFound } from "@/components/uiComponent/uiCom";

export default function MessagesPage({
  messages,
  unreadMessage,
  currentPage,
  totalPages,
}: {
  messages: Message[];
  unreadMessage?: number;
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [status, setStatus] = useState<string>("");
  const { confirm } = useAlertDialog();

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

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.set("page", "1");

    setStatus(value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-x-2">
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>

            <span
              className={`rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ${unreadMessage ? "" : "hidden"}`}
            >
              {unreadMessage} unread
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 max-w-full flex-wrap">
          <div className="max-w-full flex-1">
            <SearchLayout />
          </div>
          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row flex-wrap">
        <div className="flex items-center ">
          {messagesFilter.map(({ label, icon: Icon, value }, index) => (
            <Button
              onClick={() => handleFilter(value)}
              key={index}
              type="button"
              variant={status === value ? "default" : "outline"}
            >
              <Icon className="size-4" />
              {label}
            </Button>
          ))}{" "}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border bg-card md:block">
        {messages && messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Name</th>
                  <th className="px-5 py-4 text-left font-semibold">Email</th>
                  <th className="px-5 py-4 text-left font-semibold">Subject</th>
                  <th className="px-5 py-4 text-left font-semibold">Message</th>
                  <th className="px-5 py-4 text-left font-semibold">Date</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {messages.map(
                  ({
                    id,
                    name,
                    email,
                    subject,
                    message,
                    createdAt,
                    isRead,
                    updatedAt,
                  }) => (
                    <tr
                      key={id}
                      className={`transition hover:bg-muted/50 ${
                        !isRead ? "bg-violet-primary/[0.10]" : ""
                      }`}
                    >
                      {/* Name */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {name?.charAt(0)}
                          </div>

                          <div>
                            <p
                              className={`font-medium ${
                                !isRead ? "font-semibold" : ""
                              }`}
                            >
                              {name}
                            </p>

                            {!isRead && (
                              <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                                <span className="size-1.5 rounded-full bg-primary" />
                                Unread
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {email}
                      </td>

                      {/* Subject */}
                      <td className="max-w-52 px-5 py-4">
                        <p
                          className={`truncate ${
                            !isRead ? "font-semibold" : "font-medium"
                          }`}
                        >
                          {subject}
                        </p>
                      </td>

                      {/* Message */}
                      <td className="max-w-80 px-5 py-4">
                        <p className="line-clamp-2 text-muted-foreground">
                          {message}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                        {new Date(createdAt).toDateString() +
                          "__" +
                          new Date(createdAt).toTimeString().split("GMT")[0]}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          {/* View */}
                          <button
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
                            type="button"
                            title="View message"
                            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                          >
                            <FaReadme className="size-4" />
                          </button>

                          {/* Mark Read / Unread */}
                          <button
                            onClick={async () => {
                              await editMessages({
                                id: id,
                                isRead: !isRead,
                              });
                              router.refresh();
                            }}
                            type="button"
                            title={isRead ? "Mark as unread" : "Mark as read"}
                            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                          >
                            {isRead ? (
                              <MailOpen className="size-4" />
                            ) : (
                              <Check className="size-4" />
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={async () => {
                              const a = await confirm({
                                title: "This action can't be undone!",
                                description: "Are you sure? Delete the Message",
                              });
                              if (!a) return;
                              await deleteMessages({ id, name });
                              router.refresh();
                            }}
                            type="button"
                            title="Delete message"
                            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <NoItemsFound />
        )}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {messages && messages.length > 0 ? (
          messages.map(
            ({
              id,
              name,
              email,
              subject,
              message,
              createdAt,
              isRead,
              updatedAt,
            }) => (
              <div
                key={id}
                className={`rounded-xl border bg-card p-4 ${
                  !isRead ? "border-primary/30 bg-violet-primary/9" : ""
                }`}
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">{name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </div>

                  {!isRead && (
                    <span className="size-2 shrink-0 rounded-full bg-green-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="mt-4 space-y-2">
                  <p className="font-medium">{subject}</p>

                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {message}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(createdAt).toDateString() +
                      "__" +
                      new Date(createdAt).toTimeString().split("GMT")[0]}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
                  <button
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
                    type="button"
                    className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-muted"
                  >
                    <FaReadme className="size-3.5" />
                    View
                  </button>

                  <button
                    onClick={async () => {
                      await editMessages({
                        id: id,
                        isRead: !isRead,
                      });
                      router.refresh();
                    }}
                    type="button"
                    className="flex size-8 items-center justify-center rounded-md border transition hover:bg-muted"
                    title={isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {isRead ? (
                      <MailOpen className="size-3.5" />
                    ) : (
                      <Check className="size-3.5" />
                    )}
                  </button>
                  {/* delete */}
                  <button
                    onClick={async () => {
                      const a = await confirm({
                        title: "This action can't be undone!",
                        description: "Are you sure? Delete the Message",
                      });
                      if (!a) return;
                      await deleteMessages({ id, name });
                      router.refresh();
                    }}
                    type="button"
                    className="flex size-8 items-center justify-center rounded-md border text-destructive transition hover:bg-destructive/10"
                    title="Delete message"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ),
          )
        ) : (
          <NoItemsFound />
        )}
      </div>

      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />

      {/* show message dialog */}
      <Dialog
        open={openEditCategory}
        onOpenChange={setOpenEditCategory}
        // modal={false}
      >
        <DialogContent className="sm:max-w-lg max-h-[calc(100vh-20px)] px-2 flex flex-col">
          <DialogHeader>
            <DialogTitle>
              <div className="relative w-full flex items-center gap-1">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {editCategoryData?.name.charAt(0)}
                </div>
                <div>
                  <div>{editCategoryData?.name}</div>
                  <Link
                    target="_blank"
                    href={`mailto:${editCategoryData?.email}`}
                    className="text-xs font-light "
                  >
                    {editCategoryData?.email}
                  </Link>
                </div>

                <span
                  className={`absolute top-2 right-2 ${editCategoryData?.isRead ? "hidden" : ""}`}
                >
                  <Badge variant={"outline"}>
                    <GoDotFill className="fill-green-primary size-4" />
                    <span>Unread</span>
                  </Badge>
                </span>
              </div>
            </DialogTitle>
            {/* <DialogDescription> */}
            <div>
              <div>
                <span className="text-gray-primary">Subject:</span>
                <span className="font-semibold text-foreground">
                  {editCategoryData?.subject}
                </span>
              </div>
              <div className="text-[10px] font-light ">
                {editCategoryData?.createdAt &&
                  new Date(editCategoryData.createdAt).toDateString() +
                    "__" +
                    new Date(editCategoryData.createdAt)
                      .toTimeString()
                      .split("GMT")[0]}
              </div>
            </div>
            {/* </DialogDescription> */}
            <div className="font-semibold">Message:</div>
          </DialogHeader>
          <div className="flex h-full overflow-auto items-start justify-between border border-gray-secondary rounded-md p-1">
            <div className="flex flex-col  w-full">
              <span className="text-sm  whitespace-pre-line">
                {editCategoryData?.message}
              </span>
            </div>
          </div>
          <DialogFooter>
            <div className="w-full flex justify-end items-start gap-1 lg:gap-2">
              <Button
                onClick={async () => {
                  if (!editCategoryData?.id) return;
                  await editMessages({
                    id: editCategoryData?.id,
                    isRead: !editCategoryData?.isRead,
                  });
                  const time = setTimeout(() => {
                    setOpenEditCategory(false);
                    clearTimeout(time);
                  }, 500);
                  router.refresh();
                }}
                title={
                  editCategoryData?.isRead ? "Mark as unread" : "Mark as read"
                }
                className=""
                variant={"outline"}
              >
                {editCategoryData?.isRead ? (
                  <MailOpen className="size-3.5" />
                ) : (
                  <Check className="size-3.5" />
                )}
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
                  const time = setTimeout(() => {
                    setOpenEditCategory(false);
                    clearTimeout(time);
                  }, 500);
                  router.refresh();
                }}
                title="Delete Message"
                className=" "
                variant={"destructive"}
              >
                <RiDeleteBin5Fill />
                {/* <span>Delete</span> */}
              </Button>

              <Button
                onClick={() => {
                  setOpenEditCategory(false);
                }}
                title="Close"
                className=""
                variant={"default"}
              >
                {/* <FaReadme /> */}
                <span>Close</span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
