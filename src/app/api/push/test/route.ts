import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
// import webpush
// import webpush from "web-push";
import { sendPushNotification } from "@/lib/push";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const title =
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim()
        : "Test Notification";
    const message =
      typeof body.message === "string" && body.message.trim()
        ? body.message.trim()
        : "This is a test push notification.";

    const subscriptions = await prisma.pushSubscription.findMany({
      where: {
        isActive: true,
      },
    });

    if (!subscriptions || !subscriptions.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No active push subscription found.",
        },
        { status: 404 },
      );
    }

    for (const subscription of subscriptions) {
      await sendPushNotification(subscription, {
        title,
        body: message,
        icon: "/icons/icon-192.jpg",
        url: "/products",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Push notification sent.",
    });
  } catch (error: unknown) {
    console.error("Push test error:", error);
    const message =
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string"
        ? error.message
        : "Unknown error";
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : undefined;

    return NextResponse.json(
      {
        success: false,
        error: message,
        statusCode,
      },
      { status: 500 },
    );
  }
}
