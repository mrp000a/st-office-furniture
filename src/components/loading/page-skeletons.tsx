import { Skeleton } from "@/components/ui/skeleton";

export function ProductSectionSkeleton() {
  return (
    <section className="mx-auto w-full max-w-384 space-y-5 px-3 py-6 sm:px-5 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-56" />
        </div>
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-65 min-w-65 space-y-3 rounded-xl border p-3"
          >
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CategorySectionSkeleton() {
  return (
    <section className="mx-auto w-full max-w-384 space-y-5 px-3 py-6 sm:px-5 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-xl border p-3">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="mx-auto h-5 w-2/3" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContentPageSkeleton() {
  return (
    <div className="bg-background mx-auto w-full max-w-384 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-3 border-b pb-6">
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
      <div className="space-y-4 rounded-xl border p-5 sm:p-8">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="mt-5 h-48 w-full rounded-lg" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function AdminTableSkeleton() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="rounded-xl border">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row">
          <Skeleton className="h-10 w-full rounded-lg sm:max-w-xs" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <div className="space-y-4 p-4 sm:p-6">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-9 shrink-0 rounded-lg" />
              <Skeleton className="h-4 w-1/3 min-w-24" />
              <Skeleton className="hidden h-4 w-1/4 sm:block" />
              <Skeleton className="ml-auto h-8 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminFormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5 rounded-xl border p-4 sm:p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          ))}
          <Skeleton className="h-11 w-36 rounded-lg" />
        </div>
        <div className="h-fit space-y-4 rounded-xl border p-4 sm:p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ListPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-384 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <div className="space-y-4 rounded-xl border p-4 sm:p-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b pb-4 last:border-0 last:pb-0"
          >
            <Skeleton className="size-16 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaymentStateSkeleton() {
  return (
    <div className="mx-auto flex min-h-96 w-full max-w-2xl items-center justify-center px-4 py-12">
      <div className="w-full space-y-5 rounded-2xl border p-6 text-center sm:p-10">
        <Skeleton className="mx-auto size-16 rounded-full" />
        <Skeleton className="mx-auto h-8 w-64 max-w-full" />
        <Skeleton className="mx-auto h-4 w-full max-w-md" />
        <Skeleton className="mx-auto h-4 w-4/5 max-w-sm" />
        <Skeleton className="mx-auto h-11 w-36 rounded-lg" />
      </div>
    </div>
  );
}

export function TrackOrderSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-9 w-56" />
        <Skeleton className="mx-auto h-4 w-80 max-w-full" />
      </div>
      <div className="rounded-xl border p-4 sm:p-6">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="mt-3 h-11 w-full rounded-lg sm:ml-auto sm:w-32" />
      </div>
      <div className="space-y-5 rounded-xl border p-5 sm:p-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full max-w-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
