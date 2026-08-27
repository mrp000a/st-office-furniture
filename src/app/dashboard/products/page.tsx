"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Page = () => {
  const router = useRouter();
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  return (
    <div className="">
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="text-2xl font-bold font-mono">Products</h2>
        <div className="gap-1 flex items-center flex-wrap">
          <Button
            onClick={() => router.push("/dashboard/products/add")}
            variant={"outline"}
          >
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

      {/* all dialogs  */}
      <>
        {/* add product dialog */}
        <Dialog
          open={openAddProductDialog}
          onOpenChange={setOpenAddProductDialog}
          // modal={false}
        >
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Make changes to your product here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>something do here</div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default Page;
