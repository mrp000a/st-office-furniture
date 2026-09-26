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
        className="object-cover object-center z-0 dark:hidden"
      />
      <Image
        unoptimized
        src={backgroundImageDark}
        alt="Background"
        placeholder="blur"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        className="object-cover object-center z-0 hidden dark:block"
      />
      <div
        className={` w-full relative  z-20 border border-gray-primary pb-16  text-xs text-gray-primary ${pathname.startsWith("/dashboard") ? "hidden" : ""}`}
      >
        {/* first footer line */}
        <div className="w-full bg-green-primary/10 backdrop-blur-sm border box-border border-gray-secondary px-2 py-2 text-gray-primary">
          <div className="flex flex-wrap w-full max-w-384 mx-auto justify-between items-center gap-4 py-3">
            {firstFooterItems && firstFooterItems.length > 0 ? (
              firstFooterItems.map(({ label, href, icon: Icon }, index) => (
                <Link
                  href={href}
                  key={index}
                  className="flex-center gap-3 font-semibold hover:gap-1 hover:pl-2 hover:text-green-primary hover:scale-105 transition-all"
                >
                  <Icon className="text-green-primary" />
                  <span className=" line-clamp-1">{label}</span>
                </Link>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* main footer line */}
        <div className="w-full flex justify-between items-start flex-wrap max-w-384 mx-auto p-3 py-4">
          {/* logo and text & newsletter  */}
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-3 max-w-80">
              {/* logo  */}
              <Link
                href={"/#"}
                className="w-65 h-20 relative z-10 inline-block  overflow-hidden rounded-sm "
              >
                <Image
                  unoptimized
                  src={coreInfo.image}
                  alt={coreInfo.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-contain object-center dark:hidden "
                />
                <Image
                  unoptimized
                  src={coreInfo.imageDark}
                  alt={coreInfo.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-contain object-center hidden dark:block "
                />
              </Link>

              {/* text  */}
              <span>Better Seating Better Working</span>
              <span>{coreInfo.description}</span>
            </div>

            <div className="flex flex-col gap-3 max-w-130 text-gray-primary">
              <SpeacialH3Header>Subscribe to Newsletter</SpeacialH3Header>
              <NewsLetter />
            </div>
          </div>

          {/* Quicklinks */}
          <div className="flex flex-col gap-3 w-fit text-gray-primary">
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
          <div className="flex flex-col gap-3 text-gray-primary">
            <div className="flex flex-col gap-3 text-gray-primary">
              {/* headerquicklinks  */}
              <SpeacialH3Header>Follow us</SpeacialH3Header>
              <div className="flex flex-col gap-2">
                <div>
                  <SocialIcons />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-gray-primary">
              {/* headerquicklinks  */}
              <SpeacialH3Header>Our Apps</SpeacialH3Header>
              <div className="flex flex-col justify-stretch gap-2">
                <Link
                  href={"#"}
                  className="ring ring-green-primary hover:text-white p-1 px-2 rounded-md flex w-fit items-center gap-2 hover:bg-green-primary transition-all hover:-translate-y-0.5"
                >
                  <FaGooglePlay className="text-3xl" />
                  <div className="flex flex-col">
                    <span>Get it on</span>
                    <span className="text-base font-bold">GooglePlay</span>
                  </div>
                </Link>
                <Link
                  href={"#"}
                  className="ring ring-green-primary hover:text-white p-1 px-2 rounded-md flex w-fit items-center gap-2 hover:bg-green-primary transition-all  hover:-translate-y-0.5"
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
          <div className="flex flex-col gap-3 text-gray-primary ">
            {/* headerquicklinks  */}
            <SpeacialH3Header>Contact Us</SpeacialH3Header>
            <div className="flex flex-col gap-4 text-gray-primary">
              {ContactInfoFooter.map(
                ({ label, href, name, icon: Icon }, index) => (
                  <Link
                    target="_blank"
                    href={href}
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <div className="text-lg p-2 hover:-translate-y-0.5 font-semibold rounded-md border border-green-primary bg-gray-secondary/30 hover:bg-green-primary transition-all text-gray-primary w-fit">
                      <Icon />
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="font-bold text-base text-gray-primary capitalize">
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

        <div className="  text-sm text-center text-gray-500 flex flex-wrap items-center justify-center gap-x-3   dark:text-gray-400">
          <div>
            &copy; Copyright {new Date().getFullYear()} - {coreInfo.name}
          </div>
          <div>
            Designed and Developed By{" "}
            <Link
              target="_blank"
              href={"https://mrp-dev.vercel.app/"}
              className="text-blue-primary text-shadow-2xs text-shadow-background font-bold"
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
