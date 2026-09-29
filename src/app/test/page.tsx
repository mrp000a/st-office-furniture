"use client";

import EnableNotificationButton from "@/components/sec_lib/enableNotificationButton";

const Page = () => {
  const handleClick = async () => {
    await fetch("/api/push/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test Notification",
        message: "This is a test push notification.",
        userId: "123",
      }),
    });
  };
  return (
    <div>
      <EnableNotificationButton />
      <div className="w-full max-w-lg">
        {/* <ChartBarDemoTooltipSales chartData={[{month: "jan", order_count: 12, total_sales: 234}]} /> */}
        <button onClick={handleClick}>Get Notification</button>
      </div>

      <div className="flex-center min-h-100 w-full flex-wrap">
        {/* <BkashButton orderId={20033} />
        <StripeButton orderId={20033} />
        <SslCommerzButton orderId={20033} /> */}

        {/* <PaymentSuccessPage searchParams={order: }/> */}
      </div>
      {/* <AboutPage /> */}
      {/* <MessageForm /> */}
    </div>
  );
};

export default Page;
