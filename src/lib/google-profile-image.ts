import { PutObjectCommand } from "@aws-sdk/client-s3";

import { BUCKET, r2 } from "@/lib/r2";
import { USER_IMAGE_MAX_SIZE } from "@/lib/image-upload-limits";

export async function uploadGoogleProfileImage(
  imageUrl: string,
): Promise<string | undefined> {
  try {
    const sourceUrl = new URL(imageUrl);
    if (sourceUrl.protocol !== "https:") {
      throw new Error("Google profile image URL must use HTTPS.");
    }

    const response = await fetch(sourceUrl, {
      headers: { Accept: "image/*" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Google profile image request failed (${response.status}).`);
    }

    const contentType = response.headers.get("content-type")?.split(";")[0] ?? "";
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(contentType)
    ) {
      throw new Error("Google profile image has an unsupported format.");
    }

    const contentLength = Number(response.headers.get("content-length") ?? 0);
    if (contentLength > USER_IMAGE_MAX_SIZE) {
      throw new Error("Google profile image is larger than 1 MB.");
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength === 0 || buffer.byteLength > USER_IMAGE_MAX_SIZE) {
      throw new Error("Google profile image is empty or larger than 1 MB.");
    }

    const extension = contentType.split("/")[1] === "jpeg" ? "jpg" : contentType.split("/")[1];
    const key = `r2upload/users/images/google-${crypto.randomUUID()}.${extension}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }),
    );

    const publicUrl = process.env.NEXT_PUBLIC_URL_R2?.replace(/\/+$/, "");
    if (!publicUrl) {
      throw new Error("NEXT_PUBLIC_URL_R2 is not configured.");
    }

    return `${publicUrl}/${key}`;
  } catch (error) {
    console.error("Google profile image upload failed:", error);
    return undefined;
  }
}
