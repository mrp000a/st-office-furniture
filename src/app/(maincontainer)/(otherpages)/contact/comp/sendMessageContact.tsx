import MessageForm from "@/components/common/forms/messageForm";
import { Clock3, Headphones, Send, ShoppingBag } from "lucide-react";
import React from "react";
import BrandCard from "./brandCard";

const SendMessageContact = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        {/* Left information */}
        <div>
          <span className="text-green-primary text-xs font-bold tracking-[0.2em] uppercase">
            Send Us a Message
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            How can we help?
          </h2>

          <p className="text-gray-primary mt-5 text-sm leading-7 sm:text-base">
            Tell us what you need and our team will get back to you with the
            information you need.
          </p>

          <div className="mt-8 space-y-5">
            <ContactInfo
              icon={Clock3}
              title="Quick Response"
              description="We aim to respond to customer inquiries as quickly as possible."
            />

            <ContactInfo
              icon={Headphones}
              title="Product Assistance"
              description="Need help choosing a chair or furniture? Tell us what you're looking for."
            />

            <ContactInfo
              icon={ShoppingBag}
              title="Business & Bulk Orders"
              description="Planning an office setup? Contact us with your furniture requirements."
            />
          </div>
          <div className="mt-5 w-full">
            <BrandCard />
          </div>
        </div>

        {/* Form */}
        <MessageForm />
      </div>
    </section>
  );
};

export default SendMessageContact;

function ContactInfo({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="bg-green-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-green-primary h-4 w-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="text-gray-primary mt-1 text-sm leading-6">
          {description}
        </p>
      </div>
    </div>
  );
}
