"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";

import { deleteOrder } from "@/lib/api";
import {
  Gender,
  OrderStatus,
  PaymentMethods,
  PaymentStatus,
  UserRole,
} from "@/generated/prisma";

import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { orderStatuses, ProductDefaultImage } from "@/components/data/core";

import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { Edit3Icon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import OrdersSearch from "./searchBox";
import PaginationLayout from "@/components/common/paginationLayout";

type ordersType = {
  subtotal: number;
  discountAmount: number | null;
  total: number | null;
  shippingCost: number | null;
  user: {
    id: number;
    name: string;
    role: UserRole;
    phone: string | null;
    email: string;
    password: string;
    image: string | null;
    gender: Gender | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  _count: {
    items: number;
  };
  id: number;
  status: OrderStatus;
  receiverName: string;
  receiverEmail: string | null;
  receiverPhone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethods;
}[];

const PageOrders = ({
  orders,
  currentPage,
  totalPages,
}: {
  orders: ordersType;
  currentPage: number;
  totalPages: number;
}) => {
  const { confirm } = useAlertDialog();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderStatusTab, setOrderStatusTab] = useState<OrderStatus | string>(
    "",
  );

  const handleSearchStatus = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.set("page", "1");

    setOrderStatusTab(value);
    router.push(`/dashboard/orders?${params.toString()}`);
  };

  return (
    <div className="">
      {/* header */}
      <div className="flex justify-between items-center flex-wrap relative">
        <h2 className="text-2xl font-bold font-mono">Orders</h2>
        <div className="gap-1 flex items-center flex-wrap">
          {/* search bar */}
          <OrdersSearch />
          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className=" inline-block w-full" />
      <div className="w-full flex flex-wrap gap-1 md:gap-2 items-center justify-start pb-2">
        <Button
          key={2932}
          className=""
          onClick={() => {
            handleSearchStatus("");
            // router.push(`/dashboard/orders?statusTab=${item}`);
          }}
          variant={!orderStatusTab ? "default" : "outline"}
        >
          {"All Items"}
        </Button>
        {orderStatuses &&
          orderStatuses.map((item, index) => (
            <Button
              key={index}
              className=""
              onClick={() => {
                handleSearchStatus(item);
                // router.push(`/dashboard/orders?statusTab=${item}`);
              }}
              variant={item === orderStatusTab ? "default" : "outline"}
            >
              {item}
            </Button>
          ))}
      </div>
      {/* main data table */}
      {orders && orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              {/* <TableHead>Order Id</TableHead> */}
              <TableHead>Customer</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Buttons</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {orders.map(
              (
                {
                  id,
                  receiverName,
                  receiverEmail,
                  receiverPhone,
                  address,
                  user,
                  status,
                  total,
                  _count,
                  createdAt,
                },
                index,
              ) => (
                <TableRow key={index} className="">
                  <TableCell className="font-medium">#{id}</TableCell>

                  <TableCell>
                    <div className="flex items-center justify-start  gap-1">
                      <span className="min-w-6 max-w-6  min-h-6 max-h-6 relative z-10 inline-block rounded-full  overflow-hidden">
                        {user?.image ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_URL_R2}/${user.image ? user.image : ProductDefaultImage}`}
                            alt={user.email}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FaUserCircle className="h-full w-full" />
                        )}
                      </span>
                      <div>
                        <p className="font-medium">{receiverName}</p>
                        <div className="text-[10px] flex flex-wrap items-center gap-x-2">
                          <p className=" text-muted-foreground">
                            {receiverEmail}
                          </p>
                          <p className=" text-muted-foreground">
                            {receiverPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{user?.email ?? "N/A"}</TableCell>
                  <TableCell>
                    <p className="max-w-60 min-w-48 whitespace-normal wrap-break-word">
                      {address ?? "N/A"}
                    </p>
                  </TableCell>
                  <TableCell>{Number(_count.items)}</TableCell>

                  <TableCell>৳{Number(total).toLocaleString()}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        (status === "PENDING" && "default") ||
                        (status === "CANCELLED" && "destructive") ||
                        "default"
                      }
                      className={`${status === "PENDING" ? "bg-red-primary" : ""}`}
                    >
                      {status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        // onClick={() => setOpenEditOrder(true)}
                        variant={"destructive"}
                        size={"icon"}
                      >
                        <Link href={`/dashboard/orders/${id}`}>
                          <Edit3Icon />
                        </Link>
                      </Button>
                      <Button
                        onClick={async () => {
                          const isConfirm = await confirm({
                            confirmText: "Delete",
                            description:
                              "Are you sure? The item will be deleted!",
                            title: "This action can't be undone!",
                          });
                          if (!isConfirm) return;
                          await deleteOrder({
                            id: id,
                          });
                          console.log("Order Deleted!");
                          // if (loadOrder) loadOrder();
                          router.refresh();
                        }}
                        size={"icon"}
                        variant={"default"}
                        className="bg-red-primary cursor-pointer"
                      >
                        <RiDeleteBin6Fill />
                      </Button>
                      <Button className="" asChild>
                        <Link href={`/order/${id}`}>View</Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      ) : (
        <NoItemsFound />
      )}
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PageOrders;
