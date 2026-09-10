import type { Metadata } from "next";
import HeadNavCombo from "./_dash_components/layout/headNavCombo";
import { coreInfo } from "@/components/data/core";
import { DashboardDrawerProvider } from "@/context/SidebarContext";

export const metadata: Metadata = {
  title: `Dashboard | ${coreInfo.name}`,
  description: "Dashboard of .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardDrawerProvider>
      <HeadNavCombo>{children}</HeadNavCombo>
    </DashboardDrawerProvider>
  );
}
