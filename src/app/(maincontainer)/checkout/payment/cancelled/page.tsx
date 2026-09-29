import Link from "next/link";
import {
  CircleSlash,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
  Headphones,
} from "lucide-react";

type Props = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function PaymentCancelledPage({ searchParams }: Props) {
  const params = await searchParams;

  const orderId = params.orderId;

  return (
    <main className="bg-muted/20 min-h-[80vh] px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <section className="text-center">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-500/10" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/40">
              <CircleSlash
                className="h-11 w-11 text-amber-600"
                strokeWidth={2}
              />
            </div>
          </div>

          <p className="mt-7 text-sm font-medium text-amber-600">
            Payment cancelled
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Payment Cancelled
          </h1>

          <p className="text-muted-foreground mx-auto mt-3 max-w-md leading-6">
            You cancelled the payment before it was completed. Your order has
            not been confirmed yet.
          </p>
        </section>

        {/* Information card */}
        <section className="bg-background mt-8 rounded-2xl border p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="bg-muted flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">No payment was completed</h2>

              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {
                  " You can return to checkout whenever you're ready. Your order will remain unpaid until a successful payment is confirmed."
                }
              </p>
            </div>
          </div>
        </section>

        {/* Order reference */}
        {orderId && (
          <div className="bg-background mt-4 rounded-xl border px-5 py-4 text-center">
            <p className="text-muted-foreground text-xs">Order reference</p>

            <p className="mt-1 font-semibold">#{orderId}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {orderId ? (
            <Link
              href={`/checkout?orderId=${orderId}`}
              className="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-medium transition hover:opacity-90"
            >
              <CreditCard className="h-4 w-4" />
              Return to Payment
            </Link>
          ) : (
            <Link
              href="/checkout"
              className="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-medium transition hover:opacity-90"
            >
              <CreditCard className="h-4 w-4" />
              Return to Checkout
            </Link>
          )}

          <Link
            href="/products"
            className="bg-background hover:bg-muted flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 font-medium transition"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            <Headphones className="h-4 w-4" />
            Need help with your order?
          </p>

          <Link
            href="/contact"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
          >
            Contact Support
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
