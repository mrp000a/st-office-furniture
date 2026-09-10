// app/api/r2/delete/route.ts

import { BUCKET, r2 } from "@/lib/r2";
import { getSession, requireRole } from "@/lib/serverAuth";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const sessionPromise = getSession();
    await requireRole(sessionPromise, ["ADMIN", "SUPER_ADMIN"]);
    const body = await req.json();

    const key = body.key;

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "R2 object key is required.",
        },
        { status: 400 },
      );
    }

    await r2.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      }),
    );

    return NextResponse.json({
      success: true,
      message: "File deleted successfully.",
    });
  } catch (error) {
    console.error("R2 delete error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete file.",
      },
      { status: 500 },
    );
  }
}
