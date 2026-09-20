import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Product, ProductDescription } from "@/generated/prisma";
import { getSession, getUserId, requireRole } from "@/lib/serverAuth";
import { createActivity } from "@/lib/activity-log";

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

    const productIds = products.map((product) => product.id);

    const reviewAverages = await prisma.proReview.groupBy({
      by: ["productId"],
      where: {
        productId: {
          in: productIds,
        },
      },
      _avg: {
        rating: true,
      },
    });

    const averageMap = new Map(
      reviewAverages.map((item) => [item.productId, item._avg.rating ?? 0]),
    );

    const productsWithRating = products.map((product) => ({
      ...product,
      averageRating: averageMap.get(product.id) ?? 0,
      price: Number(product.price),
      discountPrice: product.discountPrice
        ? Number(product.discountPrice)
        : null,
      discount: product.discount ? Number(product.discount) : null,
    }));

    return NextResponse.json({
      success: true,
      message: "All Products loaded.",
      result: productsWithRating,
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
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);
    const adminId = await getUserId(sessionPromise);

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

    const productCreate = await prisma.product.create({
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

    await createActivity({
      type: "PRODUCT",
      action: "CREATE",

      title: `A New Product Added. Product Code - ${productCode}`,

      description: `Admin id ${adminId} created a product.`,

      userId: adminId,

      entityId: productCreate.id.toString(),
      entityType: "user",
    });

    return NextResponse.json({
      success: true,
      message: "Product Created Successful",
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
    const adminId = await getUserId(sessionPromise);

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

    const productUpdate = await prisma.product.update({
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

    await createActivity({
      type: "PRODUCT",
      action: "UPDATE",

      title: `A Product Updated. Product Code - ${productCode}`,

      description: `Admin id ${adminId} updated a product.`,

      userId: adminId,

      entityId: productUpdate.id.toString(),
      entityType: "product",
    });

    return NextResponse.json({
      success: true,
      message: "Product Updated Successful",
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
  // return;
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const productCode = searchParams.get("productCode");

    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);
    const adminId = await getUserId(sessionPromise);

    if (!id)
      return NextResponse.json(
        { success: false, message: "Id is required!" },
        { status: 400 },
      );

    const products = await prisma.product.delete({
      where: { id: Number(id) },
    });

    await createActivity({
      type: "PRODUCT",
      action: "DELETE",

      title: `A Product Deleted. Product Code - ${productCode}`,

      description: `Admin id ${adminId} created a product.`,

      userId: adminId,

      entityId: id.toString(),
      entityType: "user",
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
