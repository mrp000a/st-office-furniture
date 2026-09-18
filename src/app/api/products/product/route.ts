import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const productCode = searchParams.get("productCode")?.toLowerCase();

  if (!productCode)
    return NextResponse.json(
      { success: false, message: "Product Code is required" },
      { status: 400 },
    );

  const existingProduct = await prisma.product.findUnique({
    where: {
      productCode,
    },
    include: {
      category: true,
      descriptions: true,
      reviews: true,
      _count: true,
    },
  });

  if (existingProduct && existingProduct.productCode) {
    if (existingProduct.productCode === productCode) {
      return NextResponse.json({
        success: true,
        message: "Product found successful!",
        result: existingProduct,
      });
    }
  }

  return NextResponse.json({
    success: false,
    message: "The product is not available!",
  });
}
