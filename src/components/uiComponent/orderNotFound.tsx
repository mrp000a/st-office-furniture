"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ClipboardX,
  Home,
  RefreshCcw,
  Search,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function OrderNotFound() {
  const router = useRouter();
  return (
    <main className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-2xl overflow-hidden border shadow-sm">
        <CardContent className="p-0">
          {/* Top accent */}
          <div className="h-1.5 w-full bg-green-primary" />

          <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-16">
            {/* Icon */}
            <div className="relative mb-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-primary/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-primary/20 bg-background shadow-sm">
                  <ClipboardX className="h-8 w-8 text-green-primary" />
                </div>
              </div>

              {/* Small badge */}
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-muted">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>

            {/* Heading */}
            <div className="max-w-md">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-primary">
                Order unavailable
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Order not found
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                We couldn&apos;t find the order you&apos;re looking for. It may
                have been deleted, the order ID may be incorrect, or you may not
                have access to this order.
              </p>
            </div>

            {/* Information box */}
            <div className="mt-8 w-full max-w-md rounded-xl border bg-muted/30 p-4 text-left">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">What can you do?</p>

                  <ul className="mt-2 space-y-1.5 text-xs leading-5 text-muted-foreground">
                    <li>• Check that the order ID is correct.</li>
                    <li>• Return to the orders list and search again.</li>
                    <li>• Contact administrator if necessary.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => router.back()}
                variant="default"
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Prev Page
              </Button>

              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>

            {/* Secondary action */}
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 text-muted-foreground"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="mr-2 h-3.5 w-3.5" />
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
