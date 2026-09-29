import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PaymentSuccess from "./SuccessPage";

type Props = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;

  const orderId = Number(params.orderId);

  if (!orderId) {
    redirect("/");
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },

    select: {
      id: true,
      receiverName: true,
      total: true,
      paymentStatus: true,
      status: true,
      paymentMethod: true,
      publicId: true,
      paidAt: true,
    },
  });

  if (!order) {
    redirect("/");
  }

  // Never trust the URL alone.
  if (order.paymentStatus !== "PAID") {
    redirect(`/checkout/payment/processing?orderId=${order.id}`);
  }

  return (
    <PaymentSuccess
      order={{
        ...order,
        total: order.total.toString(),
      }}
    />
  );
}
