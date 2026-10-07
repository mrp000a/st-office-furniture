import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, MessageCircle, Check } from "lucide-react";
import WhyChooseImage from "@/components/images/Home/how-to-choose-furniture-for-a-new-home.webp";

const benefits = [
  "Quality furniture",
  "Comfort-focused designs",
  "Reliable delivery",
];

export function FinalCTA() {
  return (
    <section className="relative reveal overflow-hidden bg-zinc-950 py-20 text-white sm:py-24 lg:py-32">
      {/* ================= BACKGROUND ================= */}

      {/* Large glow */}
      <div className="dark:bg-primary/10 bg-background/10 pointer-events-none absolute top-1/2 -left-40 size-[500px] -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="dark:bg-primary/10 bg-background/10 pointer-events-none absolute -top-40 -right-40 size-[500px] rounded-full blur-[120px]" />

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.035]" />

      <div className="relative reveal mx-auto max-w-384 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {/* ================= IMAGE ================= */}

          <div className="absolute reveal inset-y-0 right-0 hidden w-[45%] lg:block">
            <Image
              unoptimized
              src={WhyChooseImage}
              alt="Modern office furniture"
              fill
              className="object-cover"
              sizes="45vw"
            />

            {/* Image gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* ================= CONTENT ================= */}

          <div className="relative reveal max-w-3xl px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="bg-primary h-px w-10" />

              <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
                Upgrade Your Workspace
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl reveal text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Make your workspace
              <span className="text-primary block">work better.</span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl reveal text-base leading-7 text-zinc-400 sm:text-lg">
              Discover thoughtfully designed furniture that brings comfort,
              productivity, and professional style into every workspace.
            </p>

            {/* Benefits */}
            <div className="mt-8 flex flex-wrap reveal gap-x-6 gap-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center reveal gap-2 text-sm text-zinc-300"
                >
                  <span className="bg-primary/15 flex size-5 items-center justify-center rounded-full">
                    <Check className="text-primary size-3" strokeWidth={3} />
                  </span>

                  {benefit}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex reveal flex-col gap-3 sm:flex-row">
              {/* Primary */}
              <Link
                href="/products"
                className="group bg-primary reveal text-primary-foreground shadow-primary/10 hover:shadow-primary/20 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <ShoppingBag className="size-4" />
                Explore Furniture
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary */}
              <Link
                href="/contact"
                className="inline-flex reveal items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
              >
                <MessageCircle className="size-4" />
                Talk to an Expert
              </Link>
            </div>

            {/* Small trust message */}
            <p className="mt-6 text-xs text-zinc-500 reveal">
              Need help choosing the right furniture?{" "}
              <Link
                href="/contact"
                className="font-medium text-zinc-300 underline-offset-4 hover:underline"
              >
                Our team is here to help.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
