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
    <div className="max-w-384 md:w-48 border mx-auto space-y-2 px-1 bg-card p-3 rounded-md ">
      <div className="text-gray-primary text-xs text-center ">
        Profile Navigation
      </div>
      <div className="flex flex-row md:flex-col flex-wrap   justify-start gap-2 ">
        <Button
          className={"flex justify-between items-center cursor-pointer"}
          variant={
            pathname.startsWith("/profile")
              ? pathname.startsWith("/profile/")
                ? "outline"
                : "default"
              : "outline"
          }
          asChild
        >
          <Link href={"/profile"}>
            <span className="flex items-center gap-2">
              <FaUserCircle className="text-green-primary" />
              <span>Profile</span>
            </span>
          </Link>
        </Button>
        {ProfileTabItems.map(({ label, tab, icon: Icon }, index) => (
          <Button
            onClick={() => {
              router.push(`/profile/${tab}`);
            }}
            className={`flex items-center justify-between cursor-pointer`}
            variant={
              pathname.startsWith(`/profile/${tab}`) ? "default" : "outline"
            }
            key={index}
            size={"lg"}
            asChild
          >
            <Link href={`/profile/${tab}`}>
              <span className="flex items-center gap-2">
                <Icon className="text-green-primary" />
                <span>{label}</span>
              </span>
              <IoIosArrowForward className={``} />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
