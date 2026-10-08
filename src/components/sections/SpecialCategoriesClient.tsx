"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowBigRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Category } from "@/generated/prisma";
import { getCategoriesClient } from "@/lib/api";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";
import { ProductDefaultImage } from "../data/core";
import { getImageUrlProduct } from "@/lib/getImageUrl";

const SpecialCategoriesClient = ({
  categories,
}: {
  categories: Category[];
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount = containerWidth - 40; // Adjust this value to scroll more or less per click
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      <div className="bg-background/30 reveal relative mx-auto w-full max-w-384 rounded-md border p-2">
        {/* heading */}
        <div className="reveal flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <div className="text-green-primary relative">
              <BiCategory
                name="category"
                className="absolute h-8 w-8 animate-ping fill-yellow-400 opacity-50"
              />
              <BiCategory name="category" className="h-8 w-8 fill-yellow-400" />
            </div>
            <h2 className="text-lg font-bold">Shop By Categories</h2>
          </span>
          <span>
            <Button variant={"destructive"} asChild>
              <Link href={"/c"}>
                <span>See All</span>
                <ArrowBigRight />
              </Link>
            </Button>
          </span>
        </div>

        {/* content  */}
        <div
          ref={scrollContainerRef}
          className="reveal relative flex h-100 w-full scrollbar-none items-stretch gap-3 overflow-x-auto overflow-y-hidden p-2"
        >
          {categories &&
            categories.length > 0 &&
            categories.map(({ name, description, image }, index) => (
              <div
                key={index}
                className="group ring-green-primary hover:ring-gray-secondary box-border flex w-68 min-w-68 rounded-md p-2 ring-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-4"
              >
                <div className="flex h-full w-full flex-col gap-2">
                  <Link
                    href={`/c/${name}`}
                    className="border-gray-primary relative z-10 box-border inline-block h-60 min-h-60 w-full overflow-hidden rounded-md border"
                  >
                    {image ? (
                      <Image
                        unoptimized
                        src={getImageUrlProduct(image)}
                        alt={name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="h-full w-full cursor-pointer bg-white object-contain object-center transition-all duration-500 group-hover:scale-115"
                      />
                    ) : (
                      <TbCategoryPlus
                        name="category Icon"
                        className="h-full w-full"
                      />
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col items-start">
                    <Link
                      href={`/c/${name}`}
                      className="line-clamp-2 cursor-pointer text-base font-bold"
                    >
                      {name}
                    </Link>
                    {description && (
                      <span className="line-clamp-2 text-[10px]">
                        Description:{description}
                      </span>
                    )}
                  </div>
                  <Button variant={"outline"} asChild>
                    <Link
                      href={`/c/${name}`}
                      className="line-clamp-2 cursor-pointer text-base font-bold"
                    >
                      View Now
                      <span className="bg-gray-secondary/60 flex-center text-blue-primary size-5 -rotate-45 rounded-full transition-all group-hover:rotate-0 group-hover:bg-yellow-400">
                        <ArrowRight size={3.3} className="" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex-center text-4xl font-bold">
          <button
            onClick={() => scroll("left")}
            className="showPrevSlide bg-gray-secondary/50 absolute top-1/2 left-0 z-20 rounded-md px-2 py-3 backdrop-blur-sm"
          >
            <ChevronLeft className="" />
          </button>
          <button
            onClick={() => {
              scroll("right");
            }}
            className="showPrevSlide bg-gray-secondary/50 absolute top-1/2 right-0 z-20 rounded-md px-2 py-3 backdrop-blur-sm"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialCategoriesClient;
