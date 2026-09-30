import Link from "next/link";
import {
  XCircle,
  RefreshCcw,
  ShoppingBag,
  ArrowLeft,
  Headphones,
} from "lucide-react";

type Props = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function PaymentFailedPage({ searchParams }: Props) {
  const params = await searchParams;

  const orderId = params.orderId;

  return (
    <main className="bg-muted/20 min-h-[80vh] px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <section className="text-center">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-red-500/10" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
              <XCircle className="h-12 w-12 text-red-600" strokeWidth={2} />
            </div>
          </div>

          <p className="mt-7 text-sm font-medium text-red-600">
            Payment unsuccessful
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Payment Failed
          </h1>

          <p className="text-muted-foreground mx-auto mt-3 max-w-md leading-6">
            {
              "We couldn't complete your payment. Your order has not been confirmed yet."
            }
          </p>
        </section>

        {/* Information card */}
        <section className="bg-background mt-8 rounded-2xl border p-6 shadow-sm">
          <h2 className="font-semibold">What can you do?</h2>

          <div className="mt-5 space-y-4">
            <div className="flex gap-3">
              <div className="bg-muted-foreground mt-0.5 h-2 w-2 shrink-0 rounded-full" />

              <p className="text-muted-foreground text-sm leading-6">
                Check your payment information and try again.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="bg-muted-foreground mt-0.5 h-2 w-2 shrink-0 rounded-full" />

              <p className="text-muted-foreground text-sm leading-6">
                Make sure your payment account has sufficient balance.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="bg-muted-foreground mt-0.5 h-2 w-2 shrink-0 rounded-full" />

              <p className="text-muted-foreground text-sm leading-6">
                If you were charged but the payment shows as failed, please
                contact us before making another payment.
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
              <RefreshCcw className="h-4 w-4" />
              Try Payment Again
            </Link>
          ) : (
            <Link
              href="/checkout"
              className="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-medium transition hover:opacity-90"
            >
              <RefreshCcw className="h-4 w-4" />
              Return to Order
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
            Having trouble?
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
