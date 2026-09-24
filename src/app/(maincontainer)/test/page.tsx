"use client";
import GoogleButton from "@/components/sec_lib/cont-with-google";
import { getImageUrl } from "@/lib/getImageUrl";
import { useSession } from "next-auth/react";

import React from "react";

const Page = () => {
  const session = useSession();

  return (
    <div className="w-full  mx-auto">
      <div className="flex-center p-8">
        {/* <GoogleButton /> */}
        {session?.data?.user?.image && (
          <img
            src={getImageUrl(session?.data?.user?.image)}
            className="size-10"
            alt=""
          />
        )}
        <div>{session?.data?.user?.image}</div>
      </div>
    </div>
  );
};

export default Page;
