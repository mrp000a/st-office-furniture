import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { validateSslCommerzPayment } from "@/lib/sslcommerz/validate-payment";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const status = String(formData.get("status") || "");

    const tranId = String(formData.get("tran_id") || "");

    const valId = String(formData.get("val_id") || "");

    const amount = Number(formData.get("amount"));

    if (!tranId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing transaction ID",
        },
        { status: 400 },
      );
    }

    /*
     * Find OUR order first.
     */

    const order = await prisma.order.findFirst({
      where: {
        transactionId: tranId,
      },
    });

    if (!order) {
      console.error("Unknown SSLCOMMERZ transaction:", tranId);

      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 },
      );
    }

    /*
     * Never trust the IPN status alone.
     *
     * Validate with SSLCOMMERZ.
     */

    if (status !== "VALID" || !valId) {
      await prisma.order.update({
        where: {
          id: order.id,
        },

        data: {
          paymentStatus: status === "CANCELLED" ? "CANCELLED" : "FAILED",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Payment status recorded",
      });
    }

    /*
     * Call SSLCOMMERZ validation API.
     */

    const validation = await validateSslCommerzPayment(valId);

    /*
     * Must be VALID or VALIDATED.
     */

    if (validation.status !== "VALID" && validation.status !== "VALIDATED") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment validation failed",
        },
        { status: 400 },
      );
    }

    /*
     * Verify transaction ID.
     */

    if (validation.tran_id !== order.transactionId) {
      console.error("Transaction ID mismatch");

      return NextResponse.json(
        {
          success: false,
          message: "Transaction mismatch",
        },
        { status: 400 },
      );
    }

    /*
     * Verify amount.
     */

    const orderAmount = Number(order.total);

    const validatedAmount = Number(validation.amount);

    if (
      !Number.isFinite(validatedAmount) ||
      Math.abs(validatedAmount - orderAmount) > 0.01
    ) {
      console.error("Payment amount mismatch", {
        orderAmount,
        validatedAmount,
        tranId,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Payment amount mismatch",
        },
        { status: 400 },
      );
    }

    /*
     * Optional risk check.
     *
     * For high-risk transactions,
     * don't immediately fulfill the order.
     */

    const riskLevel = Number(validation.risk_level);

    if (riskLevel === 1) {
      console.warn("High risk SSLCOMMERZ transaction:", tranId);

      // Keep pending/on-hold depending
      // on your business rules.
      return NextResponse.json({
        success: true,
        message: "Payment received for review",
      });
    }

    /*
     * Everything is verified.
     *
     * NOW mark it PAID.
     */

    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentStatus: "PAID",

        paidAt: new Date(),

        paymentId: valId,

        // If you have a separate
        // transaction ID field:
        // transactionId: validation.bank_tran_id
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment validated successfully",
    });
  } catch (error) {
    console.error("SSLCOMMERZ IPN error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "IPN processing failed",
      },
      { status: 500 },
    );
  }
}
