import { BUCKET, r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const path = formData.get("path") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, mesage: "No file uploaded." },
        { status: 400 },
      );
    }

    const uploadPath =
      typeof path === "string" && path.length > 0 ? path : "upload";

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const filename = `${crypto.randomUUID()}.${ext}`;

    const key = `${uploadPath}/${filename}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload a file
    await r2.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    return NextResponse.json({ success: true, message: "Upload Success", key });
  } catch (error) {
    return NextResponse.json(
      { success: false, mesage: "No file uploaded.", error },
      { status: 400 },
    );
  }
}
