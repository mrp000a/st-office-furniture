import { BUCKET, r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  if (!file) {
    return NextResponse.json(
      { success: false, mesage: "No file uploaded." },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop();
  const filename = `${crypto.randomUUID()}.${ext}`;

  const key = path ? `${path}/${filename}` : `upload/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload a file
  try {
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
      { success: false, mesage: "No file uploaded.", key, error },
      { status: 400 },
    );
  }
}
