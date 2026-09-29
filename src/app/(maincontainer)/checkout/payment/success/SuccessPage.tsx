"use client";

import Link from "next/link";

import {
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  PackageCheck,
} from "lucide-react";

type Props = {
  order: {
    id: number;
    receiverName: string;
    total: string;
    paymentStatus: string;
    status: string;
    paymentMethod: string | null;
    paidAt: Date | null;
    publicId: string | null;
  };
};

export default function PaymentSuccess({ order }: Props) {
  const amount = Number(order.total);

  return (
    <main className="bg-muted/20 min-h-[80vh] px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-xl">
        {/* Success */}

        <section className="text-center">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500/10" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
              <CheckCircle2
                className="h-12 w-12 text-green-600"
                strokeWidth={2}
              />
            </div>
          </div>

          <p className="mt-7 text-sm font-medium text-green-600">
            Payment confirmed
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Payment Successful
          </h1>

          <p className="text-muted-foreground mt-3">
            Thank you, {order.receiverName}. Your order has been successfully
            confirmed.
          </p>
        </section>

        {/* Order Reference */}

        <section className="bg-background mt-8 rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-sm">Order number</p>

              <p className="mt-1 text-lg font-bold">#{order.id}</p>
            </div>

            <div className="text-right">
              <p className="text-muted-foreground text-sm">Amount paid</p>

              <p className="mt-1 text-lg font-bold">
                ৳
                {amount.toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </section>

        {/* What's next */}

        <section className="bg-background mt-4 rounded-2xl border p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="bg-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
              <PackageCheck className="text-primary h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">What happens next?</h2>

              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {
                  "We've received your payment and confirmed your order. We'll begin preparing your order and contact you before dispatch."
                }
              </p>
            </div>
          </div>

          {/* Mini status */}

          <div className="mt-6 flex items-center gap-2 text-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <span className="font-medium">Payment received</span>
          </div>

          <div className="ml-3 h-6 border-l" />

          <div className="flex items-center gap-2 text-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <span className="font-medium">Order confirmed</span>
          </div>

          <div className="ml-3 h-6 border-l" />

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border">
              3
            </div>

            <span>{"We'll prepare your order"}</span>
          </div>
        </section>

        {/* Actions */}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/order/${order.publicId}`}
            className="group bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-medium transition hover:opacity-90"
          >
            View Order Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/products"
            className="bg-background hover:bg-muted flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 font-medium transition"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Support */}

        <p className="text-muted-foreground mt-7 text-center text-sm">
          Need help with your order?{" "}
          <Link
            href="/contact"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Contact us
          </Link>
        </p>
      </div>
    </main>
  );
}
