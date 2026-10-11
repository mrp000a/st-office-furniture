import { prisma } from "@/lib/prisma";
import { sendPushNotification } from "@/lib/push";

export type NotificationPayload = {
  title: string;
  body: string;
  type: string;
  userId?: number | null;
  url?: string;
  icon?: string;
  image?: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Push delivery failed.";
}

export async function notifyUser(payload: NotificationPayload) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId: payload.userId ?? null,
        title: payload.title,
        body: payload.body,
        type: payload.type,
        url: payload.url,
        icon: payload.icon,
        image: payload.image,
      },
    });

    if (!payload.userId) {
      return notification;
    }

    const subscriptions = await prisma.pushSubscription.findMany({
      where: { userId: payload.userId, isActive: true },
      select: { id: true, endpoint: true, p256dh: true, auth: true },
    });

    let delivered = false;
    let lastError: string | undefined;

    for (const subscription of subscriptions) {
      try {
        await sendPushNotification(subscription, {
          title: payload.title,
          body: payload.body,
          ...(payload.url ? { url: payload.url } : {}),
          ...(payload.icon ? { icon: payload.icon } : {}),
          ...(payload.image ? { image: payload.image } : {}),
        });
        delivered = true;
      } catch (error: unknown) {
        lastError = getErrorMessage(error);
        const statusCode =
          typeof error === "object" &&
          error !== null &&
          "statusCode" in error &&
          typeof error.statusCode === "number"
            ? error.statusCode
            : undefined;

        if (statusCode === 404 || statusCode === 410) {
          await prisma.pushSubscription.update({
            where: { id: subscription.id },
            data: { isActive: false },
          });
        } else {
          console.error("Push notification delivery failed:", error);
        }
      }
    }

    return prisma.notification.update({
      where: { id: notification.id },
      data: {
        delivered,
        deliveredAt: delivered ? new Date() : null,
        error: delivered ? null : lastError ?? "No active push subscription.",
      },
    });
  } catch (error: unknown) {
    console.error("Notification history error:", error);
    return null;
  }
}

export async function notifyOrder(
  orderId: number,
  payload: Omit<NotificationPayload, "userId">,
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { userId: true },
  });

  return notifyUser({ ...payload, userId: order?.userId });
}
