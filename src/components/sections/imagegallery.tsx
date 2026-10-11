"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { OfficeImages } from "../data/core";
import { Button } from "../ui/button";

const Imagegallery = () => {
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="bg-green-primary/10 pointer-events-none absolute top-20 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="mx-auto max-w-384">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 md:flex-row md:items-end lg:mb-12"
        >
          <div className="max-w-2xl">
            <span className="border-green-primary/20 bg-green-primary/5 text-green-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase">
              <span className="bg-green-primary size-1.5 rounded-full" />
              Explore Our Collection
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Spaces that inspire.
              <span className="text-muted-foreground mt-1 block">
                Furniture that works.
              </span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-6 sm:text-base sm:leading-7">
              Discover thoughtfully selected furniture that brings comfort,
              functionality, and style to every workspace.
            </p>
          </div>
          <Link
            href="/products"
            className="group hover:text-green-primary inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors"
          >
            Explore all products
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
          {OfficeImages.map((item, index) => (
            <motion.article
              key={item.href + item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: (index % 2) * 0.12,
                ease: "easeOut",
              }}
              className={`group relative isolate ${index % 3 === 0 ? "md:row-span-1" : ""}`}
            >
              <Link
                href={item.href}
                className="border-border/60 bg-muted relative block aspect-[5/4] overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 hover:shadow-xl sm:aspect-[6/4] lg:rounded-3xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-black/5 transition-colors duration-500 group-hover:from-black/90 group-hover:via-black/25" />

                <div className="absolute top-4 left-4 flex items-center gap-2 sm:top-6 sm:left-6">
                  <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/90 backdrop-blur-md sm:text-xs">
                    ST Office Furniture
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                  <div className="flex items-end justify-between gap-3 sm:gap-5">
                    <div className="max-w-xl min-w-0 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-md text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white sm:text-sm">
                        <span>Discover collection</span>
                        <MoveUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>

                    <div className="mb-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black sm:size-12">
                      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-3 rounded-xl border border-white/0 transition-all duration-500 group-hover:inset-4 group-hover:border-white/20 sm:inset-4 sm:rounded-2xl sm:group-hover:inset-5" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            asChild
            size="lg"
            className="group shadow-green-primary/10 rounded-full px-6 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Link href="/products">
              Shop all furniture
              <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Imagegallery;
