"use client";
import PageEditUserClient from "@/components/common/forms/pageEditUserClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User } from "@/generated/prisma";
import { getUser } from "@/lib/api";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

const Profile = ({
  setOpenEditUser,
  openEditUser,
}: {
  setOpenEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  openEditUser: boolean;
}) => {
  const session = useSession();

  // const [openEditUser, setOpenEditUser] = useState(false);
  const [userData, setUserData] = useState<
    (User & { _count: { orders: number } }) | null
  >(null);

  const loadUser = useCallback(async () => {
    if (!session?.data?.user?.id) return;
    const res = await getUser({
      id: Number(session?.data?.user?.id),
    });
    if (!res.success) return;

    setUserData(res.result);
  }, [session]);

  useEffect(() => {
    function Load() {
      loadUser();
    }
    Load();
  }, [loadUser]);

  return (
    <div>
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between">
          <h2 className="text-lg font-bold">Profile</h2>
        </div>
        <hr />
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">First Name</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1"
                disabled
                value={userData?.name ?? ""}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Last Name</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1"
                disabled
                value={userData?.name ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Address</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1"
                disabled
                value={userData?.address ?? ""}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Role</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1 capitalize"
                disabled
                value={userData?.role.toLocaleLowerCase() ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Gender</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1"
                disabled
                value={userData?.gender ?? ""}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Created At</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1 capitalize"
                disabled
                value={new Date(userData?.createdAt ?? "").toDateString()}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Email</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1"
                disabled
                value={userData?.email ?? ""}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Phone</span>
              <Input
                className="bg-gray-secondary/40 text-foreground min-h-10 flex-1"
                disabled
                value={userData?.phone ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Password</span>
              <div className="box-border flex w-full flex-1 flex-wrap items-center gap-2">
                <Input
                  type="password"
                  className="bg-gray-secondary/40 text-foreground min-h-10 w-full flex-1"
                  disabled
                  value={"password"}
                />
                <Button
                  onClick={() => setOpenEditUser((e) => !e)}
                  className="h-10"
                  variant={"destructive"}
                >
                  Change
                </Button>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Total Order</span>
              <div className="box-border flex w-full flex-1 flex-wrap items-center gap-2">
                <Input
                  // type="password"
                  className="bg-gray-secondary/40 text-foreground min-h-10 w-full flex-1"
                  disabled
                  value={userData?._count.orders.toString() ?? ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* drawars */}
      <>
        {/* edit category dialog */}
        <Dialog
          open={openEditUser}
          onOpenChange={setOpenEditUser}
          // modal={false}
        >
          <DialogContent className="z-999 max-h-screen overflow-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to your user here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="h-full">
              <PageEditUserClient
                name={userData?.name ?? ""}
                email={userData?.email ?? ""}
                phone={userData?.phone ?? ""}
                address={userData?.address ?? ""}
                gender={userData?.gender ?? "MALE"}
                id={userData?.id}
                image={userData?.image ?? ""}
                role={userData?.role ?? "USER"}
                setOpen={setOpenEditUser}
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default Profile;
