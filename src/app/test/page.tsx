"use client";

import EnableNotificationButton from "@/components/sec_lib/enableNotificationButton";

import React from "react";
import AboutPage from "../(maincontainer)/(otherpages)/about/aboutClient";
import MessageForm from "@/components/common/forms/messageForm";

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
      {/* <AboutPage /> */}
      {/* <MessageForm /> */}
    </div>
  );
};

export default Page;
