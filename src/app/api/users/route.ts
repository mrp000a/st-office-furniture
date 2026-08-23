import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { User } from "@/generated/prisma";

export async function GET() {
  try {
    // const sessionPromise = getSession();
    // await requireRole(sessionPromise, "ADMIN");
    const users = await prisma.user.findMany({
      include: { _count: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      result: users,
      message: "All users loaded.",
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
    // const sessionPromise = getSession();
    // await requireRole(sessionPromise, "ADMIN");

    const body = await req.json();
    const { name, email, phone, gender, image, address, password } =
      body as User;

    if (!name || !email || !phone || !password)
      return NextResponse.json(
        {
          success: false,
          message: "name,email,password, and phone are required!",
        },
        { status: 400 },
      );

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,

        image,
        gender,

        password: hashed,
      },
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
