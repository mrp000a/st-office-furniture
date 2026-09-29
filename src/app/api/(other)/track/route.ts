import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust import to your Prisma client instance

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path, referrer } = body;

    // Grab client info from request headers
    const userAgent = req.headers.get("user-agent") || undefined;

    // Extract client IP address from proxy headers if behind Vercel/Cloudflare
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      undefined;

    if (!path) {
      return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }

    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        userAgent,
        ipAddress,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Custom Tracking Error:", error);
    return NextResponse.json(
      { error: "Failed to record pageview" },
      { status: 500 },
    );
  }
}
