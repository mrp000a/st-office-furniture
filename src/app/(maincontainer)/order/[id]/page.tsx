import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import PageOrderInfo from "./PageOrderClient";
import OrderNotFound from "@/components/uiComponent/orderNotFound";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductsPage({ params }: Props) {
  const { id } = await params;
  const orderId = id;

  if (!orderId) {
    return (
      <>
        <OrderNotFound />
      </>
    );
  }

  // const order = await getSingleOrder({ orderId });
  const order = await prisma.order.findUnique({
    where: { publicId: orderId },
    include: {
      items: {
        include: { product: { select: { images: true, productCode: true } } },
      },
      logs: true,
      _count: true,
      user: true,
    },
  });

  //   console.log(order);
  if (order) {
    const sanitizeOrder = {
      ...order,
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shippingCost ?? 0),
      discountAmount: Number(order.discountAmount ?? 0),
      total: Number(order.total ?? 0),
      paidAmount: Number(order.paidAmount ?? 0),
      items: order.items.map((item) => {
        return {
          ...item,
          price: Number(item.price),
          product: {
            image: item.product?.images[0],
            productCode: item.product?.productCode,
          },
        };
      }),
    };

    return (
      <div>
        <PageOrderInfo order={sanitizeOrder} />;
      </div>
    );
  }

  return (
    <>
      <OrderNotFound />
    </>
  );
}

export const metadata: Metadata = {
  title: `Order Info | ${coreInfo.name}`,
  description: coreInfo.description,
};
