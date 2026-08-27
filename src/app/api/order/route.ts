import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Order, OrderItem, Product } from "@/generated/prisma";
import { DeliveryAreas } from "@/components/data/core";
// import { getSession, requireRole } from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "User id is required.",
    });
  }
  try {
    // const sessionPromise = getSession();
    // await requireRole(sessionPromise, "ADMIN");

    const cart = await prisma.cart.findUnique({
      where: {
        userId: Number(userId),
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                images: true,
                productCode: true,
                price: true,
                discount: true,
                discountPrice: true,
              },
            },
          },
        },
        _count: true,
      },
    });

    if (!cart) {
      return NextResponse.json({
        success: false,
        message: "Cart Not found.",
      });
    }

    return NextResponse.json({
      success: true,
      result: cart,
      message: "Cart is loaded.",
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
      !items ||
      !userId
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
    // testing
    /*
    console.log({
      receiverName,
      receiverPhone,
      deliveryArea,
      address,
      // items,
      userId,
      customerNote,
      subTotalPrice,
      totalPrice,
    });
    return NextResponse.json({
      success: false,
      message: "Error on order load",
    });
    */
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
        user: { connect: { id: userId } },
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

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const itemId = Number(searchParams.get("itemId"));

    if (!itemId)
      return NextResponse.json(
        {
          success: false,
          message: "Product Code and item id are required!",
        },
        { status: 400 },
      );

    const deleteItem = await prisma.cartItem.delete({
      where: {
        id: itemId,
      },
      include: {},
    });

    return NextResponse.json({ success: true, result: deleteItem });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}
