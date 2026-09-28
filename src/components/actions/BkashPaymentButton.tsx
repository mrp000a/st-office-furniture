"use client";

import { useState } from "react";
import { useAlertDialog } from "../hooks/use-alert-dialog";

export default function BkashButton({ orderId }: { orderId: number }) {
  const [loading, setLoading] = useState(false);
  const { alert } = useAlertDialog();

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/payment/bkash/create", {
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
        throw new Error(data.message || "Unable to start bKash payment");
      }

      if (!data.bkashURL) {
        throw new Error("bKash payment URL was not returned");
      }

      // Redirect customer to bKash
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error);

      await alert({
        title: error instanceof Error ? error.message : "Payment failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="w-full rounded-lg bg-pink-600 px-4 py-3 text-white disabled:opacity-50"
    >
      {loading ? "Connecting to bKash..." : "Pay with bKash"}
    </button>
  );
}
