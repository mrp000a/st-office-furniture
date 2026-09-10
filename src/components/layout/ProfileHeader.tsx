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

const ProfileHeader = ({
  children,
  profileTab,
  setProfileTab,
}: {
  children: React.ReactNode;
  profileTab: string;
  setProfileTab: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  return (
    <div className="max-w-384 mx-auto space-y-2 px-1">
      {/* <div className="min-[400px]:hidden">
        <h2 className="text-2xl font-bold">Profile</h2>
      </div> */}
      {/* user profile header */}
      <div className="flex justify-between items-center px-2 py-1 box-border rounded-md border border-gray-secondary shadow-xl bg-background">
        <div className=" flex justify-between w-full flex-wrap items-center gap-2 bg-background rounded-lg p-2 ">
          <div className="flex flex-col items-center">
            <span className="flex flex-wrap justify-center gap-2 items-center">
              <span className="w-12 h-12 relative z-10 inline-block rounded-full border border-gray-primary overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_R2}/${user?.image ?? ProfileDefaultImage}`}
                  alt={user?.name ?? ""}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-cover w-full h-full"
                />
              </span>
              <div className="flex flex-col justify-start items-start">
                <h3 className="text-lg font-bold">{user?.name}</h3>
                <span className="text-xs">{user?.email}</span>
              </div>{" "}
            </span>
          </div>
          {/* more button */}
          <div className="flex  gap-1 flex-wrap ">
            <Button variant={"default"} className="cursor-pointer">
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
              className="cursor-pointer bg-red-primary"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap flex-col min-[500px]:flex-row">
        {/* profile navigarion buttons */}
        <div
          className={`px-1 py-1 border border-gray-secondary rounded-md bg-background w-fit`}
        >
          <div className="flex sm:flex-col flex-wrap   justify-start gap-2 ">
            <Button
              onClick={() => {
                setProfileTab("profile");
                router.push("/profile");
              }}
              className={"flex justify-between items-center cursor-pointer"}
              variant={
                profileTab === "profile" || !profileTab ? "default" : "outline"
              }
            >
              <span className="flex items-center gap-2">
                <FaUserCircle className="text-red-primary" />
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
                className={`flex items-center justify-between cursor-pointer`}
                variant={profileTab === tab ? "default" : "outline"}
                key={index}
                size={"lg"}
              >
                <span className="flex items-center gap-2">
                  <Icon className="text-red-primary" />
                  <span>{label}</span>
                </span>
                <IoIosArrowForward className={``} />
              </Button>
            ))}
          </div>
        </div>

        {/* profile content page */}
        <div className="flex-1 bg-background border border-gray-secondary shadow-lg rounded-md p-2">
          {/* <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Profile</h2>
            <div>amajd</div>
          </div> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
