"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { ChartBarDemoTooltip } from "@/components/examples/chart-data";
import { ChartAreaInteractive } from "@/components/examples/area-chart";
import { ChartRadialStacked } from "@/components/examples/radial-chart";
import { ChartPieDonutText } from "@/components/examples/pie-chart";

const DashPage = () => {
  const session = useSession();
  const user = session.data?.user;
  const chartData1 = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];
  const chartData2 = [
    { browser: "chrome", visitors: 50, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 12, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 89, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 123, fill: "var(--color-edge)" },
    { browser: "other", visitors: 5, fill: "var(--color-other)" },
  ];
  const chartData3 = [
    { browser: "chrome", visitors: 23, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 606, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 293, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 23, fill: "var(--color-edge)" },
    { browser: "other", visitors: 544, fill: "var(--color-other)" },
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold font-mono capitalize">
        Welcome!{" "}
        {user?.role
          .toLocaleLowerCase()
          .split("_")
          .map((item) => item + " ")}{" "}
        <span className="font-bold text-shadow-lg font-extrabold">{user?.name}</span>
      </h2>
      <hr />
      <div className="w-full gap-3 items-end grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="relative ">
          <ChartPieDonutText chartData={chartData1} />
        </div>
        <div className="relative ">
          <ChartPieDonutText chartData={chartData2} />
        </div>
        <div className="relative ">
          <ChartPieDonutText chartData={chartData3} />
        </div>
        <div className="relative ">
          <ChartBarDemoTooltip />
        </div>
        <div className="relative ">
          <ChartAreaInteractive />
        </div>
        <div className="relative ">
          <ChartRadialStacked />
        </div>
      </div>
    </div>
  );
};

export default DashPage;
