import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { notifyOrder } from "@/lib/notification-service";
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
      const order = await prisma.order.findFirst({
        where: { paymentId: paymentID },
        select: { id: true, publicId: true },
      });
      await prisma.order.updateMany({
        where: {
          paymentId: paymentID,
        },

        data: {
          paymentStatus: "CANCELLED",
        },
      });
      if (order) {
        await notifyOrder(order.id, {
          type: "PAYMENT_CANCELLED",
          title: "Payment cancelled",
          body: `Payment for order #${order.id} was cancelled.`,
          url: `/order/${order.publicId}`,
        });
      }

      return NextResponse.redirect(
        new URL("/checkout/payment/cancelled", request.url),
      );
    }

    // Customer failed payment
    if (status === "failure") {
      const order = await prisma.order.findFirst({
        where: { paymentId: paymentID },
        select: { id: true, publicId: true },
      });
      await prisma.order.updateMany({
        where: {
          paymentId: paymentID,
        },

        data: {
          paymentStatus: "FAILED",
        },
      });
      if (order) {
        await notifyOrder(order.id, {
          type: "PAYMENT_FAILED",
          title: "Payment unsuccessful",
          body: `Payment for order #${order.id} was not completed.`,
          url: `/order/${order.publicId}`,
        });
      }

      return NextResponse.redirect(
        new URL("/checkout/payment/failed", request.url),
      );
    }

    // Execute payment
    const payment = await executeBkashPayment(paymentID);

    if (payment.transactionStatus !== "Completed") {
      const order = await prisma.order.findFirst({
        where: { paymentId: paymentID },
        select: { id: true, publicId: true },
      });
      await prisma.order.updateMany({
        where: {
          paymentId: paymentID,
        },

        data: {
          paymentStatus: "FAILED",
        },
      });
      if (order) {
        await notifyOrder(order.id, {
          type: "PAYMENT_FAILED",
          title: "Payment unsuccessful",
          body: `Payment for order #${order.id} was not completed.`,
          url: `/order/${order.publicId}`,
        });
      }

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
    const updatedOrder = await prisma.order.update({
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

    await notifyOrder(updatedOrder.id, {
      type: "PAYMENT_CONFIRMED",
      title: "Payment confirmed",
      body: `Payment for order #${updatedOrder.id} was confirmed successfully.`,
      url: `/order/${updatedOrder.publicId}`,
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
