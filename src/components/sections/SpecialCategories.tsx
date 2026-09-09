"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Category } from "@/generated/prisma";
import { getCategories } from "@/lib/api";
import ProductClient from "@/components/uiComponent/productClient";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";
import { ProductDefaultImage } from "../data/core";

const SpecialCategoriesPage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [specialCategories, setSpecialCategories] = useState<Category[] | null>(
    null,
  );

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

  const loadFeaturedProducts = useCallback(async () => {
    const data = await getCategories();
   
    if (!data.success) return;
    
    setSpecialCategories(data.result);
  }, []);

  useEffect(() => {
    const a = () => {
      loadFeaturedProducts();
    };
    a();
  }, [loadFeaturedProducts]);

  return (
    <section>
      <div className=" relative  max-w-384 mx-auto w-full rounded-md p-2 bg-background border ">
        <div className="flex items-center justify-between flex-wrap gap-2  ">
          <span className="flex items-center gap-2">
            <div className="relative text-red-primary">
              <BiCategory className="animate-ping absolute opacity-50 " />
              <BiCategory />
            </div>
            <h2 className="font-bold text-lg">Special Category</h2>
          </span>
          <span>
            <Button variant={"destructive"} asChild>
              <Link href={"/products"}>
                <span>See All</span>
                <ArrowBigRight />
              </Link>
            </Button>
          </span>
        </div>
        <div
          ref={scrollContainerRef}
          className="relative flex items-stretch p-2 h-70  gap-3 w-full   overflow-x-auto overflow-y-hidden"
        >
          {specialCategories &&
            specialCategories.length > 0 &&
            specialCategories.map(({ name, description, image }, index) => (
              <div
                key={index}
                className="min-w-50 w-50 flex  rounded-md ring-2 ring-red-primary hover:ring-blue-primary p-2 box-border transition-all hover:-translate-y-0.5"
              >
                <div className="flex flex-col w-full h-full  gap-2">
                  <Link
                    href={`/products?category=${name}`}
                    className="w-full box-border min-h-35 h-35 relative z-10 inline-block rounded-md border border-gray-primary overflow-hidden"
                  >
                    {image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_URL_R2}/${image ? image : ProductDefaultImage}`}
                        alt={name}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="object-cover object-center w-full h-full cursor-pointer hover:scale-120 transition-all duration-500"
                      />
                    ) : (
                      <TbCategoryPlus className="h-full w-full" />
                    )}
                  </Link>
                  <div className="flex flex-col items-start">
                    <Link
                      href={`/products?category=${name}`}
                      className="text-base font-bold line-clamp-2 cursor-pointer"
                    >
                      {name}
                    </Link>
                    <span className="line-clamp-3 text-[10px]">
                      Description:{description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          <div
            key={2342342343}
            className=" flex h-full rounded-md  bg-background flex-center"
          >
            <Button variant={"default"} asChild>
              <Link href={"/products"}>
                <span> See All</span>
                <ArrowBigRight />
              </Link>
            </Button>
          </div>
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

export default SpecialCategoriesPage;
