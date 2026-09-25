import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
// import webpush
import webpush from "web-push";

export async function POST() {
  try {
    // TEMPORARY:
    // Get the first active subscription
    const subscription = await prisma.pushSubscription.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          message: "No active push subscription found.",
        },
        { status: 404 },
      );
    }

    const payload = JSON.stringify({
      title: "ST Office Furniture",
      body: "🎉 Push notification is working!",
      icon: "/icons/icon-192.jpg",
      badge: "/icons/icon-100.jpg",
      data: {
        url: "/",
      },
    });

    const result = await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,

        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      payload,
    );

    return NextResponse.json({
      success: true,
      message: "Push notification sent.",
      statusCode: result.statusCode,
    });
  } catch (error: any) {
    console.error("Push test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Unknown error",
        statusCode: error?.statusCode,
      },
      { status: 500 },
    );
  }
}
