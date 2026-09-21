import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Hind_Siliguri,
  Poppins,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/providers";
import { coreInfo } from "@/components/data/core";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siliGuri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  // subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppIns = Poppins({
  variable: "--font-poppins",
  // subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `Home | ${coreInfo.name}`,
  description: coreInfo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        siliGuri.variable,
        poppIns.variable,
        "font-sans scroll-smooth",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-poppins  dark:bg-gray-900">
        <Providers>
          {children}
          <Toaster richColors icons={{}} />
        </Providers>
      </body>
    </html>
  );
}
