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
        <div className="relative z-10 flex lg:flex-row w-full h-screen justify-center flex-col   sm:p-0">
          {children}
          {/* <!-- ===== Common Grid Shape Start ===== --> */}
          <GridShape />
          <div className="lg:w-1/2 w-full h-full bg-brand-950  lg:grid items-center hidden">
            <div className=" items-center justify-center h-full   flex ">
              <div className=" ">
                <Link
                  href={"/#"}
                  className="h-20 w-60  relative z-30  rounded-sm overflow-hidden block max-[500px]:hidden"
                >
                  <Image
                    src={coreInfo.image}
                    alt={coreInfo.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-contain object-center dark:hidden "
                    unoptimized
                    quality={100}
                  />
                  <Image
                    src={coreInfo.imageDark}
                    alt={coreInfo.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-contain object-center hidden dark:block "
                    unoptimized
                    quality={100}
                  />
                </Link>

                <p className="text-center text-gray-400 dark:text-white/60 ">
                  Log in to your account! Get access to many protential offer.
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
