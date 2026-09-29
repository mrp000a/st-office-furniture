"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loader2, ShieldCheck, CreditCard } from "lucide-react";

type Props = {
  orderId: string;
};

export default function PaymentProcessing({ orderId }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!orderId) {
      router.replace("/");
      return;
    }

    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const response = await fetch(`/api/payment/status?orderId=${orderId}`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success && data.order?.isPaid) {
          clearInterval(interval);

          router.replace(`/checkout/payment/success?orderId=${orderId}`);

          return;
        }

        if (
          data.paymentStatus === "FAILED" ||
          data.paymentStatus === "CANCELLED"
        ) {
          clearInterval(interval);

          router.replace(`/checkout/payment-failed?orderId=${orderId}`);
        }
      } catch (error) {
        console.error("Payment status error:", error);
      }

      // Stop after roughly 60 seconds
      if (attempts >= 30) {
        clearInterval(interval);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [orderId, router]);

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="bg-primary/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
          <Loader2 className="text-primary h-10 w-10 animate-spin" />
        </div>

        <h1 className="mt-7 text-3xl font-bold">Confirming Your Payment</h1>

        <p className="text-muted-foreground mt-3 leading-7">
          {
            "We've received your payment response. We're securely confirming the transaction with our payment provider."
          }
        </p>

        <div className="bg-background mt-8 rounded-2xl border p-6 text-left shadow-sm">
          <div className="flex gap-4">
            <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <p className="font-medium">Payment verification</p>

              <p className="text-muted-foreground mt-1 text-sm leading-6">
                Please wait while we verify your transaction. This normally
                takes only a few seconds.
              </p>
            </div>
          </div>

          <div className="bg-muted/50 mt-5 flex gap-3 rounded-xl p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

            <p className="text-muted-foreground text-xs leading-5">
              {
                "Please don't refresh this page or make another payment while we're checking your transaction."
              }
            </p>
          </div>
        </div>

        <p className="text-muted-foreground mt-6 text-xs">Order #{orderId}</p>
      </div>
    </main>
  );
}
