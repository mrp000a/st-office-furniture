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
import { coreInfo } from "@/components/data/core";
import { useState } from "react";
import styles from "./home.module.css";

const HeroSectionA = () => {
  const session = useSession();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* hero section  */}
      <section className="py-2">
        <div className=" rounded-md  overflow-hidden w-full max-w-384 max-[600]:max-h-full    mx-auto aspect-[1376/680] bg-background shadow-2xl relative flex-center">
          <Swiper
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setActiveIndex(() => swiper.realIndex);
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="h-full rounded-lg"
          >
            {coreInfo.images.map((item, index) => (
              <SwiperSlide
                key={index}
                className={`flex relative w-full h-full items-center justify-center text-2xl font-bold `}
              >
                <div
                  className={` relative  h-full w-full  overflow-hidden text-shadow-2xs text-shadow-blue-primary `}
                >
                  <Image
                    fill
                    // quality={100}
                    unoptimized
                    className={`object-cover object-center overflow-hidden  relative w-200 h-300 `}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={
                      typeof item === "string"
                        ? item.startsWith("r2upload/")
                          ? `${process.env.NEXT_PUBLIC_URL_R2}/${item}`
                          : item
                        : item
                    }
                    alt={typeof item === "string" ? item : "image of product"}
                  />
                </div>
              </SwiperSlide>
            ))}
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
