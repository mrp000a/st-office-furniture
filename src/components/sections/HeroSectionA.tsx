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
        <div className=" rounded-md  overflow-hidden w-full max-w-384 max-[600]:max-h-full    mx-auto aspect-[1376/680] bg-background shadow-2xl relative flex-center">
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="h-full rounded-lg"
          >
            {HeroSectionSlides.map(
              ({ image, title, subtitle, description }, index) => (
                <SwiperSlide
                  key={index}
                  className={`flex relative w-full h-full items-center justify-center text-2xl font-bold `}
                >
                  <div
                    className={` relative  h-full w-full  overflow-hidden text-shadow-2xs text-shadow-blue-primary `}
                  >
                    <Image
                      fill
                      className={`object-cover object-center overflow-hidden hero-image`}
                      sizes="80vw"
                      src={image}
                      priority={index === 0}
                      alt={"Hero images"}
                      loading={"eager"}
                    />
                  </div>

                  {/* Text */}
                  <div className="absolute inset-0 flex items-center w-full h-full bg-foreground/30 dark:bg-background/30">
                    <div className="hero-text flex flex-col items-end justify-end mx-auto w-full max-w-7xl px-6 ">

                      <p className="hero-subtitle mb-3 text-[10px] sm:text-base md:text-lg lg:text-xl font-medium uppercase text-end tracking-widest text-white">
                        {subtitle}
                      </p>

                      <h1 className="hero-title max-w-2xl text-xl sm:text-2xl lg:text-5xl font-bold text-white md:text-6xl text-end">
                        {title}
                      </h1>

                      <p className="hero-description mt-4 max-w-xl text-xs sm:text-sm md:text-base lg:text-lg text-white/90  text-end">
                        {description}
                      </p>

                      <button
                        onClick={() => router.push("/products")}
                        className="hero-button mt-6 cursor-pointer rounded-md text-end text-sm lg:text-2xl bg-white px-3 py-1 md:px-6 md:py-3 font-semibold hover:bg-red-primary/60 hover:text-white transition-all duration-200 active:-translate-y-1 text-black"
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
          <div className="text-4xl font-bold flex-center">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="showPrevSlide absolute left-0 z-20  bg-gray-secondary/30 rounded-md lg:px-3 px-1 py-2 lg:py-5  backdrop-blur-xs"
            >
              <ChevronLeft className="" />
            </button>
            <button
              onClick={() => {
                swiperInstance?.slideNext();
              }}
              className="showPrevSlide absolute right-0 z-20  bg-gray-secondary/30 rounded-md lg:px-3 px-1 py-2 lg:py-5  backdrop-blur-xs"
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
