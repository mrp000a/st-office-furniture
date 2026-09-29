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
    <div className="relative z-1 bg-white p-6 sm:p-0 dark:bg-gray-900">
      <ThemeProvider>
        <div className="relative z-10 flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
          {children}
          {/* <!-- ===== Common Grid Shape Start ===== --> */}
          <GridShape />
          <div className="bg-brand-950 hidden h-full w-full items-center lg:grid lg:w-1/2">
            <div className="flex h-full items-center justify-center">
              <div className=" ">
                <Link
                  href={"/#"}
                  className="relative z-30 block h-20 w-60 overflow-hidden rounded-sm max-[500px]:hidden"
                >
                  <Image
                    unoptimized
                    src={coreInfo.image}
                    alt={coreInfo.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-contain object-center dark:hidden"
                  />
                  <Image
                    unoptimized
                    src={coreInfo.imageDark}
                    alt={coreInfo.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="hidden object-contain object-center dark:block"
                  />
                </Link>

                <p className="text-center text-gray-400 dark:text-white/60">
                  Log in to your account! Get access to many protential offer.
                </p>
              </div>
            </div>
          </div>
          <div className="fixed right-6 bottom-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
