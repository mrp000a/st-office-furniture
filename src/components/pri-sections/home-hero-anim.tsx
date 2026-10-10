"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Star,
} from "lucide-react";

import HeroImage0 from "@/components/images/Home/hero/how-to-choose-furniture-for-a-new-home.webp";
import HeroImage1 from "@/components/images/Home/hero/whisk_image_1760968660830_1.jpg";
import HeroImage3 from "@/components/images/Home/hero/path-slider-03.jpg";
import HeroImage2 from "@/components/images/Home/how-to-choose-furniture-for-a-new-home.webp";

const floatMain = {
  animate: { y: [0, -5, 0, 4, 0], rotate: [0, 0.2, -0.15, 0.15, 0] },
  transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
};

const floatCardOne = {
  animate: { y: [0, 6, 0, -5, 0], rotate: [0, -0.7, 0.4, -0.3, 0] },
  transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
};

const floatCardTwo = {
  animate: { y: [0, -5, 0, 6, 0], rotate: [0, 0.6, -0.4, 0.25, 0] },
  transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
};

const floatCardThree = {
  animate: { y: [0, 5, 0, -5, 0], rotate: [0, -0.4, 0.3, -0.15, 0] },
  transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative isolate h-full w-full overflow-hidden bg-[#f7f8f5] text-neutral-950 dark:bg-[#050705] dark:text-white">
      {/* Ambient background */}
      <motion.div
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -15, 10, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -left-32 size-72 rounded-full bg-amber-300/15 blur-[100px] sm:size-96 sm:blur-[130px] lg:size-120 lg:blur-[140px] dark:bg-yellow-400/10"
      />

      <motion.div
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 15, -10, 0],
          scale: [1, 0.96, 1.06, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 -bottom-20 size-80 rounded-full bg-amber-200/20 blur-[110px] sm:size-105 sm:blur-[135px] lg:size-125 lg:blur-[150px] dark:bg-yellow-400/10"
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main layout */}
      <div className="relative mx-auto flex h-full w-full max-w-384 items-center px-4 py-3 sm:px-6 sm:py-7 md:px-8 lg:px-10 lg:py-10">
        <div className="grid h-full w-full items-center gap-2 md:grid-cols-12 md:gap-4 lg:gap-6">
          {/* =====================================================
              CONTENT
          ===================================================== */}
          <div className="relative z-20 flex h-full flex-col justify-center md:col-span-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.65 }}
              className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-green-700/10 bg-white/70 px-2.5 py-1.5 text-[8px] font-medium shadow-sm backdrop-blur-xl sm:mb-3 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] md:text-xs dark:border-white/10 dark:bg-white/5"
            >
              <span className="relative flex size-1.5 sm:size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex size-full rounded-full bg-green-500" />
              </span>
              Better Seating. Better Working.
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="max-w-2xl max-[450]:text-lg text-[clamp(1.65rem,6vw,5.8rem)] leading-[0.9] font-semibold tracking-[-0.065em] sm:text-[clamp(2rem,6vw,5.8rem)] md:text-[clamp(2.2rem,5vw,5rem)] lg:text-[clamp(3rem,5vw,5.8rem)]"
            >
              <span className="block">Upgrade</span>
              <span className="block">
                your <span className="text-green-primary">workspace.</span>
              </span>
              <span className="mt-1 block text-black/20 dark:text-white/20">
                Work better.
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="mt-2 max-w-lg text-[10px] leading-4 text-black/50 sm:mt-3 sm:text-xs sm:leading-5 md:mt-4 md:text-sm md:leading-6 lg:text-base lg:leading-7 dark:text-white/45"
            >
              Discover comfortable office chairs, workspace essentials and
              furniture designed to make every working day better.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.75, delay: 0.28 }}
              className="mt-3 flex flex-wrap gap-2 sm:mt-4 md:mt-5 lg:mt-6"
            >
              <Link
                href="/products"
                className="group bg-green-primary inline-flex items-center justify-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-semibold text-white shadow-lg shadow-green-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:py-3 md:text-sm"
              >
                Explore Products
                <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1 sm:size-3.5 md:size-4" />
              </Link>

              <Link
                href="/c"
                className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3.5 py-2 text-[10px] font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:py-3 md:text-sm dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                Categories
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-3.5 md:size-4" />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-3 flex items-center gap-3 text-[8px] text-black/45 sm:mt-4 sm:gap-4 sm:text-[10px] md:mt-5 md:text-xs dark:text-white/45"
            >
              <div className="flex items-center gap-1">
                <CheckCircle2 className="size-3 text-green-600 sm:size-3.5" />
                Quality Assured
              </div>

              <div className="flex items-center gap-1">
                <Star className="size-3 fill-amber-400 text-amber-400 sm:size-3.5" />
                4.8 Rated
              </div>
            </motion.div>
          </div>

          {/* =====================================================
              PRODUCT VISUAL
          ===================================================== */}
          <div className="relative z-10 h-full min-h-0 md:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto h-full min-h-55 w-full max-w-150 sm:min-h-65 md:min-h-0"
            >
              {/* Main card */}
              <motion.div
                animate={floatMain.animate}
                transition={floatMain.transition}
                className="absolute top-[8%] left-[14%] z-20 h-[76%] w-[64%] sm:top-[7%] sm:left-[13%] sm:h-[78%] sm:w-[66%]"
              >
                <div className="relative h-full overflow-hidden rounded-[1.2rem] border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:rounded-[1.5rem] sm:shadow-[0_30px_70px_rgba(0,0,0,0.14)] dark:border-white/10 dark:bg-[#111] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
                  <Image
                    src={HeroImage0}
                    alt="ST Office Furniture featured office chair"
                    fill
                    priority
                    sizes="(max-width: 768px) 55vw, 35vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[7px] font-medium tracking-[0.12em] text-white uppercase backdrop-blur-xl sm:gap-1.5 sm:px-2.5 sm:py-1.5 sm:text-[9px]">
                      <Sparkles className="size-2.5 sm:size-3" />
                      Featured
                    </span>
                  </div>

                  <div className="absolute inset-x-2.5 bottom-2.5 sm:inset-x-4 sm:bottom-4">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-2.5 backdrop-blur-xl sm:rounded-2xl sm:p-3">
                      <p className="text-[6px] tracking-[0.14em] text-white/50 uppercase sm:text-[8px]">
                        ST Office Furniture
                      </p>

                      <div className="mt-0.5 flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="truncate text-[10px] font-semibold text-white sm:text-sm md:text-base">
                            Premium Workspace
                          </h2>
                          <p className="mt-0.5 hidden text-[8px] text-white/60 sm:block sm:text-[9px]">
                            Comfort designed for long working hours.
                          </p>
                        </div>

                        <Link
                          href="/products"
                          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-105 sm:size-8 md:size-9"
                        >
                          <ArrowUpRight className="size-3 sm:size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Top right card */}
              <motion.div
                animate={floatCardOne.animate}
                transition={floatCardOne.transition}
                className="absolute top-[3%] right-[1%] z-30 w-[25%] max-w-36 min-w-20"
              >
                <div className="overflow-hidden rounded-xl border border-black/10 bg-white/90 p-1 shadow-lg backdrop-blur-xl sm:rounded-2xl sm:p-1.5 sm:shadow-xl dark:border-white/10 dark:bg-[#151515]/90">
                  <div className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl">
                    <Image
                      src={HeroImage3}
                      alt="Office chair"
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </div>

                  <div className="px-1 py-1 sm:px-1.5 sm:py-1.5">
                    <p className="truncate text-[7px] font-semibold sm:text-[9px]">
                      Office Chairs
                    </p>

                    <div className="mt-0.5 flex items-center justify-between">
                      <p className="text-muted-foreground hidden text-[7px] sm:block">
                        Shop collection
                      </p>
                      <ChevronRight className="text-muted-foreground size-2.5 sm:size-3" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Left card */}
              <motion.div
                animate={floatCardTwo.animate}
                transition={floatCardTwo.transition}
                className="absolute top-[28%] left-[1%] z-30 w-[28%] max-w-44 min-w-23"
              >
                <div className="overflow-hidden rounded-xl border border-black/10 bg-white/90 p-1 shadow-lg backdrop-blur-xl sm:rounded-2xl sm:p-1.5 sm:shadow-xl dark:border-white/10 dark:bg-[#151515]/90">
                  <div className="relative aspect-[1.15] overflow-hidden rounded-lg sm:rounded-xl">
                    <Image
                      src={HeroImage1}
                      alt="Workspace furniture"
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                  </div>

                  <div className="px-1 py-1.5 sm:px-2 sm:py-2">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-[7px] font-semibold sm:text-[9px]">
                        Workspace Essentials
                      </p>
                      <ArrowUpRight className="text-muted-foreground size-2.5 shrink-0 sm:size-3" />
                    </div>

                    <p className="text-muted-foreground mt-0.5 hidden text-[7px] sm:block">
                      Designed for productivity
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom right card */}
              <motion.div
                animate={floatCardThree.animate}
                transition={floatCardThree.transition}
                className="absolute right-[1%] bottom-[3%] z-30 w-[31%] max-w-48 min-w-27"
              >
                <div className="rounded-xl border border-black/10 bg-white/90 p-2 shadow-lg backdrop-blur-xl sm:rounded-2xl sm:p-3 sm:shadow-xl dark:border-white/10 dark:bg-[#151515]/90">
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <div className="relative size-7 shrink-0 overflow-hidden rounded-lg sm:size-10 sm:rounded-xl">
                      <Image
                        src={HeroImage2}
                        alt="Office furniture"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-muted-foreground hidden text-[7px] tracking-wide uppercase sm:block">
                        Customer choice
                      </p>

                      <p className="truncate text-[8px] font-semibold sm:mt-0.5 sm:text-[10px]">
                        Highly Rated
                      </p>

                      <div className="mt-0.5 flex items-center gap-0.5">
                        <Star className="size-2.5 fill-amber-400 text-amber-400 sm:size-3" />
                        <span className="text-[7px] font-medium sm:text-[9px]">
                          4.8 / 5.0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quality badge */}
              <motion.div
                animate={{ y: [0, -4, 0, 4, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[13%] left-[5%] z-40"
              >
                <div className="flex items-center gap-1 rounded-full border border-green-700/10 bg-white/90 px-2 py-1 shadow-md backdrop-blur-xl sm:gap-2 sm:px-2.5 sm:py-1.5 sm:shadow-lg dark:border-white/10 dark:bg-[#151515]/90">
                  <span className="flex size-4 items-center justify-center rounded-full bg-green-100 sm:size-5 dark:bg-green-400/10">
                    <CheckCircle2 className="size-2.5 text-green-600 sm:size-3" />
                  </span>

                  <span className="text-[7px] font-semibold sm:text-[9px]">
                    Quality Assured
                  </span>
                </div>
              </motion.div>

              {/* Decorative dots */}
              <motion.span
                animate={{
                  x: [0, 6, -2, 0],
                  y: [0, -8, -2, 0],
                  opacity: [0.4, 0.9, 0.5, 0.4],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[12%] right-[9%] size-1.5 rounded-full bg-green-500 sm:size-2"
              />

              <motion.span
                animate={{
                  x: [0, -6, 3, 0],
                  y: [0, -5, -10, 0],
                  opacity: [0.3, 0.8, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[20%] left-[3%] size-2 rounded-full bg-amber-400 sm:size-2.5"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-[#f7f8f5] to-transparent sm:h-16 dark:from-[#050705]" />
    </section>
  );
}
