import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Product, ProductDescription } from "@/generated/prisma";
import { getSession, requireRole } from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const searchString = searchParams.get("search");
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit"));
  const order = searchParams.get("order");
  const inStock = searchParams.get("stock");

  try {
    const products = await prisma.product.findMany({
      take: limit,
      where: {
        AND: [
          // Match search string if provided
          searchString
            ? { title: { contains: searchString, mode: "insensitive" } }
            : {},
          // Match category name or ID if provided
          category
            ? {
                category: { name: { contains: category, mode: "insensitive" } },
              }
            : {},
          // Match stock  if provided
          inStock === "true"
            ? {
                stock: { gt: 0 },
              }
            : {},
        ],
      },
      include: {
        _count: true,
        category: true,
      },
      orderBy: {
        createdAt: order == "asc" ? "asc" : "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message: "All Products loaded.",
      result: products,
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
    const sessionPromise = getSession();
    await requireRole(sessionPromise, "ADMIN");

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

export async function PUT(req: Request) {
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, "ADMIN");

    const body = await req.json();
    const {
      id,
      productCode,

      title,
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

    if (!title || !productCode || !price || !stock || !id)
      return NextResponse.json(
        {
          success: false,
          message: "Title, product code, id, price and stock are required!",
        },
        { status: 400 },
      );
    const cleanedDiscountPrice = discountPrice ? Number(discountPrice) : null;
    const cleanedDiscount = discount ? Number(discount) : null;

    // const category = await prisma.product.create({
    //   data: {
    //     title,
    //     productCode: productCode.toLowerCase(),
    //     images,

    //     keyFeatures,

    //     brand,

    //     price: Number(price),
    //     discountPrice: cleanedDiscountPrice,
    //     discount: cleanedDiscount,

    //     stock: Number(stock),
    //     descriptions: { createMany: { data: descriptions } },
    //     category: categoryId ? { connect: { id: categoryId } } : undefined,
    //   },
    //   include: { descriptions: true, category: true },
    // });

    const category = await prisma.product.update({
      where: {
        id: Number(id),
        // productCode,
      },

      data: {
        title,
        images,

        keyFeatures,

        brand,

        price: Number(price),
        discountPrice: cleanedDiscountPrice,
        discount: cleanedDiscount,

        stock: Number(stock),
        descriptions: { deleteMany: {}, createMany: { data: descriptions } },
        category: categoryId
          ? { connect: { id: Number(categoryId) } }
          : undefined,
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

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const productCode = searchParams.get("productCode");

  // return;
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, "ADMIN");
    const products = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "All Products loaded.",
      result: products,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
