import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category, Message } from "@/generated/prisma";
import { getSession, requireRole } from "@/lib/serverAuth";
import { sendEmail } from "@/lib/api";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      success: true,
      result: messages,
      message: "All messages loaded.",
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
    // await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);

    const body = await req.json();
    const { name, email, subject, message } = body as Message;

    if (!name || !email || !subject || !message)
      return NextResponse.json(
        {
          success: false,
          message: "name, email, subject is required!",
        },
        { status: 400 },
      );

    const createMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    if (createMessage) {
      await sendEmail({ to: email, subject, message });
    }

    return NextResponse.json({ success: true, result: createMessage });
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
    const { id, isRead } = body as Message;

    if (!id)
      return NextResponse.json(
        {
          success: false,
          message: "name and id is required!",
        },
        { status: 400 },
      );

    const category = await prisma.message.update({
      where: { id: Number(id) },
      data: { isRead: isRead },
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
  //   const name = searchParams.get("name")?.toLowerCase();

  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);

    const categories = await prisma.message.delete({
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
