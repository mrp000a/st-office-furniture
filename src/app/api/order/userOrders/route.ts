import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma";
import { orderStatuses } from "@/components/data/core";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const receiverName = searchParams.get("name");
  const userId = searchParams.get("userId") ;

  const limit = searchParams.get("limit") ?? 100;

  const statusGet = searchParams.get("status") as OrderStatus | null;

  const status: OrderStatus =
    statusGet && orderStatuses.includes(statusGet) ? statusGet : "PENDING";

  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "User id is required.",
    });
  }

  console.log({ userId });

  try {
    const orders = await prisma.order.findMany({
      take: Number(limit),
      where: {
        AND: [
          status ? { status: status as OrderStatus } : {},
          receiverName
            ? { receiverName: { contains: receiverName, mode: "insensitive" } }
            : {},
          userId ? { user: { is: { id: Number(userId) } } } : {},
        ],
      },
      include: {
        _count: true,
        user: { select: { email: true, name: true, image: true, id: true } },
      },
    });

    if (!orders) {
      return NextResponse.json({
        success: false,
        message: "Orders Not found.",
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
