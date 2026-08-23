import { S3Client } from "@aws-sdk/client-s3";

if (
  !process.env.R2_ACCOUNT_ID ||
  !process.env.R2_ACCESS_KEY ||
  !process.env.R2_SECRET_KEY ||
  !process.env.R2_BUCKET
) {
  throw new Error("Missing R2 env variables");
}

export const BUCKET = process.env.R2_BUCKET;

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_S3_CLIENT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
});
