"use client";

import { useState } from "react";

export function SslCommerzButton({ orderId }: { orderId: number }) {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    try {
      setLoading(true);

      const response = await fetch("/api/payment/sslcommerz/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          orderId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to start payment");
      }

      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Payment failed");

      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
    >
      {loading ? "Connecting to SSLCOMMERZ..." : "Pay Online"}
    </button>
  );
}
