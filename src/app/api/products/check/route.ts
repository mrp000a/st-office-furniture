import { prisma } from "@/lib/prisma";
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
  });

  if (existingProduct) {
    if (existingProduct.productCode === productCode) {
      return NextResponse.json({
        success: false,
        message: "A product already exists with this code!",
        result: existingProduct,
      });
    }
  }

  return NextResponse.json({
    success: true,
    message: "product code is available!",
  });
}
