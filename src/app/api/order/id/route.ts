import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const id = searchParams.get("orderId");

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "Order id is required.",
    });
  }

  try {
    const orders = await prisma.order.findUniqueOrThrow({
      where: { id: Number(id) },
      include: {
        _count: true,
        items: {
          include: { product: { select: { images: true, productCode: true } } },
        },
        logs: true,
        user: true,
      },
    });

    if (!orders) {
      return NextResponse.json({
        success: false,
        message: "Order Not found.",
      });
    }

    return NextResponse.json({
      success: true,
      result: orders,
      message: "Orders is loaded.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
