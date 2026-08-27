import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CartItem } from "@/generated/prisma";
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

export async function PUT(req: NextRequest) {
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

    const cart = await prisma.cart.delete({
      where: {
        userId: Number(userId),
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
    const { title, price, qty, productId, userId } = body as CartItem & {
      userId: number;
    };

    if (!title || !productId || !qty || !price || !userId)
      return NextResponse.json(
        {
          success: false,
          message: "Title, product code, price and stock are required!",
        },
        { status: 400 },
      );

    const userCart = await prisma.cart.upsert({
      where: {
        userId: userId,
      },
      update: {},
      create: {
        user: { connect: { id: userId } },
      },
    });

    const addCartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId: productId,
        },
      },

      update: {
        qty: { increment: qty },
      },
      create: {
        title,
        price: Number(price),
        qty: Number(qty),

        product: { connect: { id: productId } },

        cart: { connect: { id: userCart.id } },
      },
      include: { product: true, cart: true },
    });

    return NextResponse.json({ success: true, result: addCartItem });
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
