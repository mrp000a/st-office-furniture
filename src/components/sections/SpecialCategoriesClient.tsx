
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Category } from "@/generated/prisma";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers3,
  MoveRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getImageUrlProduct } from "@/lib/getImageUrl";

const SpecialCategoriesClient = ({
  categories,
}: {
  categories: Category[];
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth <
        container.scrollWidth - 2,
    );
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(
      "[data-category-card]",
    );

    const cardWidth = firstCard?.offsetWidth ?? 280;
    const gap = 16;

    container.scrollBy({
      left:
        direction === "left"
          ? -(cardWidth + gap) * 2
          : (cardWidth + gap) * 2,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    updateScrollState();

    container.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [categories.length, updateScrollState]);

  if (categories.length === 0) return null;

  return (
    <section className="w-full py-6 sm:py-10">
      <div className="mx-auto w-full max-w-384 px-3 sm:px-5 lg:px-8">
        {/* Section heading */}
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Layers3 size={17} />
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-sm">
                Find your style
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
              Shop by{" "}
              <span className="text-primary">Categories</span>
            </h2>

            <p className="mt-1 max-w-lg text-xs leading-5 text-muted-foreground sm:text-sm">
              Explore furniture designed for better seating and better
              working.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Desktop carousel controls */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Scroll categories left"
              disabled={!canScrollLeft}
              onClick={() => scroll("left")}
              className="hidden size-10 rounded-full sm:flex"
            >
              <ChevronLeft size={19} />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Scroll categories right"
              disabled={!canScrollRight}
              onClick={() => scroll("right")}
              className="hidden size-10 rounded-full sm:flex"
            >
              <ChevronRight size={19} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-1 rounded-full px-2 text-xs font-semibold sm:px-3 sm:text-sm"
            >
              <Link href="/c">
                See all
                <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
        </div>

        

        {/* Category carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-4 scrollbar-none sm:gap-4"
            aria-label="Product categories"
          >
            {categories.map((category, index) => (
              <article
                key={category.id}
                data-category-card
                className="group relative flex w-[72%] min-w-[72%] snap-start flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:w-[42%] sm:min-w-[42%] md:w-[31%] md:min-w-[31%] lg:w-[24%] lg:min-w-[24%] xl:w-[22%] xl:min-w-[22%]"
              >
                {/* Image */}
                <Link
                  href={`/c/${encodeURIComponent(category.name.trim())}`}
                  aria-label={`Explore ${category.name}`}
                  className="relative block overflow-hidden bg-muted/30"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white dark:bg-muted/20">
                    {category.image ? (
                      <Image
                        unoptimized
                        src={getImageUrlProduct(category.image)}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 72vw, (max-width: 768px) 42vw, (max-width: 1024px) 31vw, 24vw"
                        className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-5"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Layers3
                          size={42}
                          strokeWidth={1.2}
                          className="text-muted-foreground/50"
                        />
                      </div>
                    )}

                    {/* Image overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="absolute left-3 top-3 rounded-full border border-border/50 bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm backdrop-blur sm:text-xs">
                      Category {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/95 text-foreground shadow-md transition-all duration-300 group-hover:rotate-[-35deg] group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <Link
                    href={`/c/${encodeURIComponent(category.name.trim())}`}
                    className="line-clamp-2 text-base font-bold leading-snug tracking-tight transition-colors hover:text-primary sm:text-lg"
                  >
                    {category.name}
                  </Link>

                  <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-muted-foreground sm:text-sm">
                    {category.description?.trim() ||
                      `Explore our ${category.name.toLowerCase()} collection and find the right fit for your space.`}
                  </p>

                  <div className="mt-auto pt-4">
                    <Link
                      href={`/c/${encodeURIComponent(category.name.trim())}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-primary transition-all duration-200 hover:gap-3 sm:text-sm"
                    >
                      Explore collection
                      <MoveRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Subtle edge fades on larger screens */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-6 bg-gradient-to-r from-background to-transparent sm:block" />
          )}

          {canScrollRight && (
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-6 bg-gradient-to-l from-background to-transparent sm:block" />
          )}
        </div>

        {/* Mobile carousel hint */}
        <div className="mt-1 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:hidden">
          <ChevronLeft size={14} />
          <span>Swipe to explore categories</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </section>
  );
};

export default SpecialCategoriesClient;
