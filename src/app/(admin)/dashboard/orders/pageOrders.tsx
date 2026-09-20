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
import {
  orderStatuses,
  ProductDefaultImage,
  ProfileDefaultImage,
} from "@/components/data/core";

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
import SearchShowClient from "@/components/common/searchShowClient";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ordersType } from "@/components/data/types";

const PageOrders = ({
  orders,
  currentPage,
  totalPages,
}: {
  orders: ordersType[];
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
      <SearchShowClient />
      <div className="w-full flex flex-wrap gap-1 md:gap-2 items-center justify-start pb-2">
        {orderStatuses &&
          orderStatuses.map(({ value, label }, index) => (
            <Button
              key={index}
              className=""
              onClick={() => {
                handleSearchStatus(value);
                // router.push(`/dashboard/orders?statusTab=${item}`);
              }}
              variant={value === orderStatusTab ? "default" : "outline"}
            >
              {label}
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
              {/* <TableHead>User Email</TableHead> */}
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
                        <Avatar className="size-6">
                          <AvatarImage
                            src={`${process.env.NEXT_PUBLIC_URL_R2}/${user?.image}`}
                          />
                          <AvatarFallback>
                            {receiverName?.charAt(0).toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>
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

                  {/* <TableCell>{user?.email ?? "N/A"}</TableCell> */}
                  <TableCell>
                    <p className="max-w-60 min-w-48 whitespace-normal wrap-break-word">
                      {address ?? "N/A"}
                    </p>
                  </TableCell>
                  <TableCell>{Number(_count.items)}</TableCell>

                  <TableCell>৳{Number(total).toLocaleString()}</TableCell>

                  <TableCell>
                    <OrderStatusBadge status={status} />
                  </TableCell>

                  <TableCell>
                    {new Date(createdAt).toISOString().split(".")[0]}
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
                        className="bg-green-primary cursor-pointer"
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
