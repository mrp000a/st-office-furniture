import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Order, OrderItem, OrderStatus, Product } from "@/generated/prisma";
import { DeliveryAreas, orderStatuses2 } from "@/components/data/core";
import { getSession, getUserId, requireRole } from "@/lib/serverAuth";
import { orderConfirmationEmail } from "../../../components/uiComponent/order-confirm-email";
import { Resend } from "resend";
import { createActivity } from "@/lib/activity-log";
import { notifyAdmins, notifyOrder } from "@/lib/notification-service";
import { getProductPricing } from "@/lib/pricing";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const receiverName = searchParams.get("name");

  const limit = searchParams.get("limit") ?? 100;

  const statusGet = searchParams.get("status") as OrderStatus | null;

  const status: OrderStatus =
    statusGet && orderStatuses2.includes(statusGet) ? statusGet : "PENDING";

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
      userEmail,
      customerNote,
      paymentMethod,
    } = body as Order & {
      items: Array<OrderItem & { product: Product }>;
      userEmail: string;
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

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subTotalPrice: number = items.reduce(
      (total, item) =>
        total +
        getProductPricing({
          price: item.price,
          discount: item.product.discount,
          discountPrice: item.product.discountPrice,
        }).salePrice *
          item.qty,
      0,
    );
    const deliveryCharge = DeliveryAreas.filter(
      (item) => item.value === deliveryArea,
    )[0].charge;

    const totalPrice: number = subTotalPrice + deliveryCharge;

    const sanitizedItems = items.map((item, index) => {
      const itemPrice = getProductPricing({
        price: item.price,
        discount: item.product.discount,
        discountPrice: item.product.discountPrice,
      }).salePrice;
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
        paymentMethod,
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

    await createActivity({
      type: "ORDER",
      action: "PLACE_ORDER",

      title: "New order placed",

      description: `${createOrder?.user?.name ?? "A customer"} placed order #${createOrder?.id}`,

      userId: createOrder?.user?.id,

      entityId: createOrder?.id.toString(),
      entityType: "Order",

      metadata: {
        orderCode: createOrder?.id,
        total: createOrder?.total,
        itemCount: createOrder?.items?.length,
      },
    });

    await notifyOrder(createOrder.id, {
      type: "ORDER_PLACED",
      title: "Order placed successfully",
      body: `Your order #${createOrder.id} has been placed and is being processed.`,
      url: `/order/${createOrder.publicId}`,
    });

    await notifyAdmins({
      type: "NEW_ORDER",
      title: "New order received",
      body: `${createOrder.user?.name ?? receiverName} placed order #${createOrder.id} for ৳${totalPrice.toLocaleString("en-BD")}.`,
      url: `/dashboard/orders/${createOrder.id}`,
    });

    if (!createOrder)
      return NextResponse.json({
        success: false,
        message: "Error on order load",
      });

    if ((receiverEmail || userEmail) && createOrder) {
      const { error } = await resend.emails.send({
        from: "ST Office Furniture <info@stofficefurniture.com>",
        to: [receiverEmail ?? userEmail],
        subject: "Your Order Placed Successfully",
        html: orderConfirmationEmail({
          customerName: receiverName ?? "Customer",
          orderId: createOrder.id,
          subtotal: subTotalPrice,
          total: totalPrice,
          deliveryCharge: deliveryCharge,
          orderUrl: `${process.env.NEXT_PUBLIC_URL_SITE}/order/${createOrder.publicId}`,
          status: "PENDING",
          items: sanitizedItems.map((item) => {
            return { title: item.title, price: item.price, quantity: item.qty };
          }),
        }),
      });

      if (error) console.log({ orderMail: error });
    }
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
      items,
    } = body as Order & {
      items?: Array<{ productId: number; qty: number }>;
    };

    if (!id || !receiverPhone || !receiverName)
      return NextResponse.json(
        {
          success: false,
          message: "Somethings are required!",
        },
        { status: 400 },
      );

    const orderId = Number(id);
    const normalizedItems = Array.isArray(items)
      ? items
          .map((item) => ({
            productId: Number(item.productId),
            qty: Number(item.qty),
          }))
          .filter(
            (item) =>
              Number.isInteger(item.productId) &&
              item.productId > 0 &&
              Number.isInteger(item.qty) &&
              item.qty > 0,
          )
      : null;

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      select: { shippingCost: true, discountAmount: true },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 },
      );
    }

    const products = normalizedItems
      ? await prisma.product.findMany({
          where: { id: { in: normalizedItems.map((item) => item.productId) } },
          select: {
            id: true,
            title: true,
            price: true,
            discount: true,
            discountPrice: true,
          },
        })
      : [];
    const productMap = new Map(
      products.map((product) => [product.id, product]),
    );

    if (
      normalizedItems &&
      (normalizedItems.length === 0 ||
        normalizedItems.some((item) => !productMap.has(item.productId)))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Every order item must reference a valid product.",
        },
        { status: 400 },
      );
    }

    const calculatedItems =
      normalizedItems?.map((item) => {
        const product = productMap.get(item.productId)!;
        const price = getProductPricing(product).salePrice;
        return { ...item, price };
      }) ?? [];
    const calculatedSubtotal = calculatedItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const nextShippingCost =
      shippingCost === undefined || shippingCost === null
        ? Number(existingOrder.shippingCost)
        : Number(shippingCost);
    const nextDiscountAmount =
      discountAmount === undefined || discountAmount === null
        ? Number(existingOrder.discountAmount)
        : Number(discountAmount);
    const nextTotal = normalizedItems
      ? calculatedSubtotal + nextShippingCost - nextDiscountAmount
      : total === undefined || total === null
        ? calculatedSubtotal + nextShippingCost - nextDiscountAmount
        : Number(total);

    if (
      !Number.isFinite(nextShippingCost) ||
      nextShippingCost < 0 ||
      !Number.isFinite(nextDiscountAmount) ||
      nextDiscountAmount < 0 ||
      !Number.isFinite(nextTotal) ||
      nextTotal < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Charges and total must be valid non-negative numbers.",
        },
        { status: 400 },
      );
    }

    const order = await prisma.$transaction(async (tx) => {
      if (normalizedItems) {
        await tx.orderItem.deleteMany({ where: { orderId } });
      }

      return tx.order.update({
        where: { id: orderId },
        data: {
          receiverEmail,
          receiverName,
          receiverPhone,
          customerNote,
          address,
          deliveryArea,
          paymentMethod,
          discountAmount: nextDiscountAmount,
          paidAmount,
          paymentStatus,
          shippingCost: nextShippingCost,
          status,
          subtotal: normalizedItems ? calculatedSubtotal : subtotal,
          total: nextTotal,
          userId,
          ...(normalizedItems
            ? {
                items: {
                  create: calculatedItems.map((item) => ({
                    productId: item.productId,
                    title:
                      products.find((product) => product.id === item.productId)
                        ?.title ?? "Product",
                    price: item.price,
                    qty: item.qty,
                  })),
                },
              }
            : {}),
        },
        include: { items: true, logs: true },
      });
    });

    if (status) {
      await notifyOrder(order.id, {
        type: "ORDER_STATUS",
        title: `Order ${status.toLowerCase()}`,
        body: `Your order #${order.id} is now ${status.toLowerCase()}.`,
        url: `/order/${order.publicId}`,
      });
    }

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
    const userId = await getUserId(sessionPromise);

    const order = await prisma.order.delete({
      where: { id: Number(id) },
    });

    await createActivity({
      type: "ORDER",
      action: "DELETE",

      title: "An Order Deleted",

      description: `Admin id${userId} deleted a order #${order.id}`,

      userId: userId,

      entityId: order.id.toString(),
      entityType: "Order",
    });

    return NextResponse.json({
      success: true,
      message: "Order Deleted.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
