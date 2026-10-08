import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendPushNotification } from "@/lib/push";
import { getSession, requireRole } from "@/lib/serverAuth";

const audiences = ["all", "customers", "new-customers", "inactive"] as const;
type Audience = (typeof audiences)[number];

function isAudience(value: unknown): value is Audience {
  return typeof value === "string" && audiences.includes(value as Audience);
}

export async function POST(request: Request) {
  try {
    await requireRole(getSession(), ["ADMIN", "SUPER_ADMIN"]);

    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const url = typeof body.url === "string" ? body.url.trim() : "";
    const icon = typeof body.icon === "string" ? body.icon.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() : "";
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
          message: "Title must be 60 characters or fewer and message 180 or fewer.",
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
      select: { id: true, endpoint: true, p256dh: true, auth: true },
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
      try {
        await sendPushNotification(subscription, {
          title,
          body: message,
          ...(url ? { url } : {}),
          ...(icon ? { icon } : {}),
          ...(image ? { image } : {}),
        });
        sent += 1;
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
      }
    }

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
