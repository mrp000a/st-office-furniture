
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
// import HeroImage4 from "@/components/images/Home/how-to-choose-furniture-for-a-new-home.webp";


const floatMain = {
    animate: { y: [0, -8, 0, 7, 0], rotate: [0, 0.3, -0.25, 0.2, 0] },
    transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
};

const floatCardOne = {
    animate: { y: [0, 10, 0, -7, 0], rotate: [0, -1, 0.6, -0.4, 0] },
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
};

const floatCardTwo = {
    animate: { y: [0, -7, 0, 8, 0], rotate: [0, 0.7, -0.5, 0.3, 0] },
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
};

const floatCardThree = {
    animate: { y: [0, 6, 0, -6, 0], rotate: [0, -0.5, 0.4, -0.2, 0] },
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

export function Hero() {
    return (
        <section className="relative isolate min-h-180 overflow-hidden bg-[#f7f8f5] text-neutral-950 dark:bg-[#050705] dark:text-white">
            {/* Soft ambient background */}
            <motion.div animate={{ x: [0, 30, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.08, 0.98, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -left-40 top-10 size-120 rounded-full bg-amber-300/15 blur-[140px] dark:bg-yellow-400/10" />

            <motion.div animate={{ x: [0, -25, 15, 0], y: [0, 15, -10, 0], scale: [1, 0.96, 1.06, 1] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-40 bottom-0 size-125 rounded-full bg-amber-200/20 blur-[150px] dark:bg-yellow-400/10" />

            {/* Subtle grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.035]" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

            <div className="relative mx-auto flex min-h-180 max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
                <div className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-6">
                    {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
                    <div className="relative z-20 lg:col-span-6">
                        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-700/10 bg-white/70 px-3.5 py-2 text-xs font-medium shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/4">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                            </span>
                            Better Seating. Better Working.
                        </motion.div>

                        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.9, delay: 0.08 }} className="max-w-3xl text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                            <span className="block">Upgrade</span>
                            <span className="block">your <span className="text-green-primary">workspace.</span></span>
                            <span className="mt-2 block text-black/20 dark:text-white/20">Work better.</span>
                        </motion.h1>

                        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.18 }} className="mt-7 max-w-xl text-base leading-7 text-black/50 dark:text-white/45 sm:text-lg">
                            Discover comfortable office chairs, workspace essentials and furniture designed to make every working day better.
                        </motion.p>

                        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.28 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/products" className="group inline-flex items-center justify-center gap-3 rounded-full bg-green-primary px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                Explore Products
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link href="/categories" className="group inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-7 py-4 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/10 dark:bg-white/4 dark:hover:bg-white/8">
                                Browse Categories
                                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>


                    </div>

                    {/* =====================================================
              RIGHT PRODUCT VISUAL
          ===================================================== */}
                    <div className="relative z-10 lg:col-span-6">
                        <motion.div initial={{ opacity: 0, scale: 0.94, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto h-130 w-full max-w-142 sm:h-145">

                            {/* Main product card */}
                            <motion.div animate={floatMain.animate} transition={floatMain.transition} className="absolute left-[13%] top-[7%] z-20 h-102 w-[68%] sm:h-112">
                                <div className="relative h-full overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_35px_90px_rgba(0,0,0,0.14)] dark:border-white/10 dark:bg-[#111] dark:shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
                                    <Image src={HeroImage0} alt="ST Office Furniture featured office chair" fill priority sizes="(max-width: 1024px) 70vw, 35vw" className="object-cover transition duration-700 hover:scale-105" />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent" />

                                    <div className="absolute left-5 top-5">
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-xl">
                                            <Sparkles className="size-3" />
                                            Featured
                                        </span>
                                    </div>

                                    <div className="absolute inset-x-5 bottom-5">
                                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
                                            <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">ST Office Furniture</p>
                                            <div className="mt-1 flex items-end justify-between gap-3">
                                                <div>
                                                    <h2 className="text-lg font-semibold text-white sm:text-xl">Premium Workspace</h2>
                                                    <p className="mt-1 text-xs text-white/60">Comfort designed for long working hours.</p>
                                                </div>

                                                <Link href="/products" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-105">
                                                    <ArrowUpRight className="size-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Top right product card */}
                            <motion.div animate={floatCardOne.animate} transition={floatCardOne.transition} className="absolute right-0 top-[2%] z-30 hidden w-40 sm:block">
                                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#151515]/90">
                                    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                                        <Image src={HeroImage3} alt="Office chair" fill sizes="160px" className="object-cover" />
                                    </div>
                                    <div className="px-2 pb-2 pt-2.5">
                                        <p className="text-xs font-semibold">Office Chairs</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <p className="text-[10px] text-muted-foreground">Shop collection</p>
                                            <ChevronRight className="size-3.5 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Left product card */}
                            <motion.div animate={floatCardTwo.animate} transition={floatCardTwo.transition} className="absolute left-0 top-[26%] z-30 hidden w-44 sm:block">
                                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#151515]/90">
                                    <div className="relative aspect-[1.15] overflow-hidden rounded-xl bg-muted">
                                        <Image src={HeroImage1} alt="Workspace furniture" fill sizes="176px" className="object-cover" />
                                    </div>
                                    <div className="px-2 pb-2 pt-2.5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold">Workspace Essentials</p>
                                            <ArrowUpRight className="size-3.5 text-muted-foreground" />
                                        </div>
                                        <p className="mt-1 text-[10px] text-muted-foreground">Designed for productivity</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bottom right product card */}
                            <motion.div animate={floatCardThree.animate} transition={floatCardThree.transition} className="absolute bottom-[3%] right-[1%] z-30 hidden w-48 sm:block">
                                <div className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#151515]/90">
                                    <div className="flex items-center gap-3">
                                        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-muted">
                                            <Image src={HeroImage2} alt="Office furniture" fill sizes="48px" className="object-cover" />
                                        </div>

                                        <div>
                                            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Customer choice</p>
                                            <p className="mt-1 text-sm font-semibold">Highly Rated</p>
                                            <div className="mt-1 flex items-center gap-1">
                                                <Star className="size-3 fill-amber-400 text-amber-400" />
                                                <span className="text-[11px] font-medium">4.8 / 5.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating green badge */}
                            <motion.div animate={{ y: [0, -5, 0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[14%] left-[8%] z-40">
                                <div className="flex items-center gap-2 rounded-full border border-green-700/10 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#151515]/90">
                                    <span className="flex size-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-400/10">
                                        <CheckCircle2 className="size-3.5 text-green-600" />
                                    </span>
                                    <span className="text-[11px] font-semibold">Quality Assured</span>
                                </div>
                            </motion.div>

                            {/* Decorative dots */}
                            <motion.span animate={{ x: [0, 8, -3, 0], y: [0, -12, -3, 0], opacity: [0.4, 0.9, 0.5, 0.4] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[10%] top-[12%] size-2 rounded-full bg-green-500" />

                            <motion.span animate={{ x: [0, -8, 4, 0], y: [0, -7, -14, 0], opacity: [0.3, 0.8, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] left-[4%] size-3 rounded-full bg-amber-400" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#f7f8f5] to-transparent dark:from-[#050705]" />
        </section>
    );
}
