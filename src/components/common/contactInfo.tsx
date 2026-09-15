"use client";
import React, { useState } from "react";
// import { Tags } from "@/components/general/tags";
import { MdEmail, MdPhone } from "react-icons/md";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoMdDoneAll } from "react-icons/io";
import SocialIcons from "../uiComponent/socialIcons";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import imoIcon from "@/components/images/imoicon.png";
import MessageForm from "./messageForm";

const ContactInfoClient = () => {
  return (
    <div className="rounded-md border bg-background reveal p-3 w-full space-y-2 flex-1">
      <h2 className=" text-center font-bold">Get In Touch</h2>
      <div className="reveal text-sm font-semibold text-gray-primary ">
        <p>
          What’s next? Feel free to reach out to us, have a query, or simply
          want to connect.
        </p>
        <ul className="list-disc list-inside">
          <li>To purchase any kind of furniture.</li>
          <li>You may also visit our office or factory.</li>
        </ul>
      </div>
      <div className=" content-center gap-4 reveal">
        {/* email and phone  */}
        <div className=" font-semibold font-mono flex gap-x-3 flex-wrap ">
          <div className="email flex items-center flex-wrap gap-3 reveal">
            <MdEmail />
            <Link
              href="mailto:info@stofficefurniture.com"
              className="break-all"
            >
              {"info@stofficefurniture.com"}
            </Link>
            <Button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("info@stofficefurniture.com");
                } catch (error) {
                  console.log(error);
                }
              }}
              size={"icon-lg"}
              variant={"ghost"}
            >
              <CopyIcon />
            </Button>
          </div>
          <div className="phone flex items-center flex-wrap gap-3 reveal">
            <MdPhone />
            <Link href="tel:+8801745968104" className="break-all">
              +8801745-968104
            </Link>
            <Button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("+8801745968104");
                } catch (error) {
                  console.log(error);
                }
              }}
              size={"icon-lg"}
              variant={"ghost"}
            >
              <CopyIcon />
            </Button>
          </div>
          <div className="phone flex items-center flex-wrap gap-3 reveal">
            <FaWhatsapp />
            <Link href="tel:+8801521120706" className="break-all">
              +8801521-120706
            </Link>
            <Button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("+8801521120706");
                } catch (error) {
                  console.log(error);
                }
              }}
              size={"icon-lg"}
              variant={"ghost"}
            >
              <CopyIcon />
            </Button>
          </div>
          <div className="phone flex items-center flex-wrap gap-3 reveal">
            <div className="h-5 w-5 relative rounded-md">
              <Image
                src={imoIcon}
                alt="Background"
                fill
                sizes="50vw"
                className="object-cover object-center "
                // unoptimized
              />
            </div>
            <Link href="tel:+01835632990" className="break-all">
              +8801835-632990
            </Link>
            <Button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("+01835632990");
                } catch (error) {
                  console.log(error);
                }
              }}
              size={"icon-lg"}
              variant={"ghost"}
            >
              <CopyIcon />
            </Button>
          </div>
        </div>

        {/* social links */}

        <div className=" reveal">
          <div className="text-gray-primary font-semibold">
            You may also find us on these platforms!
          </div>
          <SocialIcons />
        </div>
      </div>
      <div className="text-gray-primary text-xs">
        Location: 55 North Jatrabari, Dhaka-1204, Bangladesh [a two-minute walk
        from Sayedabad Malancha Community Center].
      </div>
      <div className="aspect-5/3 mx-auto max-w-lg ring-2 ring-gray-secondary dark:invert rounded-md overflow-hidden w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.0164248473898!2d90.42971787607819!3d23.711107490282284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9ca693759fb%3A0x66bd366a3654f9c8!2s55%2C%201%20North%20Jatrabari%2C%20Dhaka%201204!5e0!3m2!1sen!2sbd!4v1789317111524!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          className="border-none"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfoClient;
