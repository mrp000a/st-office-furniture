import PaymentProcessing from "./paymentProcessing";

type Props = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return <PaymentProcessing orderId={params.orderId || ""} />;
}
