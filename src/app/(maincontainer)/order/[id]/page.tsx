"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline";

import { getSingleOrder } from "@/lib/api";
import { Order, OrderItem, OrderLog, User } from "@/generated/prisma";

import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { CheckIcon, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [orderId, setOrderId] = useState<number | null>(Number(id));

  const [order, setOrder] = useState<
    | (Order & {
        _count: { items: number };
        user: User;
        logs: OrderLog[];
        items: (OrderItem & {
          product: { images: string[]; productCode: string };
        })[];
      })
    | null
  >(null);

  const loadOrder = useCallback(async () => {
    if (!orderId) return;
    const res = await getSingleOrder({
      orderId: orderId,
    });
    if (!res.success) return;

    setOrder(res.result);
  }, [orderId]);

  useEffect(() => {
    const a = () => {
      setOrderId(Number(id));
    };
    a();
  }, [id]);

  useEffect(() => {
    function Load() {
      loadOrder();
    }
    Load();
  }, [loadOrder]);

  return (
    <div className="max-w-300 mx-auto">
      <hr className=" inline-block w-full" />

      {order ? (
        <div className="flex gap-3 w-full flex-wrap flex-col md:flex-row px-2">
          {/* info container */}
          <div className="max-w-200 w-full bg-background rounded-sm shadow shadow-foreground p-2 space-y-3 flex-1">
            <div className="flex-center ">
              <h2 className="text-lg font-semibold">
                Order Information #{order.id}
              </h2>
            </div>
            <div className="flex-center">
              <OrderStatusBadge status={order.status} />
            </div>

            {/* billing info and price */}
            <div className="flex flex-wrap w-full sm:flex-row flex-col gap-2 p-2 bg-gray-secondary/40 rounded-sm text-sm">
              {/* info */}
              <div className="space-y-3 p-2 rounded-sm flex-1">
                <h3 className="text-sm font-semibold w-full text-center">
                  Shipping Address
                </h3>
                <div className="flex flex-col text-foreground">
                  <span className="space-x-1">
                    <span className="text-gray-primary">Name:</span>{" "}
                    <span>{order.receiverName}</span>
                  </span>
                  <span className="space-x-1" hidden={!order.receiverEmail}>
                    <span className="text-gray-primary">Email:</span>{" "}
                    <span>{order.receiverEmail}</span>
                  </span>
                  <span className="space-x-1">
                    <span className="text-gray-primary">Phone:</span>{" "}
                    <span>{order.receiverPhone}</span>
                  </span>
                  <span className="space-x-1">
                    <span className="text-gray-primary">Address:</span>
                    <span className="max-w-sm">{order.address}</span>
                  </span>
                  <span className="space-x-1">
                    <span className="text-gray-primary">Delivery Area:</span>
                    <span> {order.deliveryArea}</span>
                  </span>
                  {/* <span>{order.customerNote}</span> */}
                </div>
              </div>
              <div className="space-y-3 p-2 rounded-sm flex-1">
                <h3 className="text-sm font-semibold w-full text-center">
                  Order Summery
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Sub total:</span>
                    <span className="font-semibold">
                      {Number(order.subtotal).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Shipping Cost:</span>
                    <span className="font-semibold">
                      {Number(order.shippingCost).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-red-primary h-[0.3px]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Total:</span>
                    <span className="font-semibold">
                      {(
                        Number(order.total) + Number(order.shippingCost)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Paid:</span>
                    <span className="font-semibold">
                      -{Number(order.paidAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Discount:</span>
                    <span className="font-semibold text-gray-primary">
                      -{Number(order.discountAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-red-primary h-[0.3px]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Due:</span>
                    <span className="font-semibold text-red-primary dark:bg-foreground bg-background px-2  rounded-sm">
                      {(
                        Number(order.total) - Number(order.discountAmount)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-1 w-full">
              <h3 className="text-sm font-semibold w-full">Products</h3>
              <div className=" w-full min-w-0 overflow-x-auto">
                {order.items ? (
                  <Table className="">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Id</TableHead>
                        <TableHead>Product Title</TableHead>
                        <TableHead>Qty.</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody className="">
                      {order.items.map(
                        ({ product, price, productId, qty, title }, index) => (
                          <TableRow key={index} className="">
                            <TableCell className="font-medium">
                              #{productId}
                            </TableCell>

                            <TableCell align="left" className="max-w-sm">
                              <Link
                                href={`${product?.productCode ? `/products/${product?.productCode}` : "#"}`}
                                className="flex items-center justify-start gap-2 w-full min-w-0"
                              >
                                {/* Product image */}
                                <span className="min-w-10 max-w-10 min-h-10 max-h-10 relative z-10 inline-block rounded-sm border overflow-hidden">
                                  {product?.images[0] ? (
                                    <Image
                                      src={`${process.env.NEXT_PUBLIC_URL_R2}/${product.images[0]}`}
                                      alt={title}
                                      sizes="40px"
                                      fill
                                      className="object-cover w-full h-full"
                                    />
                                  ) : (
                                    <FaUserCircle className="h-full w-full" />
                                  )}
                                </span>

                                {/* Product title */}
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium break-words whitespace-normal">
                                    {title}
                                  </p>
                                </div>
                              </Link>
                            </TableCell>

                            <TableCell align="right">{Number(qty)}</TableCell>
                            <TableCell align="right">
                              ৳{Number(price).toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              ৳{(Number(price) * Number(qty)).toFixed(2)}
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

              {order.customerNote && (
                <div className="text-xs text-foreground space-x-2 pt-4">
                  <span className="text-gray-primary">Customer Note:</span>
                  <span>{order.customerNote}</span>
                </div>
              )}

              <div className="flex justify-end items-end w-full">
                <Button onClick={() => router.back()} variant={"outline"}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
          {/* log container */}
          <div className="md:max-w-100  bg-background rounded-sm shadow shadow-foreground p-2 px-4 space-y-3 flex-1">
            <Timeline defaultValue={3} className="w-full max-w-md">
              {order.logs.map(
                (
                  { status, orderId, updatedAt, createdAt, note, id },
                  index,
                ) => (
                  <TimelineItem
                    key={index}
                    step={id}
                    className="group-data-[orientation=vertical]/timeline:ms-10"
                  >
                    <TimelineHeader>
                      <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                      <TimelineDate>
                        {new Date(createdAt).toDateString()}
                      </TimelineDate>
                      <TimelineTitle>{status}</TimelineTitle>
                      <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                        {/* <CheckIcon className="size-4 group-not-data-completed/timeline-item:hidden" /> */}
                        <CheckIcon className="size-4" />
                      </TimelineIndicator>
                    </TimelineHeader>
                    <TimelineContent>{note}</TimelineContent>
                  </TimelineItem>
                ),
              )}
            </Timeline>
          </div>
        </div>
      ) : (
        <NoItemsFound />
      )}
    </div>
  );
};

export default Page;
