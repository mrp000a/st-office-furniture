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
    const orderIdNumber = Number(id);

    // Keep only digits
    const normalizedPhone = String(phone).replace(/\D/g, "");

    // Last 9 digits
    const last9 = normalizedPhone.slice(-9);

    if (last9.length !== 9) {
      return NextResponse.json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderIdNumber,
        OR: [
          {
            receiverPhone: {
              endsWith: last9,
            },
          },
          {
            user: {
              phone: {
                endsWith: last9,
              },
            },
          },
        ],
      },

      include: {
        user: {
          select: {
            phone: true,
          },
        },
      },
    });
    if (!order || !order.publicId || !order.id)
      return NextResponse.json({
        success: false,
        message: "Order Not Found",
      });

    return NextResponse.json({
      success: true,
      result: order.publicId,
      message: "Orders Not Found.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
