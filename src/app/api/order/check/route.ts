import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const id = searchParams.get("orderId");
  const phone = searchParams.get("phone");

  if (!id || !phone) {
    return NextResponse.json({
      success: false,
      message: "Order id and phone is required.",
    });
  }

  try {
    const orders = await prisma.order.findUniqueOrThrow({
      where: { id: Number(id) },
      select: { id: true, receiverPhone: true },
    });

    if (!orders) {
      return NextResponse.json({
        success: false,
        message: "Order Not found.",
      });
    } else if (phone && orders && orders.receiverPhone.endsWith(phone)) {
      return NextResponse.json({
        success: true,
        message: "Order found.",
      });
    }

    return NextResponse.json({
      success: false,
      //   result: orders,
      message: "Orders Not Found.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
