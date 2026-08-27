"use client";
import { FileText, Truck, Undo2, UserShield } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ContactInfoFooter, coreInfo, firstFooterItems } from "../data/core";
import Link from "next/link";
import { SpeacialH3Header, SpecialLink } from "../uiComponent/uiCom";
import SocialIcons from "../uiComponent/socialIcons";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import NewsLetter from "../uiComponent/newsLetter";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer
      className={` w-full border border-gray-primary pb-16 bg-foreground text-xs text-gray-secondary ${pathname.startsWith("/dashboard") ? "hidden" : ""}`}
    >
      {/* first footer line */}
      <div className="w-full bg-gray-800 py-2 text-background">
        <div className="flex flex-wrap w-full max-w-384 mx-auto justify-between items-center gap-4 py-3">
          {firstFooterItems && firstFooterItems.length > 0 ? (
            firstFooterItems.map(({ label, href, icon: Icon }, index) => (
              <Link
                href={href}
                key={index}
                className="flex-center gap-3 font-semibold hover:gap-1 hover:pl-2 hover:text-red-primary hover:scale-105 transition-all"
              >
                <Icon className="text-red-primary" />
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
          <div className="flex flex-col gap-3 max-w-110">
            {/* logo  */}
            <Link
              href={"/#"}
              className="w-20 h-20 relative z-10 inline-block rounded-full border border-gray-primary overflow-hidden"
            >
              <Image
                src={coreInfo.image}
                alt={coreInfo.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover w-full h-full"
              />
            </Link>

            {/* text  */}
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
              dolorum quas quae? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Aspernatur, unde! Blanditiis, beatae.
            </span>
          </div>

          <div className="flex flex-col gap-3 max-w-130 text-background">
            <SpeacialH3Header>Subscribe to Newsletter</SpeacialH3Header>
            <NewsLetter />
          </div>
        </div>

        {/* Quicklinks */}
        <div className="flex flex-col gap-3 w-fit text-background">
          {/* headerquicklinks  */}
          <SpeacialH3Header>Quick Links</SpeacialH3Header>
          <div className="flex flex-col gap-2">
            {firstFooterItems.map((item, index) => (
              <SpecialLink href={item.href} key={index}>
                {item.label}
              </SpecialLink>
            ))}
          </div>
        </div>

        {/* Follow Us & Our Apps */}
        <div className="flex flex-col gap-3 text-background">
          <div className="flex flex-col gap-3 text-background">
            {/* headerquicklinks  */}
            <SpeacialH3Header>Follow us</SpeacialH3Header>
            <div className="flex flex-col gap-2">
              <div>
                <SocialIcons />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-background">
            {/* headerquicklinks  */}
            <SpeacialH3Header>Our Apps</SpeacialH3Header>
            <div className="flex flex-col justify-stretch gap-2">
              <Link
                href={"#"}
                className="ring ring-red-primary p-1 px-2 rounded-md flex w-fit items-center gap-2 hover:bg-red-primary transition-all hover:-translate-y-0.5"
              >
                <FaGooglePlay className="text-3xl" />
                <div className="flex flex-col">
                  <span>Get it on</span>
                  <span className="text-base font-bold">GooglePlay</span>
                </div>
              </Link>
              <Link
                href={"#"}
                className="ring ring-red-primary p-1 px-2 rounded-md flex w-fit items-center gap-2 hover:bg-red-primary transition-all  hover:-translate-y-0.5"
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
        <div className="flex flex-col gap-3 text-background ">
          {/* headerquicklinks  */}
          <SpeacialH3Header>Contact Us</SpeacialH3Header>
          <div className="flex flex-col gap-4 text-gray-secondary">
            {ContactInfoFooter.map(
              ({ label, href, name, icon: Icon }, index) => (
                <Link
                  target="_blank"
                  href={href}
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div className="text-lg p-2 hover:-translate-y-0.5 font-semibold rounded-md border border-red-primary bg-gray-secondary/30 hover:bg-red-primary transition-all text-background w-fit">
                    <Icon />
                  </div>
                  <div className="flex flex-col justify-between">
                    <span className="font-bold text-base text-background">
                      {name.toUpperCase()}
                    </span>
                    <span>{label}</span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
