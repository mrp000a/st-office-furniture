// lib/activity-log.ts

import { prisma } from "@/lib/prisma";
import { ActivityAction, ActivityType } from "@/generated/prisma";
import { InputJsonValue } from "@/generated/prisma/runtime/library";

interface CreateActivityParams {
  type: ActivityType;
  action: ActivityAction;
  title: string;
  description: string;

  userId?: number;

  entityId?: string;
  entityType?: string;

  metadata?: InputJsonValue | undefined;
}

export async function createActivity({
  type,
  action,
  title,
  description,
  userId,
  entityId,
  entityType,
  metadata,
}: CreateActivityParams) {
  return prisma.activityLog.create({
    data: {
      type,
      action,
      title,
      description,

      userId: Number(userId) ?? null,

      entityId: entityId ?? null,
      entityType: entityType ?? null,

      metadata: metadata ?? undefined,
    },
  });
}
