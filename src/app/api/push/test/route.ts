import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
// import webpush
import webpush from "web-push";
import { sendPushNotification } from "@/lib/push";

export async function POST() {
  try {
    // TEMPORARY:
    // Get the first active subscription
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
      const result = await sendPushNotification(
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
        {
          title: "Hellow Rakib I am here",
          body: "Hey there, nice to meet you buddy.. ha ha ha",
          icon: "/icons/icon-192.jpg",
          url: "/products",
        },
      );
    }

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
