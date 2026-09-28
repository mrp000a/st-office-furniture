import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

import { stripe } from "@/lib/stripe/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        message: "Missing Stripe signature",
      },
      {
        status: 400,
      },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Stripe webhook signature error:", error);

    return NextResponse.json(
      {
        message: "Invalid webhook signature",
      },
      {
        status: 400,
      },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderId = session.metadata?.orderId;

        if (!orderId) {
          break;
        }

        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null;

        await prisma.order.update({
          where: {
            id: Number(orderId),
          },

          data: {
            paymentStatus: "PAID",

            transactionId: paymentIntentId,

            paidAt: new Date(),
          },
        });

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderId = session.metadata?.orderId;

        if (!orderId) {
          break;
        }

        await prisma.order.update({
          where: {
            id: Number(orderId),
          },

          data: {
            paymentStatus: "CANCELLED",
          },
        });

        break;
      }

      default:
        break;
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return NextResponse.json(
      {
        message: "Webhook processing failed",
      },
      {
        status: 500,
      },
    );
  }
}
