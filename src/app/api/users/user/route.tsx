import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Gender, User, UserRole } from "@/generated/prisma";
import { getSession, requireRole } from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    // const email = searchParams.get("email");
    const id = searchParams.get("id");

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { _count: true },
    });

    return NextResponse.json({
      success: true,
      result: user,
      message: "The user loaded.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, "USER");

    const body = await req.json();
    const { id, name, email, phone, gender, image, address, password } =
      body as User;

    if (!id || !name || !phone)
      return NextResponse.json(
        {
          success: false,
          message: "name,email,password, and phone are required!",
        },
        { status: 400 },
      );

    const updateData: {
      name: string;
      email: string;
      phone: string;
      role: UserRole;
      gender: Gender;
      image?: string;
      address: string;
      password?: string;
    } = {
      name,
      email,
      phone,
      role: "USER",
      gender: gender ?? "MALE",
      image: image ?? "",
      address: address ?? "",
    };
    if (password && password.length > 5) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    const { password: _p, ...rest } = user as User;

    return NextResponse.json({ success: true, result: rest });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}
