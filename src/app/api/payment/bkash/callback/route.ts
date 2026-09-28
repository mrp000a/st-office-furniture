import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { executeBkashPayment } from "@/lib/bkash/execute-payment";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const paymentID = searchParams.get("paymentID");

    const status = searchParams.get("status");

    if (!paymentID) {
      return NextResponse.redirect(
        new URL("/checkout/payment/failed", request.url),
      );
    }

    // Customer cancelled payment
    if (status === "cancel") {
      await prisma.order.updateMany({
        where: {
          paymentId: paymentID,
        },

        data: {
          paymentStatus: "CANCELLED",
        },
      });

      return NextResponse.redirect(
        new URL("/checkout/payment/cancelled", request.url),
      );
    }

    // Customer failed payment
    if (status === "failure") {
      await prisma.order.updateMany({
        where: {
          paymentId: paymentID,
        },

        data: {
          paymentStatus: "FAILED",
        },
      });

      return NextResponse.redirect(
        new URL("/checkout/payment/failed", request.url),
      );
    }

    // Execute payment
    const payment = await executeBkashPayment(paymentID);

    if (payment.transactionStatus !== "Completed") {
      await prisma.order.updateMany({
        where: {
          paymentId: paymentID,
        },

        data: {
          paymentStatus: "FAILED",
        },
      });

      return NextResponse.redirect(
        new URL("/checkout/payment/failed", request.url),
      );
    }

    // Find order
    const order = await prisma.order.findFirst({
      where: {
        paymentId: paymentID,
      },
    });

    if (!order) {
      console.error("Order not found for bKash payment:", paymentID);

      return NextResponse.redirect(
        new URL("/checkout/payment/failed", request.url),
      );
    }

    /*
     * IMPORTANT:
     *
     * Verify the returned amount against
     * your order amount before marking it PAID.
     */

    const paidAmount = Number(payment.amount);

    const orderAmount = Number(order.total);

    if (!Number.isFinite(paidAmount) || paidAmount !== orderAmount) {
      console.error("bKash amount mismatch", {
        orderAmount,
        paidAmount,
        paymentID,
      });

      return NextResponse.redirect(
        new URL("/checkout/payment/failed", request.url),
      );
    }

    // Update order
    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentStatus: "PAID",

        transactionId: payment.trxID,

        paidAt: new Date(),
        paidAmount: order.total,
        // order status
        status: "CONFIRMED",
        logs: {
          create: {
            status: "CONFIRMED",
            note: `Paid using Bkash. Tnx: ${payment.trxID}`,
          },
        },
      },

      include: { logs: true },
    });

    return NextResponse.redirect(
      new URL(`/checkout/payment/success?orderId=${order.id}`, request.url),
    );
  } catch (error) {
    console.error("bKash callback error:", error);

    return NextResponse.redirect(
      new URL("/checkout/payment/failed", request.url),
    );
  }
}
