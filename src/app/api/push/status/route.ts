import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const endpoint = new URL(request.url).searchParams.get("endpoint");

  if (!userId || !endpoint) {
    return NextResponse.json({ enabled: false }, { status: 200 });
  }

  const subscription = await prisma.pushSubscription.findFirst({
    where: { userId, endpoint, isActive: true },
    select: { id: true },
  });

  return NextResponse.json({ enabled: Boolean(subscription) });
}
