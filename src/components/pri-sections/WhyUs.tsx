"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import WhyChooseImage from "@/components/images/Home/how-to-choose-furniture-for-a-new-home.webp";

const reasons = [
  "Quality materials",
  "Comfortable designs",
  "Professional appearance",
  "Reliable support",
  "Competitive pricing",
];

export function WhySTOfficeFurniture() {
  return (
    <section className="bg-muted/30 reveal relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Decorative background */}
      <div className="bg-primary/5 pointer-events-none absolute top-20 -left-32 size-72 rounded-full blur-3xl" />
      <div className="bg-primary/5 pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full blur-3xl" />

      <div className="relative reveal mx-auto max-w-384 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ================= IMAGE ================= */}
          <div className="group reveal relative">
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                unoptimized
                src={WhyChooseImage}
                alt="ST Office Furniture"
                fill
                priority={false}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  600px
                "
              />

              {/* Image overlay */}
              <div className="absolute inset-0 reveal bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute reveal bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/55 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/15">
                <Sparkles className="size-5" />
              </div>

              <div>
                <p className="text-xs text-white/70 reveal">Furniture that works</p>
                <p className="text-sm font-semibold reveal">Built for better spaces</p>
              </div>
            </div>

            {/* Decorative border */}
            <div className="border-primary/20 pointer-events-none absolute -right-3 -bottom-3 -z-10 size-full rounded-3xl border" />
          </div>

          {/* ================= CONTENT ================= */}
          <div className="lg:pl-4 reveal">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-2 reveal">
              <span className="bg-primary h-px w-8" />

              <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                Why Choose Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl reveal">
              Why <span className="text-primary">ST Office Furniture?</span>
            </h2>

            {/* Description */}
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-7 sm:text-lg reveal reveal reveal">
              Better furniture starts with better decisions. We bring together
              quality, comfort, style, and value to help you create workspaces
              that people enjoy working in.
            </p>

            {/* Reasons */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="group reveal bg-background/70 hover:border-primary/30 flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="bg-primary/10  group-hover:bg-primary flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300">
                    <Check
                      className="text-primary group-hover:text-primary-foreground size-4 transition-colors duration-300"
                      strokeWidth={2.5}
                    />
                  </div>

                  <span className="text-sm  font-medium sm:text-[15px]">
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 reveal">
              <Link
                href="/about"
                className="group bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Learn About Us
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
