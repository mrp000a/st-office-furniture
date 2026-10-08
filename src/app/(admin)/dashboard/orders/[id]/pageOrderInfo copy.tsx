"use client";
import React from "react";
import { Button } from "@/components/ui/button";
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

import { Order, OrderItem, OrderLog, User } from "@/generated/prisma";

import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";
import OrderLogForm from "../../_dash_components/common/logForm";
import { getImageUrlProduct } from "@/lib/getImageUrl";

import {
  SslCommerzButton,
  StripeButton,
  BkashButton,
} from "@/components/actions/Payment/Buttons";

const PageOrderInfo = ({
  order,
}: {
  order: Order & {
    _count: { items: number };
    user: User;
    logs: OrderLog[];
    items: (OrderItem & {
      product: { images: string[]; productCode: string };
    })[];
  };
}) => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-300">
      <hr className="inline-block w-full" />

      {order ? (
        <div className="flex w-full flex-col gap-3 px-2 md:flex-row">
          {/* info container */}
          <div className="bg-violet-primary/5 shadow-foreground h-fit w-full max-w-200 flex-1 space-y-3 rounded-sm p-2 shadow">
            <div className="flex-center">
              <h2 className="text-lg font-semibold">
                Order Information #{order.id}
              </h2>
            </div>
            <div className="flex-center">
              <OrderStatusBadge
                status={order.status}
                className="px-3 py-2 text-base font-semibold"
              />
            </div>

            {/* billing info and price */}
            <div className="bg-violet-primary/15 flex w-full flex-col flex-wrap gap-2 rounded-sm border p-2 text-sm sm:flex-row">
              {/* info */}
              <div className="flex-1 space-y-3 rounded-sm p-2">
                <h3 className="w-full text-center text-sm font-semibold">
                  Shipping Address
                </h3>
                <div className="text-foreground flex flex-col">
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
              <div className="flex-1 space-y-3 rounded-sm p-2">
                <h3 className="w-full text-center text-sm font-semibold">
                  Order Summery
                </h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Sub total:</span>
                    <span className="font-semibold">
                      ৳{Number(order.subtotal).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Shipping Cost:</span>
                    <span className="font-semibold">
                      ৳{Number(order.shippingCost).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-green-primary h-[0.3px]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Total:</span>
                    <span className="font-semibold">
                      ৳
                      {(
                        Number(order.total) + Number(order.shippingCost)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Paid:</span>
                    <span className="font-semibold">
                      -৳{Number(order.paidAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Discount:</span>
                    <span className="text-gray-primary font-semibold">
                      -৳{Number(order.discountAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-green-primary h-[0.3px]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-primary">Due:</span>
                    <span className="text-green-primary dark:bg-foreground bg-background rounded-sm px-2 font-semibold">
                      ৳
                      {(
                        Number(order.total) - Number(order.discountAmount)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-2 p-1">
              <h3 className="w-full text-sm font-semibold">Products</h3>
              <div className="bg-violet-primary/10 w-full min-w-0 overflow-x-auto rounded-md border">
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
                          <TableRow
                            key={index}
                            className="odd:bg-gray-secondary/25 even:bg-gray-secondary/10"
                          >
                            <TableCell className="font-medium">
                              #{productId}
                            </TableCell>

                            <TableCell align="left" className="max-w-sm">
                              <Link
                                href={`${product?.productCode ? `/products/${product?.productCode}` : "#"}`}
                                className="flex w-full min-w-0 items-center justify-start gap-2"
                              >
                                {/* Product image */}
                                <span className="relative z-10 inline-block max-h-10 min-h-10 max-w-10 min-w-10 overflow-hidden rounded-sm border">
                                  <Image
                                    unoptimized
                                    src={getImageUrlProduct(product?.images[0])}
                                    alt={title}
                                    sizes="40px"
                                    fill
                                    className="h-full w-full object-cover"
                                  />
                                </span>

                                {/* Product title */}

                                <p className="w-full max-w-60 min-w-38 wrap-break-word whitespace-normal">
                                  {title ?? "Title"}
                                </p>
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
                <div className="text-foreground space-x-2 pt-4 text-xs">
                  <span className="text-gray-primary">Customer Note:</span>
                  <span>{order.customerNote}</span>
                </div>
              )}

              <div className="flex w-full items-end justify-end">
                <Button onClick={() => router.back()} variant={"outline"}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
          {/* log container */}
          <div className="bg-violet-primary/5 shadow-foreground h-fit flex-1 space-y-3 rounded-sm p-2 px-4 shadow md:max-w-100">
            {/* log form */}
            <OrderLogForm orderId={order.id} />
            <hr />
            <Timeline defaultValue={3} className="w-full max-w-md">
              {order.logs
                .toReversed()
                .map(({ status, createdAt, note, id }, index) => (
                  <TimelineItem
                    key={index}
                    step={id}
                    className="group-data-[orientation=vertical]/timeline:ms-10"
                  >
                    <TimelineHeader>
                      <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                      <TimelineDate>
                        <span>{new Date(createdAt).toDateString()}-</span>
                        <span>
                          {new Date(createdAt).toTimeString().split("GMT")[0]}
                        </span>
                      </TimelineDate>
                      <TimelineTitle>{status}</TimelineTitle>
                      <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                        {index === 0 &&
                        status !== "CANCELLED" &&
                        status !== "DELIVERED" &&
                        status !== "RETURNED" ? (
                          <>
                            <span className="bg-gray-primary h-full w-full rounded-full"></span>
                            <span className="bg-gray-primary absolute h-full w-full animate-ping rounded-full"></span>
                          </>
                        ) : (
                          <>
                            <CheckIcon className="size-4" />
                            {/* <CheckIcon className="size-4 animate-ping" /> */}
                          </>
                        )}
                      </TimelineIndicator>
                    </TimelineHeader>
                    <TimelineContent
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: note ?? "",
                      }}
                    />
                  </TimelineItem>
                ))}
            </Timeline>
          </div>
        </div>
      ) : (
        <NoItemsFound />
      )}
    </div>
  );
};

export default PageOrderInfo;
