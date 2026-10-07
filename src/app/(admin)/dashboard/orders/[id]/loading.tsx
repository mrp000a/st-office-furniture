import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const OrderLoadinglayout = () => {
  return (
    <div className="mx-auto w-full max-w-384 bg-background">
      <div className="space-y-5 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 shrink-0 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-44 max-w-[70vw]" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl border bg-card p-4">
              <Skeleton className="mb-3 h-4 w-20" />
              <Skeleton className="h-7 w-28 max-w-full" />
              <Skeleton className="mt-2 h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* Left Column */}
          <div className="min-w-0 space-y-5">
            {/* Customer + Delivery */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-5">
                <Skeleton className="mb-5 h-5 w-32" />

                <div className="flex items-start gap-3">
                  <Skeleton className="size-11 shrink-0 rounded-full" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-5 w-36 max-w-full" />
                    <Skeleton className="h-4 w-48 max-w-full" />
                    <Skeleton className="h-4 w-32 max-w-full" />
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t pt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5">
                <Skeleton className="mb-5 h-5 w-36" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-40 max-w-full" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="overflow-hidden rounded-xl border bg-card">
              <div className="flex items-center justify-between border-b p-5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-48 max-w-full" />
                </div>

                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>

              {/* Desktop table */}
              <div className="hidden md:block">
                <div className="grid grid-cols-[minmax(220px,1fr)_90px_120px_120px] gap-4 border-b px-5 py-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="ml-auto h-4 w-16" />
                </div>

                <div className="divide-y">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-[minmax(220px,1fr)_90px_120px_120px] items-center gap-4 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-14 shrink-0 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-44 max-w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>

                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="ml-auto h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile products */}
              <div className="divide-y md:hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-3 p-4">
                    <Skeleton className="size-16 shrink-0 rounded-lg" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-3 w-24" />

                      <div className="flex items-center justify-between pt-1">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Note */}
            <div className="rounded-xl border bg-card p-5">
              <Skeleton className="mb-4 h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Order Summary */}
            <div className="rounded-xl border bg-card p-5">
              <Skeleton className="mb-5 h-5 w-32" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>

                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-xl border bg-card p-5">
              <div className="mb-5 flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-28 max-w-[55%]" />
                  </div>
                ))}
              </div>

              <Skeleton className="mt-5 h-10 w-full rounded-lg" />
            </div>

            {/* Activity */}
            <div className="rounded-xl border bg-card p-5">
              <Skeleton className="mb-5 h-5 w-24" />

              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="relative flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <Skeleton className="size-8 rounded-full" />
                      {index !== 3 && <div className="absolute top-8 h-10 w-px bg-border" />}
                    </div>

                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-36 max-w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLoadinglayout;