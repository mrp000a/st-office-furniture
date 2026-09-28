import { sslcommerzConfig } from "./config";

type InitiatePaymentParams = {
  tranId: string;
  amount: number;

  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city?: string;
    postcode?: string;
  };

  order: {
    id: number;
    itemCount: number;
  };
};

export async function initiateSslCommerzPayment({
  tranId,
  amount,
  customer,
  order,
}: InitiatePaymentParams) {
  const data = new URLSearchParams();

  data.append("store_id", sslcommerzConfig.storeId);

  data.append("store_passwd", sslcommerzConfig.storePassword);

  data.append("total_amount", amount.toFixed(2));

  data.append("currency", "BDT");

  data.append("tran_id", tranId);

  data.append(
    "success_url",
    `${sslcommerzConfig.websiteUrl}/api/payment/sslcommerz/success`,
  );

  data.append(
    "fail_url",
    `${sslcommerzConfig.websiteUrl}/api/payment/sslcommerz/fail`,
  );

  data.append(
    "cancel_url",
    `${sslcommerzConfig.websiteUrl}/api/payment/sslcommerz/cancel`,
  );

  data.append(
    "ipn_url",
    `${sslcommerzConfig.websiteUrl}/api/payment/sslcommerz/ipn`,
  );

  // Customer
  data.append("cus_name", customer.name);

  data.append("cus_email", customer.email);

  data.append("cus_phone", customer.phone);

  data.append("cus_add1", customer.address);

  data.append("cus_city", customer.city || "N/A");

  data.append("cus_postcode", customer.postcode || "N/A");

  data.append("cus_country", "Bangladesh");

  // Shipping
  data.append("shipping_method", "YES");

  data.append("num_of_item", String(order.itemCount));

  data.append("ship_name", customer.name);

  data.append("ship_add1", customer.address);

  data.append("ship_city", customer.city || "N/A");

  data.append("ship_postcode", customer.postcode || "N/A");

  data.append("ship_country", "Bangladesh");

  // Product information
  data.append("product_name", "ST Office Furniture Products");

  data.append("product_category", "Furniture");

  data.append("product_profile", "physical-goods");

  // EMI
  data.append("emi_option", "0");

  const response = await fetch(
    `${sslcommerzConfig.baseUrl}/gwprocess/v4/api.php`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: data.toString(),

      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok || !result?.GatewayPageURL) {
    console.error("SSLCOMMERZ initiation failed:", result);

    throw new Error(
      result?.failedreason || "Unable to initiate SSLCOMMERZ payment",
    );
  }

  return result;
}
