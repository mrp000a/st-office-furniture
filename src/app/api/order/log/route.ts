import { OrderLog } from "@/generated/prisma";
import { createActivity } from "@/lib/activity-log";
import { prisma } from "@/lib/prisma";
import { getSession, getUserId } from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const sessionPromise = getSession();
    const userId = await getUserId(sessionPromise);

    const body = await req.json();
    const { orderId, status, note } = body as OrderLog;

    if (!orderId || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Order Id and Status are required!",
        },
        { status: 403 },
      );
    }

    const createOrderLog = await prisma.orderLog.create({
      data: {
        status,
        note,
        order: { connect: { id: Number(orderId) } },
      },
      include: { order: true },
    });

    await prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        status: status,
      },
    });

    await createActivity({
      type: "ORDER",
      action: "UPDATE",

      title: `An Order ${status}`,

      description: `Admin id${userId} updated a order #${orderId}`,

      userId: userId,

      entityId: orderId.toString(),
      entityType: "Order",
    });

    if (!createOrderLog)
      return NextResponse.json({
        success: false,
        message: "Error on order log add",
      });

    /*
     const resend = new Resend(process.env.RESEND_API_KEY);
    if ((receiverEmail || userEmail) && createOrder) {
      const { error } = await resend.emails.send({
        from: "ST Office Furniture <info@stofficefurniture.com>",
        to: [receiverEmail ?? userEmail],
        subject: "Your Order Placed Successfully",
        html: orderConfirmationEmail({
          customerName: "Muhammad Rakib",
          orderId: createOrder.id,
          subtotal: subTotalPrice,
          total: totalPrice,
          deliveryCharge: deliveryCharge,
          orderUrl: `${process.env.NEXT_PUBLIC_URL_SITE}/order/${createOrder.id}`,
          status: "PENDING",
          items: sanitizedItems.map((item, index) => {
            return { title: item.title, price: item.price, quantity: item.qty };
          }),
        }),
      });

      if (error) console.log({ orderMail: error });
    }
    */

    return NextResponse.json({
      success: true,
      message: "Order Log Added!",
      result: createOrderLog,
    });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}
