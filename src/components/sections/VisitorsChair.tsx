"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Category, Product } from "@/generated/prisma";
import { getProducts } from "@/lib/api";
import ProductClient from "@/components/uiComponent/productClient";
import Link from "next/link";
import { MdChair } from "react-icons/md";

const VisitorsChair = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [featuredProducts, setFeaturedProducts] = useState<
    | (Product & {
        category: Category;
        _count: {
          descriptions: number;
          reviews: number;
          orderItems: number;
          cartItems: number;
        };
      })[]
    | null
  >(null);

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
    const data = await getProducts({
      order: "asc",
      limit: 10,
      category: "visitors-chair",
    });
    // console.log(data);
    if (!data.success) return;
    console.log(data);
    setFeaturedProducts(data.result);
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
              <MdChair className="animate-ping absolute opacity-50 " />
              <MdChair />
            </div>
            <h2 className="font-bold text-lg">Visitors Chair</h2>
          </span>
          <span>
            <Button variant={"destructive"} asChild>
              <Link href={"/products"}>
                <span> See All</span>
                <ArrowBigRight />
              </Link>
            </Button>
          </span>
        </div>
        <div
          ref={scrollContainerRef}
          className="relative flex items-stretch p-2 h-100  gap-3 w-full   overflow-x-auto overflow-y-hidden"
        >
          {featuredProducts &&
            featuredProducts.length > 0 &&
            featuredProducts.map((item, index) => (
              <div key={index} className="min-w-65 w-65 flex h-full">
                <ProductClient item={item} />
              </div>
            ))}
          <div
            key={2342342343}
            className="min-w-65 w-65 flex h-full rounded-md  bg-background flex-center"
          >
            <Button variant={"destructive"} asChild>
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

export default VisitorsChair;
