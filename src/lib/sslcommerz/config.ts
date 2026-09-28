const isProduction = process.env.NODE_ENV === "production";

if (
  !process.env.SSLCOMMERZ_STORE_ID ||
  !process.env.SSLCOMMERZ_STORE_PASSWORD
) {
  throw new Error("SSLCOMMERZ credentials are not configured");
}

export const sslcommerzConfig = {
  storeId: process.env.SSLCOMMERZ_STORE_ID!,

  storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD!,

  baseUrl: process.env.SSLCOMMERZ_BASE_URL || "https://sandbox.sslcommerz.com",

  websiteUrl: process.env.NEXT_PUBLIC_URL!,
};
