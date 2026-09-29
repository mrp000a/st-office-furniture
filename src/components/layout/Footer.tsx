"use client";
import { FileText, Truck, Undo2, UserShield } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  ContactInfoFooter,
  coreInfo,
  firstFooterItems,
  quickLinks,
} from "../data/core";
import Link from "next/link";
import { SpeacialH3Header, SpecialLink } from "../uiComponent/uiCom";
import SocialIcons from "../uiComponent/socialIcons";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import NewsLetter from "../uiComponent/newsLetter";
import { usePathname } from "next/navigation";
import backgroundImage from "@/components/images/Home/lightfooterimage.png";
import backgroundImageDark from "@/components/images/Home/darkfooterimage.png";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="relative z-10">
      <Image
        unoptimized
        src={backgroundImage}
        alt="Background"
        placeholder="blur"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        className="z-0 object-cover object-center dark:hidden"
      />
      <Image
        unoptimized
        src={backgroundImageDark}
        alt="Background"
        placeholder="blur"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        className="z-0 hidden object-cover object-center dark:block"
      />

      <div
        className={`bg-background/40 border-gray-primary text-gray-primary relative z-20 w-full border pb-16 text-xs backdrop-blur-sm ${pathname.startsWith("/dashboard") ? "hidden" : ""}`}
      >
        {/* first footer line */}
        <div className="bg-green-primary/10 border-gray-secondary text-gray-primary box-border w-full border px-2 py-2 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-384 flex-wrap items-center justify-between gap-4 py-3">
            {firstFooterItems && firstFooterItems.length > 0 ? (
              firstFooterItems.map(({ label, href, icon: Icon }, index) => (
                <Link
                  href={href}
                  key={index}
                  className="flex-center hover:text-green-primary gap-3 font-semibold transition-all hover:scale-105 hover:gap-1 hover:pl-2"
                >
                  <Icon className="text-green-primary" />
                  <span className="line-clamp-1">{label}</span>
                </Link>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* main footer line */}
        <div className="mx-auto flex w-full max-w-384 flex-wrap items-start justify-between p-3 py-4">
          {/* logo and text & newsletter  */}
          <div className="flex flex-col justify-center gap-4">
            <div className="flex max-w-80 flex-col gap-3">
              {/* logo  */}
              <Link
                href={"/#"}
                className="relative z-10 inline-block h-20 w-65 overflow-hidden rounded-sm"
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

              {/* text  */}
              <span>Better Seating Better Working</span>
              <span>{coreInfo.description}</span>
            </div>

            <div className="text-gray-primary flex max-w-130 flex-col gap-3">
              <SpeacialH3Header>Subscribe to Newsletter</SpeacialH3Header>
              <NewsLetter />
            </div>
          </div>

          {/* Quicklinks */}
          <div className="text-gray-primary flex w-fit flex-col gap-3">
            {/* headerquicklinks  */}
            <SpeacialH3Header>Quick Links</SpeacialH3Header>
            <div className="flex flex-col gap-2">
              {quickLinks.map((item, index) => (
                <SpecialLink href={item.href} key={index}>
                  {item.label}
                </SpecialLink>
              ))}
            </div>
          </div>

          {/* Follow Us & Our Apps */}
          <div className="text-gray-primary flex flex-col gap-3">
            <div className="text-gray-primary flex flex-col gap-3">
              {/* headerquicklinks  */}
              <SpeacialH3Header>Follow us</SpeacialH3Header>
              <div className="flex flex-col gap-2">
                <div>
                  <SocialIcons />
                </div>
              </div>
            </div>

            <div className="text-gray-primary flex flex-col gap-3">
              {/* headerquicklinks  */}
              <SpeacialH3Header>Our Apps</SpeacialH3Header>
              <div className="flex flex-col justify-stretch gap-2">
                <Link
                  href={"#"}
                  className="ring-green-primary hover:bg-green-primary flex w-fit items-center gap-2 rounded-md p-1 px-2 ring transition-all hover:-translate-y-0.5 hover:text-white"
                >
                  <FaGooglePlay className="text-3xl" />
                  <div className="flex flex-col">
                    <span>Get it on</span>
                    <span className="text-base font-bold">GooglePlay</span>
                  </div>
                </Link>
                <Link
                  href={"#"}
                  className="ring-green-primary hover:bg-green-primary flex w-fit items-center gap-2 rounded-md p-1 px-2 ring transition-all hover:-translate-y-0.5 hover:text-white"
                >
                  <FaApple className="text-3xl" />
                  <div className="flex flex-col">
                    <span>Get it on</span>
                    <span className="text-base font-bold">App Store</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact us */}
          <div className="text-gray-primary flex flex-col gap-3">
            {/* headerquicklinks  */}
            <SpeacialH3Header>Contact Us</SpeacialH3Header>
            <div className="text-gray-primary flex flex-col gap-4">
              {ContactInfoFooter.map(
                ({ label, href, name, icon: Icon }, index) => (
                  <Link
                    target="_blank"
                    href={href}
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <div className="border-green-primary bg-gray-secondary/30 hover:bg-green-primary text-gray-primary w-fit rounded-md border p-2 text-lg font-semibold transition-all hover:-translate-y-0.5">
                      <Icon />
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="text-gray-primary text-base font-bold capitalize">
                        {name}
                      </span>
                      <span>{label}</span>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 text-center text-sm text-gray-500 dark:text-gray-400">
          <div>
            &copy; Copyright {new Date().getFullYear()} - {coreInfo.name}
          </div>
          <div>
            Designed and Developed By{" "}
            <Link
              target="_blank"
              href={"https://mrp-dev.vercel.app/"}
              className="text-blue-primary text-shadow-background font-bold text-shadow-2xs"
            >
              Muhammad Rakib
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
