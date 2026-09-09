"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div>
      <div className="space-y-1">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-lg font-bold">Profile</h2>
        </div>
        <hr />
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">First Name</span>
              <Input
                className="min-h-10 flex-1   bg-gray-secondary/40 text-foreground"
                disabled
                value={user?.name ?? ""}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Last Name</span>
              <Input
                className="min-h-10 flex-1   bg-gray-secondary/40 text-foreground"
                disabled
                value={user?.name ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Address</span>
              <Input
                className="min-h-10 flex-1   bg-gray-secondary/40 text-foreground"
                disabled
                value={user?.address ?? ""}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Role</span>
              <Input
                className="min-h-10 flex-1 capitalize    bg-gray-secondary/40 text-foreground"
                disabled
                value={user?.role.toLocaleLowerCase() ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Email</span>
              <Input
                className="min-h-10 flex-1   bg-gray-secondary/40 text-foreground"
                disabled
                value={user?.email ?? ""}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Phone</span>
              <Input
                className="min-h-10 flex-1   bg-gray-secondary/40 text-foreground"
                disabled
                value={user?.phone ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-1 flex-col items-start justify-start">
              <span className="text-[10px]">Password</span>
              <div className="flex-1 w-full flex items-center flex-wrap gap-2 box-border">
                <Input
                  type="password"
                  className="min-h-10 w-full flex-1   bg-gray-secondary/40 text-foreground"
                  disabled
                  value={"password"}
                />
                <Button className="h-10" variant={"destructive"}>Change</Button>
              </div>
            </div>
            <div className="flex  flex-1 flex-col items-start justify-start"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
