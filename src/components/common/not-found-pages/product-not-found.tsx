"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function ProductNotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-20">
      <div className="w-full max-w-xl text-center">
        <div className="border-border bg-muted/40 mx-auto flex h-20 w-20 items-center justify-center rounded-full border">
          <ShoppingBag className="text-muted-foreground h-8 w-8" />
        </div>

        <h1 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
          Product not found
        </h1>

        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm leading-6 sm:text-base">
          {
            "The product you're looking for may have been removed, is no longer available, or the link may be incorrect."
          }
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors sm:w-auto"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue shopping
          </Link>

          <Link
            href="/"
            className="border-border hover:bg-muted inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
