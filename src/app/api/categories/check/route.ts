import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name")?.toLowerCase();

  if (!name)
    return NextResponse.json(
      { success: false, message: "name is required" },
      { status: 400 },
    );

  const existingUser = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existingUser) {
    if (existingUser.name === name) {
      return NextResponse.json({
        success: false,
        message: "a category already registered with this name!",
      });
    }
  }

  return NextResponse.json({
    success: true,
    message: "Now you can create an account with this email!",
  });
}
