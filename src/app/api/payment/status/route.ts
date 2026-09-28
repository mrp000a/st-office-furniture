import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { getSession, getUserId } from "@/lib/serverAuth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const orderIdParam = searchParams.get("orderId");

    if (!orderIdParam) {
      return NextResponse.json(
        {
          success: false,
          message: "orderId is required",
        },
        { status: 400 },
      );
    }

    const orderId = Number(orderIdParam);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid orderId",
        },
        { status: 400 },
      );
    }

    const sessionPromise = getSession();
    const userIdServer = await getUserId(sessionPromise);

    // Find order belonging to current user
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,

        // userId: Number(userIdServer),
      },

      select: {
        id: true,
        paymentStatus: true,
        status: true,
        paymentMethod: true,
        transactionId: true,
        paidAmount: true,
        paidAt: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,

      order: {
        id: order.id,

        paymentStatus: order.paymentStatus,

        orderStatus: order.status,

        paymentMethod: order.paymentMethod,

        transactionId: order.transactionId,

        amount: order.paidAmount ? Number(order.paidAmount) : null,

        currency: "bn",

        paidAt: order.paidAt,

        isPaid: order.paymentStatus === "PAID",

        isFailed: order.paymentStatus === "FAILED",

        isCancelled: order.paymentStatus === "CANCELLED",
      },
    });
  } catch (error) {
    console.error("PAYMENT STATUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to check payment status",
      },
      { status: 500 },
    );
  }
}
