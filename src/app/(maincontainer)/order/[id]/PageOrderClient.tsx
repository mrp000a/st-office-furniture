"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  FileText,
  MapPin,
  Package,
  Phone,
  Receipt,
  Truck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";
import { NoItemsFound } from "@/components/uiComponent/uiCom";

import {
  InvoiceButtonDownload,
  InvoiceButtonView,
} from "@/components/common/invoice/InvoiceButton";

import { getImageUrlProduct } from "@/lib/getImageUrl";
import { formatBDDate, formatBDDateTime, formatMoney } from "@/lib/secApi";
import { sanitizeOrder } from "@/types/usefulTypes";

const PageOrderInfo = ({ order }: { order: sanitizeOrder }) => {
  const router = useRouter();

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4">
        <NoItemsFound />
      </div>
    );
  }

  const orderTotal = Number(order.total);
  const shippingCost = Number(order.shippingCost);
  const subtotal = Number(order.subtotal);
  const discount = Number(order.discountAmount ?? 0);
  const paid = Number(order.paidAmount ?? 0);

  /**
   * Keep your current financial calculation here if your backend's
   * `total` field already represents the final payable amount.
   */
  const grandTotal = orderTotal;

  const due = Math.max(grandTotal - paid, 0);

  const latestLog = order.logs?.[order.logs.length - 1];

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* BACK / BREADCRUMB                                         */}
        {/* ========================================================= */}

        <button
          onClick={() => router.back()}
          className="group text-muted-foreground hover:text-foreground mb-5 inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Orders
        </button>

        {/* ========================================================= */}
        {/* HERO / ORDER HEADER                                       */}
        {/* ========================================================= */}

        <section className="bg-card relative overflow-hidden rounded-2xl border shadow-sm">
          <div className="bg-primary absolute inset-x-0 top-0 h-1" />

          <div className="flex flex-col gap-5 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                  Order
                </span>

                <span className="font-mono text-sm font-bold">#{order.id}</span>

                <OrderStatusBadge
                  status={order.status}
                  className="px-3 py-1 text-xs font-semibold"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Order #{order.id}
                </h1>

                <p className="text-muted-foreground mt-1 text-sm">
                  Placed on {formatBDDateTime(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <InvoiceButtonView id={order.publicId ?? ""} />

              <InvoiceButtonDownload id={order.publicId ?? ""} />
            </div>
          </div>

          {/* ======================================================= */}
          {/* QUICK STATUS STRIP                                     */}
          {/* ======================================================= */}

          <div className="bg-muted/30 border-t px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-8 items-center justify-center rounded-full ${
                    order.paymentStatus === "PAID"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-amber-500/10 text-amber-600"
                  }`}
                >
                  <CreditCard className="size-4" />
                </div>

                <div>
                  <p className="text-muted-foreground text-[11px]">Payment</p>

                  <p className="font-semibold">{order.paymentStatus}</p>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden h-8 sm:block"
              />

              <div className="flex items-center gap-2">
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                  <Package className="size-4" />
                </div>

                <div>
                  <p className="text-muted-foreground text-[11px]">Items</p>

                  <p className="font-semibold">
                    {order.items?.reduce(
                      (sum, item) => sum + Number(item.qty),
                      0,
                    ) ?? 0}{" "}
                    item(s)
                  </p>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden h-8 sm:block"
              />

              <div className="flex items-center gap-2">
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                  <MapPin className="size-4" />
                </div>

                <div>
                  <p className="text-muted-foreground text-[11px]">Delivery</p>

                  <p className="font-semibold">{order.deliveryArea}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MAIN GRID                                                 */}
        {/* ========================================================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ======================================================= */}
          {/* LEFT COLUMN                                             */}
          {/* ======================================================= */}

          <div className="min-w-0 space-y-5">
            {/* ===================================================== */}
            {/* ORDER PROGRESS                                        */}
            {/* ===================================================== */}

            <section className="bg-background rounded-2xl border p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    Order Journey
                  </p>

                  <h2 className="mt-1 text-xl font-bold">Order progress</h2>

                  <p className="text-muted-foreground mt-1 text-sm">
                    Follow the latest updates on your order.
                  </p>
                </div>

                <div className="bg-muted hidden rounded-full px-3 py-1 text-xs font-medium sm:block">
                  {order.logs?.length ?? 0} updates
                </div>
              </div>

              <div className="relative space-y-0">
                {order.logs
                  ?.toReversed()
                  .map(({ status, createdAt, note, id }, index) => {
                    const isLatest = index === 0;

                    const isFinal =
                      status === "DELIVERED" ||
                      status === "CANCELLED" ||
                      status === "RETURNED";

                    return (
                      <div
                        key={id}
                        className="relative flex gap-4 pb-7 last:pb-0"
                      >
                        {/* vertical line */}
                        {!(index === (order.logs?.length ?? 0) - 1) && (
                          <div className="bg-border absolute top-8 left-[15px] h-full w-px" />
                        )}

                        {/* indicator */}
                        <div
                          className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
                            isLatest
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-border bg-background text-muted-foreground"
                          }`}
                        >
                          {isLatest ? (
                            isFinal ? (
                              <Check className="size-4" />
                            ) : (
                              <>
                                <span className="bg-primary/30 absolute size-8 animate-ping rounded-full" />
                                <Clock3 className="size-4" />
                              </>
                            )
                          ) : (
                            <Check className="size-4" />
                          )}
                        </div>

                        {/* content */}
                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`font-semibold ${
                                  isLatest
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {status}
                              </h3>

                              {isLatest && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px]"
                                >
                                  Latest
                                </Badge>
                              )}
                            </div>

                            <time className="text-muted-foreground text-xs">
                              {formatBDDateTime(createdAt)}
                            </time>
                          </div>

                          {note && (
                            <div
                              className="text-muted-foreground [&_strong]:text-foreground mt-2 text-sm leading-6 [&_p]:mb-1 [&_strong]:font-semibold"
                              dangerouslySetInnerHTML={{
                                __html: note,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* ===================================================== */}
            {/* CUSTOMER / DELIVERY                                   */}
            {/* ===================================================== */}

            <section className="bg-card rounded-2xl border shadow-sm">
              <div className="border-b px-5 py-4 sm:px-6">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                  Delivery
                </p>

                <h2 className="mt-1 text-xl font-bold">Delivery information</h2>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
                {/* customer */}
                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <UserRound className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                      Receiver
                    </p>

                    <p className="font-semibold">{order.receiverName}</p>

                    <a
                      href={`tel:${order.receiverPhone}`}
                      className="text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1.5 text-sm"
                    >
                      <Phone className="size-3.5" />
                      {order.receiverPhone}
                    </a>

                    {order.receiverEmail && (
                      <p className="text-muted-foreground mt-1 text-sm break-all">
                        {order.receiverEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* address */}
                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <MapPin className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                      Shipping address
                    </p>

                    <p className="text-foreground text-sm leading-6">
                      {order.address}
                    </p>

                    <Badge variant="outline" className="mt-2">
                      {order.deliveryArea}
                    </Badge>
                  </div>
                </div>
              </div>

              {order.customerNote && (
                <div className="bg-muted/20 border-t px-5 py-4 sm:px-6">
                  <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
                    Customer note
                  </p>

                  <p className="text-sm leading-6">{order.customerNote}</p>
                </div>
              )}
            </section>

            {/* ===================================================== */}
            {/* PRODUCTS                                              */}
            {/* ===================================================== */}

            <section className="bg-card overflow-hidden rounded-2xl border shadow-sm">
              <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
                <div>
                  <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    Order contents
                  </p>

                  <h2 className="mt-1 text-xl font-bold">Products</h2>
                </div>

                <Badge variant="secondary">
                  {order.items?.length ?? 0} products
                </Badge>
              </div>

              {order.items?.length ? (
                <div className="divide-y">
                  {order.items.map(
                    ({ product, price, productId, qty, title }, index) => {
                      const lineTotal = Number(price) * Number(qty);

                      return (
                        <div
                          key={index}
                          className="hover:bg-muted/30 flex gap-4 p-4 transition-colors sm:p-5"
                        >
                          {/* product image */}
                          <Link
                            href={
                              product?.productCode
                                ? `/products/${product.productCode}`
                                : "#"
                            }
                            className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-xl border sm:size-24"
                          >
                            <Image
                              unoptimized
                              src={getImageUrlProduct(product?.image)}
                              alt={title}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </Link>

                          {/* product information */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col justify-between gap-3 sm:flex-row">
                              <div className="min-w-0">
                                <Link
                                  href={
                                    product?.productCode
                                      ? `/products/${product.productCode}`
                                      : "#"
                                  }
                                  className="line-clamp-2 font-semibold hover:underline"
                                >
                                  {title}
                                </Link>

                                <div className="text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                                  <span>Product #{productId}</span>

                                  {product?.productCode && (
                                    <span>SKU: {product.productCode}</span>
                                  )}
                                </div>
                              </div>

                              <div className="text-left sm:text-right">
                                <p className="font-bold">
                                  {formatMoney(lineTotal)}
                                </p>

                                <p className="text-muted-foreground mt-1 text-xs">
                                  {formatMoney(price)} × {qty}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              ) : (
                <div className="p-8">
                  <NoItemsFound />
                </div>
              )}
            </section>

            {/* ===================================================== */}
            {/* PAYMENT DETAILS                                      */}
            {/* ===================================================== */}

            <section className="bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                  Payment
                </p>

                <h2 className="mt-1 text-xl font-bold">Payment details</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-muted/20 rounded-xl border p-4">
                  <p className="text-muted-foreground text-xs">Method</p>

                  <p className="mt-1 font-semibold">{order.paymentMethod}</p>
                </div>

                <div className="bg-muted/20 rounded-xl border p-4">
                  <p className="text-muted-foreground text-xs">
                    Payment status
                  </p>

                  <div className="mt-1">
                    <Badge
                      variant={
                        order.paymentStatus === "PAID" ? "default" : "secondary"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted/20 rounded-xl border p-4">
                  <p className="text-muted-foreground text-xs">Transaction</p>

                  <p className="mt-1 truncate font-mono text-sm">
                    {order.transactionId || order.paymentId || "Not available"}
                  </p>
                </div>
              </div>

              {order.paidAt && (
                <p className="text-muted-foreground mt-4 text-xs">
                  Payment received on {formatBDDateTime(order.paidAt)}
                </p>
              )}
            </section>
          </div>

          {/* ======================================================= */}
          {/* RIGHT SIDEBAR                                           */}
          {/* ======================================================= */}

          <aside className="space-y-5 lg:sticky lg:top-5 lg:self-start">
            {/* ===================================================== */}
            {/* ORDER TOTAL                                           */}
            {/* ===================================================== */}

            <section className="bg-card overflow-hidden rounded-2xl border shadow-sm">
              <div className="bg-primary text-primary-foreground px-5 py-5 sm:px-6">
                <p className="text-xs font-medium tracking-wider uppercase opacity-80">
                  Order total
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight">
                  {formatMoney(grandTotal)}
                </p>

                <p className="mt-1 text-xs opacity-80">Final order amount</p>
              </div>

              <div className="space-y-3 p-5 sm:p-6">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Subtotal</span>

                  <span className="font-medium">{formatMoney(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Shipping</span>

                  <span className="font-medium">
                    {formatMoney(shippingCost)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Discount</span>

                    <span className="font-medium text-emerald-600">
                      -{formatMoney(discount)}
                    </span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between gap-4">
                  <span className="font-semibold">Total</span>

                  <span className="font-bold">{formatMoney(grandTotal)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Paid</span>

                  <span className="font-semibold text-emerald-600">
                    -{formatMoney(paid)}
                  </span>
                </div>

                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Due</span>

                    <span
                      className={`text-xl font-bold ${
                        due > 0 ? "text-amber-600" : "text-emerald-600"
                      }`}
                    >
                      {formatMoney(due)}
                    </span>
                  </div>

                  <p className="text-muted-foreground mt-1 text-xs">
                    {due > 0
                      ? "Amount remaining to be paid"
                      : "Payment completed"}
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================== */}
            {/* QUICK ACTIONS                                         */}
            {/* ===================================================== */}

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

            {/* ===================================================== */}
            {/* ORDER DATE                                             */}
            {/* ===================================================== */}

            <section className="bg-card rounded-2xl border p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <Clock3 className="size-5" />
                </div>

                <div>
                  <p className="text-muted-foreground text-xs">Order created</p>

                  <p className="mt-1 font-semibold">
                    {formatBDDate(order.createdAt)}
                  </p>

                  <p className="text-muted-foreground text-xs">
                    Bangladesh Standard Time
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* ========================================================= */}
        {/* FOOTER                                                   */}
        {/* ========================================================= */}

        <footer className="text-muted-foreground mt-8 flex flex-col items-center justify-between gap-3 border-t pt-5 text-xs sm:flex-row">
          <p>Order #{order.id} • ST Office Furniture</p>

          <p>
            Order reference:{" "}
            <span className="font-mono">{order.publicId ?? order.id}</span>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default PageOrderInfo;
