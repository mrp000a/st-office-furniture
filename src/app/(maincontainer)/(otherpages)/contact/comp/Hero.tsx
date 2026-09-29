import { MessageCircle, Phone } from "lucide-react";
import React from "react";

const HeroContact = () => {
  return (
    <section className="border-border relative border-b">
      <div className="from-green-primary/10 via-background to-background absolute inset-0 bg-linear-to-br" />

      <div className="relative mx-auto flex min-h-105 w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <span className="border-green-primary/20 bg-green-primary/10 text-green-primary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold">
            <MessageCircle className="h-3.5 w-3.5" />
            Get in Touch
          </span>

          <h1 className="text-foreground mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {"Let's talk about"}
            <span className="text-green-primary block">your workspace.</span>
          </h1>

          <p className="text-gray-primary mt-5 max-w-2xl text-sm leading-7 sm:text-base">
            Have a question about a product, need help with an order, or looking
            for furniture for your office? Our team is here to help you find the
            right solution.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/8801XXXXXXXXX"
              className="bg-green-primary inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <a
              href="tel:+8801XXXXXXXXX"
              className="border-border bg-background hover:bg-muted inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-semibold transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContact;
