import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const catName = searchParams.get("name")?.toLowerCase();

  if (!catName)
    return NextResponse.json(
      { success: false, message: "Category name is required" },
      { status: 400 },
    );

  const existingCategory = await prisma.category.findUnique({
    where: {
      name: catName,
    },
    include: {
      _count: true,
    },
  });

  if (existingCategory && existingCategory.name) {
    return NextResponse.json({
      success: true,
      message: "Product found successful!",
      result: existingCategory,
    });
  }

  return NextResponse.json({
    success: false,
    message: "The product is not available!",
  });
}
