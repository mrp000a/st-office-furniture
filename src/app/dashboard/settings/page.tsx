"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-2xl font-bold font-mono">Settings</h2>
        <div className="gap-1 flex items-center flex-wrap">
          <Button onClick={() => console.log("object")} variant={"outline"}>
            Add
          </Button>
          <Button onClick={() => console.log("object")} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="py-1 inline-block w-full" />
      <div>
        <div>something more</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          doloremque saepe dolor. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quod harum perspiciatis labore, nulla fuga iure
          illo! Aliquam, corrupti! Dolorum officia reprehenderit nam accusamus.
        </div>{" "}
      </div>
    </div>
  );
};

export default Page;
