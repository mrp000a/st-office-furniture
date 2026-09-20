"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Gender, UserRole } from "@/generated/prisma";
import PageEditUserClient from "@/components/common/pageEditUserClient";

const EditProfile = ({
  openEditUser,
  setOpenEditUser,
  userData,
}: {
  openEditUser: boolean;
  setOpenEditUser: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    id?: number | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    gender?: Gender | null | undefined;
    image?: string | null | undefined;
    address?: string | null | undefined;
    role?: UserRole | null | undefined;
  };
}) => {
  return (
    <div>
      {/* drawars */}
      <>
        {/* edit category dialog */}
        <Dialog
          open={openEditUser}
          onOpenChange={setOpenEditUser}
          // modal={false}
        >
          <DialogContent className="sm:max-w-lg  max-h-screen overflow-auto z-999">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to your user here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className=" h-full">
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

export default EditProfile;
