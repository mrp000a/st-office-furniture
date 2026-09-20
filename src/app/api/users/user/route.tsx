import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Gender, User, UserRole } from "@/generated/prisma";
import { getRole, getSession, getUserId, requireRole } from "@/lib/serverAuth";
import { createActivity } from "@/lib/activity-log";

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

// create user by super admin
export async function POST(req: Request) {
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, "SUPER_ADMIN");
    const adminId = await getUserId(sessionPromise);

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

    if (!user)
      return NextResponse.json(
        { success: false, message: "Something went wrong!" },
        { status: 500 },
      );

    await createActivity({
      type: "USER",
      action: "REGISTER",

      title: "A New User Registered",

      description: `Admin id ${adminId} created an user account`,

      userId: adminId,

      entityId: user.id.toString(),
      entityType: "user",
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


// anyone can update himself
export async function PUT(req: Request) {
  try {
    const sessionPromise = getSession();
    // await requireRole(sessionPromise, "USER");
    const role = await getRole(sessionPromise);
    const userId = await getUserId(sessionPromise);

    const body = await req.json();
    const { id, name, phone, gender, image, address, password } = body as User;

    if (!userId || !name || !phone || !role)
      return NextResponse.json(
        {
          success: false,
          message: "name,email,password, and phone are required!",
        },
        { status: 400 },
      );

    const updateData: {
      name: string;
      phone: string;
      role: UserRole;
      gender: Gender | null;
      image?: string;
      address: string;
      password?: string;
    } = {
      name,
      phone,
      role: role,
      gender: gender,
      image: image ?? "",
      address: address ?? "",
    };
    if (password && password.length > 7) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: updateData,
    });

    await createActivity({
      type: "USER",
      action: "REGISTER",

      title: "A New User Registered",

      description: `${user.name} updated his profile`,

      userId: userId,

      entityId: user.id.toString(),
      entityType: "user",
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
