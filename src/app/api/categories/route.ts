import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma";
import { getSession, requireRole } from "@/lib/serverAuth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      result: categories,
      message: "All categories loaded.",
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
    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);

    const body = await req.json();
    const { name, image, description } = body as Category;

    if (!name)
      return NextResponse.json(
        {
          success: false,
          message: "name is required!",
        },
        { status: 400 },
      );

    const category = await prisma.category.create({
      data: {
        name: name.toLowerCase(),
        image,
        description,
      },
    });

    return NextResponse.json({ success: true, result: category });
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
    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);

    const body = await req.json();
    const { id, name, image, description } = body as Category;

    if (!id || !name)
      return NextResponse.json(
        {
          success: false,
          message: "name and id is required!",
        },
        { status: 400 },
      );

    const category = await prisma.category.update({
      where: { id },
      data: { name: name.toLowerCase(), description, image },
    });

    return NextResponse.json({ success: true, result: category });
  } catch (err: any) {
    const message = err?.message ?? String(err);
    return NextResponse.json(
      { success: false, message: message },
      { status: err?.status ?? 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const name = searchParams.get("name")?.toLowerCase();
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);

    const categories = await prisma.category.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      result: categories,
      message: "Item Deleted.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message ?? "Db Error-" },
      { status: err?.status ?? 500 },
    );
  }
}
