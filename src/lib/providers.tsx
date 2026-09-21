"use client";
import { AlertDialogProvider } from "@/components/providers/alert-dialog-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReduxProvider from "@/redux/provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./themeProviders";
import React from "react";
import { ScrollToTop } from "@/components/sec_lib/scroll-to-top";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReduxProvider>
        {/* <ScrollToTop /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SessionProvider>
              <AlertDialogProvider>{children}</AlertDialogProvider>
            </SessionProvider>
          </TooltipProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
};

export default Providers;
