"use client";
import React from "react";
import { useSession } from "next-auth/react";

const DashPage = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="">
      <h2 className="text-2xl font-bold font-mono">Welcome!, {user?.name}</h2>
      <div>something more</div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        doloremque saepe dolor. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quod harum perspiciatis labore, nulla fuga iure illo!
        Aliquam, corrupti! Dolorum officia reprehenderit nam accusamus.
      </div>
    </div>
  );
};

export default DashPage;
