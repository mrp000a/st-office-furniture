import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Order, OrderItem, OrderStatus, Product } from "@/generated/prisma";
import { DeliveryAreas, orderStatuses } from "@/components/data/core";
import { getSession, requireRole } from "@/lib/serverAuth";
import { useId } from "react";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const receiverName = searchParams.get("name");

  const limit = searchParams.get("limit") ?? 100;

  const statusGet = searchParams.get("status") as OrderStatus | null;

  const status: OrderStatus =
    statusGet && orderStatuses.includes(statusGet) ? statusGet : "PENDING";


  try {
    const orders = await prisma.order.findMany({
      take: Number(limit),
      where: {
        AND: [
          status ? { status: status as OrderStatus } : {},
          receiverName
            ? { receiverName: { contains: receiverName, mode: "insensitive" } }
            : {},
        ],
      },
      include: {
        _count: true,
        user: { select: { email: true, name: true, image: true } },
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      receiverName,
      receiverPhone,
      receiverEmail,
      deliveryArea,
      address,
      items,
      userId,
      customerNote,
    } = body as Order & {
      items: Array<OrderItem & { product: Product }>;
    };

    if (
      !receiverName ||
      !receiverPhone ||
      !deliveryArea ||
      !address ||
      !items
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, phone, address, and items are required!",
        },
        { status: 403 },
      );
    }
    const subTotalPrice: number = items.reduce(
      (total, item) =>
        total +
        (item.product.discount && item.product.discountPrice
          ? Number(item.product?.discountPrice)
          : Number(item.price)) *
          item.qty,
      0,
    );
    const deliveryCharge = DeliveryAreas.filter(
      (item) => item.value === deliveryArea,
    )[0].charge;

    const totalPrice: number = subTotalPrice + deliveryCharge;

    const sanitizedItems = items.map((item, index) => {
      const itemPrice =
        item.product.discount && item.product.discountPrice
          ? Number(item.product?.discountPrice)
          : Number(item.price);
      return {
        title: item.title,
        price: itemPrice,
        qty: item.qty,
        productId: item.productId,
      };
    });

    const createOrder = await prisma.order.create({
      data: {
        address,
        shippingCost: deliveryCharge,
        receiverName,
        receiverPhone,
        receiverEmail,
        customerNote,
        deliveryArea,
        subtotal: subTotalPrice,
        total: totalPrice,
        items: {
          createMany: {
            data: sanitizedItems,
          },
        },
        logs: { create: { status: "PENDING", note: "Order placed by user!" } },
        user: userId ? { connect: { id: userId } } : {},
      },
      include: { user: true, items: true, logs: true },
    });

    if (!createOrder)
      return NextResponse.json({
        success: false,
        message: "Error on order load",
      });

    return NextResponse.json({
      success: true,
      message: "Ordered Successful!",
      result: createOrder,
    });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);

    const body = await req.json();
    const {
      id,
      receiverEmail,
      receiverName,
      receiverPhone,
      customerNote,

      address,
      deliveryArea,
      paymentMethod,

      discountAmount,
      paidAmount,
      paymentStatus,
      shippingCost,

      status,
      subtotal,
      total,
      userId,
    } = body as Order;

    if (!id || !receiverPhone || !receiverName)
      return NextResponse.json(
        {
          success: false,
          message: "Somethings are required!",
        },
        { status: 400 },
      );

    const updateData: {
      name?: string;
      email?: string;
      phone?: string;
      image?: string;
      address?: string;
      password?: string;
    } = {};

    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {},
    });

    return NextResponse.json({ success: true, result: order });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Order Not Deleted.",
      });
    }
    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);

    const users = await prisma.order.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      result: users,
      message: "Order Deleted.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
