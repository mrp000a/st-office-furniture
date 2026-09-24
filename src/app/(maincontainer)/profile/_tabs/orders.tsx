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
import { FaUserCircle } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SearchShowClient from "@/components/common/searchShowClient";
import { getImageUrl } from "@/lib/getImageUrl";

const Page = () => {
  const session = useSession();

  const [orders, setOrders] = useState<
    | (Order & {
        _count: { items: number };
        user: { email: string; image: string };
      })[]
    | null
  >(null);
  const [orderStatusTab, setOrderStatusTab] = useState<string>("PENDING");

  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  const [orderLoadLimit, setOrderLoadLimit] = useState<number>(100);
  const [searchUserString, setSearchUserString] = useState<string>("");

  const loadOrder = useCallback(async () => {
    if (!session?.data?.user?.id) return;
    const res = await getUsersOrders({
      name: searchUserString,
      limit: orderLoadLimit,
      status: orderStatusTab as OrderStatus,
      userId: Number(session?.data?.user?.id),
    });
    if (!res.success) return;

    setOrders(res.result);
  }, [searchUserString, orderLoadLimit, orderStatusTab, session]);

  useEffect(() => {
    function Load() {
      loadOrder();
    }
    Load();
  }, [loadOrder]);

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex justify-between items-center flex-wrap relative">
        <h2 className="text-2xl font-bold font-mono">Orders</h2>
        <div className="gap-1 flex items-center flex-wrap">
          {/* search bar */}
          <div
            className={`${openSearchBar ? "max-sm:opacity-100 max-sm:top-full max-sm:right-0" : "max-sm:opacity-0 max-sm:-top-8 max-sm:z-0 max-sm:right-0"} absolute  bg-background z-30  sm:relative  flex justify-center items-center  transition-all focus-within:ring-2 max-w-full focus-within:ring-gray-secondary/80 duration-500 ring-gray-secondary/50 ring rounded-md overflow-hidden  gap-1`}
          >
            <button
              className="bg-gray-secondary/20 h-full w-fit p-1 px-2"
              onClick={async () =>
                // router.push(`/dashboard/products?search=${searchProductString}`)
                console.log("search user")
              }
            >
              <Search />
            </button>
            <input
              value={searchUserString ?? ""}
              onChange={(e) => setSearchUserString(e.target.value)}
              className="focus:bg-none max-w-full focus:outline-none"
              placeholder="Search User"
            />
          </div>

          <Button
            onClick={() => setOpenSearchBar((e) => !e)}
            variant={"outline"}
            className={`sm:hidden`}
            type="button"
          >
            <Search />
          </Button>
          <Button onClick={() => loadOrder()} variant={"outline"}>
            <IoReload />
          </Button>
        </div>
      </div>
      <hr className=" inline-block w-full" />
      {/* <SearchShowClient pathnameSend="/profile?tab=order" /> */}
      <div className="w-full flex flex-wrap gap-1 md:gap-2 items-center justify-start pb-2">
        {orderStatuses &&
          orderStatuses.map(({ value, label }, index) => (
            <Button
              key={index}
              className=""
              onClick={() => {
                setOrderStatusTab(value);

                // router.push(`/dashboard/orders?statusTab=${item}`);
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
                              src={getImageUrl(user?.image)}
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
                      <p className="">{address ?? "N/A"}</p>
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
                        className={`${status === "PENDING" ? "bg-green-primary" : ""}`}
                      >
                        {status}
                      </Badge>
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
    </div>
  );
};

export default Page;
