"use client";

import { Button } from "@/components/ui/button";
// import VideoPlayer from "@/components/ui/youtubePlayer";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  DeleteIcon,
  Trash2,
} from "lucide-react";
import { coreInfo, HeroSectionSlides } from "@/components/data/core";
import { useState } from "react";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";

const HeroSectionA = () => {
  const router = useRouter();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  // const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* hero section  */}
      <section className="py-2">
        <div className="bg-background flex-center relative mx-auto w-full max-w-384 overflow-hidden rounded-md shadow-2xl max-[600]:max-h-full">
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="aspect-[1376/680] w-full rounded-lg"
          >
            {HeroSectionSlides.map(
              ({ image, title, subtitle, description }, index) => (
                <SwiperSlide
                  key={index}
                  className={`relative flex w-full items-center justify-center text-2xl font-bold`}
                >
                  <div
                    className={`text-shadow-blue-primary relative h-full w-full overflow-hidden text-shadow-2xs`}
                  >
                    <Image
                      unoptimized
                      fill
                      className={`hero-image overflow-hidden object-cover object-center`}
                      sizes="80vw"
                      src={image}
                      priority={index === 0}
                      alt={"Hero images"}
                      loading={"eager"}
                    />
                  </div>

                  {/* Text */}
                  <div className="bg-foreground/30 dark:bg-background/30 absolute inset-0 flex h-full w-full items-center">
                    <div className="hero-text mx-auto flex w-full max-w-7xl flex-col items-end justify-end px-6">
                      <p className="hero-subtitle mb-3 text-end text-[10px] font-medium tracking-widest text-white uppercase sm:text-base md:text-lg lg:text-xl">
                        {subtitle}
                      </p>

                      <h1 className="hero-title max-w-2xl text-end text-xl font-bold text-white sm:text-2xl md:text-6xl lg:text-5xl">
                        {title}
                      </h1>

                      <p className="hero-description mt-4 max-w-xl text-end text-xs text-white/90 sm:text-sm md:text-base lg:text-lg">
                        {description}
                      </p>

                      <button
                        onClick={() => router.push("/products")}
                        className="hero-button hover:bg-green-primary/60 mt-6 cursor-pointer rounded-md bg-white px-3 py-1 text-end text-sm font-semibold text-black transition-all duration-200 hover:text-white active:-translate-y-1 md:px-6 md:py-3 lg:text-2xl"
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ),
            )}
          </Swiper>

          {/* change button  */}
          <div className="flex-center text-4xl font-bold">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="showPrevSlide bg-gray-secondary/30 absolute left-0 z-20 rounded-md px-1 py-2 backdrop-blur-xs lg:px-3 lg:py-5"
            >
              <ChevronLeft className="" />
            </button>
            <button
              onClick={() => {
                swiperInstance?.slideNext();
              }}
              className="showPrevSlide bg-gray-secondary/30 absolute right-0 z-20 rounded-md px-1 py-2 backdrop-blur-xs lg:px-3 lg:py-5"
            >
              <ChevronRight />
            </button>
          </div>
          {/* text for hero */}
          {/* <div className="absolute flex-center flex-col gap-2 h-full w-full ">
            <h2
              className={`absolute bottom-20 left-3 z-30 font-bold text-3xl text-foreground/80 bg-background/40 backdrop-blur-md px-3 py-2 rounded-md ${styles.slideTrack}`}
            >
              {coreInfo.name.toUpperCase()}
            </h2>
            <p className="absolute bottom-3 left-3 z-30 font-semibold text-gray-primary bg-background/40 backdrop-blur-md px-3 py-2 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              aliquam, provident iste aut obcaecati esse nobis ipsum, a enim,
              blanditiis voluptatem maxime magni.
            </p>
          </div> */}
        </div>
      </section>

      {/* next section  */}
      <section></section>

      <div className="w-full max-w-300">
        {/* <VideoPlayer  url="https://youtu.be/ozrwrDpYkuk?si=HpOWaoNWdikQxa2Y" /> */}
        {/* <VideoPlayer url="https://www.pexels.com/download/video/6672457/" /> */}
      </div>
    </div>
  );
};

export default HeroSectionA;
