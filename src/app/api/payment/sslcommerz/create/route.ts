import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { initiateSslCommerzPayment } from "@/lib/sslcommerz/initiate-payment";

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
        { status: 400 },
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      // Include your order items
      // if required by your schema.
      include: { _count: true, user: { select: { email: true } } },
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

    if (order.paymentStatus === "PAID") {
      return NextResponse.json(
        {
          success: false,
          message: "Order is already paid",
        },
        { status: 400 },
      );
    }

    /*
     * IMPORTANT:
     *
     * Get this amount from your database.
     * Never trust the amount from the browser.
     */

    const amount = Number(order.total);

    if (!Number.isFinite(amount) || amount < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment amount",
        },
        { status: 400 },
      );
    }

    /*
     * SSLCOMMERZ requires a unique
     * transaction ID.
     *
     * Keep it <= 30 characters.
     */

    const tranId = `ST-${order.id}-${Date.now()}`;

    const result = await initiateSslCommerzPayment({
      tranId,
      amount,

      customer: {
        name: order.receiverName,
        email: order.receiverEmail ?? order.user?.email ?? "",
        phone: order.receiverPhone,
        address: order.address,
      },

      order: {
        id: order.id,

        itemCount: 1,
      },
    });

    /*
     * Save transaction information
     * BEFORE redirecting customer.
     */

    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentMethod: "SSLCOMMERZ",

        paymentStatus: "PENDING",

        paymentId: result.sessionkey,

        transactionId: tranId,
      },
    });

    return NextResponse.json({
      success: true,

      paymentUrl: result.GatewayPageURL,

      sessionKey: result.sessionkey,
    });
  } catch (error) {
    console.log("SSLCOMMERZ create payment:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to start payment",
      },
      { status: 500 },
    );
  }
}
