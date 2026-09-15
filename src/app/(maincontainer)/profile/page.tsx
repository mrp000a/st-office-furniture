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
  const [editProfile, setEditProfile] = useState(false);
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
      <ProfileHeader
        profileTab={profileTab ?? ""}
        setProfileTab={setProfileTab}
        setEditProfile={setEditProfile}
      >
        <span
          className={`${!(!profileTab || profileTab === "profile") ? "hidden" : ""}`}
        >
          <Profile
            setOpenEditUser={setEditProfile}
            openEditUser={editProfile}
          />
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
