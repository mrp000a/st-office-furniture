import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  if (!email || !phone)
    return NextResponse.json(
      { success: false, message: "Email & Phone is required" },
      { status: 400 },
    );

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { phone: phone }],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return NextResponse.json({
        success: false,
        message: "a user already registered with this Email!",
      });
    } else if (existingUser.phone === phone) {
      return NextResponse.json({
        success: false,
        message: "A user already registered with this Phone!",
      });
    }
  }

  return NextResponse.json({
    success: true,
    message: "Now you can create an account with this email!",
  });
}
