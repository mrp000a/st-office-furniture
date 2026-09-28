import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createBkashPayment } from "@/lib/bkash/create-payment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderId = Number(body.orderId);

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID is required",
        },
        {
          status: 400,
        },
      );
    }

    // Get order from database
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        },
      );
    }

    // Don't allow paying an already-paid order
    if (order.paymentStatus === "PAID") {
      return NextResponse.json(
        {
          success: false,
          message: "Order is already paid",
        },
        {
          status: 400,
        },
      );
    }

    const amount = Number(order.total);

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order amount",
        },
        {
          status: 400,
        },
      );
    }

    const invoice = `ST-${order.id}-${Date.now()}`;

    const payment = await createBkashPayment({
      amount,
      invoice,
    });

    // Save bKash payment ID
    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentMethod: "BKASH",
        paymentStatus: "PENDING",
        paymentId: payment.paymentID,
      },
    });

    return NextResponse.json({
      success: true,

      paymentID: payment.paymentID,

      bkashURL: payment.bkashURL,
    });
  } catch (error) {
    console.error("bKash create route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create bKash payment",
      },
      {
        status: 500,
      },
    );
  }
}
