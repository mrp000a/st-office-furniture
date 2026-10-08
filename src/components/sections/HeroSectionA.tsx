"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import { HeroSectionSlides } from "@/components/data/core";
import { Hero } from "../pri-sections/home-hero-anim";

const HeroSectionA = () => {
  const router = useRouter();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="px-2 py-2 sm:px-3 lg:px-4">
      <div className="group border-border/40 bg-background relative mx-auto w-full max-w-384 overflow-hidden rounded-2xl border shadow-2xl shadow-black/10">
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          speed={1100}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          className="hero-swiper aspect-1376/720 w-full"
        >
          {/* Main animated Hero */}
          <SwiperSlide className="overflow relative">
            <Hero />
          </SwiperSlide>

          {/* Image Slides */}
          {HeroSectionSlides.map(
            ({ image, title, subtitle, description }, index) => (
              <SwiperSlide
                key={`${image}-${index}`}
                className="relative overflow-hidden"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    unoptimized
                    fill
                    src={image}
                    alt={title || "ST Office Furniture"}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="100vw"
                    className="hero-image object-cover object-center"
                  />
                </div>

                {/* Image overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/30 to-black/10" />

                {/* Bottom subtle gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/35 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex h-full w-full items-center">
                  <div className="mx-auto w-full max-w-384 px-6 sm:px-10 md:px-14 lg:px-20">
                    <div className="max-w-2xl">
                      {/* Eyebrow */}
                      <div className="hero-eyebrow mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-white/80 sm:w-12" />
                        <span className="text-[10px] font-semibold tracking-[0.28em] text-white/90 uppercase sm:text-xs">
                          {subtitle}
                        </span>
                      </div>

                      {/* Title */}
                      <h1 className="hero-title max-w-2xl text-2xl leading-[1.05] font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        {title}
                      </h1>

                      {/* Description */}
                      <p className="hero-description mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:mt-5">
                        {description}
                      </p>

                      {/* CTA */}
                      <div className="hero-button mt-2 flex items-center gap-3 lg:mt-7">
                        <button
                          type="button"
                          onClick={() => router.push("/products")}
                          className="group/cta hover:bg-green-primary flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-xl transition-all duration-300 hover:text-white hover:shadow-2xl active:scale-95 sm:px-6 sm:py-3 md:text-base"
                        >
                          Explore Collection
                          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:rotate-45" />
                        </button>

                        <span className="hidden text-xs font-medium text-white/60 sm:block">
                          Quality furniture for better workspaces
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide number */}
                <div className="absolute right-5 bottom-5 z-10 hidden items-center gap-2 text-white/70 sm:flex">
                  <span className="text-xs font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-white/40" />
                  <span className="text-xs">ST OFFICE</span>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>

        {/* Navigation */}
        <div className="absolute right-4 bottom-4 z-30 flex items-center gap-2 sm:right-6 sm:bottom-6">
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black active:scale-95 sm:size-11"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black active:scale-95 sm:size-11"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* <style jsx global>{`
        .hero-swiper .swiper-pagination {
          left: 24px !important;
          right: auto !important;
          bottom: 24px !important;
          width: auto !important;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          margin: 0 !important;
          opacity: 0.45;
          background: white;
          transition: all 0.4s ease;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 999px;
          opacity: 1;
        }

        .hero-swiper .swiper-slide .hero-image {
          transform: scale(1.08);
          transition: transform 7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-swiper .swiper-slide-active .hero-image {
          transform: scale(1);
        }

        .hero-swiper .swiper-slide .hero-eyebrow {
          opacity: 0;
          transform: translateY(22px);
        }

        .hero-swiper .swiper-slide .hero-title {
          opacity: 0;
          transform: translateY(35px);
        }

        .hero-swiper .swiper-slide .hero-description {
          opacity: 0;
          transform: translateY(28px);
        }

        .hero-swiper .swiper-slide .hero-button {
          opacity: 0;
          transform: translateY(24px);
        }

        .hero-swiper .swiper-slide-active .hero-eyebrow {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.7s ease 0.25s,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
        }

        .hero-swiper .swiper-slide-active .hero-title {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.8s ease 0.4s,
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
        }

        .hero-swiper .swiper-slide-active .hero-description {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.7s ease 0.65s,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.65s;
        }

        .hero-swiper .swiper-slide-active .hero-button {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.7s ease 0.85s,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.85s;
        }
      `}</style> */}
    </section>
  );
};

export default HeroSectionA;
