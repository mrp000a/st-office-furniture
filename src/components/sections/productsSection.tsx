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
      <div className="bg-background/30 relative mx-auto w-full max-w-384 rounded-md border p-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="flex items-center gap-2">
              <div className="text-green-primary relative">
                <Icon className="absolute h-8 w-8 animate-ping fill-yellow-500 opacity-50" />
                <Icon className="h-8 w-8 fill-yellow-400" />
              </div>
              <h2 className="text-lg font-bold">{title ?? "Products"}</h2>
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
          className="relative flex h-110 w-full scrollbar-none items-stretch gap-3 overflow-x-auto overflow-y-hidden p-2"
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
                <div key={index} className="flex h-full w-65 max-w-65 min-w-65">
                  <ProductClient item={sanitize} />
                </div>
              );
            })}
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

export default ProductsSections;
