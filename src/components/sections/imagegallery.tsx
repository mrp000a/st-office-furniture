"use client";
import Image from "next/image";
import React, { useState } from "react";
import { OfficeImages } from "../data/core";
import { Button } from "../ui/button";
import Link from "next/link";

const Imagegallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div>
      <div className="mx-auto grid max-w-384 grid-cols-1 gap-2 border px-2 md:grid-cols-2">
        {OfficeImages.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className={`group shadow-foreground/50 relative aspect-video h-full w-full cursor-pointer overflow-hidden rounded-md shadow-sm`}
          >
            <Image
              unoptimized
              fill
              src={item.image}
              alt="Hero image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`absolute object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 ${activeIndex === index ? "scale-110" : "scale-100"} `}
            />

            <div
              className={`flex-center bg-foreground/50 text-background group-hover:bg-foreground/30 dark:bg-background/50 dark:text-foreground dark:group-hover:bg-background/30 relative z-20 h-full w-full px-3 transition-all duration-500 ${activeIndex === index ? "bg-foreground/30 dark:bg-background/30 backdrop-blur-sm" : ""} `}
            >
              <div>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="font-serif italic">{item.description}</p>
                <Button variant={"destructive"} asChild>
                  <Link href={item.href}>View Our Products</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Imagegallery;
