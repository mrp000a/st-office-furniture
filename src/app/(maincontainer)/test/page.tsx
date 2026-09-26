"use client";

import { ChartBarDemoTooltipSales } from "@/app/(admin)/dashboard/_dash_components/chart/sales";
import { ChartBarDemoTooltip } from "@/components/examples/chart-data";
import EnableNotificationButton from "@/components/sec_lib/enableNotificationButton";

import React from "react";

const Page = () => {
  return (
    <div>
      <EnableNotificationButton />
      <div className="w-full max-w-lg">
        <ChartBarDemoTooltipSales chartData={[{month: "jan", order_count: 12, total_sales: 234}]} />
      </div>
    </div>
  );
};

export default Page;
