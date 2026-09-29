"use client";
import { ProfileTabItems } from "@/app/(admin)/dashboard/_dash_components/data";

import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const ProfileHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-card mx-auto max-w-384 space-y-2 rounded-md border p-3 px-1 md:w-48">
      <div className="text-gray-primary text-center text-xs">
        Profile Navigation
      </div>
      <div className="flex flex-row flex-wrap justify-start gap-2 md:flex-col">
        <Button
          className={"flex cursor-pointer items-center justify-between"}
          variant={
            pathname.startsWith("/profile")
              ? pathname.startsWith("/profile/")
                ? "outline"
                : "destructive"
              : "outline"
          }
          asChild
        >
          <Link href={"/profile"}>
            <span className="flex items-center gap-2">
              <FaUserCircle className="text-red-primary" />
              <span>Profile</span>
            </span>
          </Link>
        </Button>
        {ProfileTabItems.map(({ label, tab, icon: Icon }, index) => (
          <Button
            onClick={() => {
              router.push(`/profile/${tab}`);
            }}
            className={`flex cursor-pointer items-center justify-between`}
            variant={
              pathname.startsWith(`/profile/${tab}`) ? "destructive" : "outline"
            }
            key={index}
            size={"lg"}
            asChild
          >
            <Link href={`/profile/${tab}`}>
              <span className="flex items-center gap-2">
                <Icon className="text-red-primary" />
                <span>{label}</span>
              </span>
              <IoIosArrowForward className={`text-red-primary`} />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
