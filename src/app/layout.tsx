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
// import siteImage from '@/components/images/siteImage.png'

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

const pageUrl = `${process.env.NEXT_PUBLIC_URL_SITE}`;
const siteImage =
  "https://files.stofficefurniture.com/r2upload/site/Screenshot%20From%202026-09-24%2011-51-09.png";

export const metadata: Metadata = {
  title: `Office Furniture Bangladesh | ${coreInfo.name}`,
  description: coreInfo.description,

  keywords: [
    "St office furniture",
    "St office furniture bd",
    "St office furniture bangladesh",
    "office furniture",
    "office furniture bd",
    "office furniture bangladesh",
    "buy office chair",
    "ST office",
    "ST office bd",
    "ST furniture",
    "ST furniture bd",
  ],
  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    title: `Office Furniture Bangladesh | ${coreInfo.name}`,
    description: coreInfo.description,
    url: pageUrl,
    siteName: coreInfo.name,
    type: "website",
    images: [
      {
        url: siteImage,
        width: 1000,
        height: 1000,
        alt: `Office Furniture Bangladesh | ${coreInfo.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Office Furniture Bangladesh | ${coreInfo.name}`,
    description: coreInfo.description,
    images: [siteImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
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
      <body className="min-h-full flex flex-col font-poppins  dark:bg-background/30">
        <Providers>
          {children}
          <Toaster richColors icons={{}} />
        </Providers>
      </body>
    </html>
  );
}
