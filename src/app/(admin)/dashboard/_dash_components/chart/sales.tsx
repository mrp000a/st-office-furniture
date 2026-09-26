"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ChartBarDemoTooltipSales({
  chartData,
}: {
  chartData: { month: string; order_count: number; total_sales: number }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={"total_sales"} fill="var(--color-desktop)" radius={4} />
        {/* <Bar dataKey="order_count" fill="var(--color-mobile)" radius={4} /> */}
      </BarChart>
    </ChartContainer>
  );
}
