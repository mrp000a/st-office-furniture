import { getBkashToken } from "./token";

type CreatePaymentParams = {
  amount: number;
  invoice: string;
};

type BkashCreatePaymentResponse = {
  paymentID?: string;
  bkashURL?: string;
  paymentExecuteURL?: string;
  statusCode?: string;
  statusMessage?: string;
  transactionStatus?: string;
};

export async function createBkashPayment({
  amount,
  invoice,
}: CreatePaymentParams): Promise<BkashCreatePaymentResponse> {
  const token = await getBkashToken();

  const callbackURL =
    `${process.env.NEXT_PUBLIC_URL_SITE}/api/payment/bkash/callback`;

  const response = await fetch(
    `${process.env.BKASH_BASE_URL}/create`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "X-App-Key": process.env.BKASH_APP_KEY!,
      },

      body: JSON.stringify({
        mode: "0011",
        payerReference: invoice,
        callbackURL,

        amount: amount.toFixed(2),

        currency: "BDT",

        intent: "sale",

        merchantInvoiceNumber: invoice,
      }),

      cache: "no-store",
    }
  );

  const data =
    (await response.json()) as BkashCreatePaymentResponse;

  if (!response.ok || !data.paymentID) {
    console.error("bKash create payment error:", data);

    throw new Error(
      data.statusMessage ||
      "Failed to create bKash payment"
    );
  }

  return data;
}