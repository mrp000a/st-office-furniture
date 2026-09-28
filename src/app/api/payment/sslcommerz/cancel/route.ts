import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const tranId = String(formData.get("tran_id") || "");
  const orderId = tranId.split("-")[1];

  return NextResponse.redirect(
    new URL(
      `/checkout/payment/cancelled?tran_id=${encodeURIComponent(tranId)}&orderId=${orderId}`,
      request.url,
    ),
  );
}
