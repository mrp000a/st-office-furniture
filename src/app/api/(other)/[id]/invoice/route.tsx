import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";

import { prisma } from "@/lib/prisma";
import { OrderInvoice } from "@/components/common/invoice/invoice-com";
import React from "react";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;

  const download = searchParams.get("download") === "true";

  // const sessionPromise = getSession();
  // const userId = await getUserId(sessionPromise);

  const order = await prisma.order.findUnique({
    where: {
      // id: Number(id),
      publicId: id,
      // OR: [
      //   { user: { role: { in: ["ADMIN", "SUPER_ADMIN"] } } },
      //   { userId: Number(userId) },
      // ],
    },
    include: {
      items: {
        include: { product: { select: { images: true, productCode: true } } },
      },
      logs: true,
      _count: true,
      user: true,
    },
  });

  //   console.log(order);
  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  const sanitizeOrder = {
    ...order,
    subtotal: Number(order.subtotal),
    shippingCost: Number(order.shippingCost ?? 0),
    discountAmount: Number(order.discountAmount ?? 0),
    total: Number(order.total ?? 0),
    paidAmount: Number(order.paidAmount ?? 0),
    items: order.items.map((item) => {
      return {
        ...item,
        price: Number(item.price),
        product: {
          image: item.product?.images[0],
          productCode: item.product?.productCode,
        },
      };
    }),
  };

  const pdfBuffer = await renderToBuffer(
    <OrderInvoice order={sanitizeOrder} />,
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="invoice-${order.id}.pdf"`,
    },
  });
}
