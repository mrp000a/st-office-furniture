import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category, Product, ProductDescription } from "@/generated/prisma";
import { getSession } from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    // const sessionPromise = getSession();
    // await requireRole(sessionPromise, "ADMIN");

    const products = await prisma.product.findMany({
      include: { _count: true, category: true },
      orderBy: { createdAt: "desc" },

    });

    return NextResponse.json({
      success: true,
      result: products,
      message: "All Products loaded.",
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
      title,
      productCode,
      images,

      descriptions,
      keyFeatures,

      brand,
      categoryId,

      price,
      discountPrice,
      discount,

      stock,
    } = body as Product & { descriptions: ProductDescription[] };

    if (!title || !productCode || !price || !stock)
      return NextResponse.json(
        {
          success: false,
          message: "Title, product code, price and stock are required!",
        },
        { status: 400 },
      );
    const cleanedDiscountPrice = discountPrice ? Number(discountPrice) : null;
    const cleanedDiscount = discount ? Number(discount) : null;

    const category = await prisma.product.create({
      data: {
        title,
        productCode: productCode.toLowerCase(),
        images,

        keyFeatures,

        brand,

        price: Number(price),
        discountPrice: cleanedDiscountPrice,
        discount: cleanedDiscount,

        stock: Number(stock),
        descriptions: { createMany: { data: descriptions } },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
      include: { descriptions: true, category: true },
    });

    return NextResponse.json({ success: true, result: category });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}
