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
    <section className="relative overflow-hidden bg-muted/30 py-16 sm:py-20 lg:py-28">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 size-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-384 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ================= IMAGE ================= */}
          <div className="group relative">
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                unoptimized
                src={WhyChooseImage}
                alt="ST Office Furniture"
                fill
                priority={false}
                className="
                  object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  600px
                "
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/55 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/15">
                <Sparkles className="size-5" />
              </div>

              <div>
                <p className="text-xs text-white/70">Furniture that works</p>
                <p className="text-sm font-semibold">Built for better spaces</p>
              </div>
            </div>

            {/* Decorative border */}
            <div className="pointer-events-none absolute -bottom-3 -right-3 -z-10 size-full rounded-3xl border border-primary/20" />
          </div>

          {/* ================= CONTENT ================= */}
          <div className="lg:pl-4">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Why Choose Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Why <span className="text-primary">ST Office Furniture?</span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Better furniture starts with better decisions. We bring together
              quality, comfort, style, and value to help you create workspaces
              that people enjoy working in.
            </p>

            {/* Reasons */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="
                    group flex items-center gap-3
                    rounded-xl border bg-background/70
                    px-4 py-3
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:border-primary/30
                    hover:shadow-sm
                  "
                >
                  <div
                    className="
                      flex size-7 shrink-0 items-center justify-center
                      rounded-full bg-primary/10
                      transition-colors duration-300
                      group-hover:bg-primary
                    "
                  >
                    <Check
                      className="
                        size-4 text-primary
                        transition-colors duration-300
                        group-hover:text-primary-foreground
                      "
                      strokeWidth={2.5}
                    />
                  </div>

                  <span className="text-sm font-medium sm:text-[15px]">
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9">
              <Link
                href="/about"
                className="
                  group inline-flex items-center gap-2
                  rounded-xl bg-primary
                  px-5 py-3
                  text-sm font-semibold text-primary-foreground
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                Learn About Us
                <ArrowRight
                  className="
                    size-4
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
