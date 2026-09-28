import { getBkashToken } from "./token";

type ExecutePaymentResponse = {
  paymentID?: string;
  trxID?: string;
  transactionStatus?: string;
  amount?: string;
  currency?: string;
  merchantInvoiceNumber?: string;

  statusCode?: string;
  statusMessage?: string;
};

export async function executeBkashPayment(
  paymentID: string,
): Promise<ExecutePaymentResponse> {
  const token = await getBkashToken();

  const response = await fetch(`${process.env.BKASH_BASE_URL}/execute`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "X-App-Key": process.env.BKASH_APP_KEY!,
    },

    body: JSON.stringify({
      paymentID,
    }),

    cache: "no-store",
  });

  const data = (await response.json()) as ExecutePaymentResponse;

  if (!response.ok) {
    console.error("bKash execute error:", data);

    throw new Error(data.statusMessage || "Failed to execute bKash payment");
  }

  return data;
}
