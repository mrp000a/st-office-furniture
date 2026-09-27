import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name")?.toLowerCase();
  const id = searchParams.get("id");

  if (!name)
    return NextResponse.json(
      { success: false, message: "name is required" },
      { status: 400 },
    );
  const categoryId = id ? Number(id) : undefined;

  let existingCategory = null;
  if (!categoryId) {
    existingCategory = await prisma.category.findFirst({
      where: {
        name: name.trim(),
      },
    });
  } else if (categoryId) {
    existingCategory = await prisma.category.findFirst({
      where: {
        OR: [
          {
            name: name.trim(),
            id: categoryId,
          },
        ],
      },
    });
  }

  if (existingCategory) {
    return NextResponse.json({
      success: true,
      message: "a category already registered with this name!",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Now you can create an account with this email!",
  });
}
