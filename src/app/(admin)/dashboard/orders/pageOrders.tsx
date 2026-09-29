"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";

import { deleteOrder } from "@/lib/api";
import { OrderStatus } from "@/generated/prisma";

import { useAlertDialog } from "@/components/hooks/use-alert-dialog";
import { orderStatuses } from "@/components/data/core";

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
import { RiDeleteBin6Fill } from "react-icons/ri";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import OrdersSearch from "./searchBox";
import PaginationLayout from "@/components/common/paginationLayout";
import SearchShowClient from "@/components/common/searchShowClient";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ordersType } from "@/components/data/types";
import { getImageUrlProduct } from "@/lib/getImageUrl";
import MobileOrderCard from "./MobileOrderCard";
import DesktopOrderCard from "./DesktopOrderCard";

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
      <div className="relative flex flex-wrap items-center justify-between">
        <h2 className="font-mono text-2xl font-bold">Orders</h2>
        <div className="flex flex-wrap items-center gap-1">
          {/* search bar */}
          <OrdersSearch />
          <Button onClick={() => router.refresh()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className="inline-block w-full" />
      <SearchShowClient />
      <div className="flex w-full flex-wrap items-center justify-start gap-1 pb-2 md:gap-2">
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
        <>
          {/* desktop order */}
          <Table className="max-lg:hidden">
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
              {orders.map((item, index) => (
                <DesktopOrderCard key={index} order={item} />
              ))}
            </TableBody>
          </Table>
          <div className="space-y-2 lg:hidden">
            {orders.map((item, index) => (
              <MobileOrderCard key={index} order={item} />
            ))}
          </div>
        </>
      ) : (
        <NoItemsFound />
      )}
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PageOrders;
