"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { deleteUser, getUsers } from "@/lib/api";
import { Gender, User, UserRole } from "@/generated/prisma";
import Image from "next/image";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { ProductDefaultImage } from "@/components/data/core";
import { FaUserCircle } from "react-icons/fa";
import PageEditUserAdmin from "../_dash_components/components/PageEditUser";
import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { CirclePlus, Key, Search } from "lucide-react";
import PageAddUserAdmin from "../_dash_components/components/pageAddUserAdmin";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Page = () => {
  const session = useSession();
  const { confirm } = useAlertDialog();
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  const [openEditUser, setOpenEditUser] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | null>(null);

  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  const [userLoadLimit, setUserLoadLimit] = useState<number>(100);
  const [searchUserString, setSearchUserString] = useState<string>("");
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

  const loadUsers = useCallback(async () => {
    const res = await getUsers({
      name: searchUserString,
      limit: userLoadLimit,
    });
    if (!res.success) return;

    setUsers(res.result);
  }, [searchUserString, userLoadLimit]);

  useEffect(() => {
    function Load() {
      loadUsers();
    }
    Load();
  }, [loadUsers]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-wrap relative w-full">
        <h2 className="text-2xl font-bold font-mono">Users</h2>
        <div className="gap-1 flex items-center flex-wrap">
          {/* search bar */}
          <div
            className={`${openSearchBar ? "max-sm:opacity-100 max-sm:top-full max-sm:right-0" : "max-sm:opacity-0 max-sm:hidden max-sm:-top-8 max-sm:z-0 max-sm:right-0"} absolute  bg-background z-30  sm:relative  flex justify-center items-center  transition-all focus-within:ring-2 max-w-full focus-within:ring-gray-secondary/80 duration-500 ring-gray-secondary/50 ring rounded-md overflow-hidden  gap-1`}
          >
            <button
              className="bg-gray-secondary/20 h-full w-fit p-1 px-2"
              onClick={async () =>
                // router.push(`/dashboard/products?search=${searchProductString}`)
                console.log("search user")
              }
            >
              <Search />
            </button>
            <input
              value={searchUserString ?? ""}
              onChange={(e) => setSearchUserString(e.target.value)}
              className="focus:bg-none max-w-full focus:outline-none"
              placeholder="Search User"
            />
          </div>

          <Button
            onClick={() => setOpenSearchBar((e) => !e)}
            variant={"outline"}
            className={`sm:hidden`}
            type="button"
          >
            <Search />
          </Button>
          <Button onClick={() => setOpenAddUser((e) => !e)} variant={"default"}>
            <CirclePlus />
            Add
          </Button>
          <Button onClick={() => loadUsers()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="py-1 inline-block w-full" />
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
                    updatedAt,
                  },
                  index,
                ) => (
                  <TableRow key={index} className="">
                    <TableCell className="font-medium">#{id}</TableCell>

                    <TableCell>
                      <div className="flex items-center justify-start  gap-1">
                        <span className="min-w-6 max-w-6  min-h-6 max-h-6 relative z-10 inline-block rounded-full  overflow-hidden">
                          {image ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_URL_R2}/${image ? image : ProductDefaultImage}`}
                              alt={email}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              fill
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <FaUserCircle className="h-full w-full" />
                          )}
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
                      <div className="line-clamp-1">{address}</div>
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
                            toast.error("User can't be deleted!", {
                              description: new Date().toDateString(),
                            });
                          }}
                          className="bg-red-primary"
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
      <div className="w-full flex-center py-2">
        {users && users?.length > 80 && (
          <Button
            onClick={() => setUserLoadLimit((e) => e + 20)}
            className=""
            variant={"secondary"}
          >
            See More
          </Button>
        )}
      </div>

      {/* all dialogs  */}
      <>
        {/* add category dialog */}
        <Dialog
          open={openAddUser}
          onOpenChange={setOpenAddUser}
          // modal={false}
        >
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Create new user here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <PageAddUserAdmin load={loadUsers} setOpen={setOpenAddUser} />
            </div>
          </DialogContent>
        </Dialog>
        {/* edit category dialog */}
        <Dialog
          open={openEditUser}
          onOpenChange={setOpenEditUser}
          // modal={false}
        >
          <DialogContent className="sm:max-w-lg">
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
                load={loadUsers}
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

export default Page;
