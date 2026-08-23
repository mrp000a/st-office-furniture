"use client";
import { AlertDialogProvider } from "@/components/providers/alert-dialog-provider";
import ReduxProvider from "@/redux/provider";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReduxProvider>
        <SessionProvider>
          <AlertDialogProvider>{children}</AlertDialogProvider>
        </SessionProvider>
      </ReduxProvider>
    </>
  );
};

export default Providers;
