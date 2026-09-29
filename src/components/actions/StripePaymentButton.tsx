"use client";

import { useState } from "react";
import { useAlertDialog } from "../hooks/use-alert-dialog";

export default function StripeButton({ orderId }: { orderId: number }) {
  const [loading, setLoading] = useState(false);
  const { alert } = useAlertDialog();

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/payment/stripe/create", {
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

      if (!data.checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.log(error);

      alert({
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
      className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
    >
      {loading ? "Connecting to Stripe..." : "Pay with Card"}
    </button>
  );
}
