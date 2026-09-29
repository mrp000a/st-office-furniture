"use client";
import { ProfileTabItems } from "@/app/(admin)/dashboard/_dash_components/data";
import { ProfileDefaultImage } from "@/components/data/core";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { SignOut } from "../sec_lib/Sessions";
import { getImageUrl } from "@/lib/getImageUrl";

const ProfileHeader = ({
  children,
  profileTab,
  setProfileTab,
  setEditProfile,
}: {
  children: React.ReactNode;
  profileTab: string;
  setProfileTab: React.Dispatch<React.SetStateAction<string | null>>;
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  return (
    <div className="mx-auto max-w-384 space-y-2 px-1">
      {/* user profile header */}
      <div className="border-gray-secondary bg-background box-border flex items-center justify-between rounded-md border px-2 py-1 shadow-xl">
        <div className="bg-background flex w-full flex-wrap items-center justify-between gap-2 rounded-lg p-2">
          <div className="flex flex-col items-center">
            <span className="flex flex-wrap items-center justify-center gap-2">
              <span className="border-gray-primary relative z-10 inline-block h-12 w-12 overflow-hidden rounded-full border">
                <Image
                  unoptimized
                  src={getImageUrl(user?.image)}
                  alt={user?.name ?? ""}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="flex flex-col items-start justify-start">
                <h3 className="text-lg font-bold">{user?.name}</h3>
                <span className="text-xs">{user?.email}</span>
              </div>{" "}
            </span>
          </div>
          {/* more button */}
          <div className="flex flex-wrap gap-1">
            <Button
              onClick={() => setEditProfile((e) => !e)}
              variant={"default"}
              className="cursor-pointer"
            >
              Edit Profile
            </Button>
            <Button
              onClick={() => SignOut()}
              variant={"destructive"}
              className="cursor-pointer"
            >
              Logout
            </Button>
            <Button
              variant={"default"}
              disabled
              className="bg-green-primary cursor-pointer"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 sm:flex-row">
        {/* profile navigarion buttons */}
        <div
          className={`border-gray-secondary bg-background w-fit rounded-md border px-1 py-1`}
        >
          <div className="flex flex-wrap justify-start gap-2 sm:flex-col">
            <Button
              onClick={() => {
                setProfileTab("profile");
                router.push("/profile");
              }}
              className={"flex cursor-pointer items-center justify-between"}
              variant={
                profileTab === "profile" || !profileTab ? "default" : "outline"
              }
            >
              <span className="flex items-center gap-2">
                <FaUserCircle className="text-green-primary" />
                <span>Profile</span>
              </span>
              <span></span>
            </Button>
            {ProfileTabItems.map(({ label, tab, icon: Icon }, index) => (
              <Button
                onClick={() => {
                  setProfileTab(tab);
                  router.push(`/profile?tab=${tab}`);
                }}
                className={`flex cursor-pointer items-center justify-between`}
                variant={profileTab === tab ? "default" : "outline"}
                key={index}
                size={"lg"}
              >
                <span className="flex items-center gap-2">
                  <Icon className="text-green-primary" />
                  <span>{label}</span>
                </span>
                <IoIosArrowForward className={``} />
              </Button>
            ))}
          </div>
        </div>

        {/* profile content page */}
        <div className="bg-background border-gray-secondary w-full flex-1 rounded-md border p-2 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
