import { Metadata } from "next";
import { coreInfo } from "@/components/data/core";
import { getSingleOrder } from "@/lib/api";
import PageOrderInfo from "./pageOrderInfo";

type Props = {
  params: Promise<{
    id: number;
  }>;
};

export default async function ProductsPage({ params }: Props) {
  const { id } = await params;
  const orderId = Number(id);

  if (!orderId) {
    return <>{orderId}</>;
  }

  const order = await getSingleOrder({ orderId });
  //   console.log(order);
  if (order.success)
    return (
      <div>
        <PageOrderInfo order={order.result} />;
      </div>
    );

  return <>{orderId}</>;
}

export const metadata: Metadata = {
  title: `Order Info | ${coreInfo.name}`,
  description: coreInfo.description,
};
