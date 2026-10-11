import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendPushNotification } from "@/lib/push";
import { getSession, requireRole } from "@/lib/serverAuth";
import { createActivity } from "@/lib/activity-log";

const audiences = ["all", "customers", "new-customers", "inactive"] as const;
type Audience = (typeof audiences)[number];

function isAudience(value: unknown): value is Audience {
  return typeof value === "string" && audiences.includes(value as Audience);
}

export async function GET() {
  try {
    await requireRole(getSession(), ["ADMIN", "SUPER_ADMIN"]);
    const notifications = await prisma.notification.findMany({
      where: { type: "ADMIN" },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        title: true,
        body: true,
        url: true,
        delivered: true,
        error: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      notifications: notifications.map((notification) => ({
        ...notification,
        createdAt: notification.createdAt.toISOString(),
      })),
    });
  } catch (error: unknown) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : 500;
    return NextResponse.json(
      { success: false, message: "Unable to load recent notifications." },
      { status },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireRole(getSession(), ["ADMIN", "SUPER_ADMIN"]);

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const url = typeof body.url === "string" ? body.url.trim() : "";
    const requestedImage =
      typeof body.image === "string" ? body.image.trim() : "";
    const requestedIcon = typeof body.icon === "string" ? body.icon.trim() : "";
    const notificationImage = requestedImage || requestedIcon;
    const audience = isAudience(body.audience) ? body.audience : "all";

    if (!title || !message) {
      return NextResponse.json(
        { success: false, message: "Title and message are required." },
        { status: 400 },
      );
    }

    if (title.length > 60 || message.length > 180) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Title must be 60 characters or fewer and message 180 or fewer.",
        },
        { status: 400 },
      );
    }

    const userFilter =
      audience === "customers"
        ? { user: { orders: { some: {} } } }
        : audience === "new-customers"
          ? {
              user: {
                createdAt: {
                  gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              },
            }
          : audience === "inactive"
            ? { user: { orders: { none: {} } } }
            : {};

    const subscriptions = await prisma.pushSubscription.findMany({
      where: { isActive: true, ...userFilter },
      select: {
        id: true,
        userId: true,
        endpoint: true,
        p256dh: true,
        auth: true,
      },
    });

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { success: false, message: "No active subscribers found." },
        { status: 404 },
      );
    }

    let sent = 0;
    let failed = 0;

    for (const subscription of subscriptions) {
      const notification = await prisma.notification.create({
        data: {
          userId: subscription.userId,
          title,
          body: message,
          type: "ADMIN",
          url: url || null,
          icon: notificationImage || null,
          image: notificationImage || null,
        },
      });

      try {
        await sendPushNotification(subscription, {
          title,
          body: message,
          ...(url ? { url } : {}),
          ...(notificationImage ? { icon: notificationImage } : {}),
          ...(notificationImage ? { image: notificationImage } : {}),
        });
        sent += 1;
        await prisma.notification.update({
          where: { id: notification.id },
          data: { delivered: true, deliveredAt: new Date(), error: null },
        });
      } catch (error: unknown) {
        failed += 1;
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
        await prisma.notification.update({
          where: { id: notification.id },
          data: {
            error:
              error instanceof Error
                ? error.message
                : "Push notification delivery failed.",
          },
        });
      }
    }

    const session = await getSession();
    const adminUserId =
      typeof session === "object" &&
      session !== null &&
      "user" in session &&
      typeof session.user === "object" &&
      session.user !== null &&
      "id" in session.user
        ? Number(session.user.id)
        : undefined;
    await createActivity({
      type: "SYSTEM",
      action: "CREATE",
      title: "Push notification sent",
      description: `An ${audience} notification was sent to ${sent} subscriber${sent === 1 ? "" : "s"}.`,
      userId: adminUserId,
      entityType: "Notification",
      metadata: { audience, title, sent, failed, total: subscriptions.length },
    });

    return NextResponse.json({
      success: sent > 0,
      message:
        sent > 0
          ? `Notification sent to ${sent} subscriber${sent === 1 ? "" : "s"}.`
          : "Notification could not be delivered to any subscriber.",
      sent,
      failed,
      total: subscriptions.length,
    });
  } catch (error: unknown) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : 500;
    const message =
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string"
        ? error.message
        : "Unable to send notification.";

    return NextResponse.json({ success: false, message }, { status });
  }
}
