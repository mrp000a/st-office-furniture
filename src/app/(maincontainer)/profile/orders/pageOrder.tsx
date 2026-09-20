"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";

import { getUsersOrders } from "@/lib/api";
import { Order, OrderStatus } from "@/generated/prisma";

import { orderStatuses, ProductDefaultImage } from "@/components/data/core";

import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FaTruck, FaUserCircle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SearchShowClient from "@/components/common/searchShowClient";
import SearchLayout from "@/components/common/searchLayout";
import { ordersType } from "@/components/data/types";
import PaginationLayout from "@/components/common/paginationLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";

const PageProfileOrders = ({
  orders,
  currentPage,
  totalPages,
}: {
  orders: ordersType[];
  currentPage: number;
  totalPages: number;
}) => {
  const [orderStatusTab, setOrderStatusTab] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchTab = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.set("page", "1");

    setOrderStatusTab(value);
    router.push(`/profile/orders?${params.toString()}`);
  };

  return (
    <div className="w-full p-3">
      {/* header */}
      <div className="flex sm:flex-col">
        <div className="flex w-full flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Orders</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View your orders, your past experience.
            </p>
          </div>
        </div>

        {/* search bar */}
        <div className="gap-1 flex items-center justify-end flex-wrap sm:w-full ">
          <div className="sm:flex-1">
            <SearchLayout />
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-1 max-sm:hidden">
            <FaTruck className="size-5 text-primary" />

            <div>
              <p className="font-medium">2 Orders</p>
            </div>
          </div>
        </div>
      </div>
      <hr className=" inline-block w-full" />

      {/* order status tabs */}
      <div className="w-full flex flex-wrap gap-1 md:gap-2 items-center justify-start pb-2">
        {orderStatuses &&
          orderStatuses.map(({ value, label }, index) => (
            <Button
              key={index}
              className=""
              onClick={() => {
                handleSearchTab(value);
              }}
              variant={value === orderStatusTab ? "default" : "outline"}
            >
              {label}
            </Button>
          ))}
      </div>
      {/* main data table */}
      <div className="w-full overflow-auto">
        {orders && orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                {/* <TableHead>Order Id</TableHead> */}
                <TableHead>Customer</TableHead>
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

                    <TableCell>
                      <p className="">{address ?? "N/A"}</p>
                    </TableCell>
                    <TableCell>{Number(_count.items)}</TableCell>

                    <TableCell>৳{Number(total).toLocaleString()}</TableCell>

                    <TableCell>
                      <OrderStatusBadge status={status} />
                    </TableCell>

                    <TableCell>
                      {new Date(createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
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
      </div>
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PageProfileOrders;
