"use client";
import { ProfileDefaultImage } from "@/components/data/core";
import HomeNav from "@/components/layout/homeNav";
import ProfileHeader from "@/components/layout/ProfileHeader";
import { SignOut } from "@/components/sec_lib/Sessions";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "./_tabs/Profile";
import Settings from "./_tabs/Settings";
import CartItems from "./_tabs/CartItems";
import Orders from "./_tabs/orders";
import Helps from "./_tabs/help";
import Gifts from "./_tabs/Gifts";

const Home = () => {
  const searchParams = useSearchParams();

  const [profileTab, setProfileTab] = useState<string | null>(
    searchParams.get("tab") ?? null,
  );

  const session = useSession();
  useEffect(() => {
    const a = () => {
      setProfileTab(searchParams.get("tab") ?? null);
    };
    a();
  }, [searchParams]);

  return (
    <>
      {/* <div className="absolute z-1 aspect-video top-0 w-full h-screen ">
          <Image
            fill
            className="object-cover object-center w-full h-full "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={`${process.env.NEXT_PUBLIC_URL_R2}/${user.image ? user.image : ProfileDefaultImage}`}
            alt=""
          />
        </div>
        <div className="bg-background/40 relative z-20 backdrop-blur-2xl w-full min-h-screen">
          <div className="flex-center flex-col gap-3  relative ">
            <h2 className="text-2xl font-bold"> Hey {user.name}!</h2>
            <span>Please Wait for the Varification Process!</span>
            <span>{user.email}</span>
            <div className="relative max-w-100 w-80 h-80 aspect-video outline-4 outline-gray-primary/40  rounded-full overflow-hidden text-shadow-2xs text-shadow-blue-primary">
              <Image
                fill
                className={`object-cover object-center overflow-hidden rounded-full relative w-200 h-300 ${user.image ? "" : "mix-blend-darken"}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`${process.env.NEXT_PUBLIC_URL_R2}/${user.image ? user.image : ProfileDefaultImage}`}
                alt=""
              />
            </div>
            <span> Role Status: {user.role}</span>
            <span> Role Status: {user.image}</span>
            <span> Address: {user.address}</span>
            <span className="overflow-clip break-all"> ID: {user.id}</span>
            <Button variant={"secondary"} onClick={SignOut}>
              Sign Out
            </Button>
          </div>
        </div> */}

      <ProfileHeader
        profileTab={profileTab ?? ""}
        setProfileTab={setProfileTab}
      >
        {/* {(!profileTab || profileTab === "profile") && <Profile />}
        {profileTab === "orders" && <Orders />}
        {profileTab === "cartitems" && <CartItems />}
        {profileTab === "settings" && <Settings />}
        {profileTab === "gifts" && <Gifts />}
        {profileTab === "help" && <Helps />} */}
        <span
          className={`${!(!profileTab || profileTab === "profile") ? "hidden" : ""}`}
        >
          <Profile />
        </span>

        <span className={`${!(profileTab === "orders") ? "hidden" : ""}`}>
          <Orders />
        </span>
        <span className={`${!(profileTab === "cartitems") ? "hidden" : ""}`}>
          <CartItems />
        </span>
        <span className={`${!(profileTab === "settings") ? "hidden" : ""}`}>
          <Settings />
        </span>
        <span className={`${!(profileTab === "gifts") ? "hidden" : ""}`}>
          <Gifts />
        </span>
        <span className={`${!(profileTab === "help") ? "hidden" : ""}`}>
          <Helps />
        </span>
      </ProfileHeader>
    </>
  );
};

export default Home;
