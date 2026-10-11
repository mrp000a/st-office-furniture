"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import { FaChair, FaCouch, FaTools } from "react-icons/fa";
import { GiRoundStar } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";

import { Button } from "@/components/ui/button";
import ProductClient from "@/components/uiComponent/productClient";
import { ProductItemType } from "../data/core";

const icons = {
  chair: FaChair,
  couch: FaCouch,
  premium: MdWorkspacePremium,
  star: GiRoundStar,
  tools: FaTools,
};

type ProductsSectionsProps = {
  products: (ProductItemType & { averageRating: number })[];
  title?: string;
  subTitle?: string;
  icon?: keyof typeof icons;
  href?: string;
};

const ProductsSections = ({
  products,
  title = "Featured Products",
  subTitle = "Discover furniture designed for better work.",
  icon = "star",
  href = "/products",
}: ProductsSectionsProps) => {
  const Icon = icons[icon];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(maxScroll > 4 && scrollLeft < maxScroll - 4);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(
      "[data-product-card]",
    );

    const cardWidth = firstCard?.getBoundingClientRect().width ?? 280;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * 2;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    const firstCard = container.querySelector("[data-product-card]");

    if (firstCard) resizeObserver.observe(firstCard);

    container.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("scroll", updateScrollState);
    };
  }, [products.length, updateScrollState]);

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-3 py-5 sm:px-5 sm:py-8 lg:px-8">
      <div className="border-border/70 bg-card relative overflow-hidden rounded-2xl border shadow-sm">
        {/* Subtle decorative background */}
        <div
          aria-hidden="true"
          className="bg-primary/5 pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full blur-3xl"
        />

        {/* Section header */}
        <div className="relative flex flex-col gap-4 px-4 pt-5 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-6 sm:pb-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
              <Icon className="size-6" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-foreground text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
                  {title}
                </h2>

                {/* <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:text-xs">
                  <Sparkles className="size-3 text-amber-500" />
                  Handpicked
                </span> */}
              </div>

              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {subTitle}
              </p>

              {/* <p className="mt-1.5 text-xs text-muted-foreground">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} to explore
              </p> */}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="text-muted-foreground text-xs sm:hidden">
              Swipe to explore
            </span>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="group h-9 shrink-0 rounded-full px-4"
            >
              <Link href={href}>
                View all
                <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="border-border/60 mx-4 border-t sm:mx-6" />

        {/* Product carousel */}
        {products.length > 0 ? (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              aria-label={`${title} products`}
              className="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 py-5 sm:px-6 sm:py-6 [&::-webkit-scrollbar]:hidden"
            >
              {products.map((item) => {
                const sanitizedItem = {
                  ...item,
                  price: Number(item.price),
                  discountPrice: Number(item.discountPrice),
                  discount: Number(item.discount),
                };

                return (
                  <div
                    key={item.id}
                    data-product-card
                    className="w-[78%] max-w-[300px] min-w-0 flex-none snap-start sm:w-[48%] sm:max-w-none md:w-[32%] lg:w-[24%] xl:w-[22%]"
                  >
                    <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                      <ProductClient item={sanitizedItem} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel navigation */}
            <div className="pointer-events-none absolute inset-y-0 right-0 left-0 hidden items-center justify-between px-2 sm:flex">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Scroll products left"
                disabled={!canScrollLeft}
                onClick={() => scroll("left")}
                className="border-border/70 bg-background/95 pointer-events-auto size-10 rounded-full border shadow-lg backdrop-blur transition-opacity disabled:opacity-0"
              >
                <ChevronLeft className="size-5" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Scroll products right"
                disabled={!canScrollRight}
                onClick={() => scroll("right")}
                className="border-border/70 bg-background/95 pointer-events-auto size-10 rounded-full border shadow-lg backdrop-blur transition-opacity disabled:opacity-0"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-52 flex-col items-center justify-center px-4 py-12 text-center">
            <div className="bg-muted mb-3 flex size-12 items-center justify-center rounded-full">
              <Icon className="text-muted-foreground size-6" />
            </div>

            <h3 className="text-foreground font-semibold">
              No products available yet
            </h3>

            <p className="text-muted-foreground mt-1 max-w-sm text-sm">
              We&apos;re updating our collection. Please check back soon.
            </p>

            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href={href}>Browse products</Link>
            </Button>
          </div>
        )}

        {/* Bottom accent */}
        <div className="from-primary/10 via-primary/50 to-primary/10 h-1 w-full bg-gradient-to-r" />
      </div>
    </section>
  );
};

export default ProductsSections;
