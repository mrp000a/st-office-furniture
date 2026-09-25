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
      <div className=" relative  max-w-384 mx-auto w-full rounded-md p-2 bg-background/30 border ">
        <div className="flex items-center justify-between flex-wrap gap-2  ">
          <span className="flex items-center gap-2">
            <div className="relative text-green-primary">
              <BiCategory
                name="category"
                className="animate-ping absolute fill-yellow-400 opacity-50 h-8 w-8"
              />
              <BiCategory name="category" className="h-8 w-8 fill-yellow-400" />
            </div>
            <h2 className="font-bold text-lg">Shop By Categories</h2>
          </span>
          <span>
            <Button variant={"destructive"} asChild>
              <Link href={"/categories"}>
                <span>See All</span>
                <ArrowBigRight />
              </Link>
            </Button>
          </span>
        </div>
        <div
          ref={scrollContainerRef}
          className="relative flex items-stretch p-2 h-100  gap-3 w-full   overflow-x-auto overflow-y-hidden"
        >
          {categories &&
            categories.length > 0 &&
            categories.map(({ name, description, image }, index) => (
              <div
                key={index}
                className="min-w-68 w-68 hover:shadow-lg  flex group  rounded-md ring-2 ring-green-primary hover:ring-gray-secondary hover:ring-4 p-2 box-border transition-all hover:-translate-y-0.5"
              >
                <div className="flex flex-col w-full h-full  gap-2">
                  <Link
                    href={`/categories/${name}`}
                    className="w-full box-border min-h-60 h-60 relative z-10 inline-block rounded-md border border-gray-primary overflow-hidden"
                  >
                    {image ? (
                      <Image
                        src={getImageUrlProduct(image)}
                        alt={name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="object-cover group-hover:scale-115 object-center w-full h-full cursor-pointer  transition-all duration-500"
                      />
                    ) : (
                      <TbCategoryPlus
                        name="category Icon"
                        className="h-full w-full"
                      />
                    )}
                  </Link>
                  <div className="flex flex-col flex-1 items-start">
                    <Link
                      href={`/categories/${name}`}
                      className="text-base font-bold line-clamp-2 cursor-pointer"
                    >
                      {name}
                    </Link>
                    {description && (
                      <span className="line-clamp-2 text-[10px] ">
                        Description:{description}
                      </span>
                    )}
                  </div>
                  <Button variant={"outline"} asChild>
                    <Link
                      href={`/categories/${name}`}
                      className="text-base font-bold line-clamp-2 cursor-pointer"
                    >
                      View Now
                      <span className="size-5  bg-gray-secondary/60 flex-center group-hover:rotate-0 transition-all -rotate-45 rounded-full text-blue-primary">
                        <ArrowRight size={3.3} className="" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div className="text-4xl  font-bold flex-center">
          <button
            onClick={() => scroll("left")}
            className="showPrevSlide absolute left-0 top-1/2 z-20  bg-gray-secondary/50 rounded-md px-2 py-3 backdrop-blur-sm"
          >
            <ChevronLeft className="" />
          </button>
          <button
            onClick={() => {
              scroll("right");
            }}
            className="showPrevSlide absolute right-0 top-1/2 z-20  bg-gray-secondary/50 rounded-md px-2 py-3  backdrop-blur-sm"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialCategoriesClient;
