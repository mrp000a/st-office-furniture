import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderId = Number(body.orderId);

    // testing for development

    const getTestOrderId = await prisma.order.findMany({
      where: {
        paymentStatus: { equals: "PENDING" },
      },
      take: 10,
      orderBy: { id: "asc" },
      select: { id: true },
    });

    console.log({ getTestOrderId });

    // testing
    if (!orderId || !getTestOrderId[0]?.id) {
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

    const order = await prisma.order.findUnique({
      where: {
        // testing
        id: getTestOrderId[0]?.id,
        // id: orderId,
      },
      include: { user: { select: { email: true, phone: true } } },
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

    if (!Number.isFinite(amount) || amount <= 0) {
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

    /*
     * Stripe uses the smallest currency unit.
     *
     * Example:
     *
     * $10.50
     *
     * becomes:
     *
     * 1050
     */

    const amountInCents = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "bdt",

            product_data: {
              name: `ST Office Furniture Order #${order.id}`,
            },

            unit_amount: amountInCents,
          },

          quantity: 1,
        },
      ],

      metadata: {
        orderId: String(order.id),
      },

      success_url:
        `${process.env.NEXT_PUBLIC_URL}` +
        `/checkout/payment/success?orderId=${order.id}`,

      cancel_url:
        `${process.env.NEXT_PUBLIC_URL}` +
        `/checkout/payment/cancelled?orderId=${order.id}`,

      customer_email: order.receiverEmail || order.user?.email || undefined,
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentMethod: "STRIPE",

        paymentStatus: "PENDING",

        paymentId: session.id,
      },
    });

    return NextResponse.json({
      success: true,

      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error("Stripe create payment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create Stripe payment",
      },
      {
        status: 500,
      },
    );
  }
}
