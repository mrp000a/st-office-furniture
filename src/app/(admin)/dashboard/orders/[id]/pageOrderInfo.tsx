"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Receipt,
  ReceiptText,
  ShoppingBag,
  UserRound,
  WalletCards,
} from "lucide-react";

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Order, OrderItem, OrderLog, User } from "@/generated/prisma";
import { NoItemsFound } from "@/components/uiComponent/uiCom";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";
import OrderLogForm from "../../_dash_components/common/logForm";
import { getImageUrlProduct } from "@/lib/getImageUrl";

import {
  SslCommerzButton,
  StripeButton,
  BkashButton,
} from "@/components/actions/Payment/Buttons";
import {
  InvoiceButtonDownload,
  InvoiceButtonView,
} from "@/components/common/invoice/InvoiceButton";

type PageOrderInfoProps = {
  order: Order & {
    _count: { items: number };
    user: User | null;
    logs: OrderLog[];
    items: (OrderItem & {
      product: {
        images: string[];
        productCode: string;
      };
    })[];
  };
};

const money = (value: unknown) =>
  `৳${Number(value ?? 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatDateTime = (date: Date | string) =>
  new Date(date).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getInitials = (name?: string | null) => {
  if (!name) return "CU";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
};

const PageOrderInfo = ({ order }: PageOrderInfoProps) => {
  const router = useRouter();

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center px-4">
        <NoItemsFound />
      </div>
    );
  }

  const total = Number(order.total);
  const paid = Number(order.paidAmount);
  const due = Math.max(0, total - paid);
  const itemCount = Number(order._count?.items ?? order.items?.length ?? 0);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 px-3 pb-8 sm:px-5 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="icon"
            className="mt-0.5 shrink-0 rounded-lg"
          >
            <ArrowLeft className="size-4" />
          </Button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Order #{order.id}
              </h1>

              <OrderStatusBadge
                status={order.status}
                className="px-2.5 py-1 text-xs font-semibold"
              />
            </div>

            <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
              {order.publicId && (
                <span className="font-mono">ID: {order.publicId}</span>
              )}

              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5" />
                {formatDateTime(order.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <InvoiceButtonView id={order.publicId ?? ""} />

          <InvoiceButtonDownload id={order.publicId ?? ""} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="bg-background rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                Order Total
              </p>
              <p className="mt-1 text-xl font-bold">{money(total)}</p>
            </div>

            <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
              <CircleDollarSign className="size-5" />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs font-medium">Paid</p>
              <p className="mt-1 text-xl font-bold">{money(paid)}</p>
            </div>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <WalletCards className="size-5" />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs font-medium">Due</p>
              <p className="mt-1 text-xl font-bold">{money(due)}</p>
            </div>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <Clock3 className="size-5" />
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs font-medium">Items</p>
              <p className="mt-1 text-xl font-bold">{itemCount}</p>
            </div>

            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <ShoppingBag className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* LEFT COLUMN */}
        <div className="min-w-0 space-y-5">
          {/* Customer + Delivery */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Customer */}
            <section className="bg-background rounded-xl border shadow-sm">
              <div className="flex items-center justify-between border-b px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <UserRound className="text-primary size-4" />
                  <h2 className="font-semibold">Customer Information</h2>
                </div>

                {order.user && (
                  <Link
                    href={`/dashboard/users/${order.user.id}`}
                    className="text-primary text-xs font-medium hover:underline"
                  >
                    View Profile
                  </Link>
                )}
              </div>

              <div className="space-y-4 p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {getInitials(order.receiverName)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {order.receiverName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {order.user
                        ? `Registered customer #${order.user.id}`
                        : "Guest customer"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 text-sm">
                  <a
                    href={`tel:${order.receiverPhone}`}
                    className="bg-muted/50 hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                  >
                    <Phone className="text-muted-foreground size-4 shrink-0" />
                    <span className="truncate">{order.receiverPhone}</span>
                  </a>

                  {order.receiverEmail && (
                    <a
                      href={`mailto:${order.receiverEmail}`}
                      className="bg-muted/50 hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                    >
                      <Mail className="text-muted-foreground size-4 shrink-0" />
                      <span className="truncate">{order.receiverEmail}</span>
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="bg-background rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 border-b px-4 py-3.5">
                <MapPin className="text-primary size-4" />
                <h2 className="font-semibold">Delivery Information</h2>
              </div>

              <div className="space-y-4 p-4">
                <div>
                  <p className="text-muted-foreground mb-1 text-[11px] font-semibold tracking-wider uppercase">
                    Delivery Area
                  </p>
                  <p className="font-medium">{order.deliveryArea}</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1 text-[11px] font-semibold tracking-wider uppercase">
                    Shipping Address
                  </p>
                  <p className="text-muted-foreground text-sm leading-6">
                    {order.address}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Products */}
          <section className="bg-background overflow-hidden rounded-xl border shadow-sm">
            <div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Package className="text-primary size-4" />
                <h2 className="font-semibold">Ordered Products</h2>
              </div>

              <span className="text-muted-foreground text-xs">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            {order.items?.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="min-w-[280px]">Product</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {order.items.map(
                      ({ product, price, productId, qty, title }, index) => {
                        const lineTotal = Number(price) * Number(qty);

                        return (
                          <TableRow
                            key={`${productId}-${index}`}
                            className="group"
                          >
                            <TableCell>
                              <Link
                                href={
                                  product?.productCode
                                    ? `/products/${product.productCode}`
                                    : "#"
                                }
                                className="flex min-w-0 items-center gap-3"
                              >
                                <div className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-lg border">
                                  <Image
                                    unoptimized
                                    src={getImageUrlProduct(
                                      product?.images?.[0],
                                    )}
                                    alt={title || "Product"}
                                    sizes="48px"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                </div>

                                <div className="max-w-lg min-w-0">
                                  <p className="group-hover:text-primary line-clamp-2 font-medium transition-colors">
                                    {title || "Untitled Product"}
                                  </p>

                                  <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 text-xs">
                                    <span>Item #{productId}</span>

                                    {product?.productCode && (
                                      <>
                                        <span>•</span>
                                        <span className="font-mono">
                                          {product.productCode}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </TableCell>

                            <TableCell className="text-center font-medium">
                              ×{Number(qty)}
                            </TableCell>

                            <TableCell className="text-right whitespace-nowrap">
                              {money(price)}
                            </TableCell>

                            <TableCell className="text-right font-semibold whitespace-nowrap">
                              {money(lineTotal)}
                            </TableCell>
                          </TableRow>
                        );
                      },
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-8">
                <NoItemsFound />
              </div>
            )}
          </section>

          {/* Customer Note */}
          {order.customerNote && (
            <section className="bg-background rounded-xl border shadow-sm">
              <div className="flex items-center gap-2 border-b px-4 py-3.5">
                <MessageSquare className="text-primary size-4" />
                <h2 className="font-semibold">Customer Note</h2>
              </div>

              <div className="p-4">
                <div className="bg-muted/50 text-muted-foreground rounded-lg p-4 text-sm leading-6">
                  {order.customerNote}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <aside className="min-w-0 space-y-5">
          {/* Order Summary */}
          <section className="bg-background rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 border-b px-4 py-3.5">
              <ReceiptText className="text-primary size-4" />
              <h2 className="font-semibold">Order Summary</h2>
            </div>

            <div className="space-y-3 p-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{money(order.subtotal)}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{money(order.shippingCost)}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium text-red-500">
                  -{money(order.discountAmount)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">Order Total</span>
                  <span className="text-lg font-bold">{money(total)}</span>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-500/10 p-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Paid
                  </span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {money(paid)}
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-orange-700 dark:text-orange-400">
                    Due
                  </span>
                  <span className="font-semibold text-orange-700 dark:text-orange-400">
                    {money(due)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-background rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 border-b px-4 py-3.5">
              <CreditCard className="text-primary size-4" />
              <h2 className="font-semibold">Payment Information</h2>
            </div>

            <div className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                    Method
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {order.paymentMethod}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              {order.transactionId && (
                <div>
                  <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                    Transaction ID
                  </p>
                  <p className="bg-muted/50 mt-1 rounded-md p-2.5 font-mono text-xs break-all">
                    {order.transactionId}
                  </p>
                </div>
              )}

              {order.paymentId && (
                <div>
                  <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                    Payment ID
                  </p>
                  <p className="bg-muted/50 mt-1 rounded-md p-2.5 font-mono text-xs break-all">
                    {order.paymentId}
                  </p>
                </div>
              )}

              {order.paidAt && (
                <div className="flex items-center justify-between gap-4 border-t pt-3 text-sm">
                  <span className="text-muted-foreground">Paid at</span>
                  <span className="font-medium">
                    {formatDateTime(order.paidAt)}
                  </span>
                </div>
              )}

              {/* Keep these available if your payment buttons need to be shown for this order 
              {order.paymentStatus !== "PAID" && (
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Payment Actions
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <StripeButton orderId={order.id} />
                    <BkashButton orderId={order.id} />
                    <SslCommerzButton orderId={order.id} />
                  </div>
                </div>
              )}*/}
            </div>
          </section>

          {/* Activity */}
          <section className="bg-background rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 border-b px-4 py-3.5">
              <Clock3 className="text-primary size-4" />
              <h2 className="font-semibold">Order Activity</h2>
            </div>

            <div className="p-4">
              <OrderLogForm orderId={order.id} />

              <div className="my-5 border-t" />

              {order.logs?.length > 0 ? (
                <Timeline defaultValue={3} className="w-full max-w-md">
                  {order.logs
                    .toReversed()
                    .map(({ status, createdAt, note, id }, index) => {
                      const isLatest = index === 0;

                      const isFinal =
                        status === "DELIVERED" ||
                        status === "CANCELLED" ||
                        status === "RETURNED";
                      return (
                        <TimelineItem
                          key={id}
                          step={id}
                          className="group-data-[orientation=vertical]/timeline:ms-10"
                        >
                          <TimelineHeader>
                            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />

                            <TimelineDate>
                              <span>{formatDateTime(createdAt)}</span>
                            </TimelineDate>

                            <TimelineTitle>{status}</TimelineTitle>

                            <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                              {isLatest && !isFinal ? (
                                <>
                                  <span className="bg-primary absolute size-2.5 rounded-full" />
                                  <span className="bg-primary/30 absolute size-5 animate-ping rounded-full" />
                                </>
                              ) : (
                                <Check className="size-3.5" />
                              )}
                            </TimelineIndicator>
                          </TimelineHeader>

                          {note && (
                            <TimelineContent
                              className="text-xs leading-5 whitespace-pre-line"
                              dangerouslySetInnerHTML={{ __html: note }}
                            />
                          )}
                        </TimelineItem>
                      );
                    })}
                </Timeline>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                    <Clock3 className="text-muted-foreground size-4" />
                  </div>
                  <p className="mt-2 text-sm font-medium">No activity yet</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Order activity will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="bg-card rounded-2xl border p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Receipt className="text-primary size-4" />

              <h3 className="font-semibold">Order documents</h3>
            </div>

            <div className="space-y-2">
              <InvoiceButtonView id={order.publicId ?? ""} />

              <InvoiceButtonDownload id={order.publicId ?? ""} />
            </div>
          </section>
        </aside>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-start border-t pt-5">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="gap-2 rounded-lg"
        >
          <ArrowLeft className="size-4" />
          Back to Orders
        </Button>
      </div>
    </div>
  );
};

export default PageOrderInfo;
