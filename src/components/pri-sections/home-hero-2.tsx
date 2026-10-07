
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    ChevronRight,
    ShieldCheck,
    Sparkles,
    Star,
    Truck,
} from "lucide-react";

import EcomProductImage from "@/components/images/Home/how-to-choose-furniture-for-a-new-home.webp";
import ProductShowcase from "./comp/ProductShowCase";

type HeroProduct = {
    id: string | number;
    title: string;
    images?: string[];
    price: number | string;
    discountPrice?: number | string | null;
    productCode?: string | null;
};

type HeroProps = {
    products: HeroProduct[];
};

const formatPrice = (value: number | string) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "৳ —";
    }

    return `৳${number.toLocaleString("en-BD")}`;
};

const getProductImage = (product: HeroProduct) => {
    return product.images?.[0] || EcomProductImage;
};

const positionVariants = {
    center: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        zIndex: 30,
    },
    topRight: {
        x: 175,
        y: -90,
        scale: 0.72,
        opacity: 0.82,
        rotate: 3,
        zIndex: 20,
    },
    bottomRight: {
        x: 150,
        y: 185,
        scale: 0.66,
        opacity: 0.7,
        rotate: -2,
        zIndex: 10,
    },
    bottomLeft: {
        x: -165,
        y: 145,
        scale: 0.64,
        opacity: 0.58,
        rotate: 2,
        zIndex: 5,
    },
    hidden: {
        x: -210,
        y: -100,
        scale: 0.5,
        opacity: 0,
        rotate: -5,
        zIndex: 0,
    },
};

const mobileVariants = {
    center: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        zIndex: 30,
    },
    topRight: {
        x: 105,
        y: -30,
        scale: 0.72,
        opacity: 0.2,
        rotate: 2,
        zIndex: 10,
    },
    bottomRight: {
        x: 80,
        y: 70,
        scale: 0.65,
        opacity: 0,
        rotate: -2,
        zIndex: 0,
    },
    bottomLeft: {
        x: -80,
        y: 70,
        scale: 0.65,
        opacity: 0,
        rotate: 2,
        zIndex: 0,
    },
    hidden: {
        x: -100,
        y: -30,
        scale: 0.55,
        opacity: 0,
        rotate: -5,
        zIndex: 0,
    },
};

export function Hero2({ products }: HeroProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const visibleProducts = useMemo(() => {
        if (!products?.length) {
            return [];
        }

        return products.slice(0, Math.min(products.length, 8));
    }, [products]);

    const productCount = visibleProducts.length;

    const activeProduct =
        visibleProducts[activeIndex % Math.max(productCount, 1)];

    const goNext = () => {
        if (!productCount) return;

        setActiveIndex((current) => (current + 1) % productCount);
    };

    const goPrevious = () => {
        if (!productCount) return;

        setActiveIndex(
            (current) => (current - 1 + productCount) % productCount,
        );
    };

    useEffect(() => {
        if (productCount <= 1 || isPaused || shouldReduceMotion) {
            return;
        }

        const interval = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % productCount);
        }, 3800);

        return () => window.clearInterval(interval);
    }, [productCount, isPaused, shouldReduceMotion]);

    if (!activeProduct) {
        return null;
    }

    return (
        <section className="relative isolate min-h-[760px] overflow-hidden bg-[#f7f7f5] text-neutral-950 dark:bg-[#050505] dark:text-white">
            {/* =========================================================
                AMBIENT BACKGROUND
            ========================================================== */}

            <motion.div
                animate={
                    shouldReduceMotion
                        ? undefined
                        : {
                            x: [0, 30, -10, 0],
                            y: [0, -20, 10, 0],
                            scale: [1, 1.08, 0.98, 1],
                        }
                }
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-lime-300/20 blur-[140px] dark:bg-lime-400/10"
            />

            <motion.div
                animate={
                    shouldReduceMotion
                        ? undefined
                        : {
                            x: [0, -20, 20, 0],
                            y: [0, 15, -15, 0],
                            scale: [1, 0.95, 1.08, 1],
                        }
                }
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-200/30 blur-[150px] dark:bg-orange-400/5"
            />

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
                style={{
                    backgroundImage:
                        "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            {/* =========================================================
                CONTENT
            ========================================================== */}

            <div className="relative w-full mx-auto flex min-h-[760px] max-w-7xl items-center px-5 py-24 sm:px-8 lg:px-12">
                <div className="grid w-full items-center gap-16 lg:grid-cols-12 lg:gap-8">
                    {/* =====================================================
                        LEFT CONTENT
                    ====================================================== */}

                    <div className="relative z-20 lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                            </span>
                            Better Seating. Better Working.
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-4xl text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[0.86] tracking-[-0.075em]"
                        >
                            <span className="block">Upgrade</span>
                            <span className="block">
                                your <span className="text-green-primary">workspace.</span>
                            </span>
                            <span className="block text-black/25 dark:text-white/25">
                                Work better.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-8 max-w-xl text-base leading-7 text-black/50 dark:text-white/45 sm:text-lg"
                        >
                            Discover comfortable office chairs, workspace
                            essentials and furniture designed to make every
                            working day better.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.45 }}
                            className="mt-9 flex flex-col gap-3 sm:flex-row"
                        >
                            <Link
                                href="/products"
                                className="group inline-flex items-center justify-center gap-3 rounded-full bg-neutral-950 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-white dark:text-black"
                            >
                                Explore products
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/categories"
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/60 px-7 py-4 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
                            >
                                Browse categories
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.65 }}
                            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-black/40 dark:text-white/30"
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className="h-3.5 w-3.5 text-lime-500" />
                                Curated products
                            </span>

                            <span className="hidden h-1 w-1 rounded-full bg-current opacity-30 sm:block" />

                            <span className="flex items-center gap-2">
                                <Truck className="h-3.5 w-3.5" />
                                Fast delivery
                            </span>

                            <span className="hidden h-1 w-1 rounded-full bg-current opacity-30 sm:block" />

                            <span className="flex items-center gap-2">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Secure checkout
                            </span>
                        </motion.div>
                    </div>

                    {/* =====================================================
                        PRODUCT SHOWCASE
                    ====================================================== */}
                    <div className="h-full w-full aspect-square">

                        <ProductShowcase products={[{ index: 1, id: 1, image: "", price: 233, title: "Product Name" }, { index: 2, id: 1, image: "", price: 243, title: "Product Name" }, { id: 1, image: "", index: 3, price: 230, title: "Product Name" }]} />
                    </div>

                </div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f7f5] to-transparent dark:from-[#050505]" />
        </section>
    );
}
