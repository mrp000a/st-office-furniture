import { MessageCircle, Phone } from "lucide-react";
import React from "react";

const HeroContact = () => {
  return (
    <section className="relative border-b border-border">
      <div className="absolute inset-0 bg-linear-to-br from-green-primary/10 via-background to-background" />

      <div className="relative mx-auto flex min-h-105 w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-primary/20 bg-green-primary/10 px-3 py-1.5 text-xs font-semibold text-green-primary">
            <MessageCircle className="h-3.5 w-3.5" />
            Get in Touch
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {"Let's talk about"}
            <span className="block text-green-primary">your workspace.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-primary sm:text-base">
            Have a question about a product, need help with an order, or looking
            for furniture for your office? Our team is here to help you find the
            right solution.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/8801XXXXXXXXX"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-green-primary px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <a
              href="tel:+8801XXXXXXXXX"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 text-sm font-semibold transition-colors hover:bg-muted"
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
