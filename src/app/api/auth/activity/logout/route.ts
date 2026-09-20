// app/api/auth/activity/logout/route.ts

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { createActivity } from "@/lib/activity-log";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    await createActivity({
      type: "AUTH",
      action: "LOGOUT",

      title: "User logged out",

      description: `${session.user.name ?? "User"} logged out`,

      userId: Number(session.user.id),

      entityId: session.user.id,
      entityType: "User",
    });
  }

  return NextResponse.json({
    success: true,
  });
}
