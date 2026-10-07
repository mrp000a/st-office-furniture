"use client";

import { SetStateAction, useState } from "react";
import { useAlertDialog } from "@/components/hooks/use-alert-dialog";

// payment functions
export const handleBkashPayment = async ({
  setLoading,
  orderId,
  alert,
}: {
  orderId: string | number;
  setLoading?: React.Dispatch<SetStateAction<boolean>>;
  alert?: any;
}) => {
  try {
    if (setLoading) setLoading(true);

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

    if (alert)
      await alert({
        title: error instanceof Error ? error.message : "Payment failed",
      });
  } finally {
    if (setLoading) setLoading(false);
  }
};

export async function handleSSLCPayment({
  setLoading,
  orderId,
  alert,
}: {
  orderId: string | number;
  setLoading?: React.Dispatch<SetStateAction<boolean>>;
  alert?: any;
}) {
  try {
    if (setLoading) setLoading(true);

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
    console.log(error);

    if (alert)
      alert({
        title: error instanceof Error ? error.message : "Payment failed",
      });
  } finally {
    if (setLoading) setLoading(false);
  }
}

export const handleStripePayment = async ({
  setLoading,
  orderId,
  alert,
}: {
  orderId: string | number;
  setLoading?: React.Dispatch<SetStateAction<boolean>>;
  alert?: any;
}) => {
  try {
    if (setLoading) setLoading(true);

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

    if (alert)
      alert({
        title: error instanceof Error ? error.message : "Payment failed",
      });
  } finally {
    if (setLoading) setLoading(false);
  }
};

export function BkashButton({ orderId }: { orderId: number | string }) {
  const [loading, setLoading] = useState(false);
  const { alert } = useAlertDialog();

  return (
    <button
      type="button"
      onClick={() => handleBkashPayment({ setLoading, orderId, alert })}
      disabled={loading}
      className="w-full rounded-lg bg-pink-600 px-4 py-3 text-white disabled:opacity-50"
    >
      {loading ? "Connecting to bKash..." : "Pay with bKash"}
    </button>
  );
}

export function SslCommerzButton({ orderId }: { orderId: number }) {
  const [loading, setLoading] = useState(false);
  const { alert } = useAlertDialog();

  return (
    <button
      type="button"
      onClick={() => handleSSLCPayment({ orderId, alert, setLoading })}
      disabled={loading}
      className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
    >
      {loading ? "Connecting to SSLCOMMERZ..." : "Pay with SSLCommerz"}
    </button>
  );
}

export function StripeButton({ orderId }: { orderId: number }) {
  const [loading, setLoading] = useState(false);
  const { alert } = useAlertDialog();

  return (
    <button
      type="button"
      onClick={() => handleStripePayment({ orderId, alert, setLoading })}
      disabled={loading}
      className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
    >
      {loading ? "Connecting to Stripe..." : "Pay with Stripe"}
    </button>
  );
}
