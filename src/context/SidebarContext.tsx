"use client";

import { createContext, SetStateAction, useContext, useState } from "react";

type DashboardDrawerContextType = {
  sidebarOpen: boolean;
  sidebarOpenMob: boolean;
  productDrawerOpen: boolean;
  orderDrawerOpen: boolean;

  setSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
  setSidebarOpenMob: React.Dispatch<SetStateAction<boolean>>;
  setProductDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
  setOrderDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
};

const DashboardDrawerContext = createContext<DashboardDrawerContextType | null>(
  null,
);

export function DashboardDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOpenMob, setSidebarOpenMob] = useState(false);
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);

  return (
    <DashboardDrawerContext.Provider
      value={{
        sidebarOpen,
        sidebarOpenMob,
        productDrawerOpen,
        orderDrawerOpen,

        setSidebarOpen,
        setSidebarOpenMob,
        setProductDrawerOpen,
        setOrderDrawerOpen,
      }}
    >
      {children}
    </DashboardDrawerContext.Provider>
  );
}

export function useDashboardDrawer() {
  const context = useContext(DashboardDrawerContext);

  if (!context) {
    throw new Error(
      "useDashboardDrawer must be used inside DashboardDrawerProvider",
    );
  }

  return context;
}
