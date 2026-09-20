"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GiRoundStar } from "react-icons/gi";
import React, { useRef } from "react";
import { Category, Product } from "@/generated/prisma";
import ProductClient from "@/components/uiComponent/productClient";
import Link from "next/link";
import { FaChair, FaCouch, FaTools } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";

const icons = {
  chair: FaChair,
  couch: FaCouch,
  premium: MdWorkspacePremium,
  star: GiRoundStar,
  tools: FaTools,
};

const ProductsSections = ({
  products,
  title,
  subTitle,
  icon,
  href,
}: {
  products: (Product & {
    category: Category;
    averageRating: number;
    _count: {
      descriptions: number;
      reviews: number;
      orderItems: number;
      cartItems: number;
    };
  })[];
  title?: string;
  subTitle?: string;
  icon?: keyof typeof icons;
  href?: string;
}) => {
  const Icon = icons[icon ?? "star"];

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
          <div>
            <span className="flex items-center gap-2">
              <div className="relative text-green-primary">
                <Icon className="animate-ping fill-yellow-500 absolute opacity-50 h-8 w-8" />
                <Icon className="h-8 w-8 fill-yellow-400" />
              </div>
              <h2 className="font-bold text-lg">{title ?? "Products"}</h2>
            </span>
            <span className="text-gray-primary text-xs">
              {subTitle ?? "Designed for better work."}
            </span>
          </div>
          <span>
            <Button variant={"destructive"} asChild>
              <Link href={href ?? "/products"}>
                <span>See All</span>
                <ArrowBigRight />
              </Link>
            </Button>
          </span>
        </div>
        <div
          ref={scrollContainerRef}
          className="relative flex items-stretch p-2 h-110  gap-3 w-full   overflow-x-auto scrollbar-none overflow-y-hidden"
        >
          {products &&
            products.length > 0 &&
            products.map((item, index) => {
              const sanitize = {
                ...item,
                price: Number(item.price),
                discountPrice: Number(item.discountPrice),
                discount: Number(item.discount),
              };
              return (
                <div
                  key={index}
                  className="min-w-65 max-w-65  w-65 flex h-full"
                >
                  <ProductClient item={sanitize} />
                </div>
              );
            })}
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

export default ProductsSections;
