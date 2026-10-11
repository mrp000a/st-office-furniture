import { Skeleton } from "@/components/ui/skeleton";

const ProductLoadingLayout = () => {
  return (
    <div className="bg-background mx-auto w-full max-w-384 space-y-3 p-1">
      <div className="flex flex-col gap-4 rounded-md border p-2 md:flex-row">
        <Skeleton className="aspect-5/4 w-full md:max-w-125" />
        <div className="flex w-full flex-col gap-4 p-2">
          <Skeleton className="h-8 w-3/4 max-w-lg" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-48" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="mt-auto flex gap-3">
            <Skeleton className="h-11 w-36 rounded-lg" />
            <Skeleton className="h-11 w-36 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-md border p-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex flex-col gap-3 rounded-md border p-3 md:flex-row-reverse">
        <Skeleton className="h-48 w-full md:max-w-80" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-48" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2 border-b pb-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-md border p-3">
        <Skeleton className="h-7 w-48" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-65 min-w-65 space-y-2 rounded-sm border p-2"
            >
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLoadingLayout;
