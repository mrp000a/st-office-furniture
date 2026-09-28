import { sslcommerzConfig } from "./config";

type ValidationResult = {
  status?: string;
  tran_id?: string;
  val_id?: string;
  amount?: string;
  currency?: string;
  bank_tran_id?: string;
  card_type?: string;
  store_amount?: string;
  risk_level?: string;
};

export async function validateSslCommerzPayment(
  valId: string,
): Promise<ValidationResult> {
  const params = new URLSearchParams({
    val_id: valId,

    store_id: sslcommerzConfig.storeId,

    store_passwd: sslcommerzConfig.storePassword,

    format: "json",
  });

  const response = await fetch(
    `${sslcommerzConfig.baseUrl}/validator/api/validationserverAPI.php?${params.toString()}`,
    {
      method: "GET",

      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("SSLCOMMERZ validation request failed");
  }

  return response.json();
}
