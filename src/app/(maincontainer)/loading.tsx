import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="bg-card flex flex-col gap-3 rounded-xl border p-3">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/5" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}

export default function MainLoading() {
  return (
    <div className="mx-auto w-full max-w-384 space-y-10 px-3 py-5 sm:px-5 lg:space-y-14 lg:px-8">
      <section className="bg-muted/30 grid min-h-72 items-center gap-8 rounded-2xl border p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
        <div className="space-y-5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full max-w-xl sm:h-16" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="h-5 w-4/5 max-w-md" />
          <Skeleton className="h-11 w-36 rounded-lg" />
        </div>
        <Skeleton className="hidden aspect-[4/3] w-full rounded-xl lg:block" />
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-56" />
          </div>
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-5">
            <Skeleton className="mb-4 size-10 rounded-lg" />
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
          </div>
        ))}
      </section>
    </div>
  );
}
