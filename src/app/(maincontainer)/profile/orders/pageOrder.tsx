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
import { getImageUrl } from "@/lib/getImageUrl";
import { formatBDDate, formatMoney, formatTime } from "@/lib/secApi";

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

            <p className="text-muted-foreground mt-1 text-sm">
              View your orders, your past experience.
            </p>
          </div>
        </div>

        {/* search bar */}
        <div className="flex flex-wrap items-center justify-end gap-1 sm:w-full">
          <div className="sm:flex-1">
            <SearchLayout />
          </div>
          <div className="bg-card flex items-center gap-2 rounded-lg border px-4 py-1 max-sm:hidden">
            <FaTruck className="text-primary size-5" />

            <div>
              <p className="font-medium">2 Orders</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="inline-block w-full" />

      {/* order status tabs */}
      <div className="flex w-full flex-wrap items-center justify-start gap-1 pb-2 md:gap-2">
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
          <>
            {/* ========================= DESKTOP ========================= */}
            <div className="hidden w-full md:block">
              <div className="bg-card overflow-hidden rounded-xl border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="w-28">Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Delivery Address</TableHead>
                      <TableHead className="text-center">Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Placed</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {orders.map(
                      ({
                        id,
                        publicId,
                        receiverName,
                        receiverEmail,
                        receiverPhone,
                        address,
                        user,
                        status,
                        total,
                        _count,
                        createdAt,
                      }) => (
                        <TableRow
                          key={id}
                          className="group hover:bg-muted/30 transition-colors"
                        >
                          {/* ORDER */}
                          <TableCell>
                            <div>
                              <p className="font-mono text-sm font-semibold">
                                #{id}
                              </p>

                              <p className="text-muted-foreground mt-0.5 max-w-24 truncate font-mono text-[10px]">
                                {publicId}
                              </p>
                            </div>
                          </TableCell>

                          {/* CUSTOMER */}
                          <TableCell>
                            <div className="flex min-w-48 items-center gap-3">
                              <div className="bg-muted relative size-9 shrink-0 overflow-hidden rounded-full border">
                                {user?.image ? (
                                  <Image
                                    unoptimized
                                    src={getImageUrl(user.image)}
                                    alt={user.email ?? receiverName}
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <FaUserCircle className="text-muted-foreground size-full" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-semibold">
                                  {receiverName}
                                </p>

                                <p className="text-muted-foreground truncate text-xs">
                                  {receiverPhone}
                                </p>

                                <p className="text-muted-foreground max-w-48 truncate text-[11px]">
                                  {receiverEmail}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* ADDRESS */}
                          <TableCell>
                            <p className="text-muted-foreground max-w-60 min-w-44 text-sm leading-relaxed wrap-break-word whitespace-normal">
                              {address || "No address provided"}
                            </p>
                          </TableCell>

                          {/* ITEMS */}
                          <TableCell className="text-center">
                            <span className="bg-muted inline-flex min-w-8 items-center justify-center rounded-full px-2 py-1 text-xs font-semibold">
                              {Number(_count.items)}
                            </span>
                          </TableCell>

                          {/* TOTAL */}
                          <TableCell>
                            <p className="text-sm font-bold whitespace-nowrap">
                              {formatMoney(total)}
                            </p>
                          </TableCell>

                          {/* STATUS */}
                          <TableCell>
                            <OrderStatusBadge status={status} />
                          </TableCell>

                          {/* DATE */}
                          <TableCell>
                            <div className="whitespace-nowrap">
                              <p className="text-sm font-medium">
                                {formatBDDate(createdAt)}
                              </p>

                              <p className="text-muted-foreground text-[11px]">
                                {formatTime(createdAt)}
                              </p>
                            </div>
                          </TableCell>

                          {/* ACTION */}
                          <TableCell className="text-right">
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="gap-1.5"
                            >
                              <Link href={`/order/${publicId}`}>
                                View Order
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* ========================= MOBILE ========================= */}
            <div className="space-y-3 md:hidden">
              {orders.map(
                ({
                  id,
                  publicId,
                  receiverName,
                  receiverEmail,
                  receiverPhone,
                  address,
                  user,
                  status,
                  total,
                  _count,
                  createdAt,
                }) => (
                  <div
                    key={id}
                    className="bg-card overflow-hidden rounded-xl border shadow-sm"
                  >
                    {/* CARD HEADER */}
                    <div className="bg-muted/20 flex items-start justify-between gap-3 border-b p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="bg-muted relative size-10 shrink-0 overflow-hidden rounded-full border">
                          {user?.image ? (
                            <Image
                              unoptimized
                              src={getImageUrl(user.image)}
                              alt={user.email ?? receiverName}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <FaUserCircle className="text-muted-foreground size-full" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {receiverName}
                          </p>

                          <p className="text-muted-foreground truncate text-xs">
                            {receiverPhone}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="font-mono text-sm font-semibold">#{id}</p>

                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          {new Date(createdAt).toLocaleDateString("en-BD", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* CARD BODY */}
                    <div className="p-4">
                      {/* STATUS + TOTAL */}
                      <div className="flex items-center justify-between gap-3">
                        <OrderStatusBadge status={status} />

                        <div className="text-right">
                          <p className="text-muted-foreground text-[10px] tracking-wide uppercase">
                            Total
                          </p>

                          <p className="text-lg font-bold">
                            ৳{Number(total).toLocaleString("en-BD")}
                          </p>
                        </div>
                      </div>

                      {/* ORDER META */}
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-muted/40 rounded-lg p-3">
                          <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                            Items
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {Number(_count.items)}{" "}
                            {Number(_count.items) === 1 ? "item" : "items"}
                          </p>
                        </div>

                        <div className="bg-muted/40 rounded-lg p-3">
                          <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                            Order Date
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {new Date(createdAt).toLocaleDateString("en-BD", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="bg-background mt-3 rounded-lg border p-3">
                        <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                          Delivery Address
                        </p>

                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed">
                          {address || "No address provided"}
                        </p>
                      </div>

                      {/* EMAIL */}
                      <div className="mt-3">
                        <p className="text-muted-foreground truncate text-xs">
                          {receiverEmail}
                        </p>
                      </div>

                      {/* ACTION */}
                      <Button asChild className="mt-4 w-full">
                        <Link href={`/order/${publicId}`}>View Order</Link>
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        ) : (
          <NoItemsFound />
        )}
      </div>
      <PaginationLayout currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PageProfileOrders;
