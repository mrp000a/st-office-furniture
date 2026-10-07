"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gender, User, UserRole } from "@/generated/prisma";
import Image from "next/image";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { ProductDefaultImage } from "@/components/data/core";
import { FaUserCircle } from "react-icons/fa";
import PageEditUserAdmin from "../_dash_components/common/PageEditUser";
import { NoItemsFound } from "@/components/uiComponent/uiCom";
import {
  ChevronRight,
  CirclePlus,
  Edit2,
  Settings,
  Trash2,
  Verified,
  VerifiedIcon,
} from "lucide-react";
import PageAddUserAdmin from "../_dash_components/common/pageAddUserAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import SearchLayout from "@/components/common/searchLayout";
import { useRouter } from "next/navigation";
import PaginationLayout from "@/components/common/paginationLayout";
import { deleteUser } from "@/lib/api";
import SearchShowClient from "@/components/common/searchShowClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import { Badge } from "@/components/ui/badge";
import { formatBDDate, formatBDDateTime, formatTime } from "@/lib/secApi";

const PageUsersAdmin = ({
  users,
  currentPage,
  totalPages,
}: {
  users: User[];
  currentPage: number;
  totalPages: number;
}) => {
  const { confirm } = useAlertDialog();
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  const [openEditUser, setOpenEditUser] = useState<boolean>(false);
  const router = useRouter();

  const [editUserData, setEditUserData] = useState<{
    id: number;
    name: string;
    phone: string;
    email: string;
    gender: Gender;
    image?: string;
    role?: UserRole;
    address?: string;
  } | null>(null);

  return (
    <div className="w-full">
      {/* header */}
      <section className="w-full">
        <div className="flex w-full items-center justify-between gap-1">
          <div>
            <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
              <Settings className="h-4 w-4" />
              <span>Administration</span>
              <ChevronRight className="h-4 w-4" />
              <span>Users</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Users
            </h1>

            <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
              Manage your users from one place.
            </p>
          </div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-1 max-[400px]:flex-wrap">
              <div className="flex-1">
                <SearchLayout />
              </div>
              <Button
                onClick={() => setOpenAddUser((e) => !e)}
                variant={"default"}
              >
                <CirclePlus />
                Add
              </Button>
              <Button onClick={() => router.refresh()} variant={"outline"}>
                <IoReload />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <hr className="inline-block w-full py-1" />
      <SearchShowClient />
      {users && users.length > 0 ? (
        <div className="w-full">
          <div className="hidden md:block">
            <Table className="">
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map(
                  ({
                    name,
                    id,
                    image,
                    email,
                    phone,
                    address,
                    gender,
                    role,
                    emailVerified,
                    createdAt,
                  }) => (
                    <TableRow
                      key={id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      {/* ID */}
                      <TableCell>
                        <span className="font-mono text-xs font-medium text-muted-foreground">
                          #{id}
                        </span>
                      </TableCell>

                      {/* User */}
                      <TableCell>
                        <div className="flex min-w-48 items-center gap-3">
                          <Avatar className="size-9 shrink-0 border">
                            <AvatarImage
                              alt={name ?? "User"}
                              src={getImageUrlProduct(image)}
                            />
                            <AvatarFallback className="text-xs font-semibold">
                              {name?.charAt(0).toUpperCase() ?? "U"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate font-semibold leading-tight">
                              {name || "Unnamed User"}
                            </p>

                            <p className="mt-0.5 max-w-52 truncate text-xs text-muted-foreground">
                              {email || "No email"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact */}
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">
                            {phone || "N/A"}
                          </p>

                          <p className="max-w-44 truncate text-xs text-muted-foreground">
                            {email || "No email"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Address */}
                      <TableCell>
                        <p className="max-w-56 min-w-40 whitespace-normal wrap-break-word text-sm text-muted-foreground">
                          {address || "No address provided"}
                        </p>
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="font-medium capitalize"
                        >
                          {role?.toLowerCase()}
                        </Badge>
                      </TableCell>

                      {/* Verification */}
                      <TableCell>
                        {emailVerified ? (
                          <Badge
                            variant="default"
                            className="gap-1.5 bg-green-600 hover:bg-green-600"
                          >
                            <VerifiedIcon className="size-3.5" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge
                            variant="destructive"
                            className="gap-1.5"
                          >
                            <span className="size-1.5 rounded-full bg-current" />
                            Unverified
                          </Badge>
                        )}
                      </TableCell>

                      {/* Gender */}
                      <TableCell>
                        <span className="text-sm capitalize">
                          {gender?.toLowerCase() || "N/A"}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        <div className="whitespace-nowrap">
                          <p className="text-sm font-medium">
                            {formatBDDate(createdAt) || "N/A"}
                          </p>

                          <p className="text-[11px] text-muted-foreground">
                            {formatTime(createdAt) || "N/A"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditUserData({
                                name,
                                email,
                                gender: gender ?? "MALE",
                                role,
                                id,
                                phone: phone ?? "",
                                image: image ?? "",
                                address: address ?? "",
                              });

                              setOpenEditUser(true);
                            }}
                          >
                            <Edit2 /> Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              const isConfirm = await confirm({
                                title: "Are you sure? Delete the user!",
                                description: (
                                  <span>
                                    {"This action can't be undone. Delete"}{" "}
                                    <strong className="font-bold">
                                      {name}.
                                    </strong>
                                  </span>
                                ),
                                confirmText: "Delete",
                              });

                              if (!isConfirm) return;

                              await deleteUser({
                                id,
                                email,
                                image: image ?? undefined,
                              });

                              router.refresh();
                            }}
                          >
                            <Trash2 />  Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
          <div className="space-y-3 md:hidden">
            {users.map(
              ({
                name,
                id,
                image,
                email,
                phone,
                address,
                gender,
                role,
                emailVerified,
                createdAt,
              }) => (
                <div
                  key={id}
                  className="rounded-xl border bg-card p-4 shadow-sm"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="size-11 shrink-0 border">
                        <AvatarImage
                          alt={name ?? "User"}
                          src={getImageUrlProduct(image)}
                        />

                        <AvatarFallback className="font-semibold">
                          {name?.charAt(0).toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold">
                            {name || "Unnamed User"}
                          </p>
                        </div>

                        <p className="truncate text-xs text-muted-foreground">
                          {email || "No email"}
                        </p>

                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                          User #{id}
                        </p>
                      </div>
                    </div>

                    {/* Role */}
                    <Badge
                      variant="outline"
                      className="shrink-0 capitalize"
                    >
                      {role?.toLowerCase()}
                    </Badge>
                  </div>

                  {/* Divider */}
                  <div className="my-4 h-px bg-border" />

                  {/* Information */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {/* Phone */}
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Phone
                      </p>

                      <p className="mt-1 truncate text-sm font-medium">
                        {phone || "N/A"}
                      </p>
                    </div>

                    {/* Gender */}
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Gender
                      </p>

                      <p className="mt-1 text-sm font-medium capitalize">
                        {gender?.toLowerCase() || "N/A"}
                      </p>
                    </div>

                    {/* Verification */}
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Account
                      </p>

                      <div className="mt-1">
                        {emailVerified ? (
                          <Badge className="gap-1 bg-green-600 hover:bg-green-600">
                            <VerifiedIcon className="size-3" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            Unverified
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Joined */}
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        Joined
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {new Date(createdAt).toLocaleDateString("en-BD", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-4 rounded-lg bg-muted/40 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Address
                    </p>

                    <p className="mt-1 text-sm leading-relaxed">
                      {address || "No address provided"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setEditUserData({
                          name,
                          email,
                          gender: gender ?? "MALE",
                          role,
                          id,
                          phone: phone ?? "",
                          image: image ?? "",
                          address: address ?? "",
                        });

                        setOpenEditUser(true);
                      }}
                    >
                      <Edit2 /> Edit User
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={async () => {
                        const isConfirm = await confirm({
                          title: "Are you sure? Delete the user!",
                          description: (
                            <span>
                              {"This action can't be undone. Delete"}{" "}
                              <strong className="font-bold">
                                {name}.
                              </strong>
                            </span>
                          ),
                          confirmText: "Delete",
                        });

                        if (!isConfirm) return;

                        await deleteUser({
                          id,
                          email,
                          image: image ?? undefined,
                        });

                        router.refresh();
                      }}
                    >
                      <Trash2 />  Delete
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>

        </div>
      ) : (
        <NoItemsFound />
      )}

      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
      {/* all dialogs  */}
      <>
        {/* add category dialog */}
        <Dialog
          open={openAddUser}
          onOpenChange={setOpenAddUser}
        // modal={false}
        >
          <DialogContent className="max-h-screen overflow-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Create new user here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <PageAddUserAdmin setOpen={setOpenAddUser} />
            </div>
          </DialogContent>
        </Dialog>
        {/* edit category dialog */}
        <Dialog
          open={openEditUser}
          onOpenChange={setOpenEditUser}
        // modal={false}
        >
          <DialogContent className="max-h-screen overflow-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to your user here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <PageEditUserAdmin
                name={editUserData?.name}
                email={editUserData?.email}
                phone={editUserData?.phone}
                address={editUserData?.address}
                gender={editUserData?.gender}
                id={editUserData?.id}
                image={editUserData?.image}
                role={editUserData?.role}
                setOpen={setOpenEditUser}
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default PageUsersAdmin;
