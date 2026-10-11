"use client";

import { ActivityAction, ActivityType } from "@/generated/prisma";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ActivityLogRow = {
  id: number;
  type: ActivityType;
  action: ActivityAction;
  title: string;
  description: string;
  createdAt: string;
  user: { id: number; name: string; email: string } | null;
};

export default function ActivityLogTable({
  logs,
  page,
  totalPages,
  type,
  action,
}: {
  logs: ActivityLogRow[];
  page: number;
  totalPages: number;
  type?: ActivityType;
  action?: ActivityAction;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: "type" | "action", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") params.delete(key);
    else params.set(key, value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  function changePage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <main className="w-full space-y-6 p-3 sm:p-5 lg:p-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="text-green-primary size-5" />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Activity logs
            </h1>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Review sign-ins, orders, user changes, and other website events.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={type ?? "ALL"}
            onValueChange={(value) => updateFilter("type", value)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All types</SelectItem>
              {Object.values(ActivityType).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={action ?? "ALL"}
            onValueChange={(value) => updateFilter("action", value)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All actions</SelectItem>
              {Object.values(ActivityAction).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="overflow-hidden rounded-xl border">
        {logs.length === 0 ? (
          <div className="text-muted-foreground px-4 py-16 text-center text-sm">
            No activity logs match the selected filters.
          </div>
        ) : (
          <div className="divide-y">
            {logs.map((log) => (
              <article key={log.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-medium">{log.title}</h2>
                      <Badge variant="outline">{log.type}</Badge>
                      <Badge>{log.action}</Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {log.description}
                    </p>
                    <p className="text-muted-foreground mt-2 text-xs">
                      {log.user
                        ? `${log.user.name} (${log.user.email})`
                        : "System"}{" "}
                      · {new Date(log.createdAt).toLocaleString("en-BD")}
                    </p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    #{log.id}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page <= 1}
            onClick={() => changePage(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={page >= totalPages}
            onClick={() => changePage(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </main>
  );
}
