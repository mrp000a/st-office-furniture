import type { Metadata } from "next";
import HeadNavCombo from "./_dash_components/layout/headNavCombo";
import { coreInfo } from "@/components/data/core";
import { DashboardDrawerProvider } from "@/context/SidebarContext";

export const metadata: Metadata = {
  title: `Dashboard | ${coreInfo.name}`,
  description: "Dashboard of .",
};

import { Suspense } from "react";
import DashboardLoading from "@/app/(admin)/dashboard/loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardDrawerProvider>
      <Suspense fallback={<DashboardLoading />}>
        <HeadNavCombo>{children}</HeadNavCombo>
      </Suspense>
    </DashboardDrawerProvider>
  );
}
