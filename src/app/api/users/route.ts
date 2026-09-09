import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Gender, User, UserRole } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    // const email = searchParams.get("email");
    const searchString = searchParams.get("name");
    const limit = Number(searchParams.get("limit")) ?? 100;
    // const phone = searchParams.get("phone");

    const users = await prisma.user.findMany({
      take: limit,
      where: searchString
        ? { name: { contains: searchString, mode: "insensitive" } }
        : {},

      include: { _count: true },
      orderBy: { createdAt: "desc" },
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
    const { role, name, email, phone, gender, image, address, password } =
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
        role: role ?? "USER",

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

export async function PUT(req: Request) {
  try {
    // const sessionPromise = getSession();
    // await requireRole(sessionPromise, "ADMIN");

    const body = await req.json();
    const { id, name, email, phone, role, gender, image, address, password } =
      body as User;

    if (!id || !name || !email || !phone)
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
      role,
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

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "User Not Deleted.",
      });
    }
    // const sessionPromise = getSession();
    // await requireRole(sessionPromise, "ADMIN");

    const users = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      result: users,
      message: "User Deleted.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
