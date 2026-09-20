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
import { ChevronRight, CirclePlus, Settings } from "lucide-react";
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
        <div className="flex  w-full gap-1  items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Settings className="h-4 w-4" />
              <span>Administration</span>
              <ChevronRight className="h-4 w-4" />
              <span>Users</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Users
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Manage your users from one place.
            </p>
          </div>
          <div className="flex justify-between items-center  relative ">
            <div className="gap-1 flex items-center max-[400px]:flex-wrap">
              <div className=" flex-1">
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
      <hr className="py-1 inline-block w-full" />
      <SearchShowClient />
      {users && users.length > 0 ? (
        <div className="w-full">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>User Id</TableHead>
                {/* <TableHead>Order Id</TableHead> */}
                <TableHead>User</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                {/* <TableHead>Payment</TableHead> */}
                <TableHead>Role</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Buttons</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {users.map(
                (
                  {
                    name,
                    id,
                    image,
                    email,
                    phone,
                    address,
                    gender,
                    role,
                    createdAt,
                  },
                  index,
                ) => (
                  <TableRow key={index} className="">
                    <TableCell className="font-medium">#{id}</TableCell>

                    <TableCell>
                      <div className="flex items-center justify-start  gap-1">
                        <span className="min-w-6 max-w-6  min-h-6 max-h-6 relative z-10 inline-block rounded-full  overflow-hidden">
                          <Avatar className="size-6">
                            <AvatarImage
                              src={`${process.env.NEXT_PUBLIC_URL_R2}/${image}`}
                            />
                            <AvatarFallback>
                              {name?.charAt(0).toUpperCase() ?? "U"}
                            </AvatarFallback>
                          </Avatar>
                        </span>
                        <div>
                          <p className="font-medium">{name}</p>
                          <div className="text-[10px] flex flex-wrap items-center gap-x-2">
                            <p className=" text-muted-foreground">{email}</p>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{phone}</TableCell>

                    <TableCell className="">
                      <p className="max-w-60 min-w-48 whitespace-normal wrap-break-word">
                        {address ?? "N/A"}
                      </p>
                    </TableCell>

                    <TableCell>{role}</TableCell>
                    <TableCell>{gender}</TableCell>

                    <TableCell>
                      {new Date(createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
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
                          variant={"destructive"}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={async () => {
                            const isConfirm = await confirm({
                              title: `Are you sure? Delete the user!`,
                              description: (
                                <span>
                                  {"This action can't be undone. Delete "}
                                  <strong className="font-bold">{name}.</strong>
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

                            // toast.error("User can't be deleted!", {
                            //   description: new Date().toDateString(),
                            // });

                            router.refresh();
                          }}
                          className="bg-green-primary"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
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
          <DialogContent className="sm:max-w-lg max-h-screen overflow-auto">
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
          <DialogContent className="sm:max-w-lg  max-h-screen overflow-auto">
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
