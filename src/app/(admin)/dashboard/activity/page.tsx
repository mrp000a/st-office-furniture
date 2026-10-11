import { ActivityAction, ActivityType } from "@/generated/prisma";
import { requireRole, getSession } from "@/lib/serverAuth";
import { prisma } from "@/lib/prisma";
import { coreInfo } from "@/components/data/core";
import ActivityLogTable from "./activity-log-table";

type Props = {
  searchParams: Promise<{
    page?: string;
    type?: string;
    action?: string;
  }>;
};

const PAGE_SIZE = 30;

export const metadata = {
  title: `Activity Logs | ${coreInfo.name}`,
  description: "Review website activity and audit events.",
};

export default async function ActivityPage({ searchParams }: Props) {
  await requireRole(getSession(), ["ADMIN", "SUPER_ADMIN"]);
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const type = Object.values(ActivityType).includes(params.type as ActivityType)
    ? (params.type as ActivityType)
    : undefined;
  const action = Object.values(ActivityAction).includes(
    params.action as ActivityAction,
  )
    ? (params.action as ActivityAction)
    : undefined;

  const where = {
    ...(type ? { type } : {}),
    ...(action ? { action } : {}),
  };

  const [logs, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.activityLog.count({ where }),
  ]);

  return (
    <ActivityLogTable
      logs={logs.map((log) => ({
        ...log,
        createdAt: log.createdAt.toISOString(),
      }))}
      page={page}
      totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
      type={type}
      action={action}
    />
  );
}
