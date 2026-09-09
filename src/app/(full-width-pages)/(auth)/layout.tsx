import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { coreInfo } from "@/components/data/core";

import { ThemeProvider } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-center max-w-lg">
                <Link href="/" className="flex items-center  gap-2">
                  <div className="block h-20 w-20 mb-4 rounded-full overflow-hidden relative">
                    <Image
                      fill
                      src={coreInfo.image}
                      alt="Logo"
                      className="object-contain object-center"
                    />
                  </div>
                  <h2 className="text-xl font-bold font-mono line-clamp-1">{coreInfo.name}</h2>
                </Link>

                <p className="text-center text-gray-400 dark:text-white/60 ">
                  Log in to your account! Get access to many protectial offer.
                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
