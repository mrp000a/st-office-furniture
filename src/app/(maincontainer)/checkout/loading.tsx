import { Skeleton } from "@/components/ui/skeleton";

function CheckoutField() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}

export default function CheckoutLoading() {
  return (
    <div className="mx-auto grid w-full max-w-384 gap-6 px-3 py-5 sm:px-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
      <section className="rounded-xl border p-4 sm:p-6">
        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="mb-8 h-4 w-72 max-w-full" />
        <div className="grid gap-5 sm:grid-cols-2">
          <CheckoutField />
          <CheckoutField />
          <div className="sm:col-span-2">
            <CheckoutField />
          </div>
          <CheckoutField />
          <CheckoutField />
          <div className="sm:col-span-2">
            <CheckoutField />
          </div>
        </div>
        <Skeleton className="mt-7 h-11 w-full rounded-lg" />
      </section>

      <aside className="h-fit rounded-xl border p-4 sm:p-6">
        <Skeleton className="mb-6 h-6 w-40" />
        <div className="divide-y">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-3 py-4 first:pt-0">
              <Skeleton className="size-16 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3 border-t pt-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
      </aside>
    </div>
  );
}
