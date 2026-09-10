"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductDefaultImage } from "@/components/data/core";
import { deleteProduct } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { ProductTypeAdmin } from "@/lib/formDataTypes";
import { RiDeleteBinFill } from "react-icons/ri";

const ProductAdmin = ({
  item,
  load,
}: {
  item: ProductTypeAdmin;
  load?: () => Promise<void>;
}) => {
  const { confirm } = useAlertDialog();

  return (
    <div className="hover:shadow-2xl text-xs bg-background hover:translate-y-1 shadow-blue-primary/40 hover:ring-3 hover:ring-blue-primary transition-all flex flex-col max-w-full box-border w-full justify-start items-start gap-2 ring-2 ring-red-primary p-1 rounded-sm relative">
      <div className="w-full flex justify-end flex-wrap gap-2">
        <Button
          // onClick={() => {
          //   router.push(`/dashboard/products/${item.productCode}`);
          // }}
          variant={"destructive"}
          asChild
        >
          <Link href={`/dashboard/products/${item.productCode}`}>
            <Edit /> <span>Edit</span>
          </Link>
        </Button>
        <Button
          onClick={async () => {
            const isConfirm = await confirm({
              confirmText: "Delete",
              description: "Are you sure? The item will be deleted!",
              title: "This action can't be undone!",
            });
            if (!isConfirm) return;
            await deleteProduct({ id: item.id, productCode: item.productCode });
            if (load) load();
          }}
          variant={"default"}
          className="bg-red-primary dark:text-foreground cursor-pointer"
        >
          <RiDeleteBinFill /> <span>Delete</span>
        </Button>
      </div>
      {/* main image and discont red  */}
      <Link
        href={`/products/${item.productCode.toLowerCase()}`}
        className="  w-full aspect-video relative border box-border border-gray-secondary rounded-md overflow-hidden"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_R2}/${item.images[0] ?? ProductDefaultImage}`}
          alt={item.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-contain hover:scale-120 active:sca1e-120 transition-all duration-500 ease-in-out"
        />
        <span
          className={`bg-red-primary flex-center flex-col  text-background dark:text-foreground rounded-md text-xs ring-2 ring-gray-secondary px-2 py-1  absolute right-0 top-0 z-20 ${item.discount ? "" : "hidden"}`}
        >
          <span className="font-bold">{Number(item.discount)}%</span>
          <span className="text-xs">Off</span>
        </span>
      </Link>

      <div className="flex flex-col w-full">
        <Link
          href={`/products/${item.productCode.toLowerCase()}`}
          className="line-clamp-2 font-semibold  text-justify"
        >
          {item.title}
        </Link>
        <Link
          href={`/products?category=${item.category?.name?.toLowerCase() ?? ""}`}
          className="font-semibold text-gray-secondary text-[10px]"
        >
          Category: {item.category?.name ?? "N/A"}
        </Link>
        <div className=" font-bold flex flex-wrap justify-between items-center">
          <div className="space-x-2">
            <span className="text-gray-primary">Price:</span>{" "}
            <span className="font-semibold">
              ৳
              {Number(item.discount)
                ? Number(item.discountPrice).toFixed(2)
                : Number(item.price).toFixed(2)}
            </span>
            <span
              className={`text-xs text-gray-primary line-through px-1 ${item.discount ? "" : "hidden"}`}
            >
              ৳{Number(item.price).toFixed(2)}
            </span>
          </div>
        </div>
        <div className=" font-bold flex flex-wrap justify-between items-center w-full">
          {/* stock an dicrount */}
          <div className=" flex justify-between gap-3 flex-wrap w-full">
            <div>
              <span className="text-gray-primary">Discount:</span>{" "}
              <span className="font-semibold">{Number(item.discount)} % </span>
            </div>
            <div>
              <span className="text-gray-primary">Stock:</span>{" "}
              <span className="font-semibold">{Number(item.stock)}</span>
            </div>
          </div>
          {/* brand and code */}
          <div className=" flex justify-between gap-3 flex-wrap w-full">
            <div>
              <span className="text-gray-primary">Code:</span>{" "}
              <span className="font-semibold">{item.productCode}</span>
            </div>
            <div>
              <span className="text-gray-primary">Brand:</span>{" "}
              <span className="font-semibold">{item.brand}</span>
            </div>
          </div>

          {/* create and update */}
          <div className=" flex flex-col flex-wrap w-full">
            <div>
              <span className="text-gray-primary">Created At:</span>{" "}
              <span className="font-semibold">
                {new Date(item.createdAt).toDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-primary">Updated At:</span>{" "}
              <span className="font-semibold">
                {new Date(item.updatedAt).toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
