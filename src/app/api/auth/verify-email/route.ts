import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { token }: { token: string } = await req.json();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification token is required.",
        },
        { status: 400 },
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification link.",
        },
        { status: 400 },
      );
    }

    // Check expiration
    if (verificationToken.expiresAt < new Date()) {
      await prisma.verificationToken.delete({
        where: {
          id: verificationToken.id,
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Verification link has expired.",
        },
        { status: 400 },
      );
    }

    // Verify user
    await prisma.user.update({
      where: {
        id: verificationToken.userId,
      },
      data: {
        emailVerified: true,
        varifiedAt: new Date(),
      },
    });

    // Delete token after successful verification
    await prisma.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("EMAIL VERIFICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
