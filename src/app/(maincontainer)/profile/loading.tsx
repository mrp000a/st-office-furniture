import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="space-y-2 border-b pb-5">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-4">
            <Skeleton className="mb-4 size-10 rounded-full" />
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-xl border p-4 sm:p-5">
        <Skeleton className="h-5 w-36" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-32 max-w-[60%]" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
