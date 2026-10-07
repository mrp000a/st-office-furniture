"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { getImageUrlProduct } from "@/lib/getImageUrl";

type Product = {
    index?: number;
    id: string | number;
    title: string;
    image: string;
    price: number;
    discountPrice?: number | null;
};

interface ProductShowcaseProps {
    products: Product[];
}

type Direction = 1 | -1;

const ProductShowcase = ({ products }: ProductShowcaseProps) => {
    const [deck, setDeck] = useState<Product[]>([]);
    const [direction, setDirection] = useState<Direction>(1);
    const [isAnimating, setIsAnimating] = useState(false);



    const moveDeck = (moveDirection: Direction) => {
        if (isAnimating || deck.length <= 1) return;

        setDirection(moveDirection);
        setIsAnimating(true);

        setTimeout(() => {
            setDeck((currentDeck) => {
                if (moveDirection === 1) {
                    const [front, ...rest] = currentDeck;

                    const usedIds = new Set(
                        currentDeck.map((product) => product.id),
                    );

                    const nextProduct = products.find(
                        (product) => !usedIds.has(product.id),
                    );

                    return nextProduct
                        ? [...rest, nextProduct]
                        : [...rest, front];
                }

                const last = currentDeck[currentDeck.length - 1];

                const usedIds = new Set(
                    currentDeck.map((product) => product.id),
                );

                const previousProduct = [...products]
                    .reverse()
                    .find((product) => !usedIds.has(product.id));

                return previousProduct
                    ? [previousProduct, ...currentDeck.slice(0, -1)]
                    : [last, ...currentDeck.slice(0, -1)];
            });

            setIsAnimating(false);
        }, 650);
    };

    useEffect(() => {
        if (!products.length) return;
        const a = () => {
            setDeck(products.slice(0, Math.min(products.length, 5)));
        }
        a()
    }, [products]);

    useEffect(() => {
        if (products.length <= 1) return;

        const interval = setInterval(() => {
            const a = () => {
                moveDeck(1);
            }
            a()
        }, 4200);

        return () => clearInterval(interval);
    }, [products.length, deck, isAnimating]);

    if (!deck.length) return null;


    const getPosition = (index: number) => {
        const positions = [
            {
                x: 0,
                y: 0,
                rotate: -2,
                scale: 1,
                opacity: 1,
                zIndex: 10,
            },
            {
                x: 18,
                y: -8,
                rotate: 4,
                scale: 0.95,
                opacity: 1,
                zIndex: 9,
            },
            {
                x: -18,
                y: -17,
                rotate: -5,
                scale: 0.9,
                opacity: 1,
                zIndex: 8,
            },
            {
                x: 25,
                y: -26,
                rotate: 7,
                scale: 0.85,
                opacity: 0.95,
                zIndex: 7,
            },
            {
                x: -24,
                y: -34,
                rotate: -8,
                scale: 0.8,
                opacity: 0.8,
                zIndex: 6,
            },
        ];

        return positions[index] ?? positions[4];
    };

    return (
        <div className="relative flex min-h-[520px] min-w-100 w-full items-center justify-center overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-primary/5 blur-3xl" />

            <div className="relative h-[460px] w-[320px] sm:h-[480px] sm:w-[350px]">

                {/* Ground shadow */}
                <motion.div
                    animate={{
                        scaleX: isAnimating ? 0.8 : 1,
                        opacity: isAnimating ? 0.05 : 0.12,
                    }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-0 left-1/2 h-7 w-[75%] -translate-x-1/2 rounded-full bg-black blur-2xl"
                />

                {deck.map((product, index) => {
                    const position = getPosition(index);
                    const isFront = index === 0;

                    return (
                        <motion.div
                            key={product.id}
                            animate={
                                isAnimating && isFront
                                    ? {
                                        x:
                                            direction === 1
                                                ? 230
                                                : -230,
                                        y: 110,
                                        rotate:
                                            direction === 1
                                                ? 18
                                                : -18,
                                        scale: 0.82,
                                        opacity: 0,
                                    }
                                    : {
                                        x: position.x,
                                        y: position.y,
                                        rotate: position.rotate,
                                        scale: position.scale,
                                        opacity: position.opacity,
                                    }
                            }
                            transition={
                                isFront && isAnimating
                                    ? {
                                        duration: 0.62,
                                        ease: [0.32, 0.72, 0, 1],
                                    }
                                    : {
                                        duration: 0.7,
                                        ease: [0.22, 1, 0.36, 1],
                                    }
                            }
                            style={{
                                zIndex: position.zIndex,
                            }}
                            className="absolute inset-0 overflow-hidden rounded-[30px] border border-border bg-background shadow-[0_25px_70px_rgba(0,0,0,0.16)]"
                        >
                            {/* Product image */}
                            <div className="relative h-[315px] w-full overflow-hidden bg-muted/20 sm:h-[330px]">
                                <Image
                                    src={getImageUrlProduct(product.image)}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 640px) 320px, 350px"
                                    className="object-contain p-6"
                                />

                                {/* Number */}
                                <div className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full border border-border/50 bg-background/90 text-xs font-bold shadow-sm backdrop-blur">
                                    {String(product.index ?? (index + 1)).padStart(2, "0")}
                                </div>

                                {/* Arrow */}
                                <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-border/50 bg-background/90 shadow-sm backdrop-blur">
                                    <ArrowUpRight className="size-4" />
                                </div>
                            </div>

                            {/* Product information */}
                            <div className="flex h-[145px] flex-col justify-between border-t border-border/60 bg-background p-5">
                                <div>
                                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                        Featured Product
                                    </p>

                                    <h3 className="line-clamp-2 text-lg font-bold tracking-tight">
                                        {product.title}
                                    </h3>
                                </div>

                                <div className="flex items-end justify-between gap-3">
                                    <div>
                                        {product.discountPrice ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-green-primary">
                                                    ৳
                                                    {product.discountPrice.toLocaleString()}
                                                </span>

                                                <span className="text-xs text-muted-foreground line-through">
                                                    ৳
                                                    {product.price.toLocaleString()}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-lg font-bold">
                                                ৳
                                                {product.price.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-xs font-medium text-muted-foreground">
                                        ST Office Furniture
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Previous */}
                <button
                    type="button"
                    disabled={isAnimating}
                    onClick={() => moveDeck(-1)}
                    aria-label="Previous product"
                    className="absolute -left-5 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-background disabled:pointer-events-none disabled:opacity-50 sm:-left-12"
                >
                    <ChevronLeft className="size-5" />
                </button>

                {/* Next */}
                <button
                    type="button"
                    disabled={isAnimating}
                    onClick={() => moveDeck(1)}
                    aria-label="Next product"
                    className="absolute -right-5 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-background disabled:pointer-events-none disabled:opacity-50 sm:-right-12"
                >
                    <ChevronRight className="size-5" />
                </button>

                {/* Progress */}
                <div className="absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
                    {products.slice(0, Math.min(products.length, 6)).map(
                        (product, index) => (
                            <span
                                key={product.id}
                                className={`h-1.5 rounded-full transition-all duration-300 ${deck[0]?.id === product.id
                                    ? "w-6 bg-green-primary"
                                    : "w-1.5 bg-muted-foreground/30"
                                    }`}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;